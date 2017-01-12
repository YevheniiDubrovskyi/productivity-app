import ComponentView from '../components.view';
import Template from './task_list.template';
// import './task_list.less';

import Task from '../task/task.controller';
import Tabs from '../tabs/tabs.controller';
import {messagesData, mainFilterTabsData, selectionTabsData, tasksStatusList} from './task_list.data';

/**
 * Component view
 */
export default class View extends ComponentView {

  /**
   * Create component view
   * @param {HTMLElement} container - Append to element
   * @param {object} states - States object
   * @param {object} tasksTypes - Task types
   */
  constructor(container, states, tasksTypes) {
    super(container);
    this.states = states;
    this.tasksTypes = tasksTypes;

    this.dailyContainer = null;
    this.globalContainer = null;
  }

  /**
   * Render component
   * @param {array} priorityDataArray
   * @param {array} categoriesDataArray
   */
  render(priorityDataArray, categoriesDataArray) {
    this.categories = categoriesDataArray;

    this.template = new Template(messagesData);
    this.markup = this.getMarkup();

    this.dailyContainer = this.markup.querySelector('.daily-tasks');
    this.globalContainer = this.markup.querySelector('.global-tasks');

    this.container.appendChild(this.markup);
    this.createComponents(priorityDataArray);
    this.setStatesForElements();
    super.render();

    this.events.on('view:dataRecived', function(tasksDataArray) {
      this.removeAllTasks();
      this.renderTasks(tasksDataArray);
    }, this);

    this.events.on('task_data', function(...params) {
      this.executeDataCallback(params[0].split(':')[1], ...params.slice(1));
    }, this);
  }

  /**
   * Create inner components
   * @param {array} priorityDataArray
   */
  createComponents(priorityDataArray) {
    const states = this.states;

    const priorityFilterTabs = new Tabs(true,
                                        this.markup.querySelector('.global-tasks .task-list-block-controls'),
                                        '',
                                        ...priorityDataArray);
    this.hideOnStates(priorityFilterTabs, [states.INIT]);
    this.componentsList.push(priorityFilterTabs);

    const mainFilterTabs = new Tabs(true,
                                    this.markup.querySelector('.daily-tasks .task-list-block-controls'),
                                    '',
                                    ...mainFilterTabsData);
    this.hideOnStates(mainFilterTabs, [states.INIT]);
    this.componentsList.push(mainFilterTabs);
  }

  /**
   * Execute data callback by name
   * @param {string} eventKey - Event key
   * @param {...*} eventData - Data from event
   */
  executeDataCallback(eventKey, ...eventData) {
    const callbacks = {
      added(taskDataObject) {
        this.addTask(taskDataObject);
      },
      remove(id) {
        this.removeTask(id);
      },
      update(id, taskDataObject) {
        this.updateTask(id, taskDataObject);
      }
    };

    callbacks[eventKey].call(this, ...eventData);
  }

  /**
   * Destroy all tasks
   */
  removeAllTasks() {
    this.componentsList.forEach((component) => {
      if (component instanceof Task) component.destroy();
    });

    this.componentsList = this.componentsList.filter((component) => {
      return !(component instanceof Task);
    });

    Array.from(this.globalContainer.querySelectorAll('.tasks-grp-by-category')).forEach((element) => {
      this.globalContainer.removeChild(element);
    });
  }

  /**
   * Create all tasks from dataArray
   * @param {array} tasksDataArray - Tasks data array
   */
  renderTasks(tasksDataArray) {
    tasksDataArray.sort((current, next) => { // Sort all tasks
      const currentDeadline = new Date(current.data.deadline);
      const nextDeadline = new Date(next.data.deadline);

      return currentDeadline > nextDeadline ?
        1 :
        -1;
    }).forEach((dataObject) => {
      this.addTask(dataObject, true);
    });
  }

  /**
   * Remove task by ID
   * @param {string} id - Task id
   */
  removeTask(id) {
    const index = this.findTaskComponentByID(id);
    const taskComponent = this.componentsList.splice(index, 1)[0];

    const listItem = taskComponent.getMarkup().parentElement;
    const list = listItem.parentElement;

    taskComponent.destroy();
    list.removeChild(listItem);

    if (list.children.length) return;
    const section = list.parentElement;
    if (!section.classList.contains('tasks-grp-by-category')) return;

    const sectionParent = section.parentElement;
    sectionParent.removeChild(section);
  }

  /**
   * Update task by id
   * @param {string} id - Task id
   * @param {object} dataObject - New task data object
   */
  updateTask(id, dataObject) {
    const index = this.findTaskComponentByID(id);
    const taskComponent = this.componentsList[index];

    taskComponent.update(dataObject);
  }

  /**
   * Find task component by ID
   * @return {index} Task component index in components array
   */
  findTaskComponentByID(id) {
    let index = -1;

    this.componentsList.forEach((component, i) => {
      if (!(component instanceof Task)) return;

      const currentID = component.getID();
      index = currentID === id ?
        i :
        index;
    });

    if (index === -1) {
      throw new Error('TaskList:View - Task component with such id does not exist');
    }

    return index;
  }

  /**
   * Add task, abstraction for .createTask()
   * @param {object} dataObject - Task data object
   * @param {boolean} [firstRenderFlag] - If true task will be add with less efforts
   */
  addTask(dataObject, firstRenderFlag = false) {
    const dailyTaskList = this.dailyContainer.querySelector('.task-list');
    const categories = this.categories;
    const isGlobal = dataObject.type === this.tasksTypes.GLOBAL;
    const isDone = dataObject.data.status === tasksStatusList.DONE;
    const listItemElement = document.createElement('li');

    let insertBeforeElement = null;
    let taskList;

    listItemElement.classList.add('task-list-item');

    if (isGlobal) { // Check task type (global | daily)
      const category = categories.filter((category) => { // Find category object by alias
        return category.alias === dataObject.data.category;
      })[0];

      let categoryTaskList = this.globalContainer.querySelector(`.${category.alias}-category .task-list`);

      if (categoryTaskList === null) { // Check category task list existence
        categoryTaskList = this.template.createCategorySection(category.alias, category.title);
        this.globalContainer.querySelector('.task-list-block-categories').appendChild(categoryTaskList);
        categoryTaskList = categoryTaskList.querySelector('.task-list');
      }

      if (!firstRenderFlag) { // Check first render flag (for optimization purpose)
        insertBeforeElement = this.findInsertBeforeElement(new Date(dataObject.data.deadline), categoryTaskList);
      }

      taskList = categoryTaskList;
    } else {
      insertBeforeElement = this.findInsertBeforeElement(new Date(dataObject.data.deadline), dailyTaskList);
      taskList = dailyTaskList;
    }

    taskList.insertBefore(listItemElement, insertBeforeElement);

    this.createTask(listItemElement, dataObject.data, {
      edit: !isDone,
      toTop: isGlobal,
      toTimer: !isDone
    });
  }

  /**
   * Return insertBefore element
   * @param {Date} compareDeadline - Deadline date which will be compare
   * @param {HTMLElement} tasksListElement - Tasks list element
   * @return {HTMLElement | null} Insert before element
   */
  findInsertBeforeElement(compareDeadline, tasksListElement) {
    let insertBeforeElement = null;

    Array.from(tasksListElement.children).forEach((element) => {
      const currentTaskDeadline = new Date(element.querySelector('time').getAttribute('datetime'));

      insertBeforeElement = !insertBeforeElement &&
                            compareDeadline < currentTaskDeadline ?
        element :
        insertBeforeElement;
    });

    return insertBeforeElement;
  }

  /**
   * Create task instance
   * @param {HTMLElement} container - Append to element
   * @param {object} dataObject - Task data object
   * @param {object} buttonsOptions - Buttons options
   */
  createTask(container, dataObject, buttonsOptions) {
    const task = new Task(container, dataObject, buttonsOptions);

    task.events.on('task:button_clicked', function(id, buttonName) {
      this.trigger('task:button_clicked', id, buttonName);
    }, this.events);
    this.componentsList.push(task);
  }

  /**
   * Set states for elements
   */
  setStatesForElements() {
    const firstTaskMessage = this.markup.querySelector('.first-task');
    const dragToTopMessage = this.markup.querySelector('.drag-to-top');
    const allDoneMessage = this.markup.querySelector('.all-done');
    const globalButton = this.markup.querySelector('.task-list-block-controls-glbl-btn');
    const states = this.states;

    this.hideOnStates(globalButton, [states.INIT]);
    this.hideOnStates(firstTaskMessage, [states.TASK_ADDED, states.COMMON, states.REMOVING]);
    this.hideOnStates(dragToTopMessage, [states.INIT, states.COMMON, states.REMOVING]);
    this.hideOnStates(allDoneMessage, [states.INIT, states.TASK_ADDED, states.COMMON, states.REMOVING]);

    this.events.on('view:state_changed', function(state, previousState) {
      const removingState = this.states.REMOVING;

      if (previousState === removingState) {
        this.markup.classList.remove('removing-state');
        return;
      }

      if (state === removingState) {
        this.markup.classList.add('removing-state');
        return;
      }
    }, this);
  }

  /**
   * Set component state. Fire events which listen by components
   * @param {string} state
   * @param {string} previousState
   */
  setState(state, previousState) {
    this.events.trigger('view:state_changed', state, previousState);
  }

  /**
   * Subscribe on state change event and hide component on some states
   * @param {ComponentController | HTMLElement} component - Component or element which will be hide
   * @param {array} statesArray - Array of states(strings)
   */
  hideOnStates(component, statesArray) {
    const isElement = component instanceof HTMLElement;
    const hideStyle = 'display: none;';

    this.events.on('view:state_changed', function(state, previousState) {
      if (statesArray.includes(state)) {
        if (statesArray.includes(previousState)) return;

        if (isElement) {
          component.style = hideStyle;
        } else {
          component.inlineStyles = hideStyle;
        }

        return;
      }

      if (isElement) {
        component.style = '';
      } else {
        component.inlineStyles = '';
      }
    });
  }

}

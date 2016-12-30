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
    this.setStatesForMessages();
    super.render();

    this.events.on('view:dataRecived', function(tasksDataArray) {
      this.removeAllTasks();
      this.renderTasks(tasksDataArray);
    }, this);

    this.bindTaskDataEvents();
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
   * Bind methods to task data events (CRUD)
   */
  bindTaskDataEvents() {
    this.events.on('task_data:added', function(taskDataObject) {
      this.addTask(taskDataObject);
    }, this);
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
    console.log('Render tasks ', tasksDataArray);

    tasksDataArray.sort((current, next) => { // Sort all tasks
      const currentDeadline = new Date(current.data.deadline);
      const nextDeadline = new Date(next.data.deadline);

      return currentDeadline > nextDeadline ?
        1 :
        -1;
    }).forEach((dataObject) => {
      this.addTask(dataObject);
    });
  }

  /**
   * Add task, abstraction for .createTask()
   * @param {object} dataObject - Task data object
   */
  addTask(dataObject) {
    const dailyList = this.dailyContainer.querySelector('.task-list');
    const categories = this.categories;
    const isGlobal = dataObject.type === this.tasksTypes.GLOBAL;
    const isDone = dataObject.data.status === tasksStatusList.DONE;

    const listItemElement = document.createElement('li');
    listItemElement.classList.add('task-list-item');

    if (isGlobal) {
      const category = categories.filter((category) => { // Find category object by alias
        return category.alias === dataObject.data.category;
      })[0];

      let categoryTaskList = this.globalContainer.querySelector(`.${category.alias}-category .task-list`);

      if (categoryTaskList === null) {
        categoryTaskList = this.template.createCategorySection(category.alias, category.title);
        this.globalContainer.appendChild(categoryTaskList);

        categoryTaskList.querySelector('.task-list').appendChild(listItemElement);
      } else {
        categoryTaskList.appendChild(listItemElement);
      }
    } else {
      dailyList.appendChild(listItemElement);
    }

    this.createTask(listItemElement, dataObject.data, {
      edit: !isDone,
      toTop: isGlobal,
      toTimer: !isDone
    });
  }

  /**
   * Create task instance
   * @param {HTMLElement} container - Append to element
   * @param {object} dataObject - Task data object
   * @param {object} buttonsOptions - Buttons options
   */
  createTask(container, dataObject, buttonsOptions) {
    const task = new Task(container, dataObject, buttonsOptions);

    task.events.on('task:button_clicked', function(buttonName) {
      console.log('Task button clicked: ', buttonName);
    });
    this.componentsList.push(task);
  }

  /**
   * Set states for messages
   */
  setStatesForMessages() {
    const firstTaskMessage = this.markup.querySelector('.first-task');
    const dragToTopMessage = this.markup.querySelector('.drag-to-top');
    const allDoneMessage = this.markup.querySelector('.all-done');
    const states = this.states;

    this.hideOnStates(firstTaskMessage, [states.TASK_ADDED]);
    this.hideOnStates(dragToTopMessage, [states.INIT]);
    this.hideOnStates(allDoneMessage, [states.INIT, states.TASK_ADDED]);
  }

  /**
   * Set component state. Fire events which listen by components
   * @param {string} state
   */
  setState(state) {
    this.events.trigger('view:state_changed', state);
  }

  /**
   * Subscribe on state change event and hide component on some states
   * @param {ComponentController | HTMLElement} component - Component or element which will be hide
   * @param {array} statesArray - Array of states(strings)
   */
  hideOnStates(component, statesArray) {
    const isElement = component instanceof HTMLElement;
    const hideStyle = 'display: none;';

    this.events.on('view:state_changed', function(state) {
      if (statesArray.includes(state)) {
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

import ComponentController from '../components.controller';
import View from './task_list.view';
import Model from './task_list.model';

/**
 * Component controller
 */
export default class TaskList extends ComponentController {

  /**
   * Create component controller
   * @param {HTMLElement} container - Append to element
   */
  constructor(container) {
    super();

    this.states = {
      INIT: 'init',
      ALL_DONE: 'all_done',
      TASK_ADDED: 'task_added',
      COMMON: 'common'
    };
    this.tasksTypes = {
      GLOBAL: 'global',
      DAILY: 'daily'
    };
    this.removingMode = false;
    this.state = null;

    this.model = new Model(this.states, this.tasksTypes);
    this.view = new View(container, this.states, this.tasksTypes);

    this.subscribeToEvents();
  }

  /**
   * Subscribe to model, view and own events
   */
  subscribeToEvents() {
    // Fired when model get all data for components
    this.model.events.once('model:data_received', function(...data) {
      this.render(...data);
    }, this);

    this.model.events.once('model:priority_data_received', function(priorityData) {
      this.view.fullPriorityData = priorityData.reduce((acc, el) => {
        acc[el.title] = el.weight;

        return acc;
      }, {});
    }, this);

    this.model.events.on('model:state_changed', function(state) {
      if (this.state === state) return;

      this.setState(state);
    }, this);

    // Fired when model updated from dataService
    // TODO: Можно подпилить под этот ивент сортировку, сортировать по полю priority и кидать в ивент
    this.model.events.on('model:updated', function(data) {
      this.update(data);
    }, this.view);

    this.model.events.on('task_data', function(...params) {
      this.trigger(params[0], ...params.slice(1));
    }, this.view.events);

    this.view.events.on('task:button_clicked', this.executeButtonCallback, this);
  }

  /**
   * Executes button callback by name
   * @param {string} id - Task id
   * @param {string} buttonName - Button name
   */
  executeButtonCallback(id, buttonName) {
    const callbacks = {
      up(id) {
        this.model.moveTaskToDaily(id);
      },
      edit(id) {
        this.events.trigger('task_list:edit_clicked', id, this.model.getTaskData(id));
      },
      pomodoro(id) {
        this.events.trigger('task_list:timer_clicked', id);
      },
      trash(id) {
        if (this.removingMode) {
          this.model.addToRemoveList(id);
        }
      },
      close(id) {
        if (this.removingMode) {
          this.model.excludeFromRemoveList(id);
        }
      }
    };

    callbacks[buttonName].call(this, id);
  }

  /**
   * Set component state. Fire events which listen by components
   * @param {string} state
   */
  setState(state) {
    if (!this.checkState(state) ||
        this.state === state
    ) {
      return;
    }

    this.state = state;
    this.view.setState(this.state);

    this.events.trigger('task_list:state_changed', this.state);
  }

  /**
   * Check state existence
   * @param {string} state
   * @return {boolean} State existence flag
   */
  checkState(state) {
    const states = this.states;
    let existenceFlag = false;

    for (let prop in states) {
      if (states[prop] === state) existenceFlag = true;
    }

    return existenceFlag;
  }

  /**
   * Enable or disable removing mode
   */
  toggleRemovingMode() {
    this.removingMode = !this.removingMode;
    this.view.setRemovingModeTo(this.removingMode);
  }

  /**
   * Add task data. Starts chain for adding task instance to collection.
   * @param {object} dataObject - Data object for task
   */
  addTask(dataObject) {
    this.model.addTask(dataObject);
  }

  /**
   * Update task by id
   * @param {string} id - Task id
   * @param {object} dataObject - Task raw data
   */
  updateTask(id, dataObject) {
    this.model.updateTask(id, dataObject);
  }

  /**
   * Remove task by id
   * @param {string} id
   */
  removeTask(id) {
    this.model.removeTask(id);
  }

}

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
      TASK_ADDED: 'task_added',
      COMMON: 'common',
      REMOVING: 'removing'
    };
    this.state = null;
    this.model = new Model();
    this.view = new View(container);

    this.render();
    this.setState(this.states.INIT);

    this.view.events.on('view:rendered', function() {
      this.view.setState(this.state); // For hiding recently rendered component, which wait for data
    }, this);

    this.model.events.on('model:updated', function(data) {
      this.update(data);
    }, this.view);
  }

  /**
   * Set component state. Fire events which listen by components
   * @param {string} state
   */
  setState(state) {
    if (!this.checkState(state)) return;

    this.state = state;
    this.view.setState(state);
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
   * Get global tasks count
   * @return {number} Global tasks count
   */
  getGlobalTasksCount() {}

  /**
   * Get daily tasks count
   * @return {number} Daily tasks count
   */
  getDailyTasksCount() {}

  /**
   * Shows tasks buttons for removing
   */
  switchOnRemovingMode() {
    this.setState(this.states.REMOVING);
  }

  /**
   * Remove marked tasks
   */
  switchOffRemovingMode() {
    this.setState(this.states.COMMON);
  }

  /**
   * Switch on/off removing mode depends on current state
   */
  toggleRemovingMode() {
    if (this.state === this.states.REMOVING) {
      this.switchOffRemovingMode();
    } else {
      this.switchOnRemovingMode();
    }
  }

  /**
   * Add task to collection
   * @param {object} dataObject - Data object for task
   */
  addTask(dataObject) {
    this.model.addTask(dataObject);
  }

  /**
   * Update task by id
   * @param {string} id
   * @param {object} dataObject
   */
  updateTask(id, dataObject) {}

  /**
   * Remove task by id
   * @param {string} id
   */
  removeTask(id) {}

}

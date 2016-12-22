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
      COMMON: 'common',
      REMOVING: 'removing'
    };
    this.state = null;
    this.model = new Model(this.states);
    this.view = new View(container, this.states);

    this.render()

    this.model.events.on('model:state_changed', function(state) {
      console.log('Model state change - ', state); // TODO: remove this later
      this.setState(state);
    }, this);

    this.view.events.on('view:rendered', function() {
      this.setState(this.state); // For hiding recently rendered component, which wait for data
    }, this);

    // Fired when model updated from dataService
    // TODO: Можно подпилить пож этот ивент сортировку, сортировать по полю priority и кидать в ивент
    this.model.events.on('model:updated', function(data) {
      this.update(data);
    }, this.view);

    // CRUD events
    this.model.events.on('task_data:added', function(dataObject) {
      this.view.createTask(dataObject);
    }, this);

    this.model.events.on('task_data:remove', function(id) {
      this.removeTask(id);
    }, this.view);

    this.model.events.on('task_data:update', function(dataObject) {
      this.updateTask(dataObject);
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
   * @param {string} [type] - Task type (daily|global)
   */
  updateTask(id, dataObject, type) {
    this.model.updateTask(id, dataObject, type);
  }

  /**
   * Remove task by id
   * @param {string} id
   */
  removeTask(id) {
    this.model.removeTask(id);
  }

}

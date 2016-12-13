import ComponentController from '../components.controller';
import View from './task_list.view';
import Model from './task_list.model';

/**
 * Component controller
 */
export default class TaskList extends ComponentController {

  /**
   * Create component controller
   * @param {HTMLElement} container - Appent to element
   */
  constructor(container) {
    super();

    this.model = new Model();
    this.view = new View(container);

    this.render();
  }

  /**
   * Get global tasks count
   * @return {number} Global tasks count
   */
  getGlobalTasksCount() {}

  /**
   * Shows tasks buttons for removing
   */
  switchOnRemovingMode() {}

  /**
   * Remove marked tasks
   */
  switchOffRemovingMode() {}

  /**
   * Switch on/off removing mode depends on current state
   */
  toggleRemovingMode() {}

  /**
   * Add task to collection
   * @param {object} dataObject - Data object for task
   */
  addTask(dataObject) {}

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

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

}

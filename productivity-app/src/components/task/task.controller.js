import ComponentController from '../components.controller';
import View from './task.view';
import Model from './task.model';

/**
 * Component controller
 */
export default class Task extends ComponentController {

  /**
   * Create component controller
   * @param {HTMLElement} container - Append to element
   * @param {object} dataObject - Data object
   */
  constructor(container, dataObject) {
    super();

    this.model = new Model(dataObject);
    this.view = new View(container);

    this.render(this.model.getData());
  }

}

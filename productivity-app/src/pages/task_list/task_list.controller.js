import PageController from '../pages.controller';
import View from './task_list.view';

/**
 * Page controller
 */
export default class TaskList extends PageController {

  /**
   * Create page controller
   * @param {HTMLElment} viewport - Append to element
   */
  constructor(viewport) {
    super();
    this.view = new View(viewport);

    this.render();
  }

}

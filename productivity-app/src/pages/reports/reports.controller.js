import PageController from '../pages.controller';
import View from './reports.view';

/**
 * Page controller
 */
export default class Reports extends PageController {

  /**
   * Create page controller
   * @param  {HTMLElment} viewport - Append to element
   */
  constructor(viewport) {
    super();
    this.view = new View(viewport);

    this.render();
  }

}

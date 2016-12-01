import PageController from '../pages.controller';
import View from './timer.view';

/**
 * Page controller
 */
export default class Timer extends PageController {

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

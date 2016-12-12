import PageController from '../pages.controller';
import View from './settings.view';

/**
 * Page controller
 */
export default class Settings extends PageController {

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

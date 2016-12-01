import PageController from '../pages.controller';
import View from './login.view';

/**
 * Page controller
 */
export default class Login extends PageController {

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

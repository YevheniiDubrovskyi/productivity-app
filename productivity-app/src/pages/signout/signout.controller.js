import PageController from '../pages.controller';

import loginService from '../../services/login.service';

/**
 * Page controller
 */
export default class Signout extends PageController {

  /**
   * Create page controller
   */
  constructor() {
    super();
    loginService.signOut();
    this.goToPage('');
  }

  /**
   * Rewrite default method to avoid errors
   */
  render() {}
  destroy() {}

}

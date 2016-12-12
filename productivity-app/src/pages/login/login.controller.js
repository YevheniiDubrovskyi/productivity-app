import PageController from '../pages.controller';
import View from './login.view';

import loginService from '../../services/login.service';

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

    this.view.events.on('view:submit', function(data) {
      loginService.signIn(data.username, data.password);

      loginService.events.once('signIn', function() {
        history.pushState(null, null, '#!/');
        history.go(0);
      });
    });

    this.render();
  }

}

import PageView from '../pages.view';
import Template from './login.template';
// import './login.less';

import Button from '../../components/button/button.controller';

/**
 * Page view
 */
export default class View extends PageView {

  /**
   * Create page view
   * @param {HTMLELement} viewport - Append to element
   */
  constructor(viewport) {
    super(viewport);
    this.template = new Template();
  }

  /**
   * Render page template and components
   */
  render() {
    this.viewport.classList.add('login-page');
    this.viewport.appendChild(this.markup);
    this.createComponents();
    super.render();
  }

  /**
   * Destroy page
   */
  destroy() {
    this.viewport.classList.remove('login-page');
    super.destroy();
  }

  /**
   * Create page components
   */
  createComponents() {
    const submitButton = new Button(true,
                                    this.markup.querySelector('.login'),
                                    'niagara',
                                    'Log In',
                                    '');
    submitButton.addClassToRoot('login-btn');

    submitButton.events.on('button:clicked', function() {
      const inputsObject = this.getInputsData();

      if (!inputsObject) return;
      this.events.trigger('view:submit', inputsObject);
    }, this);
    this.componentsList.push(submitButton);
  }

  /**
   * Return inputs data or null if one of inputs is empty
   * @return {object | null} Object with data from inputs (username, password)
   */
  getInputsData() {
    const username = this.markup.querySelector('#username').value.trim();
    const password = this.markup.querySelector('#password').value.trim();

    return username && password ?
      {username, password} :
      null;
  }

}

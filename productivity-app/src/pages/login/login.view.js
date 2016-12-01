import PageView from '../pages.view';
import Template from './login.template';
import './login.css';

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
    // Dirty hack
    document.body.classList.add('login-page');

    this.viewport.appendChild(this.markup);
    this.createComponents();
    super.render();
  }

  /**
   * Destroy page
   */
  destroy() {
    // Dirty hack
    document.body.classList.remove('login-page');

    super.destroy();
  }

  /**
   * Create page components
   */
  createComponents() {}

}

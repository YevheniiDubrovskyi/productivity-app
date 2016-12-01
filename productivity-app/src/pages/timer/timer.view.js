import PageView from '../pages.view';
import Template from './timer.template';
import './timer.css';

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
    this.viewport.appendChild(this.markup);
    this.createComponents();
    super.render();
  }

  /**
   * Create page components
   */
  createComponents() {}

}

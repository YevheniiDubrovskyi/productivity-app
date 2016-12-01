import PageView from '../pages.view';
import Template from './task_list.template';
import './task_list.css';

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
    // Dirty hack (until spliting to components)
    document.body.classList.add('common-state');
    document.body.classList.add('notification-shown-success');

    this.viewport.appendChild(this.markup);
    this.createComponents();
    super.render();
  }

  /**
   * Destroy page
   */
  destroy() {
    // Dirty hack (until spliting to components)
    document.body.classList.remove('common-state');
    document.body.classList.remove('notification-shown-success');

    super.destroy();
  }

  /**
   * Create page components
   */
  createComponents() {}

}

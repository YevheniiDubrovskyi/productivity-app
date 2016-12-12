import ComponentView from '../components.view';
import Template from './task.template';
// import './task.less';

/**
 * Component view
 */
export default class View extends ComponentView {

  /**
   * Create component view
   * @param {HTMLElement} container - Append to element
   */
  constructor(container) {
    super(container);
  }

  /**
   * Render component
   * @param {object} dataObject - Data object
   */
  render(dataObject) {
    this.template = new Template(dataObject);

    this.container.appendChild(this.markup);
    super.render();
  }

}

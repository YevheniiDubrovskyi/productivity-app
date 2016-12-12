import ComponentView from '../components.view';
import Template from './cycle_chart.template';
// import './cycle_chart.less';

/**
 * Component view
 */
export default class View extends ComponentView {

  /**
   * Create component
   */
  constructor(container) {
    super(container);
  }

  /**
   * Render component
   * @param  {Obejct} data - Object with percents for template
   */
  render(data) {
    this.template = new Template();

    this.container.appendChild(this.markup);
    this.update(data);
    super.render();
  }

  /**
   * Update component
   * @param {Object} data - Object with percents for template
   */
  update(data) {
    this.template.update(data);
  }

}

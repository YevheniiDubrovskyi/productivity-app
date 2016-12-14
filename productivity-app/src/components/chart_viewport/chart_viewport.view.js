import ComponentView from '../components.view';
import Template from './chart_viewport.template';
// import './chart_viewport.less';

import Tabs from '../tabs/tabs.controller';
import Highcharts from 'highcharts/highstock';

/**
 * Component view
 */
export default class View extends ComponentView {

  /**
   * Create component view
   * @param  {HTMLElement} container - Append to element
   */
  constructor(container) {
    super(container);
  }

  /**
   * Render component
   * @param  {Array} data - Data array
   */
  render(dataArray) {
    this.template = new Template();

    this.container.appendChild(this.markup);
    this.createComponents(dataArray);
    super.render();
  }

  /**
   * Create inner components
   * @param  {Array} data - Data array
   */
  createComponents(dataArray) {
    const tabs = new Tabs(false,
                          this.markup,
                          this.markup.querySelector('#chart'),
                          ...dataArray);
    tabs.addClassToRoot('tabs-list-top');
    tabs.events.on('tabs:changed', function(name) {
      this.sendUpdate(name);
    }, this);

    this.componentsList.push(tabs);
  }

  /**
   * !!! Method for common components
   * Update data in view
   * @param {...} data - Any data, any type
   */
  update(config) {
    this.showChart(config);
  }

  /**
   * Render chart by name
   * @param {String} name - Chart name
   */
  showChart(config) {
    Highcharts.chart('chart', config)
  }

}

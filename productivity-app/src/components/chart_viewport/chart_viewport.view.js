import ComponentView from '../components.view';
import Template from './chart_viewport.template';
import './chart_viewport.css';

import Tabs from '../tabs/tabs.controller';
import Highcharts from 'highcharts/highstock';

/**
 * Component view
 */
export default class View extends ComponentView {

  /**
   * Create component view
   * @param  {HTMLElement} container - Append to element
   * @param  {Array} data - Data array
   */
  constructor(container, dataArray) {
    super(container, dataArray);

    this.template = new Template();
  }

  /**
   * Render component
   */
  render() {
    this.container.appendChild(this.markup);
    this.createComponents();
    super.render();
  }

  /**
   * Create inner components
   */
  createComponents() {
    const tabs = new Tabs(false,
                          this.markup,
                          this.markup.querySelector('#chart'),
                          ...this.dataArray);

    tabs.events.on('tab:changed', function(name) {
      this.showChart(name);
    }, this);

    this.componentsList.push(tabs);
  }

  /**
   * Render chart by name
   * @param {String} name - Chart name
   */
  showChart(name) {
    Highcharts.chart('chart', this.findDataByName(name).conf)
  }

  /**
   * Get data object from array by name
   * @param  {String} name - Chart name
   * @return {Object} Data object
   */
  findDataByName(name) {
    return this.dataArray.filter((element) => element.name === name)[0];
  }

}

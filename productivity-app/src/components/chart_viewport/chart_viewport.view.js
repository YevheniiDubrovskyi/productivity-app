import ComponentView from '../components.view';
import Template from './chart_viewport.template';
import Highcharts from 'highcharts/highstock';
import './chart_viewport.css';

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
    super(container);
    this.dataArray = dataArray;
    this.template = new Template(this.dataArray);

    const controlsClickHandler = (event) => {
      const name = event.target.getAttribute('data-chart');

      if (name === this.active) return;

      this.activeButton = name;
      this.showChart(name);
    };

    this.domEventsList
      .push({
        element: this.controlsList,
        eventName: 'click',
        callback: controlsClickHandler
      });
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
    const length = this.dataArray.length;
    let i = -1;

    while (++i < length) {
      if (this.dataArray[i].name === name) {
        return this.dataArray[i];
      }
    }
  }

  /**
   * Get component markup from template property
   * @return {HTMLElement} markup - Root component's HTMLElement
   */
  get markup() {
    return this.template.markup;
  }

  /**
   * Get active chart name from button attribute
   * @return {String} Active chart name
   */
  get activeChart() {
    return this.activeButton.getAttribute('data-chart');
  }

  /**
   * Set active button by chart name
   * @param  {String} name - Curret active chart name
   */
  set activeButton(name) {
    this.activeButton.classList.remove('active');
    this.getButtonByName(name).classList.add('active');
  }

  /**
   * Get active button
   * @return {HTMLElement} Active button markup
   */
  get activeButton() {
    return this.markup.querySelector(`[data-chart].active`);
  }

  /**
   * Get button markup by char name
   * @param  {String} name - Chart name
   * @return {HTMLElement} Button markup
   */
  getButtonByName(name) {
    return this.markup.querySelector(`[data-chart=${name}]`);
  }

  /**
   * Return controls list markup
   * @return {HTMLElement}
   */
  get controlsList() {
    return this.markup.querySelector('[data-chart-controls].tabs-list');
  }

  /**
   * Return button markup
   * @param  {String} name - Button name
   * @return {HTMLElement}
   */
  getButton(name) {
    return this.markup.querySelector(`[data-chart=${name}]`);
  }

}

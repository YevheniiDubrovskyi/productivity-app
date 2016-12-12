import ComponentView from '../components.view';
import Template from './cycle.template';
// import './cycle.less';

import CycleOption from '../cycle_option/cycle_option.controller';
import CycleChart from '../cycle_chart/cycle_chart.controller';

/**
 * Component view
 */
export default class View extends ComponentView {

  constructor(container) {
    super(container);
  }

  /**
   * Render component
   * @param {Array} optionsData - Data array for options component
   * @param {Object} chartData - Data object for chart component
   */
  render(optionsData, chartData) {
    this.template = new Template();

    this.container.appendChild(this.markup);
    this.createComponents(optionsData, chartData);
    super.render();
  }

  /**
   * Create inner components
   * @param {Array} optionsData - Data array for options component
   * @param {Object} chartData - Data object for chart component
   */
  createComponents(optionsData, chartData) {
    const optionListElement = this.markup.querySelector('.cycle-option-list');

    const chart = new CycleChart(this.markup, chartData);
    this.componentsList.push(chart);

    this.events.on('view:dataRecived', function(chartData) {
      chart.update(chartData);
    });

    optionsData.forEach((data) => {
      const optionListItemElement = optionListElement.appendChild(document.createElement('li'));
      optionListItemElement.classList.add('cycle-option-list-item');

      const option = new CycleOption(optionListItemElement, data);

      option.events.on('option:changed', function(role, value) {
        this.sendUpdate(role, value);
      }, this);

      this.componentsList.push(option);
    });
  }

}

import ComponentController from '../components.controller';
import View from './cycle.view';
import Model from './cycle.model';

/**
 * Component controller
 */
export default class Cycle extends ComponentController {

  /**
   * Create component controller
   * @param  {HTMLElement} container - Append to element
   * @param  {...Object} dataArray - Data array
   */
  constructor(container, ...dataArray) {
    super();

    this.model = new Model(dataArray);
    this.view = new View(container);

    this.render(this.model.optionsData, this.model.chartData);

    this.view.events.on('view:updated', function(role, value) {
      this.model.changeValueByRole(role, value);
    }, this);

    this.model.events.on('model:updated', function(chartData) {
      this.view.update(chartData);
    }, this);
  }

}

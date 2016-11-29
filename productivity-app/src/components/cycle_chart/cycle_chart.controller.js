import ComponentController from '../components.controller';
import View from './cycle_chart.view';
import Model from './cycle_chart.model';

/**
 * Component controller
 */
export default class CycleChart extends ComponentController {

  /**
   * Create component
   * @param  {HTMLElement} container - Append to element
   * @param  {Object} dataObject - Data object
   */
  constructor(container, dataObject) {
    super();

    this.model = new Model(dataObject);
    this.view = new View(container);

    this.render(this.model.getData());
  }

}

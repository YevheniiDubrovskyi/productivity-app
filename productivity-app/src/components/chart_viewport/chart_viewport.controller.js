import ComponentController from '../components.controller';
import View from './chart_viewport.view';
import Model from './chart_viewport.model';

/**
 * Component controller
 */
export default class ChartViewport extends ComponentController {

  /**
   * Create component
   * @param {HTMLElement} container - Append to element
   * @param {...Object} dataArray - Data array
   */
  constructor(container, ...dataArray) {
    super();

    this.model = new Model(dataArray);
    this.view = new View(container);

    this.render(this.model.dataForTabs);

    this.view.events.on('view:updated', function(name) {
      this.view.update(this.model.getConf(name));
    }, this);
  }

}

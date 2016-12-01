import ComponentController from '../components.controller';
import View from './cycle_option.view';
import Model from './cycle_option.model';

/**
 * Component controller
 */
export default class CycleOption extends ComponentController {

  /**
   * Create component controller
   * @param {HTMLElement} container - Append to element
   * @param {Object} dataObject - Data object
   */
  constructor(container, dataObject) {
    super();

    this.model = new Model(dataObject);
    this.view  = new View(container);

    this.render(this.model.data);

    this.view.events.on('view:updated', function(value) {
      this.model.changeValue(value);
    }, this);

    this.model.events.on('model:updated', function(role, value) {
      this.view.update(value);
      this.events.trigger('option:changed', role, value);
    }, this);
  }

}

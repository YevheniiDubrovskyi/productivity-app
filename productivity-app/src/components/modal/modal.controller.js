import ComponentController from '../components.controller';
import View from './modal.view';
import Model from './modal.model';

/**
 * Component controller
 */
export default class Modal extends ComponentController {

  /**
   * Create component controller
   * @param {HTMLElement} container - Append to element
   * @param {object} [dataObject] - Data object
   */
  constructor(container, dataObject = { type: 'add' }) {
    super();

    this.model = new Model(dataObject);
    this.view = new View(container);

    this.render(this.model.getData()); // {type, data}

    this.view.events.on('view:add_edit_submit', function(dataObject) {
      this.model.update(dataObject);
    });

    this.view.events.on('view:remove_submit', function() {
      this.events.trigger('modal:remove_submit');
    }, this);

    this.view.events.on('view:cancel', function() {
      this.close();
    }, this);

    this.model.events.on('model:updated', function(dataObject) {
      this.events.trigger('modal:add_edit_submit', dataObject);
    }, this);
  }

  /**
   * Close and destroy modal
   */
  close() {
    this.view.close();
    this.destroy();
  }

}

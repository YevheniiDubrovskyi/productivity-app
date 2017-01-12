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

    this.modalTypes = {
      ADD: 'add',
      EDIT: 'edit',
      CONFIRM: 'confirm'
    };

    this.model = new Model(this.modalTypes, dataObject);
    this.view = new View(container);

    this.model.events.on('model:dataReceived', function(data) {
      console.trace('Modal controller received data ', data);
      this.render(data);
    }, this);

    this.view.events.on('view:add_edit_submit', function(dataObject) {
      this.model.validate(dataObject);
    }, this);

    this.view.events.on('view:remove_submit', function() {
      this.events.trigger('modal:remove');
    }, this);

    this.view.events.on('view:cancel', function() {
      this.close();
    }, this);

    this.model.events.on('model:dataIsValid', function(dataObject) {
      this.events.trigger('modal:submit', dataObject);
    }, this);
  }

  /**
   * Close and destroy modal
   */
  close() {
    this.view.close();
    setTimeout(() => {
      this.destroy();
    }, 300);
  }

}

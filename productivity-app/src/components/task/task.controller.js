import ComponentController from '../components.controller';
import View from './task.view';
import Model from './task.model';

/**
 * Component controller
 */
export default class Task extends ComponentController {

  /**
   * Create component controller
   * @param {HTMLElement} container - Append to element
   * @param {object} dataObject - Data object
   * @param {object} buttonsOptions - Buttons options
   */
  constructor(container, dataObject, buttonsOptions) {
    super();

    this.model = new Model(dataObject, buttonsOptions);
    this.view = new View(container);

    this.render(this.model.getData());

    this.model.events.on('model:updated', function(data) {
      this.update(data);
    }, this.view);

    this.view.events.on('view:button_clicked', function(buttonName) {
      this.events.trigger('task:button_clicked', buttonName);
    }, this);
  }

  /**
   * Updates task data
   * @param {object} dataObject - Data object
   * @param {object} [buttonsOptions] - Buttons options object
   */
  update(dataObject, buttonsOptions) {
    const currentModelData = this.model.getData();
    this.model.update({
      data: dataObject,
      buttons: buttonsOptions || currentModelData.buttons
    });
  }

}

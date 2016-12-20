import ComponentController from '../components.controller';
import View from './categories.view';
import Model from './categories.model';

/**
 * Component controller
 */
export default class Categories extends ComponentController {

  /**
   * Create component controller
   * @param {HTMLElement} container - Append to element
   */
  constructor(container) {
    super();

    this.model = new Model();
    this.view = new View(container);

    this.render(this.model.getData());

    this.view.events.on('view:updated', function(alias, title) {
      this.model.changeValue(alias, title);
    }, this);

    this.view.events.on('view:backButton_clicked', function() {
      this.events.trigger('categories:backButton_clicked');
    }, this);
    this.view.events.on('view:saveButton_clicked', function() {
      this.model.save();
    }, this);

    this.model.events.on('model:updated', function(dataArray) {
      this.view.update(dataArray);
    }, this);
  }

}

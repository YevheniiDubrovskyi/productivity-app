import ComponentController from '../components.controller';
import View from './categories_input.view';
import Model from './categories_input.model';

/**
 * Component controller
 */
export default class CategoriesInput extends ComponentController {

  /**
   * Create component controller
   * @param {HTMLElement} container - Append to element
   * @param {object} dataObject - Data object
   */
  constructor(container, dataObject) {
    super();

    this.model = new Model(dataObject);
    this.view = new View(container);

    this.render(this.model.getData());

    this.view.events.on('view:updated', function(title) {
      this.model.changeValue(title);
    }, this);

    this.model.events.on('model:updated', function(alias, title) {
      this.view.update(title);
      this.events.trigger('categoriesInput:changed', alias, title);
    }, this);
  }

  /**
   * Return alias from model
   * @return {string} Alias
   */
  getAlias() {
    return this.model.getAlias();
  }

  /**
   * Updates title in model
   * @param {string} title
   */
  update(title) {
    this.model.changeValue(title);
  }

}

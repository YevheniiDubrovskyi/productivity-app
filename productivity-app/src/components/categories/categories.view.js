import ComponentView from '../components.view';
import Template from './categories.template';
// import './categories.less';

import Button from '../button/button.controller';
import CategoriesInput from '../categories_input/categories_input.controller';

/**
 * Component view
 */
export default class View extends ComponentView {

  /**
   * Create component view
   * @param {HTMLElement} container - Append to element
   */
  constructor(container) {
    super(container);
  }

  /**
   * Render component
   * @param {array} dataArray - Data array for CategoriesInputs
   */
  render(dataArray) {
    this.template = new Template();
    this.markup = this.getMarkup();

    this.container.appendChild(this.markup);
    this.createComponents(dataArray);

    this.events.on('view:dataRecived', function(dataArray) {
      this.componentsList.forEach((component) => {
        if (!(component instanceof CategoriesInput)) return;

        const alias = component.getAlias();
        const dataObject = dataArray.filter(el => el.alias === alias)[0];
        component.update(dataObject.title);
      });
    }, this);

    super.render();
  }

  /**
   * Create inner components
   * @param {array} dataArray - Data array for CategoriesInputs
   */
  createComponents(dataArray) {
    const categoriesList = this.markup.querySelector('.categories-list');
    const buttonsWrapper = this.markup.querySelector('.buttons-wrapper');

    dataArray.forEach((dataObject) => {
      const categoriesListItem = categoriesList.appendChild(document.createElement('li'));
      categoriesListItem.classList.add('categories-list-item');
      const categoriesInput = new CategoriesInput(categoriesListItem, dataObject);

      categoriesInput.events.on('categoriesInput:changed', function(alias, title) {
        this.sendUpdate(alias, title);
      }, this);
      this.componentsList.push(categoriesInput);
    });

    const backButton = new Button(true,
                                  buttonsWrapper,
                                  'picton-blue',
                                  'Back',
                                  '');
    backButton.events.on('button:clicked', function() {
      this.events.trigger('view:backButton_clicked');
    }, this);
    this.componentsList.push(backButton);

    const saveButton = new Button(true,
                                  buttonsWrapper,
                                  'niagara',
                                  'Save',
                                  '');
    saveButton.events.on('button:clicked', function() {
      this.events.trigger('view:saveButton_clicked');
    }, this);
    this.componentsList.push(saveButton);
  }

}

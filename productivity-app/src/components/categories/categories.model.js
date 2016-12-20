import ComponentModel from '../components.model';
import {defaultCategoriesData} from './categories.data';

/**
 * Component model
 */
export default class Model extends ComponentModel {

  /**
   * Create component model
   */
  constructor() {
    super(defaultCategoriesData);
    this.modelAlias = 'categories';

    this.getDataFromStorage((data) => {
      if (!data) {
        this.setDataToStorage(defaultCategoriesData);
        return;
      }

      this.update(data);
    });
  }

  /**
   * Get data for view
   * @return {array} Data array
   */
  getData() {
    return this.dataStatic.slice();
  }

  /**
   * Change value in data array by alias
   * @param {string} alias
   * @param {string} title
   */
  changeValue(alias, title) {
    this.dataStatic.forEach((element) => {
      if (element.alias !== alias) return;

      element.title = title;
    });
  }

}

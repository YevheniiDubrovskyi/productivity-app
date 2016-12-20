import ComponentModel from '../components.model';

/**
 * Component model
 */
export default class Model extends ComponentModel {

  /**
   * Create component model
   * @param {object} dataObject - Data object
   */
  constructor(dataObject) {
    super(dataObject);
  }

  /**
   * Get data for view
   * @return {object} Data object
   */
  getData() {
    return Object.assign({}, this.dataStatic);
  }

  /**
   * Change title (main component value)
   * @param {string} value - New component value
   */
  changeValue(value) {
    this.dataStatic.title = value;
    this.events.trigger('model:updated', this.dataStatic.alias, this.dataStatic.title);
  }

  /**
   * Return alias
   * @return {string} Alias
   */
  getAlias() {
    return this.dataStatic.alias;
  }

}

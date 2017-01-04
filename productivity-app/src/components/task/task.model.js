import ComponentModel from '../components.model';

/**
 * Component model
 */
export default class Model extends ComponentModel {

  /**
   * Create component model
   * @param {object} dataObject - Data object
   * @param {object} buttonsOptions - Data for buttons
   */
  constructor(dataObject, buttonsOptions) {
    super({
      data: dataObject,
      buttons: buttonsOptions
    });
  }

  /**
   * Get all model data
   * @return {object} Model data
   */
  getData() {
    return this.dataStatic;
  }

  /**
   * Get task ID
   * @return {string} Task id
   */
  getID() {
    return this.dataStatic.data.id;
  }
}

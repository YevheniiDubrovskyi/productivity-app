import ComponentModel from '../components.model';

/**
 * Component model
 */
export default class Model extends ComponentModel {

  /**
   * Create component model
   * @param {Object} data - Data object
   */
  constructor(data) {
    super(data);
  }

  /**
   * Change value
   * @param {number} value - Number getted from view
   */
  changeValue(value) {
    if (this.validate(value)) {
      this.dataStatic.value = value;

      this.events.trigger('model:updated', this.dataStatic.role, value);
    }
  }

  /**
   * Return component role property
   * @return {string} Role property
   */
  getRole() {
    return this.dataStatic.role;
  }

  /**
   * Return data object
   * @return {data} Data object
   */
  get data() {
    return this.dataStatic;
  }

  /**
   * Check value for some range
   * @param {Number} value - Validated value
   * @return {Boolean} - Valid data flag
   */
  validate(value) {
    return value >= this.dataStatic.min && value <= this.dataStatic.max;
  }

}

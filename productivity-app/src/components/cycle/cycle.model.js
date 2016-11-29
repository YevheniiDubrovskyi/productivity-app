import ComponentModel from '../components.model';

/**
 * Component model
 */
export default class Model extends ComponentModel {

  /**
   * Create component model
   * @param  {Array} data - Data array
   */
  constructor(data) {
    super(data);
  }

  /**
   * Return data array by role
   * @param  {String} role - Part of data role string
   * @return {Object}
   */
  getDataArrayByRole(role) {
    return this.dataStatic.filter((el) => {
      return el.role.includes(role);
    });
  }

  /**
   * Change value property by role property
   * @param  {String} role - Data role
   * @param  {Number} value
   */
  changeValueByRole(role, value) {
    this.getDataArrayByRole(role)[0].value = value;

    this.events.trigger('model:updated', role, value);
  }

  /**
   * Return data array for options
   * @return {Array} Data array for options
   */
  get optionsData() {
    return this.getDataArrayByRole('iteration/');
  }

  /**
   * Return data for chart
   * @return {Object} Data object with rule parameters
   */
  get chartData() {
    const ruleObject = this.getDataArrayByRole('rule')[0];

    const rule = {
      'rule' : {
        defaultValue: ruleObject.value,
        step: ruleObject.step
      }
    };

    const options = this.optionsData.reduce((acc, data) => {
      acc[data.role] = data.value;

      return acc;
    }, {});

    return Object.assign(rule, options);
  }

}

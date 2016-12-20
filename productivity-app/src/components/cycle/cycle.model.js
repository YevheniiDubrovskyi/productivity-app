import ComponentModel from '../components.model';
import {defaultCycleData} from './cycle.data';

/**
 * Component model
 */
export default class Model extends ComponentModel {

  /**
   * Create component model
   */
  constructor() {
    super(defaultCycleData);
    this.modelAlias = 'pomodoros';

    this.getDataFromStorage((data) => {
      if (!data) {
        this.setDataToStorage(defaultCycleData);
        return;
      }

      this.update(data);
    });
  }

  /**
   * Return data array by role
   * @param  {String} role - Part of data role string
   * @return {Array} Data array
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

    this.events.trigger('model:changed', this.getChartData());
  }

  /**
   * Return data array for options
   * @return {Array} Data array for options
   */
  getOptionsData() {
    return this.getDataArrayByRole('iteration/');
  }

  /**
   * Return data for chart
   * @return {Object} Data object with rule parameters
   */
  getChartData() {
    const ruleObject = this.getDataArrayByRole('rule')[0];

    const rule = {
      'rule' : {
        value: ruleObject.value,
        step: ruleObject.step
      }
    };

    const options = this.getOptionsData().reduce((acc, data) => {
      acc[data.role] = {
        value: data.value,
        color: data.color
      };

      return acc;
    }, {});

    return Object.assign(rule, options);
  }

}

import EventBus from '../utils/eventbus';

/**
 * Abstract class for component model
 */
export default class ComponentModel {

  /**
   * Create component model
   */
  constructor(data) {
    this.dataCollection = []; // For collection components
    this.dataStatic = data ? data : {}; // For common components
    this.events = new EventBus();
  }

  /**
   * !!! Method for collection components
   * Add data to model and trigger event with added data
   * @param {...} data - Any data, any type
   */
  addData(...data) {
    this.dataCollection.push(...data);
    this.events.trigger('model:added', ...data);
  }

  /**
   * !!! Method for common components
   * Rewrite data and trigger event with new data
   * @param {Object} data - Data object
   */
  update(data) {
    this.updateWithoutEvent(data);
    this.events.trigger('model:updated', this.dataStatic);
  }

  /**
   * !!! Method for common components
   * Rewrite data in model (without event for preventing infinite loop in some cases)
   * @param {Object} data - Data object
   */
  updateWithoutEvent(data) {
    this.dataStatic = data;
  }

}

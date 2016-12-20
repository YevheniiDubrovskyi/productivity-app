import EventBus from '../utils/eventbus';
import dataService from '../services/data.service';

/**
 * Abstract class for component model
 */
export default class ComponentModel {

  /**
   * Create component model
   * @param {*} data - Any data
   */
  constructor(data) {
    this.dataCollection = []; // For collection components
    this.dataStatic = data ? data : {}; // For common components (For cases when data is pure)
    this.modelAlias = null; // For data saving in storage
    this.events = new EventBus();
  }

  /**
   * Remove links to heavy objects
   */
  destroy() {
    delete this.events;
    delete this.dataStatic;
    delete this.dataCollection;
  }

  /**
   * Get data from storage
   * @param {function} callback
   */
  getDataFromStorage(callback) {
    dataService.getData(this.modelAlias).once(`${this.modelAlias}:getData`, callback, this);
  }

  /**
   * Set data to storage
   * @param {*} data
   */
  setDataToStorage(data) {
    dataService.setData(this.modelAlias, data);
  }

  /**
   * Save current model data to storage
   */
  save() {
    dataService.setData(this.modelAlias, this.dataStatic);
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
    const dataToSend = this.dataStatic instanceof Array ?
      this.dataStatic.slice() :
      Object.assign({}, this.dataStatic);

    this.events.trigger('model:updated', dataToSend);
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

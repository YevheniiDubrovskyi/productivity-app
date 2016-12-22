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
    this.dataStatic = data ? data : {};
    this.modelAlias = null; // For data saving in storage
    this.events = new EventBus();
  }

  /**
   * Remove links to heavy objects
   */
  destroy() {
    delete this.events;
    delete this.dataStatic;
  }

  /**
   * Get data from storage
   * @param {function} callback - Function which get data
   */
  getDataFromStorage(callback) {
    dataService.getData(this.modelAlias).once(`${this.modelAlias}:getData`, callback, this);
  }

  /**
   * Subscribe on changes data in storage
   * @param {function} callback - Function which get data
   */
  subscribe(callback) {
    dataService.subscribe(this.modelAlias).on(`${this.modelAlias}:dataReceived`, callback, this);
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
   * Rewrite data in model (without event for preventing infinite loop in some cases)
   * @param {Object} data - Data object
   */
  updateWithoutEvent(data) {
    this.dataStatic = data;
  }

}

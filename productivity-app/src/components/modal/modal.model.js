import ComponentModel from '../components.model';

import dataService from '../../services/data.service';
import {defaultInputsData, defaultPriorityData} from './modal.data';

/**
 * Component model
 */
export default class Model extends ComponentModel {

  /**
   * Create component model
   * @param {object} data - Data object
   */
  constructor(data) {
    const dataObject = {
      type: data.type,
      data: data.data || {
        title: defaultInputsData.title,
        description: defaultInputsData.description,
        categories: {
          name: 'category',
          value: null
        },
        deadline: defaultInputsData.deadline,
        estimation: 5,
        priority: {
          name: 'priority',
          value: null
        }
      }
    };
    super(dataObject);

    let categoriesFlag = false;
    let priorityFlag = false;

    dataService.getData('categories').once('categories:getData', function(data) {
      categoriesFlag = true;
      this.dataStatic.data.categories.value = data;
      if (categoriesFlag && priorityFlag) this.events.trigger('model:dataReceived', this.dataStatic);
    }, this);

    dataService.getData('priority').once('priority:getData', function(data) {
      if (!data) {
        dataService.setData('priority', defaultPriorityData);
      }

      priorityFlag = true;
      this.dataStatic.data.priority.value = data ?
        data :
        defaultPriorityData;
      if (categoriesFlag && priorityFlag) this.events.trigger('model:dataReceived', this.dataStatic);
    }, this);
  }

  /**
   * Return data object
   */
  getData() {
    return this.dataStatic;
  }

  /**
   * Validation data and fire event if data is valid
   * @param {object} dataObject
   */
  validate(dataObject) {
    if (!this.isValid(dataObject)) return;

    this.events.trigger('model:dataIsValid', dataObject);
  }

  /**
   * Validate data object
   * @param {object} dataObject
   * @return {boolean} Data validation flag
   */
  isValid(dataObject) {
    const todayDate = new Date();

    let valid = true;
    let deadlineDate;

    for (let prop in dataObject) {
      if (!dataObject[prop]) valid = false;
    }

    try {
      deadlineDate = new Date(dataObject.deadline);
    } catch(e) {}

    if (deadlineDate.toString() === 'Invalid Date' ||
        deadlineDate.getFullYear() <= todayDate.getFullYear() &&
        deadlineDate.getMonth() <= todayDate.getMonth() &&
        deadlineDate.getDay() < todayDate.getDay()
    ) {
      valid = false;
    }

    console.log('Valid - ', valid, ' dataObject - ', dataObject);

    return valid;
  }

}

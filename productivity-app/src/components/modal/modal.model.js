import ComponentModel from '../components.model';

import dataService from '../../services/data.service';
import {defaultInputsData, defaultPriorityData} from './modal.data';

/**
 * Component model
 */
export default class Model extends ComponentModel {

  /**
   * Create component model
   * @param {object} modalTypes - Modal types
   * @param {object} data - Modal data (may be almost empty)
   */
  constructor(modalTypes, data) {
    /**
     * Transform date to proper modal date format (May 23, 2016)
     * @param {string} stringDate - String, equal to (new Date(${some data})).toString()
     * @return {string} Date in proper format
     */
    function transformDate(stringDate) {
      const splitedDate = stringDate.split(' ');

      return `${splitedDate[1]} ${splitedDate[2]}, ${splitedDate[3]}`;
    }

    const initFunctions = {
      add(data) {
        return {
          type: data.type,
          data: {
            title: Object.assign({}, defaultInputsData.title),
            description: Object.assign({}, defaultInputsData.description),
            category: {
              name: 'category',
              range: null,
              value: ''
            },
            deadline: Object.assign({}, defaultInputsData.deadline),
            estimation: {
              total: 5,
              checked: 0
            },
            priority: {
              name: 'priority',
              range: null,
              value: ''
            }
          }
        };
      },
      edit(data, modalTypes) {
        const dataObject = this[modalTypes.ADD](data);
        const dataTemplate = dataObject.data;
        const receivedData = data.data;

        dataObject.type = modalTypes.EDIT;

        dataTemplate.title.value = receivedData.title;
        dataTemplate.description.value = receivedData.description;
        dataTemplate.category.value = receivedData.category;
        dataTemplate.deadline.value = transformDate(receivedData.deadline);
        dataTemplate.estimation.checked = receivedData.estimation;
        dataTemplate.priority.value = receivedData.priority;

        return dataObject;
      },
      confirm(data) {

      }
    };

    super(initFunctions[data.type](data, modalTypes));
    this.modalTypes = modalTypes;

    if (this.dataStatic.type === this.modalTypes.ADD ||
        this.dataStatic.type === this.modalTypes.EDIT
    ) {
      let categoriesFlag = false;
      let priorityFlag = false;

      // Get data from DB for categories
      dataService.getData('categories').once('categories:getData', function(data) {
        categoriesFlag = true;
        this.dataStatic.data.category.range = data;
        // Fire event if both data received
        if (categoriesFlag && priorityFlag) this.events.trigger('model:dataReceived', this.dataStatic);
      }, this);

      // Get data from DB for priority
      dataService.getData('priority').once('priority:getData', function(data) {
        if (!data) {
          dataService.setData('priority', defaultPriorityData);
        }

        priorityFlag = true;
        this.dataStatic.data.priority.range = data ?
          data :
          defaultPriorityData;
        // Fire event if both data received
        if (categoriesFlag && priorityFlag) this.events.trigger('model:dataReceived', this.dataStatic);
      }, this);
    }
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
    console.log('Modal:model.validate - ', dataObject)
    if (!this.isValid(dataObject)) return;

    this.events.trigger('model:dataIsValid', dataObject);
  }

  /**
   * Validate data object
   * @param {object} dataObject
   * @return {boolean} Data validation flag
   */
  isValid(dataObject) {
    let valid = true;

    for (let prop in dataObject) {
      if (!dataObject[prop]) valid = false;
    }

    if (!this.isValidDate(dataObject.deadline)) {
      valid = false;
    }

    return valid;
  }

  /**
   * Validate date
   * @param {string} deadline
   * @return {boolean} Date validation flag
   */
  isValidDate(deadline) {
    const todayDate = new Date();

    let deadlineDate;

    try {
      deadlineDate = new Date(deadline);
    } catch(e) {}

    const deadlineFullYear = deadlineDate.getFullYear();
    const todayFullYear = todayDate.getFullYear();

    const deadlineMonth = deadlineDate.getMonth();
    const todayMonth = todayDate.getMonth();

    const deadlineDay = deadlineDate.getDate();
    const todayDay = todayDate.getDate();

    const invalidYear = deadlineFullYear < todayFullYear;
    const invalidMonth = deadlineFullYear === todayFullYear &&
                         deadlineMonth < todayMonth;
    const invalidDay = deadlineFullYear === todayFullYear &&
                       deadlineMonth === todayMonth &&
                       deadlineDay < todayDay;

    return !(deadlineDate.toString() === 'Invalid Date' ||
            invalidYear ||
            invalidMonth ||
            invalidDay);
  }

}

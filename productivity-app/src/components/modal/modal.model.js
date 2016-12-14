import ComponentModel from '../components.model';

import {initCaregoriesData, initPriorityData, initInputsData} from './modal.data';

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
        title: initInputsData.title,
        description: initInputsData.description,
        categories: {
          name: 'category',
          value: initCaregoriesData
        },
        deadline: initInputsData.deadline,
        estimation: 5,
        priority: {
          name: 'priority',
          value: initPriorityData
        }
      }
    };

    super(dataObject);
  }

  /**
   * Return data object
   */
  getData() {
    return this.dataStatic;
  }

}

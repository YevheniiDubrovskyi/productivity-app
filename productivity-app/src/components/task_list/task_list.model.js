import ComponentModel from '../components.model';

import utils from '../../utils/utils';
import dataService from '../../services/data.service';
import {tasksStatusList} from './task_list.data';

/**
 * Component model
 */
export default class Model extends ComponentModel {

  /**
   * Create component model
   * @param {object} states - States object
   * @param {object} tasksTypes - Tasks types
   */
  constructor(states, tasksTypes) {
    super();
    // this.allDone = false;
    this.dataStatic = [];
    this.states = states;
    this.tasksTypes = tasksTypes;

    this.modelAlias = 'tasks';

    this.events.once('model:data_received', function() { // Request data for components, when get data, request data for tasks
      this.getDataFromStorage((data) => {
        if (data) this.update(data);
      });

      this.checkStatesConditions();
    }, this);

    this.events.on('task_data', function() {
      this.checkStatesConditions();
      this.save();
    }, this);

    this.events.on('model:updated', function() {
      this.checkStatesConditions();
    }, this);

    this.getComponentsDataFromStorage();
  }

  /**
   * Destroy task in global list and create it in daily
   * @param {string} id - Task id
   */
  moveTaskToDaily(id) {
    const taskData = this.getTaskData(id);

    this.removeTask(id);
    this.addTask(taskData, true);
  }

  /**
   * Send data requests to server and fire event when all data received
   */
  getComponentsDataFromStorage() {
    const receivedData = {
      priority: null,
      categories: null
    };

    dataService.getData('priority').once('priority:getData', function(data) {
      receivedData.priority = data.map((dataObject) => {
        return {
          name: dataObject.title,
          active: false
        };
      });
      receivedData.priority.unshift({
        name: 'all',
        active: true
      });

      if (receivedData.categories) {
        this.events.trigger('model:data_received', receivedData.priority, receivedData.categories);
      }
    }, this);

    dataService.getData('categories').once('categories:getData', function(data) {
      receivedData.categories = data;

      if (receivedData.priority) {
        this.events.trigger('model:data_received', receivedData.priority, receivedData.categories);
      }
    }, this);
  }

  /**
   * Check states conditions and
   */
  checkStatesConditions() {
    const globalTasksCount = this.getGlobalTasksCount();
    const dailyTasksCount = this.getDailyTasksCount();

    if (!dailyTasksCount && !globalTasksCount) {
      this.events.trigger('model:state_changed', this.states.INIT);
    } else if (!dailyTasksCount && globalTasksCount) {
      this.events.trigger('model:state_changed', this.states.TASK_ADDED);
    } else {
      this.events.trigger('model:state_changed', this.states.COMMON);
    }
  }

  /**
   * Add task data object to raw data object array
   * @param {object} rawDataObject - Raw task data
   * @param {boolean} dailyFlag - If flag is true, task will be add as daily task, else as global
   */
  addTask(rawDataObject, dailyFlag = false) {
    const dataObject = rawDataObject;

    if (!dataObject.id) {
      dataObject.id = utils.getID();
      dataObject.status = tasksStatusList.INIT;
      dataObject.estimationUsed = 0;
      dataObject.createDate = (new Date()).toString();
      dataObject.startDate = null;
      dataObject.deadline = (new Date(dataObject.deadline)).toString();
    }

    const newLength = this.dataStatic.push({
      type: dailyFlag ? this.tasksTypes.DAILY : this.tasksTypes.GLOBAL,
      data: dataObject
    });
    this.events.trigger('task_data:added', this.dataStatic[newLength - 1]);
  }

  /**
   * Update task data object in data object array
   * @param {string} id - Task id
   * @param {object} rawDataObject - Data object without id
   */
  updateTask(id, rawDataObject) {
    const index = this.findTaskDataByID(id);

    this.dataStatic[index].data = rawDataObject;
    this.events.trigger('task_data:update', this.dataStatic[index]);
  }

  /**
   * Check task type existence
   * @param {string} type - Task type
   * @return {boolean} Task type existence flag
   */
  checkType(type) {
    return this.tasksTypes.includes(type);
  }

  /**
   * Remove task data object from data object array
   * @param {string} id - Task id
   */
  removeTask(id) {
    this.dataStatic.splice(this.findTaskDataByID(id), 1);
    this.events.trigger('task_data:remove', id);
  }

  /**
   * Return task data index in data object array by id
   * @param {string} id - Task id
   * @return {number} Data index in object data array
   */
  findTaskDataByID(id) {
    let index = -1;

    this.dataStatic.forEach((dataObject, i) => {
      index = dataObject.data.id === id ?
        i :
        index;
    });

    if (index === -1) {
      throw new Error('TaskList:Model - Task with such id does not exist');
    }

    return index;
  }

  /**
   * Return task data by id
   * @param {string} id - Task id
   * @return {object} Task data object
   */
  getTaskData(id) {
    return Object.assign({}, this.dataStatic[this.findTaskDataByID(id)].data);
  }

  /**
   * Get global tasks count
   * @return {number} Global tasks count
   */
  getGlobalTasksCount() {
    return this.dataStatic.filter((data) => data.type === this.tasksTypes.GLOBAL).length;
  }

  /**
   * Get daily tasks count
   * @return {number} Daily tasks count
   */
  getDailyTasksCount() {
    return this.dataStatic.filter((data) => data.type === this.tasksTypes.DAILY).length;
  }

}

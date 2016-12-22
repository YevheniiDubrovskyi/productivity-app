import ComponentModel from '../components.model';

import utils from '../../utils/utils';

/**
 * Component model
 */
export default class Model extends ComponentModel {

  /**
   * Create component model
   * @param {object} states - States object
   */
  constructor(states) {
    super();
    // this.allDone = false;
    this.dataStatic = [];
    this.states = states;

    this.modelAlias = 'tasks';

    this.tasksTypes = {
      GLOBAL: 'global',
      DAILY: 'daily'
    };

    this.subscribe((data) => {
      if (!data) return;

      this.update(data);
    });

    this.events.on('task_data', function() {
      this.checkStatesConditions();
      this.save();
    }, this);

    this.events.on('model:updated', function() {
      this.checkStatesConditions();
    }, this);

    this.checkStatesConditions();
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
      this.events.trigger('model:state_change', this.states.TASK_ADDED);
    } else {
      this.events.trigger('model:state_change', this.states.COMMON);
    }
  }

  /**
   * Add task data object to raw data object array
   * @param {object} rawDataObject
   */
  addTask(rawDataObject) {
    const dataObject = rawDataObject;

    dataObject.id = dataObject.id ?
      dataObject.id :
      utils.getID();

    this.dataStatic.push({
      type: this.tasksTypes.GLOBAL,
      data: dataObject
    });
    this.events.trigger('task_data:added', dataObject);
  }

  /**
   * Update task data object in data object array
   * @param {string} id - Task id
   * @param {object} rawDataObject - Data object without id
   * @param {object} [type] - Task type (daily|global)
   */
  updateTask(id, rawDataObject, type) {
    const index = this.findTaskDataByID(id);

    if (type) {
      if (!this.checkType(type)) {
        throw new Error('TaskList.Model: Such type does not exist');
      }
      this.dataStatic[index].type = type;
    }
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

    return index;
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

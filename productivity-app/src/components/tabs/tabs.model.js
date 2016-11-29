import ComponentModel from '../components.model';

/**
 * Component model
 */
export default class Model extends ComponentModel {

  /**
   * Create component model
   * @param {Array} data - Dirty data array
   */
  constructor(data) {
    super(data);
  }

  /**
   * Return copy of pure data array
   * @return {[type]} [description]
   */
  get data() {
    return this.dataStatic.slice();
  }

  /**
   * Set active tab
   * @param  {String} name - Tab name
   */
  set active(name) {
    this.dataStatic = this.dataStatic.map((el) => {
      return {
        name: el.name,
        active: el.name === name ? true : false
      };
    });

    this.events.trigger('model:new_active', name);
  }

  /**
   * Get name of active tab
   * @return {String} Active tab name
   */
  get active() {
    return this.dataStatic.filter(el => el.active)[0].name;
  }

}

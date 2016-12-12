import ComponentModel from '../components.model';

/**
 * Component model
 */
export default class Model extends ComponentModel {

  /**
   * Create component model
   * @param {array} data - Data array
   */
  constructor(data) {
    super(data);

    this.dataStatic = this.dataStatic.map((element) => {
      if (element.type === 'counter') {
        element.counter = 0;
      }

      return element;
    });
  }

  /**
   * Return data for view
   * @return {array} Data array
   */
  getData() {
    return this.dataStatic.filter((element) => {
      return element.visible;
    }).map((element) => {
      return {
        alias: element.alias,
        icon: element.icon,
        active: element.active
      };
    });
  }

  /**
   * Get button object by aliasc
   * @param  {[type]} alias [description]
   * @return {[type]}       [description]
   */
  getButtonObject(alias) {

  }

  /**
   * Set counter button value by alias
   * @param {string} alias - Button alias
   * @param {number} value - New button counter value
   */
  setCounterBtnValue(alias, value) {
    this.dataStatic.forEach((element) => {
      if (element.alias === alias) {
        element.counter = value;
      }
    });

    this.events.trigger('model:counter_changed', alias, value);
  }

  /**
   * Set visible param to true for button by alias
   * @param  {string} alias - Button alias
   */
  showBtn(alias) {
    this.setBtnVisibility(alias, true);
  }

  /**
   * Set visible param to false for button by alias
   * @param  {string} alias - Button alias
   */
  hideBtn(alias) {
    this.setBtnVisibility(alias, false);
  }

  /**
   * Set button visibility
   * @param {string} alias - Button alias
   * @param {boolean} visibility - Visibility which will be set
   */
  setBtnVisibility(alias, visiblity) {
    this.dataStatic.forEach((element) => {
      if (element.alias === alias) {
        element.visible = visibility;
      }
    });

    this.events.trigger('model:visible_changed', this.getData());
  }

}

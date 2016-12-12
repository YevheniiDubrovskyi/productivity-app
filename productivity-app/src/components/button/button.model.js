import ComponentModel from '../components.model';

/**
 * Component model
 */
export default class Model extends ComponentModel {

  /**
   * Create component model
   * @param  {string} name - Button name
   * @param  {string} theme - Theme name
   */
  constructor(name, theme) {
    super({
      name: name,
      theme: theme
    });
  }

  /**
   * Return copy of data object
   * @return {object} Data object copy
   */
  getData() {
    return Object.assign({}, this.dataStatic);
  }

}

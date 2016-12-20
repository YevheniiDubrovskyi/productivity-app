import ComponentController from '../components.controller';
import Model from './controls.model';
import View from './controls.view';

/**
 * Component controller
 */
export default class Controls extends ComponentController {

  /**
   * Create component
   * @param  {HTMLElement} container - Append to element
   * @param  {...object} dataArray - Data array
   */
  constructor(container, ...dataArray) {
    super();

    this.model = new Model(dataArray);
    this.view = new View(container);

    this.render(this.model.getData());

    this.view.events.on('view:clicked', function(alias) {
      this.events.trigger('controls:clicked', alias);
    }, this);

    this.model.events.on('model:counter_changed', function(alias, value) {
      this.view.update(alias, value);
    }, this);

    this.model.events.on('model:visible_changed', function(data) {
      this.view.update(data);
    }, this);

    this.model.events.on('model:active_changed', function(data) {
      this.view.update(data);
    }, this);
  }

  /**
   * Set value for button with counter type
   * @param {string} alias - Button alias
   * @param {number} value - New button counter value
   */
  setCounterBtnValue(alias, value) {
    this.model.setCounterBtnValue(alias, value);
  }

  /**
   * Set active button by alias
   * @param {string} alias - Button alias
   */
  setActive(alias) {
    this.model.setActive(alias);
  }

  /**
   * Hide button by alias
   * @param  {string} alias - Button alias
   */
  hideBtn(alias) {
    this.model.hideBtn(alias);
  }

  /**
   * Show button by alias
   * @param  {string} alias - Button alias
   */
  showBtn(alias) {
    this.model.showBtn(alias);
  }

}

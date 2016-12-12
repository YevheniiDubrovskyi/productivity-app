import ComponentController from '../components.controller';
import Model from './button.model';
import View from './button.view';

/**
 * Component controller
 */
export default class Button extends ComponentController {

  /**
   * Createa component
   * @param  {boolean} appendFlag - Flag for switching injection type
   * @param  {HTMLElement} container - Append to element
   * @param  {string} theme - Theme name
   * @param  {string} name - Button name/value
   * @param  {HTMLElement | String} insertBefore InsertBefoe element or empty string if appendFlag === true
   */
  constructor(appendFlag, container, theme, name, insertBefore) {
    super();

    this.model = new Model(name, theme);
    this.view = new View(appendFlag, container, insertBefore);

    this.render(this.model.getData());

    this.view.events.on('view:clicked', function() {
      this.events.trigger('button:clicked');
    }, this);
  }

}

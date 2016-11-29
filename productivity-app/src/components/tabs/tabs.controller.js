import ComponentController from '../components.controller';
import Model from './tabs.model';
import View from './tabs.view';

/**
 * Component controller
 */
export default class Tabs extends ComponentController {

  /**
   * Create component
   * @param  {Boolean} appendFlag - Flag for swtiching injection type
   * @param  {HTMLElement} container - Append to element
   * @param  {HTMLElement | String} insertBefore - InsertBefore element or empty string if appendFlag === true
   * @param  {...Object} dataArray - Data array
   */
  constructor(appendFlag, container, insertBefore, ...dataArray) {
    super();

    this.model = new Model(dataArray);
    this.view = new View(appendFlag, container, insertBefore);

    this.render(this.model.data);

    this.view.events.on('view:updated', function(name) {
      this.model.active = name;
    }, this);

    this.model.events.on('model:new_active', function(name) {
      this.events.trigger('tabs:changed', name);
    }, this);
  }

}

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
    this.model = new Model();
    this.view = new View(appendFlag, container, insertBefore, dataArray);

    this.view.events.on('view:updated', function(data) {
      this.model.update(data);
    }, this);

    this.model.events.on('model:updated', function(data) {
      this.events.trigger('tabs:changed', data);
    }, this);

    this.render();
  }

}

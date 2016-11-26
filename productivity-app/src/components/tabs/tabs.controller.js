import ComponentController from '../components.controller';
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
    this.view = new View(appendFlag, container, insertBefore, dataArray);

    this.render();

    this.view.events.on('tab', function(...data) {
      this.events.trigger(data[0], ...data.slice(1));
    }, this);
  }

}

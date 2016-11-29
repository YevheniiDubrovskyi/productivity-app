import EventBus from '../utils/eventbus';

/**
 * Abstract class for component controller
 */
export default class ComponentController {

  /**
   * Create component controller
   */
  constructor() {
    this.model = null;
    this.view = null;
    this.events = new EventBus();
  }

  /**
   * Render component
   */
  render(...data) {
    this.view.render(...data);
  }

  /**
   * Destroy page
   */
  destroy() {
    delete this.events;

    this.view.destroy();
  }

  /**
   * Add class to component root element
   * @param {String} class - Class to add
   */
  addClassToRoot(className) {
    this.view.addClassToRoot(className);
  }

}

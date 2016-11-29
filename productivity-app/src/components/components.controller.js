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

  /**
   * Set inline styles to root element
   * @param {String} inlineStyles - Styles which will be applied to root element
   */
  set inlineStyles(inlineStyles) {
    this.view.inlineStyles = inlineStyles;
  }

}

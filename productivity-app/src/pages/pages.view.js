import EventBus from '../utils/eventbus';

/**
 * Abstract class for page view
 */
export default class PageView {

  /**
   * Create page view
   * @param  {HTMLElement} viewport - Append to element
   */
  constructor(viewport) {
    this.viewport = viewport;
    this.domEventsList = [];
    this.componentsList = [];
    this.template = null;
    this.events = new EventBus();
  }

  /**
   * Render page
   */
  render() {
    this.attachDettachAllDomEvents(this.domEventsList, true);
  }

  /**
   * Get page markup from template property
   * @return {HTMLElement} markup - Root page's HTMLElement
   */
  get markup() {
    return this.template.markup;
  }

  /**
   * Destroy page
   */
  destroy() {
    this.destroyAllComponents(this.componentsList);
    this.attachDettachAllDomEvents(this.domEventsList, false);
    this.domEventsList = [];
    this.viewport.innerHTML = ''; // For case when page have additional template in viewport
  }

  /**
   * Fire destroy method in each component
   * @param  {Array} componentsArray - Components array
   */
  destroyAllComponents(componentsArray) {
    componentsArray.forEach((component) => {
      component.destroy();
    });
  }

  /**
   * Attach or dettach event to HTMLElement
   * @param  {HTMLElement} element
   * @param  {String} eventName - DOM event name
   * @param  {Function} callback - Callback that will be attached/dettached to HTMLElement
   * @param  {Boolean} useCapture - Indicates type of dispatching
   */
  attachDettachDomEvent(attachFlag, element, eventName, callback, useCapture = false) {
    if (attachFlag) {
      element.addEventListener(eventName, callback, useCapture);
    } else {
      element.removeEventListener(eventName, callback, useCapture);
    }
  }

  /**
   * Attachs or detachs all events from array
   * @param  {Array} eventsArray - Object array that contain params for attaching/detaching
   */
  attachDettachAllDomEvents(eventsArray, attachFlag = true) {
    eventsArray.forEach((eventObject) => {
      this.attachDettachDomEvent(attachFlag,
                                eventObject.element,
                                eventObject.eventName,
                                eventObject.callback);
    });
  }

}

import EventBus from '../utils/eventbus';

/**
 * Abstract class for component view
 */
export default class ComponentView {

  /**
   * Create component view
   */
  constructor(container) {
    this.container = container;
    this.domEventsList = [];
    this.componentsList = [];
    this.template = null;
    this.events = new EventBus();
  }

  /**
   * Render component
   */
  render() {
    this.attachDettachAllDomEvents(this.domEventsList, true);
  }

  /**
   * Fire event with recevied data
   * @param  {...} data - Any data, any type
   */
  update(...data) {
    this.events.trigger('view:dataRecived', ...data);
  }

  /**
   * Not used yet
   * !!! Method for collection components
   * @param {...} data - Any data, any type
   */
  addData(...data) {}

  /**
   * Trigger event with new data
   * @param {...} data - Any data, any type
   */
  sendUpdate(...data) {
    this.events.trigger('view:updated', ...data);
  }

  /**
   * Add class to component root element
   * @param {String} className - Class to add
   */
  addClassToRoot(className) {
    this.markup.classList.add(className);
  }

  /**
   * Set inline styles to root element
   * @param {String} inlineStyles - Styles which will be applied to root element
   */
  set inlineStyles(inlineStyles) {
    this.markup.style = inlineStyles;
  }

  /**
   * Get component markup from template property
   * @return {HTMLElement} markup - Root component's HTMLElement
   */
  get markup() {
    return this.template.markup;
  }

  /**
   * Destroy component
   */
  destroy() {
    delete this.events;

    this.destroyAllComponents(this.componentsList);
    this.attachDettachAllDomEvents(this.domEventsList, false);
    this.domEventsList = [];
    this.container.removeChild(this.markup);
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
   * @param  {boolean} attachFlag - Determine action type attaching/detaching
   * @param  {HTMLElement} element
   * @param  {string} eventName - DOM event name
   * @param  {function} callback - Callback that will be attached/dettached to HTMLElement
   * @param  {boolean} useCapture - Indicates type of dispatching
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
   * @param  {boolean} attachFlag - Determine action type attaching/detaching
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

import EventBus from '../utils/eventbus';

/**
 * Abstract class for component view
 */
export default class ComponentView {

  /**
   * Create component view
   */
  constructor(container, dataArray) {
    this.container = container;
    this.dataArray = dataArray;
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
   * !!! Method for common components
   * Update data in view
   * @param {...} data - Any data, any type
   */
  update(data) {}

  /**
   * !!! Method for collection components
   * @param {...} data - Any data, any type
   */
  addData(...data) {}

  /**
   * Trigger event with new data
   */
  sendUpdate(...data) {
    this.events.trigger('view:updated', ...data);
  }

  /**
   * Add class to component root element
   * @param {String} class - Class to add
   */
  addClassToRoot(className) {
    this.markup.classList.add(className);
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

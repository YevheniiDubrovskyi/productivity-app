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
    this.events = new EventBus();
    this.domEventsList = [];
  }

  /**
   * Render component
   */
  render() {
    this.container.appendChild(this.markup);
    this.attachDettachAllDomEvents(this.domEventsList, true);
  }

  /**
   * Destroy component
   */
  destroy() {
    this.attachDettachAllDomEvents(this.domEventsList, false);
    this.domEventsList = [];
    this.container.removeChild(this.markup);
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

import ComponentView from '../components.view';
import template from './button.handlebars';
// import './button.less';

import $ from 'jquery';

/**
 * Component view
 */
export default class View extends ComponentView {

  /**
   * Create component view
   * @param  {boolean} appendFlag - Flag for switching injection type
   * @param  {HTMLElement} container - Append to element
   * @param  {HTMLElement | String} insertBefore InsertBefoe element or empty string if appendFlag === true
   */
  constructor(appendFlag, container, insertBefore) {
    if (!appendFlag && !(insertBefore instanceof HTMLElement)) {
      throw new TypeError('insertBefore argument is not instance of HTMLElement');
    }

    super(container);

    this.appendFlag = appendFlag;
    this.insertBefore = insertBefore;
  }

  /**
   * Render component
   * @param {objet} dataObject - Data object
   */
  render(dataObject) {
    this.markup = $(template(dataObject))[0];
    this.createDOMHandlers();

    if (this.appendFlag) {
      this.container.appendChild(this.markup);
    } else {
      this.container.insertBefore(this.markup, this.insertBefore);
    }

    super.render();
  }

  /**
   * Create DOM handlers which will be attach when render will be fire
   * @return {[type]} [description]
   */
  createDOMHandlers() {
    const btnClickHandler = () => {
      this.events.trigger('view:clicked');
    };

    this.domEventsList.push({
      element: this.markup,
      eventName: 'click',
      callback: btnClickHandler
    });
  }

}

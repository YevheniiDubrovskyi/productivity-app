import ComponentView from '../components.view';
import Template from './controls.template';
// import './controls.less';

/**
 * Component view
 */
export default class View extends ComponentView {

  /**
   * Create component view
   * @param  {HTMLElement} container - Append to element
   */
  constructor(container) {
    super(container);
  }

  /**
   * Render component
   * @param  {array} dataArray - Data array
   */
  render(dataArray) {
    this.template = new Template(dataArray);
    this.markup = this.getMarkup();
    this.createDOMHandlers();

    this.container.appendChild(this.getMarkup());

    this.events.on('view:dataRecived', function(...data) {
      if (data.length === 2) {
        this.setCounterBtnValue(...data);
      } else {
        this.template.pasteItemsList(...data);
      }
    }, this);

    super.render();
  }

  /**
   * Create DOM handlers which will be attach when render will be fire
   */
  createDOMHandlers() {
    const controlsClickHandler = (event) => {
      const alias = event.target.getAttribute('data-btn-alias');

      if (!alias) return;

      this.events.trigger('view:clicked', alias);
    };

    this.domEventsList.push({
      element: this.markup,
      eventName: 'click',
      callback: controlsClickHandler
    });
  }

  /**
   * Set counter value for button by alias
   * @param {string} alias - Button alias
   * @param {number} value - New counter value
   */
  setCounterBtnValue(alias, value) {

  }

  /**
   * Get button by alias
   * @param  {string} alias - Button alias
   * @return {HTMLElement} Finded button
   */
  getButton(alias) {
    return this.markup.querySelector('[data-btn-alias=${alias}]');
  }

}

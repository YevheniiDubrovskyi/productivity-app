import ComponentView from '../components.view';
import Template from './categories_input.template';
// import './categories_input.less';

/**
 * Component view
 */
export default class View extends ComponentView {

  /**
   * Create component view
   * @param {HTMLElement} container - Append to element
   */
  constructor(container) {
    super(container);
  }

  /**
   * Render component
   * @param {object} dataObject - Data object
   */
  render(dataObject) {
    this.template = new Template(dataObject);
    this.markup = this.getMarkup();

    this.container.appendChild(this.markup);
    this.createDOMHandlers();

    this.events.on('view:dataRecived', function(title) {
      this.setValue(title);
    }, this);

    super.render();
  }

  /**
   * Sets value in input
   * @param {string} value
   */
  setValue(value) {
    this.markup.querySelector('input').value = value;
  }

  /**
   * Create DOM handlers which will be attach when render will be fire
   */
  createDOMHandlers() {
    const inputChangeHandler = (event) => {
      const value = event.target.value.trim();

      if (!value) return;
      this.sendUpdate(value);
    };

    this.domEventsList.push({
      element: this.markup.querySelector('input'),
      eventName: 'change',
      callback: inputChangeHandler
    });
  }

}

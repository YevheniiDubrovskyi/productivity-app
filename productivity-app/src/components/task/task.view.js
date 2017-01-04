import ComponentView from '../components.view';
import Template from './task.template';
// import './task.less';

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
    super.render();

    this.events.on('view:dataRecived', function(data) {
      this.setData(data);
    }, this);
  }

  /**
   * Create DOM Handlers which will be attach when render will be fire
   */
  createDOMHandlers() {
    const rootClickHandler = (event) => {
      const target = event.target;

      if (target.tagName !== 'BUTTON') return;
      const className = target.className.match(/.*btn-(.+)\s?/);
      this.events.trigger('view:button_clicked', className[1]);
    };

    this.domEventsList.push({
      element: this.markup,
      eventName: 'click',
      callback: rootClickHandler
    });
  }

  /**
   * Set new received data to markup
   * @param {object} data
   */
  setData(data) {
    console.log('Task:View - set data ', data)
  }

}

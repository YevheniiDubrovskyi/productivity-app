import ComponentView from '../components.view';
import Template from './cycle_option.template';
// import './cycle_option.less';

/**
 * Component view
 */
export default class View extends ComponentView {

  /**
   * Create component view
   */
  constructor(container) {
    super(container);

    this.step = null;
  }

  /**
   * Render component
   * @param {Object} dataObject - Data object
   */
  render(dataObject) {
    this.step = dataObject.step;
    this.suffix = dataObject.suffix;
    this.template = new Template(dataObject);

    this.container.appendChild(this.markup);

    this.events.on('view:dataRecived', function(value) {
      this.actionViewportValue = value;
    }, this);
    this.createDOMHandlers();
    super.render();
  }

  /**
   * Create DOM handlers which will be attach when render will be fire
   */
  createDOMHandlers() {
    const rootClickHandler = (event) => {
      const classList = event.target.classList;

      if (classList.contains('action-add')) {
        this.sendUpdate(this.actionViewportValue + this.step);

      } else if (classList.contains('action-minus')) {
        this.sendUpdate(this.actionViewportValue - this.step)
      }
    };

    this.domEventsList.push({
      element: this.markup,
      eventName: 'click',
      callback: rootClickHandler
    });
  }

  /**
   * Return actionviewport innerHTML value
   * @return {Number} Current innerHTML value
   */
  get actionViewportValue() {
    return parseInt(this.markup.querySelector('.action-viewport').innerHTML, 10);
  }

  /**
   * Set actionviewport innerHTML with suffix
   * @param {Number} value - Value getted outside
   */
  set actionViewportValue(value) {
    this.markup.querySelector('.action-viewport').innerHTML = `${value} ${this.suffix}`;
  }

}

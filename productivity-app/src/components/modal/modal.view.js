import ComponentView from '../components.view';
import Template from './modal.template';
// import './modal.less';

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
   * @param {object} [dataObject] - Data object
   */
  render(dataFlag, dataObject) {
    this.template = new Template(dataFlag, dataObject);

    this.container.appendChild(this.markup);
    this.container.classList.add('modal-opened');
    this.createDOMHandlers();
    super.render();
  }

  /**
   * Destroy component
   */
  destroy() {
    this.container.classList.remove('modal-opened');
    super.destroy();
  }

  /**
   * Create DOM handlers which will be attach when render will be fire
   */
  createDOMHandlers() {
    const rootClickHandler = (event) => {
      event.stopPropagation();

      const target = event.target;
      // TODO: написать обработчик нажатия на кнопки и на фон, и пожымать события :remove, :submit, :cancel
      if (target.classList.contains('modal-wrapper')) {
        this.events.trigger('view:cancel');
      }

      if (target.tagName !== 'BUTTON') {
        return;
      }

      const className = target.className.match(/.*modal-btn-(.+)\s?/);
      // TODO: дописать выборку части имени класса и выкидывать ивент view:${className}
      console.log('Classname ', className);
    };

    this.domEventsList.push({
      element: this.markup,
      eventName: 'click',
      callback: rootClickHandler
    });
  }

  /**
   * Hide modal with animation
   */
  close() {

  }

}

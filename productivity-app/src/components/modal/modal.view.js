import ComponentView from '../components.view';
import Template from './modal.template';
// import './modal.less';

import Button from '../../components/button/button.controller';

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
  render(dataObject) {
    this.type = dataObject.type;
    this.template = new Template(dataObject);

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
   * Hide current inner markup and show confirmation markup
   */
  switchToRemove() {}

  /**
   * Create DOM handlers which will be attach when render will be fire
   */
  createDOMHandlers() {
    const rootClickHandler = (event) => {
      const target = event.target;
      // TODO: разделить обработчики нажатия на фон и на кнопки
      // TODO: написать обработчик нажатия на кнопки и на фон, и пожымать события :remove, :submit, :cancel
      if (target.classList.contains('modal-wrapper')) {
        this.events.trigger('view:cancel');
      }

      if (target.tagName !== 'BUTTON') {
        return;
      }
      event.stopPropagation();

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

import ComponentView from '../components.view';
import Template from './modal.template';
// import './modal.less';

import Button from '../../components/button/button.controller';
import $ from 'jquery';
import '../../../node_modules/jquery-ui-bundle/jquery-ui.css';

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
    this.type = dataObject.type;
    this.template = new Template(dataObject);
    this.markup = this.getMarkup();

    this.show();

    this.container.appendChild(this.markup);
    this.container.classList.add('modal-opened');

    this.events.on('view:acceptButton_clicked', function() {
      this.events.trigger('view:add_edit_submit', this.getInputsData());
    }, this);
    this.events.on('view:cancelButton_clicked', function() {
      this.events.trigger('view:cancel');
    }, this);

    this.createDOMHandlers();
    super.render();

    $(this.markup).find('#datepicker').datepicker({
      monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
      dateFormat: 'MM dd, yy',
      maxDate: '+1y',
      minDate: '+0d'
    });
  }

  /**
   * Return inputs data object
   * @return {object} Inputs data object
   */
  getInputsData() {
    let inputsData = Array.from(this.markup.querySelectorAll('input')).reduce((obj, input) => {
      const name = input.name;
      obj[name] = obj[name] ?
        obj[name] :
        [];

      obj[name].push(input);

      return obj;
    }, {});

    for (let prop in inputsData) {
      let array = inputsData[prop];

      inputsData[prop] = array.length === 1 ?
        array[0].value.trim() :
        array.filter(radio => radio.checked).map((radio) => {
          const value = radio.value;

          return value.includes('estimation') ?
            value.split('-')[1] :
            value;
        })[0];
    }

    return inputsData;
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
    const backgroundClickHandler = (event) => {
      if (event.target !== event.currentTarget) return;
      this.events.trigger('view:cancel');
    };
    const buttonsClickHandler = (event) => {
      const target = event.target;

      if (target.tagName !== 'BUTTON') return;
      const className = target.className.match(/.*modal-btn-(.+)\s?/);
      this.events.trigger(`view:${className[1]}Button_clicked`);
    };

    this.domEventsList.push({
      element: this.markup,
      eventName: 'click',
      callback: backgroundClickHandler
    }, {
      element: this.markup,
      eventName: 'click',
      callback: buttonsClickHandler
    });
  }

  /**
   * Hide modal with animation
   */
  close() {
    const aside = this.markup.querySelector('aside');
    this.markup.style = 'transition: .3s ease-in-out; background-color: rgba(0,0,0,0);';
    aside.style = 'transition: .3s ease-in-out; transform: translate(0%, -150%);';
  }

  /**
   * Show modal with animation
   */
  show() {
    const aside = this.markup.querySelector('aside');

    this.markup.style = 'background-color: rgba(0,0,0,0);';
    aside.style = 'transform: translate(0%, -150%);';
    setTimeout(() => {
      aside.style = 'transition: .3s ease-in-out; transform: translate(0%, 0%);';
      this.markup.style = 'transition: .3s ease-in-out';
    }, 10);
  }

}

import ComponentView from '../components.view';
import Template from './tabs.template';
import './tabs.css';

/**
 * Component view
 */
export default class View extends ComponentView {

  /**
   * Create component
   * @param  {Boolean} appendFlag - Flag for swtiching injection type
   * @param  {HTMLElement} container - Append to element
   * @param  {HTMLElement | String} insertBefore - InsertBefore element or empty string if appendFlag === true
   */
  constructor(appendFlag, container, insertBefore, dataArray) {
    if (!appendFlag && !(insertBefore instanceof HTMLElement)) {
      throw new TypeError('insertBefore argument is not instance of HTMLElement');
    }

    super(container, dataArray);

    this.appendFlag = appendFlag;
    this.insertBefore = insertBefore;
    this.template = new Template(this.dataArray);

    this.createDOMHendlers();
  }

  /**
   * Render component
   */
  render() {
    if (this.appendFlag) {
      this.container.appendChild(this.markup);
    } else {
      this.container.insertBefore(this.markup, this.insertBefore);
    }

    this.sendUpdate(this.activeName);
    super.render();
  }

  /**
   * Create DOM handlers which will be attached when render will be fired
   */
  createDOMHendlers() {
    const tabClickHandler = (event) => {
      const name = event.target.getAttribute('data-tab-name');

      if (name && name === this.activeName) return;

      this.active = name;
    }

    this.domEventsList.push({
      element: this.markup,
      eventName: 'click',
      callback: tabClickHandler
    });
  }

  /**
   * Get active tab
   * @return {HTMLElement} Active tab element
   */
  get active() {
     return this.markup.querySelector(`[data-tab-name].active`);
  }

  /**
   * Get active tab name
   * @return {String} Active tab name
   */
  get activeName() {
    return this.active.getAttribute('data-tab-name');
  }

  /**
   * Set active tab by name, add .active class
   * @param {String} name - Tab's name which will be setted to active
   */
  set active(name) {
    this.active.classList.remove('active');
    this.getTabByName(name).classList.add('active');

    this.sendUpdate(name);
  }

  /**
   * Get tab by name
   * @param  {String} name - Tab name
   * @return {HTMLElement} Tab element
   */
  getTabByName(name) {
    return this.markup.querySelector(`[data-tab-name=${name}]`);
  }

}

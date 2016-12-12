import ComponentView from '../components.view';
import Template from './tabs.template';
// import './tabs.less';

/**
 * Component view
 */
export default class View extends ComponentView {

  /**
   * Create component view
   * @param  {boolean} appendFlag - Flag for switching injection type
   * @param  {HTMLElement} container - Append to element
   * @param  {HTMLElement | String} insertBefore - InsertBefore element or empty string if appendFlag === true
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
   * @param {array} dataArray - Data array
   */
  render(dataArray) {
    this.template = new Template(dataArray);
    this.createDOMHandlers();

    if (this.appendFlag) {
      this.container.appendChild(this.markup);
    } else {
      this.container.insertBefore(this.markup, this.insertBefore);
    }

    // "Feature" :D (Two setTimeouts let us attach callback in outer function)
    setTimeout(() => {
      this.sendUpdate(this.activeName);
    }, 0);

    super.render();
  }

  /**
   * Create DOM handlers which will be attach when render will be fire
   */
  createDOMHandlers() {
    const tabClickHandler = (event) => {
      const name = event.target.getAttribute('data-tab-name');

      if (!name || name === this.activeName) return;

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
   * @return {string} Active tab name
   */
  get activeName() {
    return this.active.getAttribute('data-tab-name');
  }

  /**
   * Set active tab by name, add .active class
   * @param {string} name - Tab's name which will be setted to active
   */
  set active(name) {
    this.active.classList.remove('active');
    this.getTabByName(name).classList.add('active');

    this.sendUpdate(name);
  }

  /**
   * Get tab by name
   * @param  {string} name - Tab name
   * @return {HTMLElement} Tab element
   */
  getTabByName(name) {
    return this.markup.querySelector(`[data-tab-name=${name}]`);
  }

}

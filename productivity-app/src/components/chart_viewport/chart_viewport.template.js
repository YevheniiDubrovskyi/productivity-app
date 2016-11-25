import utils from '../../utils/utils';

/**
 * Component template
 */
export default class Template {

  /**
   * Create component template
   * @param  {Array} data - Data array
   */
  constructor(data) {
    this.markup = document.createElement('div');
    this.markup.classList.add('chart')
    this.markup.innerHTML = this.createControls(data) + this.createViewPort();
  }

  /**
   * Create element for charts viewport
   * @return {String} Charts viewport markup
   */
  createViewPort() {
    return `\n<div id="chart"></div>`;
  }

  /**
   * Create controls list
   * @param  {Array} dataArray
   * @return {String} Controls list markup
   */
  createControls(dataArray) {
    return [`<ul class="tabs-list" data-chart-controls>`,
            `${dataArray.reduce((acc, el, i) => `${acc}\n${this.createListItem(el, i)}`, '')}`,
            `</ul>`].join('\n');
  }

  /**
   * Create controls list item
   * @param  {Object} element
   * @param  {Number} index
   * @return {String} Controls list item markup
   */
  createListItem(element, index) {
    return [`<li class="tabs-list__item">`,
            `<button class="tabs-list__item-btn ${index === 0 ? 'active' : ''}" type="button" data-chart="${element.name}">${utils.capitalize(element.name)}</button>`,
            `</li>`].join('\n');
  }

}

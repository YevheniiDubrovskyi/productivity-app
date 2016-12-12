/**
 * Component template
 */
export default class Template {

  /**
   * Create component template
   * @param  {array} dataArray - Data array
   */
  constructor(dataArray) {
    this.markup = document.createElement('ul');
    this.markup.classList.add('controls-list');

    this.pasteItemsList(dataArray);
  }

  /**
   * Paste items list in markup element
   * @param  {array} dataArrayc - Data array
   */
  pasteItemsList(dataArray) {
    this.markup.innerHTML = this.createItemsList(dataArray);
  }

  /**
   * Create items list depends on data array
   * @param {array} dataArray - Data array
   * @return {string} Items list markup
   */
  createItemsList(dataArray) {
    return dataArray.reduce((acc, element) => {
      return [`${acc}<li class="controls-list__item">`,
              `<button class="controls-list__item-btn ${element.active ? 'active' : ''}" type="button" data-btn-alias="${element.alias}">${element.icon}</button>`,
              `</li>\n`].join('\n');
    }, '');
  }

}

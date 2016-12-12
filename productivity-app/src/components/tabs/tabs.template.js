import utils from '../../utils/utils';

/**
 * Component template
 */
export default class Template {

  /**
   * Create component template
   * @param {array} dataArray - Data array
   */
  constructor(dataArray) {
    this.markup = document.createElement('ul');
    this.markup.classList.add('tabs-list');
    this.markup.innerHTML = this.createItemsList(dataArray);
  }

  /**
   * Create items list depends on data array
   * @param  {array} dataArray - Data array
   * @return {string} Items list markup
   */
  createItemsList(dataArray) {
    return dataArray.reduce((acc, element) => {
      return [`${acc}<li class="tabs-list__item">`,
              `<button class="tabs-list__item-btn ${element.active ? 'active' : ''}" type="button" data-tab-name="${element.name}">${utils.capitalize(element.name)}</button>`,
              `</li>\n`].join('\n');
    }, '');
  }

}

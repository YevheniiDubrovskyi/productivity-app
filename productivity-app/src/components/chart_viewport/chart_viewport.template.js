import utils from '../../utils/utils';

/**
 * Component template
 */
export default class Template {

  /**
   * Create component template
   * @param  {Array} dataArray - Data array
   */
  constructor(dataArray) {
    this.markup = document.createElement('div');
    this.markup.classList.add('chart-viewport');
    this.markup.innerHTML = this.createViewPort();
  }

  /**
   * Create element for charts viewport
   * @return {String} Charts viewport markup
   */
  createViewPort() {
    return `\n<div id="chart"></div>`;
  }

}

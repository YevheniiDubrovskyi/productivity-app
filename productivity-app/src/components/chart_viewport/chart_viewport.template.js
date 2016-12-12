import utils from '../../utils/utils';

/**
 * Component template
 */
export default class Template {

  /**
   * Create component template
   */
  constructor() {
    this.markup = document.createElement('div');
    this.markup.classList.add('chart-viewport');
    this.markup.innerHTML = this.createViewport();
  }

  /**
   * Create element for charts viewport
   * @return {String} Charts viewport markup
   */
  createViewport() {
    return '\n<div id="chart"></div>';
  }

}

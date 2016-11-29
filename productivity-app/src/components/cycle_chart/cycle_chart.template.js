/**
 * Component template
 */
export default class Template {

  /**
   * Create component template
   */
  constructor() {
    this.markup = document.createElement('section');
    this.markup.classList.add('cycle-chart');
    this.markup.innerHTML = this.createMarkupSkeleton();
  }

  createMarkupSkeleton() {
    //TODO: написать разметку для заголовка и два ul
  }

  /**
   * Update component markup
   * @param {Object} data - Object with calculated percents
   */
  update(data) {
    //TODO: сделать так чтобы перерисовывалось по процентам
  }

}

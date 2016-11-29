/**
 * Component template
 */
export default class Template {

  /**
   * Create component template
   */
  constructor() {
    this.markup = document.createElement('div');
    this.markup.classList.add('cycle');
    this.markup.innerHTML = this.createEmptyList();
  }

  /**
   * Create empty list markup
   */
  createEmptyList() {
    return '\n<ul class="cycle-option-list"></li>';
  }

}

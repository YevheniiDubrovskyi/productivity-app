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
   * @return {string} Empty list markup
   */
  createEmptyList() {
    return '\n<ul class="cycle-option-list"></li>';
  }

  /**
   * Create buttons wrapper
   * @return {HTMLElement} Buttons wrapper
   */
  createButtonsWrapper() {
    const div = document.createElement('div');

    div.classList.add('buttons-wrapper');
    return div;
  }

}

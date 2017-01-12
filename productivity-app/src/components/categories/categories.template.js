/**
 * Component template
 */
export default class Template {

  /**
   * Create component template
   */
  constructor() {
    this.markup = document.createElement('div');
    this.markup.classList.add('categories');
    this.markup.innerHTML = this.createEmptyList() +
                            this.createButtonsWrapper();
  }

  /**
   * Create empty list markup
   * @return {string} Empty list markup
   */
  createEmptyList() {
    return '\n<ul class="categories-list"></ul>';
  }

  /**
   * Create buttons wrapper markup
   * @return {string} Buttons wrapper markup
   */
  createButtonsWrapper() {
    return '\n<div class="buttons-wrapper"></div>';
  }

}

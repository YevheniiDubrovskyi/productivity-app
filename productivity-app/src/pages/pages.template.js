/**
 * Abstact class for page template
 */
export default class PageTemplate {

  /**
   * Create page template
   */
  constructor() {
    this.markup = document.createElement('div');
    this.markup.classList.add('page-wrapper');
  }

}

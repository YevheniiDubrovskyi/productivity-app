import PageTemplate from '../pages.template';

/**
 * Page template
 */
export default class Template extends PageTemplate {

  /**
   * Create page template
   */
  constructor() {
    super();
    this.markup.innerHTML = this.staticTemplate();
  }

  /**
   * Return static template
   */
  staticTemplate() {
    return [`<main class="main">`,
              `<header class="header header-flex">`,
                `<figure class="header-logo">`,
                  `<img class="header-logo-image" src="img/Logo.svg" title="Logo" alt="Logo image">`,
                `</figure>`,
              `</header>`,
              `<button class="main-top-add-btn" type="button">Daily Task List</button>`,
            `</main>`].join('\n');
  }

}

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
    this.markup.innerHTML = this.createMain() + this.createAside();
  }

  /**
   * Create main page markup
   * @return {string} Main page markup
   */
  createMain() {
    return [`<main class="main main-settings">`,
            `<header class="header">`,
              `<h1 class="header-main">Settings</h1>`,
              `<h2 class="header-sub"></h2>`,
            `</header>`,
            `<div class="viewport"></div>`,
            `</main>\n`].join('\n');
  }

  /**
   * Create aside markup
   * @return {string} Aside markup
   */
  createAside() {
    return '<aside class="aside"></aside>';
  }

}

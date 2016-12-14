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
    // this.markup.classList.add('changing-state');
    this.markup.innerHTML = this.createMain() + this.createAside();
  }

  createMain() {
    return [`<main class="main">`,
            `<header class="header">`,
            `<h1 class="header-main">Settings</h1>`,
            `<h2 class="header-sub"></h2>`,
            `</header>`,
            `</main>\n`].join('\n');
  }

  createAside() {
    return `  <aside class="aside">
    <ul class="controls-list">
      <li class="controls-list__item">
        <button class="controls-list__item-btn" id="statistics-btn" type="button">&#xe90c;</button>
      </li>

      <li class="controls-list__item">
        <button class="controls-list__item-btn" id="settigns-btn active" type="button">&#xe90b;</button>
      </li>

      <li class="controls-list__item">
        <button class="controls-list__item-btn" id="logout-btn" type="button">&#xe908;</button>
      </li>
    </ul>
  </aside>`;
  }

}

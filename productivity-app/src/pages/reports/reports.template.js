/**
 * Page template
 */
export default class Template {

  /**
   * Create page template
   */
  constructor() {
    this.markup = document.createElement('div');
    this.markup.classList.add('page-wrapper');
    this.markup.innerHTML = this.createMain() + this.createAside();
  }

  createMain() {
    return [`<main class="main">`,
            `<h1 class="main-heading">Report</h1>`,
            `<a class="btn-arrow btn-arrow-left" href="#" title="Go somewhere">&#xe902;</a>`,
            `</main>\n`].join('\n');
  }

  createAside() {
    return `  <aside class="aside">
    <ul class="main-btn-list">
      <li class="main-btn-list__item">
        <button class="main-btn-list__item-btn" id="statistics-btn" type="button">&#xe90c;</button>
      </li>

      <li class="main-btn-list__item">
        <button class="main-btn-list__item-btn" id="settigns-btn" type="button">&#xe90b;</button>
      </li>

      <li class="main-btn-list__item">
        <button class="main-btn-list__item-btn" id="logout-btn" type="button">&#xe908;</button>
      </li>
    </ul>
  </aside>`;
  }

}

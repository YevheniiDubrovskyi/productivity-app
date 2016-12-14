import PageTemplate from '../pages.template';
import '../../assets/img/tomato-failed.svg';

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
    return `  <main class="main main-timer">
    <header class="header">
      <h1 class="header-main">1. Creating a New Design</h1>
      <h2 class="header-sub">Lorem ipsum dolor sit amet, consectetur adipisicing</h2>
    </header>

    <ul class="pomodoro-list">
      <li class="pomodoro-list-item">
        <img class="pomodoro-list-item-img" src="img/tomato_fill.svg" title="Pomodoro" alt="Pomodoro image"/>
      </li>

      <li class="pomodoro-list-item">
        <img class="pomodoro-list-item-img" src="img/tomato-failed.svg" title="Pomodoro" alt="Pomodoro image"/>
      </li>

      <li class="pomodoro-list-item">
        <img class="pomodoro-list-item-img" src="img/tomato.svg" title="Pomodoro" alt="Pomodoro image"/>
      </li>
      <li class="pomodoro-list-item-btn"><button class="btn-add-pomodoro" type="button">&#xe900;</button></li>
    </ul>

    <div class="timer">
      <div class="timer-spinner timer-pie" style="animation-duration: 10s;"></div>
      <div class="timer-filter timer-pie" style="animation-duration: 10s;"></div>
      <div class="timer-mask" style="animation-duration: 10s;"></div>
      <p class="timer-text in-pomodoro">
        <span class="timer-text-row timer-text-min">6</span>
        <span class="timer-text-row">min</span>
      </p>
    </div>

    <div class="buttons-wrapper">
      <button class="btn btn-tomato btn-fail-pom" type="button">Fail Pomodora</button>
      <button class="btn btn-niagara btn-finish-pom" type="button">Finish Pomodora</button>
    </div>

    <a class="btn-arrow btn-arrow-left" href="#" title="Go somewhere">&#xe902;</a>
    <a class="btn-arrow btn-arrow-right" href="#" title="Go somewhere">&#xe903;</a>
  </main>

  <aside class="aside">
    <ul class="controls-list">
      <li class="controls-list__item">
        <button class="controls-list__item-btn" id="statistics-btn" type="button">&#xe90c;</button>
      </li>

      <li class="controls-list__item">
        <button class="controls-list__item-btn" id="settigns-btn" type="button">&#xe90b;</button>
      </li>

      <li class="controls-list__item">
        <button class="controls-list__item-btn" id="logout-btn" type="button">&#xe908;</button>
      </li>
    </ul>
  </aside>`;
  }

}

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
    return `
  <main class="main">
    <button class="main-top-add-btn">Daily Task List</button>

    <!-- DAILY TASKS -->

    <div class="tasks-block daily-tasks">

      <div class="tabs-block">
        <ul class="tabs-list sellecting-tabs">
          <li class="tabs-list__item">
            <button class="tabs-list__item-btn" id="sellect-all-tab-today" type="button">Sellect All</button>
          </li>

          <li class="tabs-list__item">
            <button class="tabs-list__item-btn" id="desellect-all-tab-today" type="button">Desellect all</button>
          </li>
        </ul>

        <ul class="tabs-list to-do-tabs">
          <li class="tabs-list__item">
            <button class="tabs-list__item-btn active" id="to-do-tab" type="button">To Do</button>
          </li>

          <li class="tabs-list__item">
            <button class="tabs-list__item-btn" id="done-tab" type="button">Done</button>
          </li>
        </ul>
      </div>
      <ul class="task-list">
        <!-- CATEGORIES: .hobby-category .work-category .education-category .sport-category .other-category -->
        <!-- IMPORTANCE: .urgent-imp .hight-imp .middle-imp .low-imp -->
        <!-- .moved-to-trash -->
        <li class="task-list-item hobby-category urgent-imp moved-to-trash">
          <div class="task-hidden-btns">
            <button class="task-hidden-btns__btn btn-trash" type="button">&#xe912;</button>
            <button class="task-hidden-btns__btn btn-close" type="button">&#xe910;</button>
          </div>

          <time class="task-date" datetime="">
            <span class="task-date-number">23</span>
            <span class="task-date-month">May</span>
            <span class="task-date-today">Today</span>
          </time>

          <section class="task-content">
            <h3 class="task-content-heading">Lorem ipsum sit amet</h3>
            <p class="task-content-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium nobis ipsam sint maxime consectetur.</p>
          </section>

          <div class="task-main-btns">
            <button class="task-main-btns__btn btn-up" type="button">&#xe904;</button>
            <button class="task-main-btns__btn btn-edit" type="button">&#xe905;</button>
          </div>

          <div class="task-pomidoro-count">
            <span class="task-pomidoro-count__num">3</span>
          </div>
        </li>

      </ul>
    </div>

    <!-- GLOBAL TASKS -->
    <!-- .closed -->

    <div class="tasks-block global-tasks">

      <div class="tabs-block">
        <button class="tabs-block-global-btn" type="button" id="#show-global">Global list</button>

        <!-- TOOLTIP -->
        <div class="tooltip">Go to Global List</div>

        <ul class="tabs-list to-do-tabs">
          <li class="tabs-list__item">
            <button class="tabs-list__item-btn active" type="button">All</button>
          </li>
          <li class="tabs-list__item">
            <button class="tabs-list__item-btn" type="button">Urgent</button>
          </li>
          <li class="tabs-list__item">
            <button class="tabs-list__item-btn" type="button">Hight</button>
          </li>
          <li class="tabs-list__item">
            <button class="tabs-list__item-btn" type="button">Middle</button>
          </li>
          <li class="tabs-list__item">
            <button class="tabs-list__item-btn" type="button">Low</button>
          </li>
        </ul>

        <ul class="tabs-list sellecting-tabs">
          <li class="tabs-list__item">
            <button class="tabs-list__item-btn" id="sellect-all-tab" type="button">Sellect All</button>
          </li>
          <li class="tabs-list__item">
            <button class="tabs-list__item-btn" id="desellect-all-tab" type="button">Desellect all</button>
          </li>
        </ul>
      </div>

      <!-- WORK CATEGORY -->

      <section class="tasks-grp-by-category work-category">
        <h2 class="tasks-grp-by-category__heading">Work</h2>

        <ul class="task-list">
          <!-- IMPORTANCE: .urgent-imp .hight-imp .middle-imp .low-imp -->
          <!-- .moved-to-trash -->
          <li class="task-list-item hight-imp done">
            <div class="task-hidden-btns">
              <button class="task-hidden-btns__btn btn-trash" type="button">&#xe912;</button>
              <button class="task-hidden-btns__btn btn-close" type="button">&#xe910;</button>
            </div>

            <time class="task-date" datetime="">
              <span class="task-date-number">23</span>
              <span class="task-date-month">May</span>
              <span class="task-date-today">Today</span>
            </time>

            <section class="task-content">
              <h3 class="task-content-heading">Lorem ipsum sit amet</h3>
              <p class="task-content-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium nobis ipsam sint maxime consectetur.</p>
            </section>

            <div class="task-main-btns">
              <button class="task-main-btns__btn btn-up" type="button">&#xe904;</button>
              <button class="task-main-btns__btn btn-edit" type="button">&#xe905;</button>
            </div>

            <div class="task-pomidoro-count">
              <span class="task-pomidoro-count__num">3</span>
            </div>
          </li>

          <li class="task-list-item middle-imp moved-to-trash">
            <div class="task-hidden-btns">
              <button class="task-hidden-btns__btn btn-trash" type="button">&#xe912;</button>
              <button class="task-hidden-btns__btn btn-close" type="button">&#xe910;</button>
            </div>

            <time class="task-date" datetime="">
              <span class="task-date-number">23</span>
              <span class="task-date-month">May</span>
              <span class="task-date-today">Today</span>
            </time>

            <section class="task-content">
              <h3 class="task-content-heading">Lorem ipsum sit amet</h3>
              <p class="task-content-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium nobis ipsam sint maxime consectetur.</p>
            </section>

            <div class="task-main-btns">
              <button class="task-main-btns__btn btn-up" type="button">&#xe904;</button>
              <button class="task-main-btns__btn btn-edit" type="button">&#xe905;</button>
            </div>

            <div class="task-pomidoro-count">
              <span class="task-pomidoro-count__num">3</span>
            </div>
          </li>
        </ul>
      </section>

      <!-- EDUCATION CATEGORY -->

      <section class="tasks-grp-by-category education-category">
        <h2 class="tasks-grp-by-category__heading">Education</h2>

        <ul class="task-list">
          <!-- IMPORTANCE: .urgent-imp .hight-imp .middle-imp .low-imp -->
          <!-- .moved-to-trash -->
          <li class="task-list-item low-imp">
            <div class="task-hidden-btns">
              <button class="task-hidden-btns__btn btn-trash" type="button">&#xe912;</button>
              <button class="task-hidden-btns__btn btn-close" type="button">&#xe910;</button>
            </div>

            <time class="task-date" datetime="">
              <span class="task-date-number">23</span>
              <span class="task-date-month">May</span>
              <span class="task-date-today">Today</span>
            </time>

            <section class="task-content">
              <h3 class="task-content-heading">Lorem ipsum sit amet</h3>
              <p class="task-content-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium nobis ipsam sint maxime consectetur.</p>
            </section>

            <div class="task-main-btns">
              <button class="task-main-btns__btn btn-up" type="button">&#xe904;</button>
              <button class="task-main-btns__btn btn-edit" type="button">&#xe905;</button>
            </div>

            <div class="task-pomidoro-count">
              <span class="task-pomidoro-count__num">3</span>
            </div>
          </li>

          <li class="task-list-item urgent-imp">
            <div class="task-hidden-btns">
              <button class="task-hidden-btns__btn btn-trash" type="button">&#xe912;</button>
              <button class="task-hidden-btns__btn btn-close" type="button">&#xe910;</button>
            </div>

            <time class="task-date" datetime="">
              <span class="task-date-number">23</span>
              <span class="task-date-month">May</span>
              <span class="task-date-today">Today</span>
            </time>

            <section class="task-content">
              <h3 class="task-content-heading">Lorem ipsum sit amet</h3>
              <p class="task-content-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium nobis ipsam sint maxime consectetur.</p>
            </section>

            <div class="task-main-btns">
              <button class="task-main-btns__btn btn-up" type="button">&#xe904;</button>
              <button class="task-main-btns__btn btn-edit" type="button">&#xe905;</button>
            </div>

            <div class="task-pomidoro-count">
              <span class="task-pomidoro-count__num">3</span>
            </div>
          </li>

          <li class="task-list-item middle-imp done">
            <div class="task-hidden-btns">
              <button class="task-hidden-btns__btn btn-trash" type="button">&#xe912;</button>
              <button class="task-hidden-btns__btn btn-close" type="button">&#xe910;</button>
            </div>

            <time class="task-date" datetime="">
              <span class="task-date-number">23</span>
              <span class="task-date-month">May</span>
              <span class="task-date-today">Today</span>
            </time>

            <section class="task-content">
              <h3 class="task-content-heading">Lorem ipsum sit amet</h3>
              <p class="task-content-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium nobis ipsam sint maxime consectetur.</p>
            </section>

            <div class="task-main-btns">
              <button class="task-main-btns__btn btn-up" type="button">&#xe904;</button>
              <button class="task-main-btns__btn btn-edit" type="button">&#xe905;</button>
            </div>

            <div class="task-pomidoro-count">
              <span class="task-pomidoro-count__num">3</span>
            </div>
          </li>

          <li class="task-list-item hight-imp">
            <div class="task-hidden-btns">
              <button class="task-hidden-btns__btn btn-trash" type="button">&#xe912;</button>
              <button class="task-hidden-btns__btn btn-close" type="button">&#xe910;</button>
            </div>

            <time class="task-date" datetime="">
              <span class="task-date-number">23</span>
              <span class="task-date-month">May</span>
              <span class="task-date-today">Today</span>
            </time>

            <section class="task-content">
              <h3 class="task-content-heading">Lorem ipsum sit amet</h3>
              <p class="task-content-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium nobis ipsam sint maxime consectetur.</p>
            </section>

            <div class="task-main-btns">
              <button class="task-main-btns__btn btn-up" type="button">&#xe904;</button>
              <button class="task-main-btns__btn btn-edit" type="button">&#xe905;</button>
            </div>

            <div class="task-pomidoro-count">
              <span class="task-pomidoro-count__num">3</span>
            </div>
          </li>
        </ul>
      </section>

    </div>
  </main>

  <aside class="aside">
    <ul class="main-btn-list">
      <li class="main-btn-list__item">
        <button class="main-btn-list__item-btn" id="add-btn" type="button">&#xe900;</button>
      </li>

      <!-- Add .active here when .deleting-state is enabled -->
      <li class="main-btn-list__item">
        <button class="main-btn-list__item-btn" id="trash-btn" type="button">&#xe912;</button>
      </li>

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

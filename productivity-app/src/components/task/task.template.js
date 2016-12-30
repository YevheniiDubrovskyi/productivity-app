/**
 * Component template
 */
export default class Template {

  /**
   * Create component template
   * @param {object} dataObject - Data object
   */
  constructor(dataObject) {
    this.markup = document.createElement('div');
    this.markup.classList.add('task');
    this.markup.classList.add(`${dataObject.data.priority}-priority`);
    this.markup.innerHTML = this.createMarkupSkeleton(dataObject);
  }

  /**
   * Create markup skeleton
   * @param {object} dataObject - Data object
   * @return {string} Markup skeleton
   */
  createMarkupSkeleton(dataObject) {
    return [this.createHiddenButtons(),
            this.createDate(dataObject),
            this.createContent(dataObject),
            this.createMainButtons(dataObject),
            this.createPomodoroCount(dataObject)].join('\n');
  }

  /**
   * Create hidden buttons
   * @return {string} Hidden buttons markup
   */
  createHiddenButtons() {
    return ['<div class="task-hidden-btns">',
            '<button class="task-hidden-btns__btn btn-trash" type="button">&#xe912;</button>',
            '<button class="task-hidden-btns__btn btn-close" type="button">&#xe910;</button>',
            '</div>'].join('\n');
  }

  /**
   * Create date markup
   * @param {object} dataObject - Data object
   * @return {string} Date section markup
   */
  createDate(dataObject) {
    const deadline = dataObject.data.deadline;
    const deadlineDate = new Date(deadline);
    const todayDate = new Date();
    let date;

    if (deadlineDate.getMonth() === todayDate.getMonth() &&
        deadlineDate.getDay() === todayDate.getDay() &&
        deadlineDate.getFullYear() === todayDate.getFullYear()) {
      date = '<span class="task-date-today">Today</span>';
    } else {
      const splitedDeadline = deadline.split(' ');
      const stringMonth = splitedDeadline[1];
      const stringDay = splitedDeadline[2];

      date = [`<span class="task-date-number">${stringDay}</span>`,
              `<span class="task-date-month">${stringMonth}</span>`].join('\n');
    }

    return [`<time class="task-date" datetime="${deadline}">`,
            date,
            `</time>`].join('\n');
  }

  /**
   * Create content markup
   * @param {object} dataObject - Data object
   * @return {string} Content section markup
   */
  createContent(dataObject) {
    const data = dataObject.data;

    return [`<section class="task-content">`,
            `<h3 class="task-content-heading">${data.title}</h3>`,
            `<p class="task-content-text">${data.description}</p>`,
            `</section>`].join('\n');
  }

  /**
   * Create main buttons markup
   * @param {object} dataObject - Data object
   * @return {string} Main buttons markup
   */
  createMainButtons(dataObject) {
    const buttonsOptions = dataObject.buttons;

    return ['<div class="task-main-btns">',
            buttonsOptions.toTop ? '<button class="task-main-btns__btn btn-up">&#xe904;</button>' : '',
            buttonsOptions.edit ? '<button class="task-main-btns__btn btn-edit">&#xe905;</button>' : '',
            '</div>'].join('\n');
  }

  /**
   * Create pomodoro count markup
   * @param {object} dataObject - Data object
   * @return {string} Pomodoro count section markup
   */
  createPomodoroCount(dataObject) {
    return ['<button class="task-pomodoro-count btn-pomodoro">',
            `<span class="task-pomodoro-count__num">${dataObject.data.estimation}</span>`,
            '</button>'].join('\n');
  }

}

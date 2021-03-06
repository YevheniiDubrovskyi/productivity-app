/**
 * Component template
 */
export default class Template {

  /**
   * Create component template
   * @param {array} messagesData - Messages data array
   */
  constructor(messagesData) {
    this.messagesData = messagesData;
    this.markup = document.createElement('div');
    this.markup.classList.add('task-list');
    this.markup.innerHTML = this.createMarkupSkeleton();
  }

  /**
   * Create markup skeleton
   * @return {string} Component markup skeleton
   */
  createMarkupSkeleton() {
    return [this.createTasksBlock('daily-tasks', true),
            this.createTasksBlock('global-tasks')].join('\n');
  }

  /**
   * Create tasks block markup
   * @param {string} additionalClass
   * @param {boolean} dailyFlag
   * @return {string} Tabs block markup
   */
  createTasksBlock(additionalClass, dailyFlag = false) {
    return [`<div class="task-list-block ${additionalClass}">`,
            `<div class="task-list-block-controls">`,
            !dailyFlag ? '<button class="task-list-block-controls-glbl-btn">Global list</button>' : '',
            `</div>`,
            dailyFlag ?
              this.createAllMessages() + '\n<ul class="task-list"></ul>' :
              '<div class="task-list-block-categories"></div>',
            `</div>`].join('\n');
  }

  /**
   * Create message paragraph
   * @param {string} additionalClass - Class which will be attach to element
   * @param {string} text - Message text
   * @param {string} iconPosition - Determine icon position (after, before, none(default))
   */
  createMessage(additionalClass, text, iconPosition = '') {
    return [`<div class="task-list-message ${additionalClass}">`,
            `<p class="task-list-message-text ${iconPosition ? `task-list-message-text__icon-${iconPosition}` : ''}">${text}</p>`,
            `</div>`].join('\n');
  }

  /**
   * Create all message paragraphs
   */
  createAllMessages() {
    return this.messagesData.map((message) => {
      return this.createMessage(message.class, message.text, message.icon);
    }).join('\n');
  }

  /**
   * Create section element for tasks group
   * @param {string} alias - Category alias
   * @param {string} title - Category title
   * @return {HTMLElement} Section element
   */
  createCategorySection(alias, title) {
    const section = document.createElement('section');

    section.classList.add('tasks-grp-by-category');
    section.classList.add(`${alias}-category`);
    section.innerHTML = [`<h2 class="tasks-grp-by-category__heading">${title}</h2>`,
                         `<ul class="task-list"></ul>`].join('\n');
    return section;
  }

}

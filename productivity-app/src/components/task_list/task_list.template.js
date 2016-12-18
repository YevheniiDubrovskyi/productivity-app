/**
 * Component template
 */
export default class Template {

  /**
   * Create component template
   */
  constructor() {
    this.markup = document.createElement('div');
    this.markup.classList.add('task-list');
    this.markup.innerHTML = this.createMarkupSkeleton();
  }

  /**
   * Create markup skeleton
   * @return {string} Component markup skeleton
   */
  createMarkupSkeleton() {
    return `Place for task list markup`;
  }

}

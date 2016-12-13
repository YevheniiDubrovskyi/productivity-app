import PageController from '../pages.controller';
import View from './task_list.view';

/**
 * Page controller
 */
export default class TaskList extends PageController {

  /**
   * Create page controller
   * @param {HTMLElment} viewport - Append to element
   */
  constructor(viewport) {
    super();
    this.view = new View(viewport);

    this.render();

    const pages = ['signout', 'reports', 'settings'];
    this.view.events.on('view:controls_clicked', function(alias) {
      if (pages.includes(alias)) {
        this.goToPage(alias);
      }
    }, this);
  }

}

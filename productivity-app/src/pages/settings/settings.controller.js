import PageController from '../pages.controller';
import View from './settings.view';

/**
 * Page controller
 */
export default class Settings extends PageController {

  /**
   * Create page controller
   * @param  {HTMLElment} viewport - Append to element
   */
  constructor(viewport) {
    super();
    this.view = new View(viewport);

    this.render();

    this.view.events.on('view:controls_clicked', function(alias) {
      this.goToPage(alias);
    }, this);

    this.view.events.on('view:backButton_clicked', function() {
      this.goToPage('');
    }, this);
  }

}

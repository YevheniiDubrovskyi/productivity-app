import PageController from '../pages.controller';
import View from './reports.view';

export default class Reports extends PageController {

  constructor(viewport) {
    super();
    this.view = new View(viewport);

    this.render();
  }

}

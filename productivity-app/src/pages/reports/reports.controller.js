import PageController from '../pages.controller';
import View from './reports.view';
import './reports.css';

export default class Reports extends PageController {

  constructor(viewport) {
    super();
    this.view = new View(viewport);

    this.render();
  }

}

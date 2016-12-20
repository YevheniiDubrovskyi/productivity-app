import ComponentController from '../components.controller';
import View from './cycle.view';
import Model from './cycle.model';

/**
 * Component controller
 */
export default class Cycle extends ComponentController {

  /**
   * Create component controller
   * @param  {HTMLElement} container - Append to element
   */
  constructor(container) {
    super();

    this.model = new Model();
    this.view = new View(container);

    this.render(this.model.getOptionsData(), this.model.getChartData());

    this.view.events.on('view:updated', function(role, value) {
      this.model.changeValueByRole(role, value);
    }, this);

    this.view.events.on('view:backButton_clicked', function() {
      this.events.trigger('cycle:backButton_clicked');
    }, this);
    this.view.events.on('view:saveButton_clicked', function() {
      this.model.save();
    }, this);

    this.model.events.on('model:changed', function(chartData) {
      this.view.update(chartData);
    }, this);
    this.model.events.on('model:updated', function() {
      this.view.updateOptions(this.model.getOptionsData());
    }, this);
  }

}

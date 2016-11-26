import ComponentController from '../components.controller';
import View from './chart_viewport.view';

/**
 * Component controller
 */
export default class ChartViewport extends ComponentController {

  /**
   * Create component
   * @param {HTMLElement} container - Append to element
   * @param {...Object} dataArray - Data array
   */
  constructor(container, ...dataArray) {
    super();

    this.dataArray = dataArray;
    this.dataArray.forEach((el) => {
      this.pushData(el.name, el.data);
    });

    this.view = new View(container, this.dataArray);

    this.render();
  }

  /**
   * Push data array to config
   * @param  {String} name - Chart name
   * @param  {Array} data - Data array
   */
  pushData(name, data) {
    const COLUMN = 'column';
    const PIE = 'pie';

    const conf = this.findDataByName(name).conf;
    let placeToPush;

    switch (conf.chart.type) {
      case COLUMN:
        placeToPush = conf.hasOwnProperty('series') ?
          conf.series :
          (conf.series = []);
        break;

      case PIE:
        placeToPush = conf.series[0].hasOwnProperty('data') ?
          conf.series[0].data :
          (conf.series[0].data = []);
        break;
    }

    data.forEach((el) => {
      placeToPush.push(el);
    });
  }

  /**
   * Get data object from array by name
   * @param  {String} name - Chart name
   * @return {Object} Data object
   */
  findDataByName(name) {
    return this.dataArray.filter((element) => element.name === name)[0];
  }

}

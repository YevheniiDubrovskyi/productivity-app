import ComponentModel from '../components.model';

/**
 * Component model
 */
export default class Model extends ComponentModel {

  /**
   * Create component model
   * @param {Array} data - Data array
   */
  constructor(data) {
    super(data);
  }

  /**
   * Change data for chart by chart name
   * @param {String} name - Chart name
   * @param {Array} newDataArray - New data array which will replace old data array
   */
  changeDataByChartName(name, newDataArray) {
    this.getChartData(name).data = newDataArray.slice();
  }

  /**
   * Get compiled config with data by name
   * @param {String} name - Chart name
   * @return {Object} Compiled config ready to use in Highcharts
   */
  getConf(name) {
    const chartData = this.getChartData(name);
    return this.pushDataToConf(chartData.name, chartData.data, chartData.config);
  }

  /**
   * Push data to config (Highcharts requirement)
   * @param  {String} name - Chart name
   * @param  {Array} dataArray - Data array
   * @param {Object} pureConfig - Pure config without data
   * @return {Object} Config object with data
   */
  pushDataToConf(name, dataArray, pureConfig) {
    const COLUMN = 'column';
    const PIE = 'pie';

    let compiledConfig = JSON.parse(JSON.stringify(pureConfig));
    let placeToPush;

    switch (compiledConfig.chart.type) {
      case COLUMN:
        placeToPush = compiledConfig.hasOwnProperty('series') ?
          compiledConfig.series :
          (compiledConfig.series = []);
        break;

      case PIE:
        placeToPush = compiledConfig.series[0].hasOwnProperty('data') ?
          compiledConfig.series[0].data :
          (compiledConfig.series[0].data = []);
        break;
    }

    dataArray.forEach((el) => {
      placeToPush.push(el);
    });

    return compiledConfig;
  }


  /**
   * Get chart data by name
   * @param  {String} name - Chart name
   * @return {Object} Chart data object
   */
  getChartData(name) {
    return this.dataStatic.filter((el) => el.name === name)[0];
  }

  /**
   * Filter each array object
   * @return {Array} Pure data array for Tabs
   */
  get dataForTabs() {
    return this.dataStatic.map((el) => {
      return {
        name: el.name,
        active: el.active
      };
    });
  }

}

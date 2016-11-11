import Template from './template.js';
import Highcharts from 'highcharts/highstock';

export default class ChartViewPort {

  constructor(elementID, stylesObj, ...dataArr) {
    this.elementID = elementID;
    this.dataArr = dataArr;

    this.template = new Template(elementID, stylesObj, this.dataArr);

    this.dataArr.forEach((el) => {
      this.pushData(el.name, el.data);
    });

    this.template.controlsList.addEventListener('click', (event) => {
      const name = event.target.getAttribute('data-chart');

      if (name === this.active) return;

      this.active = name;
      this.render();
    });
  }

  get markup() {
    return this.template.markup;
  }

  set active(name) {
    this.template.active.classList.remove('active');
    this.template.getButton(name).classList.add('active');
  }

  get active() {
    return this.template.active.getAttribute('data-chart');
  }

  render() {
    this.showChart(this.active);
  }

  showChart(name) {
    Highcharts.chart(this.elementID, this.findDataByName(name).conf);
  }

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

  findDataByName(name) {
    const length = this.dataArr.length;
    let i = -1;

    while (++i < length) {
      if (this.dataArr[i].name === name) {
        return this.dataArr[i];
      }
    }
  }

}

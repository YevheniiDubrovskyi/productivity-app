import Highcharts from 'highcharts/highstock';

export default class ChartViewPort {

  constructor(elementID, elementStyles, insertPos, ...dataArr) {
    this.elementID = elementID;
    this.elementStyles = elementStyles;
    this.insertPos = insertPos;
    this.dataArr = dataArr;

    // Create and insert viewport and controls
    // Push initial data to charts
    // Render active chart
    this.insertComponent();
    this.dataArr.forEach((el) => {
      this.pushData(el.name, el.data);
    });
    this.render();

    this.controlsList.addEventListener('click', (event) => {
      const name = event.target.getAttribute('data-chart');

      if (name === this.active) return;

      this.active = name;
      this.render();
    });
  }

  // Get string name of chart and set it to active state
  set active(name) {
    Array.from(this.controlsList.children, (el) => {
      el.children[0].classList.remove('active');
    });

    this.controlsList.querySelector(`[data-chart=${name}]`).classList.add('active');
  }

  // Return string name of active chart
  get active() {
    return this.controlsList.querySelector('[data-chart].active').getAttribute('data-chart');
  }

  // Shows active chart depends on active tab
  render() {
    this.showChart(this.active);
  }

  // Invoke highchart
  showChart(name) {
    Highcharts.chart(this.elementID, this.findDataByName(name).conf);
  }

  // Recieve name, and data. Insert new data
  pushData(name, data) {
    // Does it make sense?
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

  // Return view port element
  createViewPort() {
    let viewport = document.createElement('div');

    for (let styleName in this.elementStyles) {
      viewport.style[styleName] = this.elementStyles[styleName];
    }
    viewport.setAttribute('id', this.elementID);

    return viewport;
  }

  // Return controls element
  createControls() {
    let controlsList = document.createElement('ul');

    controlsList.classList.add('tabs-list');
    controlsList.setAttribute('data-chart-controls', '');
    this.dataArr.forEach((el, i) => {
      if (i === 0) {
        controlsList.appendChild( createItem(el.name, true) );
      } else {
        controlsList.appendChild( createItem(el.name) );
      }
    });

    return controlsList;

    function createItem(name, activeFlag = false) {
      let item = document.createElement('li');
      let button = document.createElement('button');

      item.classList.add('tabs-list__item');
      button.classList.add('tabs-list__item-btn');
      button.setAttribute('type', 'button');
      button.setAttribute('data-chart', name);
      button.appendChild( document.createTextNode(capitalize(name)) );
      if (activeFlag) {
        button.classList.add('active');
      }
      item.appendChild(button);

      return item;
    }

    function capitalize(string) {
      return string.slice(0,1).toUpperCase() + string.slice(1);
    }
  }

  // Insert viewport and controls before some element
  insertComponent() {
    let parent = document.querySelector(this.insertPos.parent);
    let insertBefore = document.querySelector(this.insertPos.insertBefore);
    let viewport = this.createViewPort();

    this.controlsList = this.createControls();
    parent.insertBefore(this.controlsList, insertBefore);
    parent.insertBefore(viewport, insertBefore);
  }
}

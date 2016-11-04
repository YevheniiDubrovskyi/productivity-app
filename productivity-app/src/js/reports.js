(function scope(window) {

  // -------------------------
  // DATA
  // -------------------------

  const priority = {
    pie: ['Urgent', 'Failed', 'High', 'Middle', 'Low'],
    column: ['Urgent', 'High', 'Middle', 'Low', 'Failed'],
  };

  let dayData = [
    {
      y: 2,
      color: '#df5446',
    },
    {
      y: 3,
      color: '#8da5b8',
    },
    {
      y: 6,
      color: '#e79a3c',
    },
    {
      y: 4,
      color: '#fcdb43',
    },
    {
      y: 3,
      color: '#1aba9b',
    },
  ];

  let weekData = [
    {
      data: [3, 1, 2, 7, 2],
      stack: 'Done',
      color: '#f15a4a',
    },
    {
      data: [2, 4, 2, 1, 1],
      stack: 'Done',
      color: '#fea741',
    },
    {
      data: [1, 1, 1, 1, 1],
      stack: 'Done',
      color: '#fddc43',
    },
    {
      data: [4, 2, 1, 1, 6],
      stack: 'Done',
      color: '#1abb9b',
    },
    {
      data: [6, 2, 4, 4, 2],
      stack: 'Failed',
      color: '#8da5b8',
    },
  ];

  let monthData = [
    {
      data: [3, 1, 2, 7, 2, 5, 3, 2, 1, 3, 4, 5, 6, 7, 3, 2, 1, 2, 3, 4, 2, 3, 5, 3, 4, 5 ,6 ,2 ,3, 6, 5],
      stack: 'Done',
      color: '#f15a4a',
    },
    {
      data: [3, 2, 5, 1, 2, 3, 1, 4, 6, 2, 1, 2, 4, 6, 2, 1, 2, 3, 2, 2, 1, 6, 2, 1, 3, 2 ,2 ,2 ,1, 3, 1],
      stack: 'Done',
      color: '#fea741',
    },
    {
      data: [1, 1, 1, 1, 1, 3, 4, 2, 1, 2, 3, 2, 1, 4, 2, 1, 1, 4, 3, 2, 2, 1, 3, 4, 3, 2, 1, 3, 4, 2 ,3],
      stack: 'Done',
      color: '#fddc43',
    },
    {
      data: [1, 2, 1, 1, 1, 3, 2, 2, 1, 2, 3, 2, 1, 2, 2, 1, 1, 2, 3, 2, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2 ,3],
      stack: 'Done',
      color: '#1abb9b',
    },
    {
      data: [1, 2, 1, 1, 1, 1, 3, 2, 1, 2, 3, 2, 1, 2, 2, 1, 3, 2, 3, 2, 2, 1, 2, 1, 2, 2, 1, 2, 1, 1 ,2],
      stack: 'Done',
      color: '#8da5b8',
    },
  ];

  // -----------------
  // CONFIGS
  // -----------------

  let dayConf = {
    credits: {
      enabled: false,
    },
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
      backgroundColor: 'transparent',
    },
    title: {
      text: '8',
      verticalAlign: 'middle',
      y: 15,
      style: {
        fontFamily: 'Roboto',
        fontSize: '70px',
        color: '#fff',
      },
    },
    subtitle: {
      text: 'total',
      verticalAlign: 'middle',
      y: 37,
      style: {
        fontFamily: 'Roboto',
        color: '#fff',
        fontSize: '18px',
      },
    },
    tooltip: {
      pointFormat: '{series.name}: {point.y}',
      shadow: false,
      style: {
        backgroundColor: '#fff',
        opacity: 0.9,
        border: 'none',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: false,
        cursor: 'pointer',
        borderWidth: null,
        dataLabels: {
          enabled: true,
          distance: -35,
          format: '<b>{point.name}</b>',
          style: {
            fontFamily: 'PT Sans',
            color: 'white',
            fontSize: '14px',
            fontWeight: 'bold',
            textShadow: 'none',
          },
        },
      },
    },
    series: [{
      name: 'Tasks',
      colorByPoint: true,
      size: 265,
      innerSize: 123,
      shadow: {
        color: 'rgba(0,0,0,0.3)',
        width: 15,
      },
      states: {
        hover: {
          halo: {
            attributes: {
              fill: '#fff',
            },
            opacity: 0.8,
          },
        },
      },
      // data : browserData
    }],
  };

  let weekConf = {
    credits: {
      enabled: false,
    },

    chart: {
      type: 'column',
      backgroundColor: 'transparent',
      plotBorderWidth: null,
    },

    title: {
      text: null,
    },

    xAxis: {
      categories: ['MON', 'TUE', 'WED', 'THU', 'FRI'],
      labels: {
        style: {
          color: '#fff',
          fontSize: 11,
          fontFamily: 'Roboto',
        },
      },
    },

    yAxis: {
      min: 0,
      step: 2,
      max: 10,
      gridLineColor: '#345168',
      lineColor: '#fff',
      lineWidth: 1,
      title: {
        text: null,
      },
      tickInterval: 2,
      labels: {
        style: {
          color: '#fff',
          fontSize: 11,
          fontFamily: 'Roboto',
        },
      },
    },

    legend: {
      symbolRadius: 0,
      symbolHeight: 8,
      y: -30,
      itemMarginTop: 25,
      itemDistance: 5,
      itemStyle: {
        fontFamily: 'Roboto',
        fontSize: 11,
        color: '#8da5b8',
      },
      itemHoverStyle: {
        color: '#fff',
      },
    },

    tooltip: {
      formatter: function () {
        return `<b>${this.series.name}</b><br/>Tasks: ${this.y}`;
      },
    },

    plotOptions: {
      column: {
        stacking: 'normal',
        borderWidth: 0,
      },
    },
  };

  let monthConf = {
    credits: {
      enabled: false,
    },

    chart: {
      type: 'column',
      backgroundColor: 'transparent',
      plotBorderWidth: null,
    },

    title: {
      text: null,
    },

    xAxis: {
      tickInterval: 1,
      labels: {
        style: {
          color: '#fff',
          fontSize: 11,
          fontFamily: 'Roboto',
        },
      },
    },

    yAxis: {
      min: 0,
      gridLineColor: '#345168',
      lineColor: '#fff',
      lineWidth: 1,
      title: {
        text: null,
      },
      tickInterval: 2,
      labels: {
        style: {
          color: '#fff',
          fontSize: 11,
          fontFamily: 'Roboto',
        },
      },
    },

    legend: {
      symbolRadius: 0,
      symbolHeight: 8,
      y: -30,
      itemMarginTop: 25,
      itemDistance: 5,
      itemStyle: {
        fontFamily: 'Roboto',
        fontSize: 11,
        color: '#8da5b8',
      },
      itemHoverStyle: {
        color: '#fff',
      },
    },

    tooltip: {
      formatter: function () {
        return `<b>${this.series.name}</b><br/>Tasks: ${this.y}`;
      },
    },

    plotOptions: {
      column: {
        stacking: 'normal',
        borderWidth: 0,
      },
    },
  };

  // --------------------
  // ChartViewPort class
  // --------------------

  class ChartViewPort {

    constructor(chartViewPort, ...data) {
      this.chartViewPort = document.getElementById(chartViewPort);
      this.controlsList = document.querySelector('[data-chart-controls]');
      this.data = data;

      this.controlsList.addEventListener('click', (event) => {
        const name = event.target.getAttribute('data-chart');

        if (name === this.active) return;

        this.active = name;
        this.render();
      });
    }

    // Shows active chart depends on active tab
    render() {
      this.showChart(this.active);
    }

    // Invoke highchart
    showChart(name) {

    }

    // Get string name of chart and set it to active state
    set active(name) {
      Array.from(this.controlsList.children, el =>
        el.children[0].classList.remove('active')
      );
      this.controlsList.querySelector(`[data-chart=${name}]`).classList.add('active');
    }

    // Return string name of active chart
    get active() {
      return this.controlsList.querySelector('[data-chart].active').getAttribute('data-chart');
    }
  }

  // --------------------
  // LISTENERS
  // --------------------

  window.addEventListener('DOMContentLoaded', () =>
    new ChartViewPort(
      'chart',
      {
        chartName: 'day',
        chartData: dayData,
        chartConf: dayConf,
      },
      {
        chartName: 'week',
        chartData: weekData,
        chartConf: weekConf,
      },
      {
        chartName: 'month',
        chartData: monthData,
        chartConf: monthConf,
      }
    )
  );

}(this));

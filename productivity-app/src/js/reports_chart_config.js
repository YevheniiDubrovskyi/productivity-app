var dayChartConfig = {
  credits: {
    enabled: false
  },

  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie',
    backgroundColor: 'transparent'
  },

  title: {
    text: '8',
    verticalAlign: 'middle',
    y: 15,
    style: {
      fontFamily: 'Roboto',
      fontSize: '70px',
      color: '#fff'
    }
  },

  subtitle: {
    text: 'total',
    verticalAlign: 'middle',
    y: 37,
    style: {
      fontFamily: 'Roboto',
      color: '#fff',
      fontSize: '18px'
    }
  },

  tooltip: {
    useHTML: true,
    formatter: function () {
      return `<b>${this.point.name.toUpperCase()}</b><br/>Tasks: ${this.y}`;
    },
    shadow: false,
    borderWidth: 0,
    style: {
      backgroundColor: '#fff',
      opacity: 0.9,
      border: '1px solid #4c6374',
      fontFamily: 'Roboto'
    }
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
          textShadow: 'none'
        }
      }
    }
  },

  series: [{
    name: 'Tasks',
    colorByPoint: true,
    size: 265,
    innerSize: 123,
    shadow: {
      color: 'rgba(0,0,0,0.3)',
      width: 15
    },
    states: {
      hover: {
        halo: {
          attributes: {
            fill: '#fff'
          },
          opacity: 0.8
        }
      }
    },
  }]
};

var weekChartConfig = {
  credits: {
    enabled: false
  },

  chart: {
    type: 'column',
    backgroundColor: 'transparent',
    plotBorderWidth: null
  },

  title: {
    text: null
  },

  xAxis: {
    categories: ['MON', 'TUE', 'WED', 'THU', 'FRI'],
    labels: {
      style: {
        color: '#fff',
        fontSize: 11,
        fontFamily: 'Roboto'
      }
    },
    tickWidth: 0
  },

  yAxis: {
    min: 0,
    step: 2,
    max: 10,
    gridLineColor: '#345168',
    lineColor: '#fff',
    lineWidth: 1,
    title: {
      text: null
    },
    tickInterval: 2,
    labels: {
      style: {
        color: '#fff',
        fontSize: 11,
        fontFamily: 'Roboto'
      }
    }
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
      color: '#8da5b8'
    },
    itemHoverStyle: {
      color: '#fff'
    }
  },

  tooltip: {
    useHTML: true,
    shadow: false,
    borderWidth: 0,
    style: {
      backgroundColor: '#fff',
      opacity: 0.9,
      border: '1px solid #4c6374',
      fontFamily: 'Roboto',
      fontSize: 12
    },
    formatter: function () {
      return `<b>${this.series.name.toUpperCase()}</b><br/>Tasks: ${this.y}`;
    }
  },

  plotOptions: {
    column: {
      stacking: 'normal',
      borderWidth: 0
    }
  },
};

var monthChartConfig = {
  credits: {
    enabled: false
  },

  chart: {
    type: 'column',
    backgroundColor: 'transparent',
    plotBorderWidth: null
  },

  title: {
    text: null
  },

  xAxis: {
    min: 1,
    tickInterval: 1,
    tickColor: 'transparent',
    labels: {
      style: {
        color: '#fff',
        fontFamily: 'Roboto'
      }
    }
  },

  yAxis: {
    min: 0,
    gridLineColor: '#345168',
    lineColor: '#fff',
    lineWidth: 1,
    title: {
      text: null
    },
    tickInterval: 1,
    labels: {
      style: {
        color: '#fff',
        fontSize: 11,
        fontFamily: 'Roboto'
      }
    }
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
      color: '#8da5b8'
    },
    itemHoverStyle: {
      color: '#fff'
    }
  },

  tooltip: {
    useHTML: true,
    shadow: false,
    borderWidth: 0,
    style: {
      backgroundColor: '#fff',
      opacity: 0.9,
      border: '1px solid #4c6374',
      fontFamily: 'Roboto',
      fontSize: 12
    },
    formatter: function () {
      return `<b>${this.series.name.toUpperCase()}</b><br/>Tasks:${this.y}`;
    }
  },

  plotOptions: {
    column: {
      stacking: 'normal',
      borderWidth: 0
    }
  },
};

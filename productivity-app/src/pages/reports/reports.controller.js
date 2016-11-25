import ChartViewPort from '../components/chart_view_port/main';
import {dayChartConfig, weekChartConfig, monthChartConfig} from './reports_config';
import {dayChartData, weekChartData, monthChartData} from './reports_data';

window.addEventListener('DOMContentLoaded', () => {
  const parent = document.querySelector('.main');
  const insertBeforeElement = document.querySelector('.tabs-list-bottom');

  const chartViewPort = new ChartViewPort(
    'chart',
    {
      width: '53%',
      height: '20rem',
      margin: '0 auto',
    },
    {
      name: 'day',
      data: dayChartData,
      conf: dayChartConfig,
    },
    {
      name: 'week',
      data: weekChartData,
      conf: weekChartConfig,
    },
    {
      name: 'month',
      data: monthChartData,
      conf: monthChartConfig,
    });

  parent.insertBefore(chartViewPort.markup, insertBeforeElement);
  chartViewPort.render();
});

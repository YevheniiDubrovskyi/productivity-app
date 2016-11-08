import ChartViewPort from '../components/chart_view_port/main';
import {dayChartConfig, weekChartConfig, monthChartConfig} from './reports_config';
import {dayChartData, weekChartData, monthChartData} from './reports_data';

window.addEventListener('DOMContentLoaded', () => {
  new ChartViewPort(
    'chart',
    {
      width: '53%',
      height: '20rem',
      margin: '0 auto',
    },
    {
      parent: '.main',
      insertBefore: '.tabs-list-bottom',
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
    }
  );
});

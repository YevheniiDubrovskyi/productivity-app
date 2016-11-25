import PageView from '../pages.view';
import Template from './reports.template';
import ChartViewport from '../../components/chart_viewport/chart_viewport.controller';
import {dayChartConfig, weekChartConfig, monthChartConfig} from './reports.config';
import {dayChartData, weekChartData, monthChartData} from './reports.data';

/**
 * Page view
 */
export default class View extends PageView {

  /**
   * Create page view
   * @param  {HTMLElement} viewport - Append to element
   */
  constructor(viewport) {
    super(viewport);
    this.template = new Template();

    // this.domEventsList.push({
    //   element: viewport.querySelector('.some_btn'),
    //   eventName: 'click',
    //   callback: function someFunction() {}
    // });
  }

  /**
   * Render page template and components
   */
  render() {
    this.viewport.appendChild(this.markup);
    this.createComponents();
    super.render(); // Attach page DOM events if exist
  }

  get markup() {
    return this.template.markup;
  }

  /**
   * Create page components
   */
  createComponents() {
    const chartViewport = new ChartViewport(
      this.markup.querySelector('.main'),
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

    this.componentsList.push(chartViewport);
  }

}

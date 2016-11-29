import PageView from '../pages.view';
import Template from './reports.template';
import './reports.css';

import ChartViewport from '../../components/chart_viewport/chart_viewport.controller';
import Tabs from '../../components/tabs/tabs.controller';

import {dayChartConfig, weekChartConfig, monthChartConfig} from './reports.config';
import {dayChartData, weekChartData, monthChartData, tempTabsData} from './reports.data';

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
  }

  /**
   * Render page template and components
   */
  render() {
    this.viewport.appendChild(this.markup);
    this.createComponents();
    super.render(); // Attach page DOM events if exist
  }

  /**
   * Create page components
   */
  createComponents() {
    const chartViewport = new ChartViewport(
      this.markup.querySelector('.main'),
      {
        name: 'day',
        active: true,
        data: dayChartData,
        conf: dayChartConfig,
      },
      {
        name: 'week',
        active: false,
        data: weekChartData,
        conf: weekChartConfig,
      },
      {
        name: 'month',
        active: false,
        data: monthChartData,
        conf: monthChartConfig,
      });
    this.componentsList.push(chartViewport);

    const bottomTabs = new Tabs(true,
                                this.markup.querySelector('.main'),
                                '',
                                ...tempTabsData);
    bottomTabs.addClassToRoot('tabs-list-bottom');
    this.componentsList.push(bottomTabs);
  }

}

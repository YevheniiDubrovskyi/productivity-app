import PageView from '../pages.view';
import Template from './settings.template';
import './settings.css';

import utils from '../../utils/utils';

import Cycle from '../../components/cycle/cycle.controller';
import Tabs from '../../components/tabs/tabs.controller';

import {settingsData, tempTabsData} from './settings.data';

/**
 * Page view
 */
export default class View extends PageView {

  /**
   * Create page view
   * @param {HTMLElement} viewport - Append to element
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
    const cycle = new Cycle(this.markup.querySelector('.main'),
                            ...settingsData);
    this.componentsList.push(cycle);

    const topTabs = new Tabs(true,
                             this.markup.querySelector('.aside'),
                             '',
                             ...tempTabsData);

    topTabs.events.on('tabs:changed', function(name) {
      this.subHeader = name;
    }, this);
    topTabs.addClassToRoot('settings-tabs');

    this.componentsList.push(topTabs);
  }

  /**
   * Set sub header
   * @param  {String} name - Tab name
   */
  set subHeader(name) {
    this.markup.querySelector('.header-sub').innerHTML = `${utils.capitalize(name)} settings`;
  }

}

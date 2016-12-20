import PageView from '../pages.view';
import Template from './settings.template';
// import './settings.less';

import utils from '../../utils/utils';

import Categories from '../../components/categories/categories.controller';
import Controls from '../../components/controls/controls.controller';
import {defaultControlsData} from '../../components/controls/controls.data';
import Cycle from '../../components/cycle/cycle.controller';
import Tabs from '../../components/tabs/tabs.controller';
import {tabsData} from './settings.data';

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
    this.slides = {
      firstTime: false,
    };
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
    const viewport = this.markup.querySelector('.viewport');
    const aside = this.markup.querySelector('.aside');

    const cycle = new Cycle(viewport);
    cycle.setDataAttr('slide', 'pomodoros');
    cycle.events.on('cycle:backButton_clicked', function() {
      this.events.trigger('view:backButton_clicked');
    }, this);
    this.slides.pomodoros = cycle;
    this.componentsList.push(cycle);

    const categories = new Categories(viewport);
    categories.inlineStyles = 'opacity: 0;';
    categories.setDataAttr('slide', 'categories');
    categories.events.on('categories:backButton_clicked', function() {
      this.events.trigger('view:backButton_clicked');
    }, this);
    this.slides.categories = categories;
    const topControls = new Controls(aside,
                                     ...defaultControlsData);
    topControls.setActive('settings');
    topControls.events.on('controls:clicked', function(alias) {
      this.events.trigger('view:controls_clicked', alias);
    }, this);
    this.componentsList.push(topControls);

    const topTabs = new Tabs(true,
                             aside,
                             '',
                             ...tabsData);
    topTabs.events.on('tabs:changed', function(name) {
      this.setSubHeader(name);
      this.showInViewport(name);
    }, this);
    topTabs.addClassToRoot('settings-tabs');
    this.componentsList.push(topTabs);
  }

  /**
   * Show
   * @param nam
   */
  showInViewport(name) {
    const percents = {
      'pomodoros': {
        'pomodoros': '0%',
        'categories': '150%',
      },
      'categories': {
        'pomodoros': '-150%',
        'categories': '0%',
      }
    };

    utils.slide(this.slides.pomodoros, this.animationFlag, percents[name]['pomodoros']);
    utils.slide(this.slides.categories, this.animationFlag, percents[name]['categories']);
    this.animationFlag = this.animationFlag ? this.animationFlag : true;
  }

  /**
   * Set sub header
   * @param  {String} name - Tab name
   */
  setSubHeader(name) {
    this.markup.querySelector('.header-sub').innerHTML = `${utils.capitalize(name)} settings`;
  }

}

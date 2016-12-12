import PageView from '../pages.view';
import Template from './task_list.template';
// import './task_list.less';

import Controls from '../../components/controls/controls.controller';
import TaskList from '../../components/task_list/task_list.controller';

/**
 * Page view
 */
export default class View extends PageView {

  /**
   * Create page view
   * @param {HTMLELement} viewport - Append to element
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
    super.render();
  }

  /**
   * Create page components
   */
  createComponents() {
    const headerControls = new Controls(
      this.markup.querySelector('.header'),
      {
        alias: 'add',
        icon: '&#xe900;',
        type: 'common',
        active: false,
        visible: false
      },
      {
        alias: 'remove',
        icon: '&#xe912;',
        type: 'counter',
        active: false,
        visible: false
      },
      {
        alias: 'reports',
        icon: '&#xe90c;',
        type: 'common',
        active: false,
        visible: true
      },
      {
        alias: 'settings',
        icon: '&#xe90b;',
        type: 'common',
        active: false,
        visible: true
      },
      {
        alias: 'signOut',
        icon: '&#xe908;',
        type: 'common',
        visible: true
      });

    headerControls.events.on('controls:clicked', function(alias) {
      console.log(alias);
    }, this);

    this.componentsList.push(headerControls);

  }

}

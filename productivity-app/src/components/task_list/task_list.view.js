import ComponentView from '../components.view';
import Template from './task_list.template';
// import './task_list.less';

import Task from '../task/task.controller';
import Tabs from '../tabs/tabs.controller';

/**
 * Component view
 */
export default class View extends ComponentView {

  /**
   * Create component view
   * @param {HTMLElement} container - Append to element
   */
  constructor(container) {
    super(container);
  }

  /**
   * Render component
   */
  render() {
    this.template = new Template();

    this.container.appendChild(this.markup);
    this.createComponents();
    super.render();
  }

  /**
   * Create inner components
   */
  createComponents() {}

}

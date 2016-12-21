import ComponentView from '../components.view';
import Template from './task_list.template';
// import './task_list.less';

import dataService from '../../services/data.service';

import Task from '../task/task.controller';
import Tabs from '../tabs/tabs.controller';
import {messagesData, mainFilterTabsData, selectionTabsData} from './task_list.data';

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
    this.template = new Template(messagesData);

    this.container.appendChild(this.markup);
    this.createComponents();
    this.setStatesForMessages();
    super.render();
  }

  /**
   * Create inner components
   */
  createComponents() {
    dataService.getData('priority').once('priority:getData', function(data) {
      const tabsData = data.map((element) => {
        return {
          name: element.title,
          active: false
        }
      });
      tabsData.unshift({
        name: 'all',
        active: true
      });

      const priorityFilterTabs = new Tabs(true,
                                          this.markup.querySelector('.global-tasks .task-list-block-controls'),
                                          '',
                                          ...tabsData);
      this.hideOnStates(priorityFilterTabs, ['init']);
      this.componentsList.push(priorityFilterTabs);

      this.events.trigger('view:rendered');
    }, this);

    const mainFilterTabs = new Tabs(true,
                                    this.markup.querySelector('.daily-tasks .task-list-block-controls'),
                                    '',
                                    ...mainFilterTabsData);
    this.hideOnStates(mainFilterTabs, ['init']);
    this.componentsList.push(mainFilterTabs);
  }

  /**
   * Set states for messages
   */
  setStatesForMessages() {
    const firstTaskMessage = this.markup.querySelector('.first-task');
    const dragToTopMessage = this.markup.querySelector('.drag-to-top');
    const allDoneMessage = this.markup.querySelector('.all-done');

    // this.hideOnStates(firstTaskMessage, [''])
    this.hideOnStates(dragToTopMessage, ['init']);
    this.hideOnStates(allDoneMessage, ['init']);
  }

  /**
   * Set component state. Fire events which listen by components
   * @param {string} state
   */
  setState(state) {
    this.events.trigger('view:state_changed', state);
  }

  /**
   * Subscribe on state change event and hide component on some states
   * @param {ComponentController | HTMLElement} component - Component or element which will be hide
   * @param {array} statesArray - Array of states(strings)
   */
  hideOnStates(component, statesArray) {
    const isElement = component instanceof HTMLElement;
    const hideStyle = 'display: none;';

    this.events.on('view:state_changed', function(state) {
      if (statesArray.includes(state)) {
        if (isElement) {
          component.style = hideStyle;
        } else {
          component.inlineStyles = hideStyle;
        }
        return;
      }

      if (isElement) {
        component.style = '';
      } else {
        component.inlineStyles = '';
      }
    });
  }

}

import PageView from '../pages.view';
import Template from './task_list.template';
// import './task_list.less';

import utils from '../../utils/utils';

import Controls from '../../components/controls/controls.controller';
import {defaultControlsData} from '../../components/controls/controls.data';
import TaskList from '../../components/task_list/task_list.controller';
import Modal from '../../components/modal/modal.controller';

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
    this.createDOMHandlers();
    super.render();
  }

  /**
   * Create page components
   */
  createComponents() {
    const headerControls = new Controls(this.markup.querySelector('.header'),
                                        {
                                          alias: 'add',
                                          icon: '&#xe900;',
                                          type: 'common',
                                          visible: false
                                        },
                                        {
                                          alias: 'remove',
                                          icon: '&#xe912;',
                                          type: 'counter',
                                          visible: false
                                        },
                                        ...defaultControlsData);
    headerControls.events.on('controls:clicked', function(alias) {
      this.events.trigger('view:controls_clicked', alias);
    }, this);
    this.componentsList.push(headerControls);

    const taskList = new TaskList(this.markup.querySelector('.main'));
    taskList.events.on('taskList:edit_clicked', function(id, dataObject) {
      const modal = new Modal(this.viewport, { type: 'edit', data: dataObject });

      modal.events.on('modal:submit', function(updatedDataObject) {
        taskList.updateTask(id, updatedDataObject);
        modal.close();
      });
      modal.events.on('modal:remove', function() {
        taskList.removeTask(id);
        modal.close();
      });
    }, this);
    taskList.events.on('taskList:timer_clicked', function(id) {
      this.goToPage(`timer/${id}`);
    }, this);
    this.componentsList.push(taskList);

    headerControls.events.on('controls:clicked', function(alias) {
      if (alias === 'remove') taskList.toggleRemovingMode();
      if (alias === 'add') {
        const modal = new Modal(this.viewport);

        modal.events.on('modal:submit', function(dataObject) {
          taskList.addTask(dataObject);
          modal.close();
        });
      }
    }, this);
  }

  /**
   * Create DOM handlers which will be attach when render will be fire
   */
  createDOMHandlers() {
    const taskList = this.componentsList.filter(component => component instanceof TaskList)[0];
    const addButtonHandler = (event) => {
      const modal = new Modal(this.viewport);

      modal.events.on('modal:submit', function(dataObject) {
        taskList.addTask(dataObject);
        modal.close();
      });
    };

    this.domEventsList.push({
      element: this.markup.querySelector('.main-top-add-btn'),
      eventName: 'click',
      callback: addButtonHandler
    });
  }

}

import PageView from '../pages.view';
import Template from './task_list.template';
// import './task_list.less';

// import Controls from '../../components/controls/controls.controller';
// import TaskList from '../../components/task_list/task_list.controller';
// import Modal from '../../components/modal/modal.controller';

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
    // this.createComponents();
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
        alias: 'signout',
        icon: '&#xe908;',
        type: 'common',
        visible: true
      });

    headerControls.events.on('controls:clicked', function(alias) {
      this.events.trigger('view:controls_clicked', alias);
    }, this);
    this.componentsList.push(headerControls);

    const taskList = new TaskList(this.markup.querySelector('.main'));

    taskList.events.on('taskList:edit_clicked', function(id, dataObject) {
      // TODO: change events for MODAL
      const modal = new Modal(this.viewport, dataObject);

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

    headerControls.events.on('controls:clicked', function(alias) {
      if (alias !== 'remove') return;

      taskList.toggleRemovingMode();
    });

    this.componentsList.push(taskList);
  }

}

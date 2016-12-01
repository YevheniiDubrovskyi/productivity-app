import Router from './router.js';

import './assets/css/reset.css';
import './assets/css/base.css';
import './assets/css/common.css';

const viewport = document.body;

const router = new Router(viewport,
  {
    page: 'login',
    pattern: '#!/login'
  },
  {
    page: 'reports',
    pattern: '#!/reports'
  },
  {
    page: 'settings',
    pattern: '#!/settings'
  },
  {
    page: 'task_list',
    pattern: '#!/',
    default: true
  },
  {
    page: 'timer',
    pattern: '#!/timer/:id'
  }
);

// const timer = new Timer(viewport);

// const taskList = new TaskList(viewport);

// const loginPage = new Login(viewport);

// const settingsPage = new Settings(viewport);

// const reportsPage = new Reports(viewport);

// const router = new Router(viewport,
//   {
//     name: 'reports',
//     controller: './pages/reports.controller',
//     url: '/reports'
//   }
// );

// let thisObj = {
//   test: 'This is this object',
//   method: function(...data) {
//     console.log(this.test, data);
//   }
// };

// router.events.on('model', (...data) => {
//   console.log('Model event, data: ', data);
// });
// router.events.on('model:remove', () => console.log('remove event'));
// router.events.on('model:add', thisObj.method, thisObj);

// router.events.trigger('model:add', 1, 2, 'some test string', 5);
// router.events.trigger('model:remove');
// router.events.off('model:add', thisObj.method);

// router.events.trigger('model:add', 'second test', 2, 'some test string', 5);
// router.events.trigger('model:remove');


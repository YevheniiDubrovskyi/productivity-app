import Router from './router.js';

import './assets/less/app.less';

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
    pattern: '#!/settings' // TODO: сделать необязательный параметр :tab?
  },
  {
    page: 'task_list',
    pattern: '#!',
    default: true
  },
  {
    page: 'timer',
    pattern: '#!/timer/:id'
  },
  {
    page: 'signout',
    pattern: '#!/signout'
  }
);


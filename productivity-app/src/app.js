import Router from './router.js';

const viewport = document.querySelector('.main');

const router = new Router(viewport,
  {
    controller: './pages/reports.controller',
    url: '/reports'
  },
  {
    controller: './pages/settings_pom.controller',
    url: '/settings_pom'
  }
);

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


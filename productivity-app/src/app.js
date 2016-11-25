import Router from './router.js';
import Reports from './pages/reports/reports.controller';
import './assets/css/reset.css';
import './assets/css/base.css';
import './assets/css/common.css';

const viewport = document.body;

new Reports(viewport);

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


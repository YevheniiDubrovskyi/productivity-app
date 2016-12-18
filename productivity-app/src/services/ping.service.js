import EventBus from '../utils/eventbus';

const pingService = {
  events: new EventBus(),

  hasConnection() {
    return navigator.onLine;
  }

  // url: 'http://placehold.it/64x64',
  //
  // hasConnection() {
  //   return new Promise((resolve, reject) => {
  //     const img = new Image();
  //
  //     setTimeout(() => {
  //       reject(new Error('Timeout'));
  //     }, 3000);
  //
  //     img.onload = function() {
  //       resolve();
  //     };
  //
  //     img.onerror = function() {
  //       reject(new Error('Network Error'));
  //     };
  //
  //     img.src = this.url;
  //   });
  // }
};

window.addEventListener('offline', () => {
  pingService.events.trigger('offline')
});
window.addEventListener('online', () => {
  pingService.events.trigger('online');
});

export default pingService;

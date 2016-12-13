import Promise from 'bluebird';

const pingService = {
  url: 'http://placehold.it/64x64',

  hasConnection() {
    return new Promise((resolve, reject) => {
      const img = new Image();

      setTimeout(() => {
        reject(new Error('Timeout'));
      }, 3000);

      img.onload = function() {
        resolve();
      };

      img.onerror = function() {
        reject(new Error('Network Error'));
      };

      img.src = this.url;
    });
  }

};

export default pingService;

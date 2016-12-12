import Promise from 'bluebird';

const pingService = {
  url: 'https://unsplash.it/200',

  hasConnection() {
    return new Promise((resolve, reject) => {
      const img = new Image();

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

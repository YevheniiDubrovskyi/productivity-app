import EventBus from '../utils/eventbus';
import firebaseService from './firebase.service.js';
import localStorageService from './localstorage.service.js';
import pingService from './ping.service';

// TODO: Переделать так чтобы при выходе из офлайна данные синхронились с firebase

const dataService = {
  events: new EventBus(),

  /**
   * Get data from firebase and copy to localStorage
   * then fire event. If offline mode on, data copies only from storage.
   * @param {string} modelName
   * @return {EventBus} dataService event bus
   */
  getData(modelName) {
    const UID = localStorageService.getItem('session').uid;

    if (pingService.hasConnection()) {
      firebaseService.getItem(`${modelName}/${UID}`)
        .then((data) => {
          if (data) {
            localStorageService.events.once(`${modelName}:changed`, function(data) {
              this.events.trigger(`${modelName}:getData`, data);
            }, this);
            localStorageService.setItem(modelName, data);
          } else {
            this.events.trigger(`${modelName}:getData`, localStorageService.getItem(modelName));
          }
        })
        .catch((err) => {
          this.events.trigger(`${modelName}:getData`, localStorageService.getItem(modelName) || err);
        });
    } else {
      setTimeout(() => {
        this.events.trigger(`${modelName}:getData`, localStorageService.getItem(modelName));
      }, 10);
    }

    return this.events;
  },

  /**
   * Set data to firebase and localstorage
   * @param {string} modelName
   * @param {object} data
   */
  setData(modelName, data) {
    const UID = localStorageService.getItem('session').uid;

    if (pingService.hasConnection()) {
      firebaseService.setItem(modelName, { [UID]: data })
        .then(() => {
          localStorageService.setItem(modelName, data);
        })
        .catch((err) => {
          console.log('Set data error ', err);
        });
    } else {
      localStorageService.setItem(modelName, data);
    }
  },

  /**
   * Subscribe on firebase data change
   * @param {string} modelName
   * @return {EventBus} dataService event bus
   */
  subscribe(modelName) {
    const UID = localStorageService.getItem('session').uid;

    firebaseService.subscribe(`${modelName}/${UID}`).on(`${modelName}/${UID}:dataReceived`, function(data) {
      localStorageService.setItem(modelName, data);
      this.events.trigger(`${modelName}:dataReceived`, data);
    }, this);

    return this.events;
  }
};

export default dataService;

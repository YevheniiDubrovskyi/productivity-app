import EventBus from '../utils/eventbus';
import firebaseService from './firebase.service';
import localStorageService from './localstorage.service';
import pingService from './ping.service';

const loginService = {
  events: new EventBus(),

  /**
   * Check session existence
   * @return {boolean} Return session flag existence
   */
  hasSession() {
    const session = localStorageService.getItem('session');

    return session ? true : false;
  },

  /**
   * Sign in in system
   * @param  {string} email
   * @param  {string} password
   */
  signIn(email, password) {
    pingService.hasConnection()
      .then(() => {
        localStorageService.setItem('online', true);

        return firebaseService.signIn(email, password);
      }, (err) => {
        localStorageService.setItem('online', false);
      })
      .then(() => {
        localStorageService.signIn(email, password);
        this.events.trigger('signIn');
      }, (err) => {
        console.log(err);
      });
  },

  /**
   * Sign out from system
   */
  signOut() {
    if (localStorageService.getItem('online')) {
      firebaseService.signOut()
        .then(() => {
          localStorageService.signOut();
          localStorageService.events.on('session:removed', function() {
            this.events.trigger('signOut');
          }, this);
        })
        .catch((err) => {
          throw err;
        });

    } else {
      localStorageService.signOut();
      localStorageService.events.on('session:removed', function() {
        this.events.trigger('signOut');
      }, this);
    }
  }

};

export default loginService;

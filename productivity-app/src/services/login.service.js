import EventBus from '../utils/eventbus';
import firebaseService from './firebase.service';
import localStorageService from './localstorage.service';
import pingService from './ping.service';
import notificationService from './notification.service';

const loginService = {
  events: new EventBus(),

  /**
   * Check session existence
   * @return {boolean} Return session flag existence
   */
  hasSession() {
    return !!localStorageService.getItem('session');
  },

  /**
   * Sign in in system
   * @param  {string} email
   * @param  {string} password
   */
  signIn(email, password) {
    if (pingService.hasConnection()) {
      firebaseService.signIn(email, password)
        .then(() => {
          return firebaseService.getUID(email);
        }, (err) => {
          console.log(`Sign in failed: ${err}`);
        })
        .then((UID) => {
          localStorageService.signIn(email, password, UID);
          this.events.trigger('signIn:online');
        });
    } else {
      localStorageService.signIn(email, password);
      this.events.trigger('signIn:offline');
    }
  },

  /**
   * Sign out from system
   */
  signOut() {
    localStorageService.signOut();
    this.events.trigger('signOut');
  }

};

loginService.events.on('signOut', function() {
  this.showMessage('Sign out');
}, notificationService);

loginService.events.on('signIn', function(eventPath) {
  notificationService.showMessage(`Sign in, ${eventPath.split(':')[1]} mode`);

  if (!eventPath.includes('offline')) return;

  localStorageService.events.once('singOut', function() {
    this.signOut();
  }, firebaseService);

  pingService.events.once('online', function() {
    const session = localStorageService.getItem('session'),
          email = session.email,
          password = session.password;

    this.signIn(email, password)
      .then(() => {
        return this.getUID(email);
      }, (err) => {
        console.log(`Sign in failed: ${err}`);
      })
      .then((UID) => {
        localStorageService.signIn(email, password, UID);
        this.events.trigger('signIn:online');
      });
  }, firebaseService);
});

export default loginService;

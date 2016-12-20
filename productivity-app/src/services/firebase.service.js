import EventBus from '../utils/eventbus';
import * as firebase from 'firebase';

import utils from '../utils/utils';

const config = {
  apiKey: "AIzaSyBEVkdXAnPdAhzt1kuTPmnzInEPJNVKQUI",
  authDomain: "productivity-app-77742.firebaseapp.com",
  databaseURL: "https://productivity-app-77742.firebaseio.com",
  storageBucket: "productivity-app-77742.appspot.com",
  messagingSenderId: "44220553547"
};

const fb = firebase
  .initializeApp(config)
  .database()
  .ref();

const auth = firebase.auth();

const firebaseService = {
  events: new EventBus(),

  /**
   * Set item by path
   * @param {string} path
   * @param {object} value
   * @return {promise} Return promise which will be resolve when update will done
   */
  setItem(path, value) {
    return fb.child(path).update(value);
  },

  /**
   * Subscribe on data change
   * @param {string} path
   * @return {EventBus} firebaseService event bus
   */
  subscribe(path) {
    fb.child(path).on('value', (snapshot) => {
      this.events.trigger(`${path}:dataReceived`, snapshot.val());
    });

    return this.events;
  },

  /**
   * Get item by path
   * @param {string} path
   * @return {Promise} Promise which returns any value
   */
  getItem(path) {
    return fb.child(path).once('value')
      .then((snapshot) => {
        return snapshot.val();
      });
  },

  /**
   * Start sign in proccess
   * @param  {string} email
   * @param  {string} password
   * @return {promise} Promise that will be resolve on sign in
   */
  signIn(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  },

  /**
   * Get user UID by email
   * @param {string} email
   * @return {Promise} Promise which will return UID
   */
  getUID(email) {
    return this.getItem('users').then((val) => {
      let UID;

      for (let prop in val) {
        UID = val[prop] === email ? prop : UID;
      }

      if (!UID) throw new Error('getUID error: no id for such email');

      return UID;
    });
  },

  /**
   * Sign out
   * @return {promise} Promise that will be resolve on sign out
   */
  signOut() {
    return auth.signOut();
  }

};

export default firebaseService;

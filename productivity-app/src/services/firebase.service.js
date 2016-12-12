import EventBus from '../utils/eventbus';
import * as firebase from 'firebase';

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

  setItem(name, value) {},

  getItem(name, value) {},

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
   * Sign out
   * @return {promise} Promise that will be resolve on sign out
   */
  signOut() {
    return auth.signOut();
  }

};

export default firebaseService;

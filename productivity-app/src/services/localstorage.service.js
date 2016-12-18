import EventBus from '../utils/eventbus';
import utils from '../utils/utils';

const localStorageService = {
  events: new EventBus(),

  /**
   * Set item in local storage
   * @param {string} name - Item name
   * @param {*} value - Any value
   */
  setItem(name, value) {
    let variablesList = this.getItem('variablesList');

    if (variablesList) {
      if (!variablesList.includes(name)) {
        variablesList.push(name);
      }
    } else {
      variablesList = [name];
    }

    localStorage.setItem('variablesList', JSON.stringify(variablesList));
    localStorage.setItem(name, JSON.stringify(value));
    this.events.trigger(`${name}:changed`, value);
  },

  /**
   * Get item from local storage by name
   * @param  {string} name - Item name
   * @return {* | null} Finded data or null if nothing found
   */
  getItem(name) {
    const item = localStorage.getItem(name);

    return item ?
      JSON.parse(item) :
      null;
  },

  /**
   * Remove item by name
   * @param  {string} name - Item name
   */
  removeItem(name) {
    localStorage.removeItem(name);
    this.events.trigger(`${name}:removed`);
  },

  /**
   * Set session
   * @param  {string} email
   * @param  {string} password
   */
  signIn(email, password, uid = utils.getID()) {
    this.setItem('session', {email, password, uid});
  },

  /**
   * Remove all variables
   */
  signOut() {
    this.getItem('variablesList').forEach((name) => {
      this.removeItem(name);
    });

    this.removeItem('variablesList');
  }

};

export default localStorageService;

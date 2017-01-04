/**
 * Class representing custom events implementation
 */
export default class EventBus {

  /**
   * Create event bus
   */
  constructor() {
    this.events = Object.create(null);
  }

  /**
   * Attach listenter for some event
   * @param  {string} eventPath - The string containing two colon separated values
   * @param  {function} callback - Callback that will be called when event will be fired
   * @param  {object} [context] - Context that will be applied to callback
   * @return {object} this
   */
  on(eventPath, callback, context) {
    const parsedPath = this.parseEventPath(eventPath);
    const events = this.events;
    const namespace = parsedPath.namespace;
    const key = parsedPath.key;

    const callbackObject = {
      callback: callback,
      context: context
    };

    let namespaceCallbacks;

    if (!namespace) throw new Error('Event path don\'t have namespace part');

    if (!events[namespace]) {
      events[namespace] = {
        common: [],
        keys: Object.create(null)
      };
    }

    namespaceCallbacks = events[namespace];

    if (key) {
      if (namespaceCallbacks.keys[key]) {
        namespaceCallbacks.keys[key].push(callbackObject);
      } else {
        namespaceCallbacks.keys[key] = [callbackObject];
      }
    } else {
      namespaceCallbacks.common.push(callbackObject);
    }

    return this;
  }

  /**
   * Detach listener for some event
   * @param  {otring} eventPath - The string containing two colon separated values
   * @param  {function} callback - Callback that will be deleted from event bus
   * @return {object} this
   */
  off(eventPath, callback) {
    const parsedPath = this.parseEventPath(eventPath);
    const events = this.events;
    const namespace = parsedPath.namespace;
    const key = parsedPath.key;

    if (!namespace) throw new Error('Event path don\'t have namespace part');

    if (key) {
      this.deleteCallback(events[namespace].keys[key], callback);
    } else {
      this.deleteCallback(events[namespace].common, callback);
    }

    return this;
  }

  /**
   * Attach listener for some event which will be detached after first execution
   * @param  {string} eventPath - The string containing two colon separated values
   * @param  {function} callback - Callback that will be called when event will be fired
   * @param  {object} [context] - Context that will be applied to callback
   * @return {object} this
   */
  once(eventPath, callback, context) {
    const parsedPath = this.parseEventPath(eventPath);
    const namespace = parsedPath.namespace;

    if (!namespace) throw new Error('Event path don\'t have namespace part');

    function carryingCallback(...data) {
      setTimeout(callback.bind(context, ...data), 0);
      this.off(eventPath, carryingCallback);
    }

    this.on(eventPath, carryingCallback, this);

    return this;
  }

  /**
   * Delete callback from callback object array
   * @param  {array} callbackArray - Callback object array
   * @param  {function} callback - Callback that will be deleted
   */
  deleteCallback(callbackArray, callback) {
    let callbackIndex = -1;

    callbackArray.forEach((callbackObject, index) => {
      callbackIndex = callbackObject.callback === callback ?
        index :
        callbackIndex;
    });

    callbackIndex !== -1 && callbackArray.splice(callbackIndex, 1);
  }

  /**
   * Fire namespace and key events
   * @param  {string} eventPath - The string containing two colon separated values
   * @param  {...*} [data] - Data that will be passed in callbacks
   * @return {object} this
   */
  trigger(eventPath, ...data) {
    const parsedEventPath = this.parseEventPath(eventPath);
    const namespaceCallbacks = this.getNamespaceCallbacks(parsedEventPath.namespace);
    let keyCallbacks;

    if (namespaceCallbacks) {
      if ((keyCallbacks = this.getKeyCallbacks(namespaceCallbacks, parsedEventPath.key)) &&
          keyCallbacks.length
      ) {
        this.fireCallbacksArray(keyCallbacks, ...data);
      }

      this.fireCallbacksArray(namespaceCallbacks.common, eventPath, ...data);
    }

    return this;
  }

  /**
   * Fire each events from array
   * @param  {array} callbacksArray - Array with callbacks which will be fired
   * @param {...*} [data] - Data that will be passed in callbacks
   */
  fireCallbacksArray(callbacksArray, ...data) {
    callbacksArray.forEach((event) => {
      const callback = event.callback;
      const context = event.context;

      setTimeout(callback.bind(context, ...data), 0);
    });
  }

  /**
   * Parse event path
   * @param  {string} eventPath - The string containing two colon separated values
   * @return {object} parsedPath - Object that contains two properites namespace and key
   * @return {string} parsedPath.namespace - Event namespace
   * @return {string} parsedPath.key - Event specifactor
   */
  parseEventPath(eventPath) {
    const splitPath = eventPath.trim().split(':');
    return {
      namespace: splitPath[0],
      key: splitPath[1]
    };
  }

  /**
   * Return namespace object with callbacks
   * @param {string} namespace - Event namespace
   * @return {null | object} Null or namespaceCallbacks
   */
  getNamespaceCallbacks(namespace) {
    let namespaceCallbacks = this.events[namespace];

    return namespaceCallbacks ? namespaceCallbacks : null;
  }

  /**
   * Return array of objects with callbacks for some key
   * @param {object} namespaceCallbacks - Namespace callbacks object
   * @param {string} key - Event key
   * @return {null | array} Null or keyCallbacks
   */
  getKeyCallbacks(namespaceCallbacks, key) {
    const keyCallbacks = namespaceCallbacks.keys[key];

    return keyCallbacks ? keyCallbacks : null;
  }

}

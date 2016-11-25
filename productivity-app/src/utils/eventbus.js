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
   * @param  {String} eventPath - The string containing two colon separated values
   * @param  {Function} callback - Callback that will be called when event will be fired
   * @param  {Object} [context] - Context that will be applied to callback
   * @return {Object} this
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
   * @param  {String} eventPath - The string containing two colon separated values
   * @param  {Function} callback - Callback that will be deleted from event bus
   * @return {Object} this
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
   * Delete callback from callback object array
   * @param  {Array} callbackArray - Callback object array
   * @param  {Function} callback - Callback that will be deleted
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
   * @param  {String} eventPath - The string containing two colon separated values
   * @param  {...Object} [data] - Data that will be passed in callbacks
   * @return {Object} this
   */
  trigger(eventPath, ...data) {
    const parsedEventPath = this.parseEventPath(eventPath);
    let namespaceCallbacks;
    let keyCallbacks;

    if ((namespaceCallbacks = this.getNamespaceCallbacks(parsedEventPath.namespace)) &&
        (keyCallbacks = this.getKeyCallbacks(namespaceCallbacks, parsedEventPath.key)).length
    ) {
      this.fireCallbacksArray(keyCallbacks, data);
      this.fireCallbacksArray(namespaceCallbacks.common, data);
    }

    return this;
  }

  /**
   * Fire each events from array
   * @param  {Array} callbacksArray - Array with callbacks which will be fired
   */
  fireCallbacksArray(callbacksArray, data) {
    callbacksArray.forEach((event) => {
      const callback = event.callback;
      const context = event.context;

      setTimeout(callback.bind(context, ...data), 0);
    });
  }

  /**
   * Parse event path
   * @param  {String} eventPath - The string containing two colon separated values
   * @return {Object} parsedPath - Object that contains two properites namespace and key
   * @return {String} parsedPath.namespace - Event namespace
   * @return {String} parsedPath.key - Event specifactor
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
   * @param {String} namespace - Event namespace
   * @return {Null | Object} Null or namespaceCallbacks
   */
  getNamespaceCallbacks(namespace) {
    let namespaceCallbacks = this.events[namespace];

    return namespaceCallbacks ? namespaceCallbacks : null;
  }

  /**
   * Return array of objects with callbacks for some key
   * @param {Object} namespaceCallbacks - Namespace callbacks object
   * @param {String} key - Event key
   * @return {Null | Array} Null or keyCallbacks
   */
  getKeyCallbacks(namespaceCallbacks, key) {
    const keyCallbacks = namespaceCallbacks.keys[key];

    return keyCallbacks ? keyCallbacks : null;
  }

}
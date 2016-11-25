/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _router = __webpack_require__(1);
	
	var _router2 = _interopRequireDefault(_router);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var viewport = document.querySelector('.main');
	
	var router = new _router2.default(viewport, {
	  controller: './pages/reports.controller',
	  url: '/reports'
	}, {
	  controller: './pages/settings_pom.controller',
	  url: '/settings_pom'
	});
	
	// let thisObj = {
	//   test: 'This is this object',
	//   method: function(...data) {
	//     console.log(this.test, data);
	//   }
	// };
	
	// router.events.on('model', (...data) => {
	//   console.log('Model event, data: ', data);
	// });
	// router.events.on('model:remove', () => console.log('remove event'));
	// router.events.on('model:add', thisObj.method, thisObj);
	
	// router.events.trigger('model:add', 1, 2, 'some test string', 5);
	// router.events.trigger('model:remove');
	// router.events.off('model:add', thisObj.method);
	
	// router.events.trigger('model:add', 'second test', 2, 'some test string', 5);
	// router.events.trigger('model:remove');

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _eventbus = __webpack_require__(2);
	
	var _eventbus2 = _interopRequireDefault(_eventbus);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Router = function Router(viewport, routes) {
	  _classCallCheck(this, Router);
	
	  this.viewport = viewport;
	  this.routes = routes;
	
	  this.events = new _eventbus2.default();
	};
	
	exports.default = Router;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Class representing custom events implementation
	 */
	var EventBus = function () {
	
	  /**
	   * Create event bus
	   */
	  function EventBus() {
	    _classCallCheck(this, EventBus);
	
	    this.events = Object.create(null);
	  }
	
	  /**
	   * Attach listenter for some event
	   * @param  {String} eventPath - The string containing two colon separated values
	   * @param  {Function} callback - Callback that will be called when event will be fired
	   * @param  {Object} [context] - Context that will be applied to callback
	   * @return {Object} this
	   */
	
	
	  _createClass(EventBus, [{
	    key: 'on',
	    value: function on(eventPath, callback, context) {
	      var parsedPath = this.parseEventPath(eventPath);
	      var events = this.events;
	      var namespace = parsedPath.namespace;
	      var key = parsedPath.key;
	
	      var callbackObject = {
	        callback: callback,
	        context: context
	      };
	
	      var namespaceCallbacks = void 0;
	
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
	
	  }, {
	    key: 'off',
	    value: function off(eventPath, callback) {
	      var parsedPath = this.parseEventPath(eventPath);
	      var events = this.events;
	      var namespace = parsedPath.namespace;
	      var key = parsedPath.key;
	
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
	
	  }, {
	    key: 'deleteCallback',
	    value: function deleteCallback(callbackArray, callback) {
	      var callbackIndex = -1;
	
	      callbackArray.forEach(function (callbackObject, index) {
	        callbackIndex = callbackObject.callback === callback ? index : callbackIndex;
	      });
	
	      callbackIndex !== -1 && callbackArray.splice(callbackIndex, 1);
	    }
	
	    /**
	     * Fire namespace and key events
	     * @param  {String} eventPath - The string containing two colon separated values
	     * @param  {...Object} [data] - Data that will be passed in callbacks
	     * @return {Object} this
	     */
	
	  }, {
	    key: 'trigger',
	    value: function trigger(eventPath) {
	      var parsedEventPath = this.parseEventPath(eventPath);
	      var namespaceCallbacks = void 0;
	      var keyCallbacks = void 0;
	
	      if ((namespaceCallbacks = this.getNamespaceCallbacks(parsedEventPath.namespace)) && (keyCallbacks = this.getKeyCallbacks(namespaceCallbacks, parsedEventPath.key)).length) {
	        for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	          data[_key - 1] = arguments[_key];
	        }
	
	        this.fireCallbacksArray(keyCallbacks, data);
	        this.fireCallbacksArray(namespaceCallbacks.common, data);
	      }
	
	      return this;
	    }
	
	    /**
	     * Fire each events from array
	     * @param  {Array} callbacksArray - Array with callbacks which will be fired
	     */
	
	  }, {
	    key: 'fireCallbacksArray',
	    value: function fireCallbacksArray(callbacksArray, data) {
	      callbacksArray.forEach(function (event) {
	        var callback = event.callback;
	        var context = event.context;
	
	        setTimeout(callback.bind.apply(callback, [context].concat(_toConsumableArray(data))), 0);
	      });
	    }
	
	    /**
	     * Parse event path
	     * @param  {String} eventPath - The string containing two colon separated values
	     * @return {Object} parsedPath - Object that contains two properites namespace and key
	     * @return {String} parsedPath.namespace - Event namespace
	     * @return {String} parsedPath.key - Event specifactor
	     */
	
	  }, {
	    key: 'parseEventPath',
	    value: function parseEventPath(eventPath) {
	      var splitPath = eventPath.trim().split(':');
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
	
	  }, {
	    key: 'getNamespaceCallbacks',
	    value: function getNamespaceCallbacks(namespace) {
	      var namespaceCallbacks = this.events[namespace];
	
	      return namespaceCallbacks ? namespaceCallbacks : null;
	    }
	
	    /**
	     * Return array of objects with callbacks for some key
	     * @param {Object} namespaceCallbacks - Namespace callbacks object
	     * @param {String} key - Event key
	     * @return {Null | Array} Null or keyCallbacks
	     */
	
	  }, {
	    key: 'getKeyCallbacks',
	    value: function getKeyCallbacks(namespaceCallbacks, key) {
	      var keyCallbacks = namespaceCallbacks.keys[key];
	
	      return keyCallbacks ? keyCallbacks : null;
	    }
	  }]);
	
	  return EventBus;
	}();
	
	exports.default = EventBus;

/***/ }
/******/ ]);
//# sourceMappingURL=app.bundle.js.map
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
	
	var _settings_pom_data = __webpack_require__(5);
	
	var _main = __webpack_require__(6);
	
	var _main2 = _interopRequireDefault(_main);
	
	var _main3 = __webpack_require__(8);
	
	var _main4 = _interopRequireDefault(_main3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var main = document.querySelector('.main');
	var controls = document.querySelector('.controls.common-state');
	
	var settingsList = document.createElement('ul');
	
	settingsList.classList.add('settings-list');
	_settings_pom_data.settingsData.forEach(function (el) {
	  var listItem = document.createElement('li');
	  var section = (0, _main2.default)(el.title, el.afterClass, el.text, el.defaultValue, el.step, el.min, el.limit, el.suffix, el.name);
	
	  listItem.classList.add('settings-list-item');
	  listItem.appendChild(section);
	  settingsList.appendChild(listItem);
	});
	
	// Handle all custom events from actions
	settingsList.addEventListener('actionValueChanged', function (event) {
	  console.log(event.detail);
	});
	
	main.insertBefore(settingsList, controls);

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var settingsData = exports.settingsData = [{
	  title: 'Work time',
	  afterClass: 'after-orange',
	  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing',
	  defaultValue: 25,
	  step: 5,
	  min: 5,
	  limit: 90,
	  suffix: 'min',
	  name: 'work-time'
	}, {
	  title: 'Work iteration',
	  afterClass: 'after-dark-turquoise',
	  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing',
	  defaultValue: 5,
	  step: 1,
	  min: 2,
	  limit: 50,
	  suffix: '',
	  name: 'work-iteration'
	}, {
	  title: 'Short break',
	  afterClass: 'after-picton-blue',
	  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, voluptates, vero.',
	  defaultValue: 5,
	  step: 5,
	  min: 0,
	  limit: 30,
	  suffix: 'min',
	  name: 'short-break'
	}, {
	  title: 'Long break',
	  afterClass: 'after-picton-blue',
	  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing',
	  defaultValue: 45,
	  step: 5,
	  min: 0,
	  limit: 180,
	  suffix: 'min',
	  name: 'long-break'
	}];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getSettingsInput;
	
	var _main = __webpack_require__(7);
	
	var _main2 = _interopRequireDefault(_main);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getSettingsInput(title, afterClass, text, defaultValue, step, min, limit, suffix, name) {
	
	  var section = document.createElement('section');
	  var headingElement = document.createElement('h3');
	  var textElement = document.createElement('p');
	
	  // Create new Action and get MARKUP
	  var action = new _main2.default(defaultValue, step, min, limit, suffix, name).markup;
	
	  section.classList.add('settings-input');
	  section.classList.add(afterClass);
	  headingElement.classList.add('settings-input-heading');
	  textElement.classList.add('settings-input-text');
	
	  headingElement.innerHTML = title;
	  textElement.innerHTML = text;
	
	  section.appendChild(headingElement);
	  section.appendChild(action);
	  section.appendChild(textElement);
	
	  return section;
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Action = function () {
	  function Action(defaultValue, step, min, limit, suffix, name) {
	    _classCallCheck(this, Action);
	
	    this.incrementButton = null;
	    this.decrementButton = null;
	    this.viewport = null;
	
	    this.step = step;
	    this.min = min;
	    this.limit = limit;
	    this.suffix = suffix;
	    this.name = name;
	
	    this.markup = this.createMarkup();
	    this.value = defaultValue;
	    this.current = this.value; // Variable for check that prevent useless reflow
	
	    this.eventObj = {
	      bubbles: true,
	      cancelable: true,
	      detail: {
	        name: this.name,
	        value: null }
	    };
	
	    this.event = new CustomEvent('actionValueChanged', this.eventObj);
	  }
	
	  _createClass(Action, [{
	    key: 'createMarkup',
	    value: function createMarkup() {
	      var _this = this;
	
	      var div = document.createElement('div');
	      this.incrementButton = document.createElement('button');
	      this.decrementButton = document.createElement('button');
	      this.viewport = document.createElement('span');
	
	      div.classList.add('action');
	      this.incrementButton.classList.add('action-btn');
	      this.incrementButton.classList.add('action-add');
	
	      this.decrementButton.classList.add('action-btn');
	      this.decrementButton.classList.add('action-minus');
	
	      this.viewport.classList.add('action-viewport');
	
	      this.incrementButton.setAttribute('type', 'button');
	      this.decrementButton.setAttribute('type', 'button');
	
	      this.incrementButton.innerHTML = '&#xe900;';
	      this.decrementButton.innerHTML = '&#xe911;';
	
	      this.incrementButton.addEventListener('click', function () {
	        _this.increment();
	      });
	      this.decrementButton.addEventListener('click', function () {
	        _this.decrement();
	      });
	
	      div.appendChild(this.decrementButton);
	      div.appendChild(this.incrementButton);
	      div.appendChild(this.viewport);
	
	      return div;
	    }
	  }, {
	    key: 'increment',
	    value: function increment() {
	      var value = this.value;
	
	      value = value + this.step < this.limit ? value + this.step : this.limit;
	
	      if (value === this.current) return;
	      this.current = value;
	
	      this.value = value;
	      this.eventObj.detail.value = value;
	      this.markup.dispatchEvent(this.event);
	    }
	  }, {
	    key: 'decrement',
	    value: function decrement() {
	      var value = this.value;
	
	      value = value - this.step > this.min ? value - this.step : this.min;
	
	      if (value === this.current) return;
	      this.current = value;
	
	      this.value = value;
	      this.eventObj.detail.value = value;
	      this.markup.dispatchEvent(this.event);
	    }
	  }, {
	    key: 'value',
	    set: function set(number) {
	      this.viewport.innerHTML = number + ' ' + this.suffix;
	    },
	    get: function get() {
	      return parseInt(this.viewport.innerHTML, 10);
	    }
	  }]);
	
	  return Action;
	}();
	
	exports.default = Action;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Cycle = function () {
	  function Cycle(ruleStep, workTime, workIteration, shortBreak, longBreak) {
	    _classCallCheck(this, Cycle);
	
	    this.markup = this.createMarkup();
	  }
	
	  _createClass(Cycle, [{
	    key: "updateData",
	    value: function updateData(name, value) {
	      this[name] = value;
	    }
	  }, {
	    key: "render",
	    value: function render() {}
	  }, {
	    key: "createMarkup",
	    value: function createMarkup() {}
	  }]);
	
	  return Cycle;
	}();
	
	exports.default = Cycle;

/***/ }
/******/ ]);
//# sourceMappingURL=settings_pom.bundle.js.map
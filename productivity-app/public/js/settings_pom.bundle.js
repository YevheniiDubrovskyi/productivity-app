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
	var defaultValues = {};
	
	settingsList.classList.add('settings-list');
	_settings_pom_data.settingsData.forEach(function (el) {
	  var listItem = document.createElement('li');
	  var section = (0, _main2.default)(el.title, el.afterClass, el.text, el.defaultValue, el.step, el.min, el.limit, el.suffix, el.name);
	
	  listItem.classList.add('settings-list-item');
	  listItem.appendChild(section);
	  settingsList.appendChild(listItem);
	
	  defaultValues[el.name] = el.defaultValue;
	});
	
	var cycle = new _main4.default('Your cycle', 30, defaultValues);
	
	// Handle all custom events from actions
	settingsList.addEventListener('actionValueChanged', function (event) {
	  var detail = event.detail;
	
	  cycle.updateData(detail.name, detail.value);
	});
	
	main.insertBefore(settingsList, controls);
	main.insertBefore(cycle.markup, controls);

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

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Cycle = function () {
	  function Cycle(title, ruleStep, initParams) {
	    _classCallCheck(this, Cycle);
	
	    this.title = title;
	    this.ruleStep = ruleStep;
	    this.params = initParams;
	
	    this.timeAmount = null;
	    this.firstCycle = null;
	    this.markup = createSection();
	    this.percents = {};
	
	    this.render();
	
	    function createSection() {
	      var section = document.createElement('section');
	
	      section.classList.add('cycle-chart');
	      return section;
	    }
	  }
	
	  _createClass(Cycle, [{
	    key: 'updateData',
	    value: function updateData(name, value) {
	      this.params[name] = value;
	      this.render();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      this.calcPercents();
	      this.markup.innerHTML = '';
	      this.markup.appendChild(this.createMarkup());
	    }
	  }, {
	    key: 'calcPercents',
	    value: function calcPercents() {
	      var params = this.params;
	
	      this.timeAmount = params['work-time'] * params['work-iteration'] * 2 + params['short-break'] * (params['work-iteration'] - 1) * 2 + params['long-break'];
	      this.firstCycle = params['work-time'] * params['work-iteration'] + params['short-break'] * (params['work-iteration'] - 1) + params['long-break'];
	
	      this.percents['work-time'] = params['work-time'] / this.timeAmount * 100;
	      this.percents['short-break'] = params['short-break'] / this.timeAmount * 100;
	      this.percents['long-break'] = params['long-break'] / this.timeAmount * 100;
	      this.percents['rule-step'] = this.ruleStep / this.timeAmount * 100;
	    }
	  }, {
	    key: 'createMarkup',
	    value: function createMarkup() {
	      var fragment = document.createDocumentFragment();
	      var heading = document.createElement('h2');
	
	      fragment.appendChild(heading);
	      createChartList.call(this, fragment);
	      createRuleList.call(this, fragment);
	
	      heading.classList.add('cycle-chart-heading');
	      heading.innerHTML = this.title;
	
	      return fragment;
	
	      function createChartList(fragment) {
	        var chartList = document.createElement('ul');
	
	        fragment.appendChild(chartList);
	        chartList.classList.add('cycle-chart__chart');
	
	        var length = this.params['work-iteration'] * 2 + (this.params['work-iteration'] - 1) * 2 + 1;
	        var half = ~~(length / 2);
	        var i = -1;
	        while (++i < length) {
	          var li = document.createElement('li');
	
	          if (i % 2 === 0) {
	            li.classList.add('cycle-chart__chart-work');
	            li.style.width = this.percents['work-time'] + '%';
	          } else {
	            li.classList.add('cycle-chart__chart-break');
	            li.style.width = this.percents['short-break'] + '%';
	          }
	
	          if (i === half) {
	            var span = document.createElement('span');
	            var hours = ~~(this.firstCycle / 60);
	            var minutes = this.firstCycle % 60;
	
	            li.appendChild(span);
	            li.style.width = this.percents['long-break'] + '%';
	            li.classList.add('long-break');
	            span.classList.add('long-break-span');
	
	            span.innerHTML = minutes ? 'Full cycle: ' + hours + 'h ' + minutes + 'm' : 'Full cycle: ' + hours + 'h';
	          }
	
	          chartList.appendChild(li);
	        }
	      }
	
	      function createRuleList(fragment) {
	        var ruleList = document.createElement('ul');
	
	        fragment.appendChild(ruleList);
	        ruleList.classList.add('cycle-chart__rule');
	
	        var length = ~~(this.timeAmount / this.ruleStep);
	        var i = -1;
	        var tempHours = void 0,
	            tempMinutes = void 0,
	            minutesAmount = void 0;
	        while (++i < length) {
	          var li = document.createElement('li');
	          var span = document.createElement('span');
	
	          minutesAmount = (i + 1) * this.ruleStep;
	          tempHours = ~~(minutesAmount / 60);
	          tempMinutes = minutesAmount % 60;
	
	          li.style.width = this.percents['rule-step'] + '%';
	          li.classList.add('cycle-chart__rule-point');
	          span.classList.add('point-value-span');
	          if (tempHours && tempMinutes) {
	            span.innerHTML = tempHours + 'h ' + tempMinutes + 'm';
	          } else if (!tempHours) {
	            span.innerHTML = tempMinutes + 'm';
	          } else {
	            span.innerHTML = tempHours + 'h';
	          }
	
	          li.appendChild(span);
	          ruleList.appendChild(li);
	        }
	      }
	    }
	  }]);
	
	  return Cycle;
	}();
	
	exports.default = Cycle;

/***/ }
/******/ ]);
//# sourceMappingURL=settings_pom.bundle.js.map
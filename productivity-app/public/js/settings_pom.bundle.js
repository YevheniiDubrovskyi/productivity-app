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
	
	var _settings_pom_data = __webpack_require__(7);
	
	var _main = __webpack_require__(8);
	
	var _main2 = _interopRequireDefault(_main);
	
	var _main3 = __webpack_require__(11);
	
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
	
	// Implement Pub/Sub pattern
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
/* 5 */,
/* 6 */,
/* 7 */
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
	  min: 15,
	  limit: 40,
	  suffix: 'min',
	  name: 'work-time'
	}, {
	  title: 'Work iteration',
	  afterClass: 'after-dark-turquoise',
	  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing',
	  defaultValue: 5,
	  step: 1,
	  min: 1,
	  limit: 5,
	  suffix: '',
	  name: 'work-iteration'
	}, {
	  title: 'Short break',
	  afterClass: 'after-picton-blue',
	  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, voluptates, vero.',
	  defaultValue: 1,
	  step: 1,
	  min: 1,
	  limit: 15,
	  suffix: 'min',
	  name: 'short-break'
	}, {
	  title: 'Long break',
	  afterClass: 'after-picton-blue',
	  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing',
	  defaultValue: 45,
	  step: 5,
	  min: 30,
	  limit: 60,
	  suffix: 'min',
	  name: 'long-break'
	}];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getSettingsInput;
	
	var _main = __webpack_require__(9);
	
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _template = __webpack_require__(10);
	
	var _template2 = _interopRequireDefault(_template);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Action = function () {
	  function Action(defaultValue, step, min, limit, suffix, name) {
	    var _this = this;
	
	    _classCallCheck(this, Action);
	
	    this.step = step;
	    this.min = min;
	    this.limit = limit;
	    this.suffix = suffix;
	    this.name = name;
	
	    this.template = new _template2.default(defaultValue, this.suffix);
	    this.viewport = this.template.viewport;
	
	    this.current = this.value; // Variable for check that prevent useless reflow
	
	    this.eventObj = {
	      bubbles: true,
	      cancelable: true,
	      detail: {
	        name: this.name,
	        value: null }
	    };
	
	    // Implement Sub/Pub pattern
	    this.event = new CustomEvent('actionValueChanged', this.eventObj);
	
	    this.template.markup.addEventListener('click', function (event) {
	      var classList = event.target.classList;
	
	      if (classList.contains('action-add')) {
	        _this.increment();
	      } else if (classList.contains('action-minus')) {
	        _this.decrement();
	      }
	    });
	  }
	
	  _createClass(Action, [{
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
	  }, {
	    key: 'markup',
	    get: function get() {
	      return this.template.markup;
	    }
	  }]);
	
	  return Action;
	}();
	
	exports.default = Action;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Template = function () {
	  function Template(defaultValue, suffix) {
	    _classCallCheck(this, Template);
	
	    this.markup = document.createElement('div');
	    this.markup.classList.add('action');
	
	    this.markup.innerHTML = '\n  <button class="action-btn action-add" type="button">&#xe900;</button>\n  <button class="action-btn action-minus" type="button">&#xe911;</button>\n  <span class="action-viewport">' + defaultValue + suffix + '</span>';
	  }
	
	  _createClass(Template, [{
	    key: 'viewport',
	    get: function get() {
	      return this.markup.querySelector('.action-viewport');
	    }
	  }]);
	
	  return Template;
	}();
	
	exports.default = Template;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _template = __webpack_require__(12);
	
	var _template2 = _interopRequireDefault(_template);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Cycle = function () {
	  function Cycle(title, ruleStep, initParams) {
	    _classCallCheck(this, Cycle);
	
	    this.ruleStep = ruleStep;
	    this.params = initParams;
	
	    this.template = new _template2.default(title);
	
	    this.render();
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
	      this.template.render(this.calcParams());
	    }
	  }, {
	    key: 'calcParams',
	    value: function calcParams() {
	      var params = this.params;
	      var ruleStep = this.ruleStep;
	      var percents = {};
	
	      var timeAmount = 0;
	      var firstCycle = 0;
	      var chartSegmentsCount = 0;
	
	      timeAmount = params['work-time'] * params['work-iteration'] * 2 + params['short-break'] * (params['work-iteration'] - 1) * 2 + params['long-break'];
	      firstCycle = params['work-time'] * params['work-iteration'] + params['short-break'] * (params['work-iteration'] - 1) + params['long-break'];
	      chartSegmentsCount = params['work-iteration'] * 2 + (params['work-iteration'] - 1) * 2 + 1;
	
	      percents['work-time'] = params['work-time'] / timeAmount * 100;
	      percents['short-break'] = params['short-break'] / timeAmount * 100;
	      percents['long-break'] = params['long-break'] / timeAmount * 100;
	      percents['rule-step'] = ruleStep / timeAmount * 100;
	
	      return {
	        ruleStep: ruleStep,
	        percents: percents,
	        timeAmount: timeAmount,
	        firstCycle: firstCycle,
	        chartSegmentsCount: chartSegmentsCount
	      };
	    }
	  }, {
	    key: 'markup',
	    get: function get() {
	      return this.template.markup;
	    }
	  }]);
	
	  return Cycle;
	}();
	
	exports.default = Cycle;

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Template = function () {
	  function Template(title) {
	    _classCallCheck(this, Template);
	
	    this.markup = document.createElement('section');
	    this.markup.classList.add('cycle-chart');
	
	    this.markup.innerHTML = '\n<h2 class="cycle-chart-heading">' + title + '</h2>\n<div class="cycle-chart__viewport"></div>';
	    this.viewport = this.markup.querySelector('.cycle-chart__viewport');
	  }
	
	  _createClass(Template, [{
	    key: 'render',
	    value: function render(paramsObj) {
	      this.viewport.innerHTML = '\n';
	      this.viewport.innerHTML += this.createChartList(paramsObj.chartSegmentsCount, paramsObj.firstCycle, paramsObj.percents);
	      this.viewport.innerHTML += this.createRuleList(paramsObj.timeAmount, paramsObj.ruleStep, paramsObj.percents);
	    }
	  }, {
	    key: 'createChartList',
	    value: function createChartList(chartSegmentsCount, firstCycle, percents) {
	      var half = ~~(chartSegmentsCount / 2);
	      var listItems = '\n';
	      var i = -1;
	
	      while (++i < chartSegmentsCount) {
	        var options = {
	          class: null,
	          width: null
	        };
	
	        if (i % 2 === 0) {
	          options.class = 'cycle-chart__chart-work';
	          options.width = percents['work-time'];
	        } else {
	          options.class = 'cycle-chart__chart-break';
	          options.width = percents['short-break'];
	        }
	
	        if (i === half) {
	          var hours = ~~(firstCycle / 60);
	          var minutes = firstCycle % 60;
	          var spanText = minutes ? 'Full cycle: ' + hours + 'h ' + minutes + 'm' : 'Full cycle: ' + hours + 'h';
	
	          listItems += '  <li class="' + options.class + ' long-break" style="width: ' + percents['long-break'] + '%">\n    <span class="long-break-span">' + spanText + '</span>\n  </li>\n';
	          continue;
	        }
	
	        listItems += '  <li class="' + options.class + '" style="width: ' + options.width + '%"></li>\n';
	      }
	
	      return '<ul class="cycle-chart__chart">' + listItems + '</ul>\n';
	    }
	  }, {
	    key: 'createRuleList',
	    value: function createRuleList(timeAmount, ruleStep, percents) {
	      var length = ~~(timeAmount / ruleStep);
	      var listItems = '\n';
	      var i = -1;
	
	      while (++i < length) {
	        var minutesAmount = (i + 1) * ruleStep;
	        var tempHours = ~~(minutesAmount / 60);
	        var tempMinutes = minutesAmount % 60;
	        var spanText = void 0;
	
	        if (tempHours && tempMinutes) {
	          spanText = tempHours + 'h ' + tempMinutes + 'm';
	        } else if (!tempHours) {
	          spanText = tempMinutes + 'm';
	        } else {
	          spanText = tempHours + 'h';
	        }
	
	        listItems += '  <li class="cycle-chart__rule-point" style="width: ' + percents['rule-step'] + '%">\n    <span class="point-value-span">' + spanText + '</span>\n  </li>\n';
	      }
	
	      return '<ul class="cycle-chart__rule">' + listItems + '</ul>\n';
	    }
	  }]);
	
	  return Template;
	}();
	
	exports.default = Template;

/***/ }
/******/ ]);
//# sourceMappingURL=settings_pom.bundle.js.map
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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _router = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./router.js\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _router2 = _interopRequireDefault(_router);
	
	__webpack_require__(69);
	
	__webpack_require__(71);
	
	__webpack_require__(73);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var viewport = document.body;
	
	var router = new _router2.default(viewport, {
	  page: 'login',
	  pattern: '#!/login'
	}, {
	  page: 'reports',
	  pattern: '#!/reports'
	}, {
	  page: 'settings',
	  pattern: '#!/settings'
	}, {
	  page: 'task_list',
	  pattern: '#!/',
	  default: true
	}, {
	  page: 'timer',
	  pattern: '#!/timer/:id'
	});
	
	// const timer = new Timer(viewport);
	
	// const taskList = new TaskList(viewport);
	
	// const loginPage = new Login(viewport);
	
	// const settingsPage = new Settings(viewport);
	
	// const reportsPage = new Reports(viewport);
	
	// const router = new Router(viewport,
	//   {
	//     name: 'reports',
	//     controller: './pages/reports.controller',
	//     url: '/reports'
	//   }
	// );
	
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

/***/ 11:
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },

/***/ 12:
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },

/***/ 69:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(70);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(12)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/postcss-loader/index.js!./reset.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/postcss-loader/index.js!./reset.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 70:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports
	
	
	// module
	exports.push([module.id, "/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n  display: block;\n}\nbody {\n  line-height: 1;\n}\nol, ul {\n  list-style: none;\n}\nblockquote, q {\n  quotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: '';\n  content: none;\n}\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}", ""]);
	
	// exports


/***/ },

/***/ 71:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(72);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(12)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/postcss-loader/index.js!./base.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/postcss-loader/index.js!./base.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 72:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports
	
	
	// module
	exports.push([module.id, "html,\nbody {\n  font-family: 'Roboto', sans-serif;\n\n  position: relative;\n\n  height: 1px;\n  min-height: 100%;\n}\n\nmain,\nheader,\nfooter,\naside,\nsection,\narticle,\nnav,\nfigure {\n  display: block;\n}\n\nbutton,\ninput {\n  font-size: inherit;\n\n  color: inherit;\n  border: none;\n  background: none;\n}\n\nbutton:hover {\n  cursor: pointer;\n}\n\nbutton:active,\nbutton:focus,\ninput:focus {\n  outline: none;\n  box-shadow: none;\n}\n", ""]);
	
	// exports


/***/ },

/***/ 73:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(74);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(12)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/postcss-loader/index.js!./common.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/postcss-loader/index.js!./common.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 74:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports
	
	
	// module
	exports.push([module.id, ".tabs-list:after,\n.clearfix:after {\n  display: table;\n  clear: both;\n\n  content: '';\n}\n\n.hidden {\n  position: absolute;\n  top: auto;\n  left: -9999px;\n\n  overflow: hidden;\n}\n\n/* BUTTONS */\n\n.btn {\n  font-family: 'PT Sans', sans-serif;\n  font-size: 1.125rem;\n  font-weight: bold;\n\n  display: block;\n\n  width: 6.8333em;\n  height: 2.3333em;\n  transition: .1s ease-in-out;\n\n  color: #fff;\n}\n\n/* NIAGARA BUTTON */\n\n.btn-niagara {\n  background-color: #1abc9c;\n}\n\n.btn-niagara:hover,\n.btn-niagara:focus {\n  background-color: #16a085;\n}\n\n.btn-niagara:active {\n  background-color: #62d3bd;\n}\n\n/* PICTON BLUE BUTTON */\n\n.btn-picton-blue {\n  background-color: #59abe3;\n}\n\n.btn-picton-blue:hover,\n.btn-picton-blue:focus {\n  background-color: #368bc5;\n}\n\n.btn-picton-blue:active {\n  background-color: #82c7e0;\n}\n\n/* TOMATO BUTTON */\n\n.btn-tomato {\n  background-color: #f85c4c;\n}\n\n.btn-tomato:hover,\n.btn-tomato:focus {\n  background-color: #c94d47;\n}\n\n.btn-tomato:active {\n  background-color: #f99595;\n}\n\n/* MAIN CONTROL BUTTONS */\n\n.main-btn-list {\n  font-size: 1.25rem;\n  display: -ms-flexbox;\n  display:         flex;\n\n  width: 7em;\n  margin: 0 0 0 auto;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n}\n\n#statistics-btn {\n  font-size: .8em;\n  line-height: 1.6em;\n}\n\n.main-btn-list__item-btn {\n  font-family: 'icomoon';\n  transition: color .1s ease-in-out;\n\n  color: #8da5b8;\n}\n\n.main-btn-list__item-btn.active,\n.main-btn-list__item-btn:hover {\n  color: #fff;\n}\n\n.main-btn-list__item-btn:focus,\n.main-btn-list__item-btn:active {\n  color: #82c7e0;\n}\n\n/* TABS */\n\n.tabs-list {\n  font-size: .95rem;\n\n  display: inline-block;\n}\n\n.tabs-list__item {\n  position: relative;\n\n  float: left;\n}\n\n.tabs-list__item:first-child .tabs-list__item-btn {\n  padding-left: 0;\n}\n\n.tabs-list__item:last-child .tabs-list__item-btn {\n  padding-right: 0;\n}\n\n.tabs-list__item-btn {\n  font-family: 'PT Sans', sans-serif;\n\n  padding: 0 .5em;\n  transition: .1s ease-in-out;\n\n  color: #8da5b8;\n}\n\n.tabs-list__item-btn:after {\n  font-size: .9em;\n\n  position: absolute;\n  top: -.01rem;\n  right: -.21em;\n\n  content: '|';\n\n  color: #8da5b8 !important;\n}\n\n.tabs-list__item:last-child .tabs-list__item-btn:after {\n  display: none;\n}\n\n.tabs-list__item-btn.active,\n.tabs-list__item-btn:hover {\n  color: #fff;\n}\n\n/* NOTIFICATIONS */\n\n.notification {\n  font-size: .9375rem;\n  line-height: 3.4em;\n\n  position: relative;\n  z-index: 999;\n  display: -ms-flexbox;\n  display:         flex;\n  box-sizing: border-box;\n  width: 30em;\n  height: 3.4em;\n  padding: 0 0 0 5.3em;\n\n  color: #fff;\n  border: 1px solid #fff;\n  border-radius: .3em;\n}\n\n.notification:after {\n  font-family: 'icomoon';\n  font-size: 2.3em;\n\n  position: absolute;\n  top: 0;\n  left: 0;\n\n  height: 100%;\n  padding: 0 .45em;\n}\n\n.notification-text {\n  font-size: 1.05em;\n  font-weight: 700;\n\n  height: 100%;\n}\n\n.notification-btn-close {\n  font-family: 'icomoon';\n  font-size: 1.6em;\n  position: absolute;\n  right: 0;\n\n  height: 100%;\n  margin: 0;\n  padding: 0 .65em;\n}\n\n/* NOTIFICATION SUCCESS */\n\n.notification-success {\n  background-color: #1ca991;\n}\n\n.notification-success:after {\n  content: '\\E913';\n\n  background-color: #49baa7;\n}\n\n/* NOTIFICATION ERROR */\n\n.notification-error {\n  background-color: #d8584d;\n}\n\n.notification-error:after {\n  content: '\\E914';\n\n  background-color: #e07971;\n}\n\n/* NOTIFICATION WARNING */\n\n.notification-warning {\n  background-color: #df9843;\n}\n\n.notification-warning:after {\n  content: '\\E915';\n\n  background-color: #e5ad69;\n}\n\n/* NOTIFICATION MESSAGE INFO */\n\n.notification-message-info {\n  background-color: #529bcd;\n}\n\n.notification-message-info:after {\n  content: '\\E916';\n\n  background-color: #75afd7;\n}\n\n/* TOOLTIP */\n\n.tooltip {\n  font-size: .75rem;\n  font-weight: 700;\n\n  position: absolute;\n  z-index: 999;\n  top: 2.8em;\n  left: 3em;\n\n  padding: .916em 1.583em;\n\n  white-space: nowrap;\n\n  color: #3c5162;\n  border: 1px solid #cddbe3;\n  border-radius: .2em;\n  background-color: rgba(229, 233, 235, .9);\n}\n\n.tooltip:after {\n  position: absolute;\n  top: -.45em;\n  left: 1em;\n\n  width: 0;\n  height: 0;\n\n  content: '';\n\n  border-width: 0 4.5px 5px 4.5px;\n  border-style: solid;\n  border-color: transparent transparent rgba(229, 233, 235, .9) transparent;\n}\n\n/* ARROW BUTTONS */\n\n.btn-arrow {\n  font-family: 'icomoon';\n  font-size: 2.55em;\n\n  position: absolute;\n  top: 50%;\n  transition: .1s ease-in-out;\n  transform: translate(0, -50%);\n  text-decoration: none;\n\n  color: #8da5b8;\n}\n\n.btn-arrow:hover {\n  color: #fff;\n}\n\n.btn-arrow-left {\n  left: 2rem;\n}\n\n.btn-arrow-right {\n  right: 2rem;\n}\n\n/* MODALS */\n\n/* MODAL STYLES FOR BODY */\n.modal-opened {\n  position: relative;\n\n  overflow-y: hidden;\n}\n\n.modal-opened:after {\n  position: absolute;\n  z-index: 9999;\n  top: 0;\n  left: 0;\n\n  width: 100%;\n  height: 100%;\n\n  content: '';\n\n  background-color: rgba(0, 0, 0, .7);\n}\n\n/* MODAL STYLES FOR MODAL ELEMENTS */\n.modal-wrapper {\n  position: fixed;\n  z-index: 99999;\n  top: 0;\n  left: 0;\n  display: -ms-flexbox;\n  display:         flex;\n\n  width: 100%;\n  height: 100%;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n}\n\n.modal {\n  font-size: 1rem;\n\n  position: relative;\n\n  overflow-y: auto;\n  box-sizing: border-box;\n  width: 31.25em;\n  max-width: 100%;\n  max-height: 100%;\n  padding: 1.2em 2.81rem;\n\n  background-color: #2a3f50;\n}\n", ""]);
	
	// exports


/***/ }

/******/ });
//# sourceMappingURL=app.bundle.js.map
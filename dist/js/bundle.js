/*!
 * 
 * ## Project Name        :  Uix Webpack Scaffold
 * ## Project Description :  Simple demo for scaffold of webpack 4 + react + babel. Supports batch processing of HTML templates, SASS, and JavaScript module files.
 * ## Based on            :  Uix Webpack Scaffold
 * ## Version             :  1.0.3
 * ## Last Update         :  May 23, 2019
 * ## Powered by          :  UIUX Lab
 * ## Created by          :  UIUX Lab (https://uiux.cc)
 * ## Contact Us          :  uiuxlab@gmail.com
 * ## Compatible With     :  Bootstrap 4.x, React
 * ## Released under the MIT license.
 * 	
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 5 */
/***/ (function(module, exports) {

/**

	TABLE OF CONTENTS
	---------------------------
	
	
	1.Vars
    2.APP1
    3.APP2
    4.APP3


*/

/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/components/_global/scss/__.scss
var _ = __webpack_require__(0);

// EXTERNAL MODULE: ./src/components/_global/scss/base.scss
var base = __webpack_require__(1);

// EXTERNAL MODULE: ./src/components/app1/scss/style.scss
var style = __webpack_require__(2);

// EXTERNAL MODULE: ./src/components/app2/scss/style.scss
var scss_style = __webpack_require__(3);

// EXTERNAL MODULE: ./src/components/app3/scss/style.scss
var app3_scss_style = __webpack_require__(4);

// EXTERNAL MODULE: ./src/components/_global/js/__.js
var js_ = __webpack_require__(5);

// CONCATENATED MODULE: ./src/components/_global/js/vars.js
/* 
 *************************************
 * <!-- Vars -->
 *************************************
 */
var globalVar = 'global var 1';
var globalVar2 = 'global var 2';
var globalVar3 = 'global var 3';

// CONCATENATED MODULE: ./src/components/app1/js/functions.js
/* 
 *************************************
 * <!-- APP1 -->
 *************************************
 */

var sex = 'boy';

var echo = function echo(value) {
  return console.log('%c ./src/components/app1 =>  echo(sex) =>' + '%c ' + value, 'color: #333', 'color: #f00');
};


console.log('%c ./src/components/app1 =>  ' + '%c' + globalVar, 'color: #333', 'color: #f00');
// CONCATENATED MODULE: ./src/components/app2/js/functions.js
/* 
 *************************************
 * <!-- APP2 -->
 *************************************
 */

[1, 2, 3].map(function (n) {
  return Math.pow(n, 2);
});
console.log('%c ./src/components/app2 =>  ' + '%c' + globalVar2, 'color: #333', 'color: #f00');
// CONCATENATED MODULE: ./src/components/app3/js/functions.js
/* 
 *************************************
 * <!-- APP3 -->
 *************************************
 */

console.log('%c ./src/components/app3 =>  ' + '%c' + globalVar3, 'color: #333', 'color: #f00');
// CONCATENATED MODULE: ./src/index.js
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

//-------------------------------------
//-------------------------------------
//import SASS files from components

/* must be placed in the first place */




 //-------------------------------------
//-------------------------------------
//import JS files from components


/* must be placed in the first place */




echo(sex); //-------------------------------------
//-------------------------------------

/**
 * Button
 * @class UixButton
 * @requires React, ReactDOM
 * @return {Object}            [description]
 */

var styles = {
  base: {
    background: 'orange',
    border: 0,
    borderRadius: 4,
    color: 'black',
    display: 'block',
    margin: '20px auto',
    padding: '1.5em',
    ':hover': {
      backgroundColor: 'red',
      cursor: 'pointer'
    },
    ':focus': {
      backgroundColor: 'green'
    },
    ':active': {
      backgroundColor: 'yellow'
    }
  }
};

var UixButton =
/*#__PURE__*/
function (_React$Component) {
  _inherits(UixButton, _React$Component);

  function UixButton() {
    _classCallCheck(this, UixButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(UixButton).apply(this, arguments));
  }

  _createClass(UixButton, [{
    key: "render",
    value: function render() {
      return React.createElement("button", {
        style: styles.base
      }, this.props.children);
    }
  }]);

  return UixButton;
}(React.Component);

UixButton = Radium(UixButton);
ReactDOM.render(React.createElement(UixButton, null, "Cool UixButton!"), document.getElementById('root'));

/***/ })
/******/ ]);
//# sourceMappingURL=../css/bundle.css.map
//# sourceMappingURL=bundle.js.map
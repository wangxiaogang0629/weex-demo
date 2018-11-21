// { "framework": "Vue"} 

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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 43);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function isWeex() {
  console.log('23232', "weex");
  return "weex" === 'weex'; // 需要在webpack中自定义
}

exports.default = {

  methods: {
    push: function push(path, query) {
      console.log(isWeex());
      if (isWeex()) {
        var toUrl = weex.config.bundleUrl.split('/').slice(0, -1).join('/') + '/' + path + '.js'; // 将a.js的绝对地址转为b.js的绝对地址
        weex.requireModule('navigator').push({
          url: toUrl + '?data=' + query,
          animated: 'true'
        });
      } else {
        console.log('vue-route');
        this.$router.push({ path: path, query: { data: query } }); // 使用vue-router
      }
    },
    pop: function pop() {
      if (isWeex()) {
        weex.requireModule('navigator').pop({
          animated: 'true'
        });
      } else {
        window.history.back();
      }
    }
  }

};

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mixins = __webpack_require__(0);

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      info: {},
      phoneWidth: 100
    };
  },

  props: {
    'message': {
      type: Object
    }
  },

  created: function created() {},


  methods: {
    link: function link() {
      this.info = this.message;
      this.$emit('link', this.info);
    },

    jumpIndex: function jumpIndex(e) {
      this.$emit('jumpIndex');
    },

    jumpWrite: function jumpWrite(e) {
      this.$emit('jumpWrite');
    },

    jumpMe: function jumpMe(e) {
      this.$emit('jumpMe');
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mixins = __webpack_require__(0);

var _mixins2 = _interopRequireDefault(_mixins);

var _footer = __webpack_require__(4);

var _footer2 = _interopRequireDefault(_footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//

exports.default = {
  mixins: [_mixins2.default],
  created: function created() {
    console.log('二分之一11111');
  },


  components: {
    Footer: _footer2.default
  },

  methods: {
    click: function click() {
      this.pop();
    },
    jumpIndex: function jumpIndex() {
      this.push('articleIndex');
    },
    jumpWrite: function jumpWrite() {
      this.push('write');
    },
    jumpMe: function jumpMe() {
      this.push('me');
    }
  }
};

/***/ }),

/***/ 19:
/***/ (function(module, exports) {

module.exports = {
  "wrapper-style": {
    "display": "flex",
    "alignItems": "center",
    "paddingTop": 200
  },
  "head-img-style": {
    "width": 160,
    "height": 160,
    "borderRadius": 50
  },
  "name-style": {
    "marginTop": 40
  }
}

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = {
  "footer-wrapper-style": {
    "height": 80,
    "width": 750,
    "backgroundColor": "#ffffff",
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center",
    "paddingLeft": 30,
    "paddingRight": 30,
    "borderTopStyle": "solid",
    "borderTopWidth": 1,
    "borderTopColor": "#5c5c5c",
    "position": "fixed",
    "bottom": 0
  },
  "add-style": {
    "width": 78,
    "height": 78,
    "borderRadius": 50,
    "backgroundColor": "#4a90e2",
    "justifyContent": "center",
    "alignItems": "center",
    "display": "flex"
  },
  "font-style": {
    "color": "#bbbbbb",
    "fontSize": 32
  }
}

/***/ }),

/***/ 27:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_vm._m(0), _c('Footer', {
    on: {
      "jumpIndex": _vm.jumpIndex,
      "jumpWrite": _vm.jumpWrite,
      "jumpMe": _vm.jumpMe
    }
  })], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wrapper-style"]
  }, [_c('image', {
    staticClass: ["head-img-style"],
    attrs: {
      "src": "http://192.168.100.17:8085/src/assets/image/9.png"
    }
  }), _c('text', {
    staticClass: ["name-style"]
  }, [_vm._v("流浪诗人")])])
}]}
module.exports.render._withStripped = true

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["footer-wrapper-style"]
  }, [_c('div', {
    staticClass: ["font-style"],
    on: {
      "click": _vm.jumpIndex
    }
  }, [_c('text', [_vm._v("首页")])]), _c('div', {
    staticClass: ["add-style"],
    on: {
      "click": _vm.jumpWrite
    }
  }, [_c('text', {
    staticStyle: {
      color: "#fff"
    }
  }, [_vm._v("＋")])]), _c('div', {
    staticClass: ["font-style"],
    on: {
      "click": _vm.jumpMe
    }
  }, [_c('text', [_vm._v("我")])])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(2)
)

/* script */
__vue_exports__ = __webpack_require__(1)

/* template */
var __vue_template__ = __webpack_require__(3)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/wangxiaogang/lianxi/weex-demo/src/views/footer.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-e4412e8e"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(19)
)

/* script */
__vue_exports__ = __webpack_require__(15)

/* template */
var __vue_template__ = __webpack_require__(27)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/wangxiaogang/lianxi/weex-demo/src/views/me.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-614b2594"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__
module.exports.el = 'true'
new Vue(module.exports)


/***/ })

/******/ });
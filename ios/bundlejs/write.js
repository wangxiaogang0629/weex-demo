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
/******/ 	return __webpack_require__(__webpack_require__.s = 45);
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

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mixins = __webpack_require__(0);

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storage = weex.requireModule('storage'); //
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

exports.default = {
  mixins: [_mixins2.default],
  data: function data() {
    return {
      title: '',
      con: ''
    };
  },


  methods: {
    // 获取标题
    titleChange: function titleChange(event) {
      this.title = event.value;
    },


    // 获取内容信息
    conChange: function conChange(event) {
      this.con = event.value;
    },
    creat: function creat() {
      storage.setItem('title', this.title);
      storage.setItem('content', this.con);
      console.log(this.con, '怎么会没有呢输入的内容');

      if (this.title != '' && this.con != '') {
        this.push('articleIndex');
      }
    }
  }
};

/***/ }),

/***/ 25:
/***/ (function(module, exports) {

module.exports = {
  "write-input-wrapper-style": {
    "height": 80,
    "borderBottomStyle": "solid",
    "borderBottomWidth": 1,
    "borderBottomColor": "#c5c5c5",
    "paddingLeft": 20,
    "outline:focus": "none"
  },
  "write-con-style": {
    "minHeight": 80,
    "marginTop": 40,
    "paddingLeft": 20,
    "lineHeight": 40
  },
  "creat-btn-style": {
    "width": 160,
    "height": 80,
    "alignItems": "center",
    "justifyContent": "center",
    "borderRadius": 4,
    "color": "#cccccc",
    "fontSize": 36,
    "backgroundColor": "#e8e8e8",
    "boxShadow": "2px 6px 14px 0 rgba(0,0,0,0.06)"
  }
}

/***/ }),

/***/ 33:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      paddingTop: "50px",
      paddingLeft: "20px",
      paddingRight: "20px"
    }
  }, [_c('div', {
    staticClass: ["write-input-wrapper-style"]
  }, [_c('input', {
    staticClass: ["write-input-wrapper-style"],
    attrs: {
      "placeholder": "请输入标题",
      "type": "text"
    },
    on: {
      "change": _vm.titleChange
    }
  })]), _c('textarea', {
    staticClass: ["write-con-style"],
    attrs: {
      "placeholder": "请开始你的表演",
      "type": "text",
      "rows": "15"
    },
    on: {
      "input": _vm.conChange
    }
  }), _c('div', {
    staticClass: ["creat-btn-style"],
    on: {
      "click": _vm.creat
    }
  }, [_c('text', [_vm._v("发布")])])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(25)
)

/* script */
__vue_exports__ = __webpack_require__(17)

/* template */
var __vue_template__ = __webpack_require__(33)
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
__vue_options__.__file = "/Users/wangxiaogang/lianxi/weex-demo/src/views/write.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-29d3e431"
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
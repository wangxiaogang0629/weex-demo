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
/******/ 	return __webpack_require__(__webpack_require__.s = 40);
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

/***/ 13:
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
//
//
//
//
//
//

var stream = weex.requireModule('stream');

exports.default = {
  mixins: [_mixins2.default],
  data: function data() {
    return {
      isShape: false,
      detailsInfo: {},
      shapeNub: 1,
      newTitle: '',
      newCon: ''
    };
  },
  created: function created() {
    var _this2 = this;

    storage.getItem('title', function (event) {
      _this2.newTitle = event.data;
    });
    storage.getItem('content', function (event) {
      _this2.newCon = event.data;
    });
    storage.getItem('text', function (_ref) {
      var result = _ref.result,
          data = _ref.data;

      _this2.readInfo(data);
    });
  },

  methods: {
    click: function click() {
      this.pop();
    },


    // 点赞
    shapeBtn: function shapeBtn() {
      if (this.isShape == false) {
        this.shapeNub = this.shapeNub + 1;
        this.isShape = true;
      }
    },


    // 读取数据详情信息
    readInfo: function readInfo(type) {
      if (type == 'new') {
        this.detailsInfo = { title: this.newTitle, content: this.newCon, author: '小童', type: 'new' };
      } else {
        var url = '/src/json/' + type + '.json';

        var url = 'http://192.168.100.17:8085/src/json/' + type + '.json';
        var _this = this;
        stream.fetch({
          method: 'GET',
          type: 'json',
          url: url
        }, function (res) {
          if (res.ok) {
            console.log(res.data, '打印的数据');
            _this.detailsInfo = res.data;
          }
        });
      }
    }
  }
};

/***/ }),

/***/ 21:
/***/ (function(module, exports) {

module.exports = {
  "title": {
    "fontSize": 52,
    "color": "#3b464d",
    "marginLeft": 40,
    "marginTop": 80,
    "marginBottom": 40
  },
  "detail-author-style": {
    "fontSize": 24,
    "color": "#4a90e2",
    "marginLeft": 40,
    "display": "flex",
    "flexDirection": "row"
  },
  "detail-con-style": {
    "color": "#3d464d",
    "fontSize": 32,
    "marginLeft": 40,
    "marginTop": 40,
    "marginRight": 40,
    "lineHeight": 60,
    "wordBreak": "break-word"
  },
  "detail-btn-style": {
    "width": 270,
    "height": 80,
    "borderRadius": 4,
    "backgroundColor": "#4a90e2",
    "color": "#ffffff",
    "fontSize": 32,
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "shape-img-style": {
    "width": 34,
    "height": 36,
    "marginRight": 20
  }
}

/***/ }),

/***/ 29:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    on: {
      "click": _vm.click
    }
  }, [_c('text', {
    staticClass: ["title"]
  }, [_vm._v(_vm._s(_vm.detailsInfo.title))])]), _c('div', {
    staticClass: ["detail-author-style"]
  }, [_c('text', {
    staticStyle: {
      color: "#4a90e2"
    }
  }, [_vm._v(_vm._s(_vm.detailsInfo.author))]), _c('text', {
    staticStyle: {
      color: "#bbb",
      marginLeft: "30px"
    }
  }, [_vm._v("2017-12-19 21:26")])]), _c('scroller', {
    staticClass: ["scroller"]
  }, [_c('div', [_c('text', {
    staticClass: ["detail-con-style"]
  }, [_vm._v(_vm._s(_vm.detailsInfo.content))])])]), _c('div', {
    staticStyle: {
      alignItems: "center",
      color: "#fff",
      marginTop: "100px",
      marginBottom: "100px"
    }
  }, [_c('div', {
    staticClass: ["detail-btn-style"],
    style: {
      'background-color': _vm.isShape ? '#bbb' : '#4a90e2'
    },
    on: {
      "click": _vm.shapeBtn
    }
  }, [_c('image', {
    staticClass: ["shape-img-style"],
    attrs: {
      "src": "http://192.168.100.17:8085/src/assets/image/Shape@2x.png"
    }
  }), _c('text', {
    staticStyle: {
      color: "#fff"
    }
  }, [_vm._v("赞")]), _c('text', {
    staticStyle: {
      fontSize: "24px",
      color: "#fff"
    }
  }, [_vm._v("（ " + _vm._s(_vm.shapeNub) + " ）")])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(21)
)

/* script */
__vue_exports__ = __webpack_require__(13)

/* template */
var __vue_template__ = __webpack_require__(29)
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
__vue_options__.__file = "/Users/wangxiaogang/lianxi/weex-demo/src/views/details.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-760d2e94"
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
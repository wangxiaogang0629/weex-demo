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
/******/ 	return __webpack_require__(__webpack_require__.s = 38);
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

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mixins = __webpack_require__(0);

var _mixins2 = _interopRequireDefault(_mixins);

var _imgCard = __webpack_require__(36);

var _imgCard2 = _interopRequireDefault(_imgCard);

var _footer = __webpack_require__(4);

var _footer2 = _interopRequireDefault(_footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 引用组件
var modal = weex.requireModule('modal'); //
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

var storage = weex.requireModule('storage');
var stream = weex.requireModule('stream');

exports.default = {
  mixins: [_mixins2.default],
  data: function data() {
    return {
      infoArr: [],
      message: {},
      loadinging: false,
      detailType: '',
      newTitle: '',
      newCon: ''
    };
  },


  components: {
    ImgCard: _imgCard2.default,
    Footer: _footer2.default
  },

  created: function created() {
    var _this2 = this;

    this.readJson();
    storage.getItem('title', function (event) {
      _this2.newTitle = event.data;
    });
    storage.getItem('content', function (event) {
      _this2.newCon = event.data;
      console.log(event.data, 'zzhe');
    });
  },


  methods: {
    click: function click() {
      this.pop();
    },


    // 读取json的目录数据
    readJson: function readJson() {
      var url = 'http://192.168.100.17:8085/src/json/catalog.json';
      var _this = this;
      stream.fetch({
        method: 'GET',
        type: 'json',
        url: url
      }, function (res) {
        if (res.ok) {
          _this.infoArr = res.data.info;

          if (_this.newTitle != 'undefind' || _this.newCon != 'undefind') {
            _this.infoArr.push({ title: _this.newTitle, content: _this.newCon, author: '小童', type: 'new' });
          }
        }
      });
    },


    // 跳转页面
    jumpLink: function jumpLink(type) {
      var _this3 = this;

      storage.setItem('text', type, function (_ref) {
        var result = _ref.result;

        if (result === 'success') {
          _this3.push('details');
        }
      });
    },
    jumpIndex: function jumpIndex() {
      this.push('articleIndex');
    },
    jumpWrite: function jumpWrite() {
      this.push('write');
    },
    jumpMe: function jumpMe() {
      this.push('me');
    },


    // 上拉加载数据
    onloading: function onloading(event) {
      var _this4 = this;

      modal.toast({ message: 'Loading', duration: 1 });
      this.loadinging = true;

      setTimeout(function () {
        _this4.loadinging = false;
      }, 2000);
    }
  }

};

/***/ }),

/***/ 18:
/***/ (function(module, exports) {

module.exports = {
  "loading": {
    "width": 750,
    "display": "flex",
    "MsFlexAlign": "center",
    "WebkitAlignItems": "center",
    "WebkitBoxAlign": "center",
    "alignItems": "center"
  },
  "indicator-text": {
    "color": "#888888",
    "fontSize": 42,
    "textAlign": "center"
  },
  "indicator": {
    "marginTop": 16,
    "height": 40,
    "width": 40,
    "color": "#0000FF"
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

/***/ 26:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      marginTop: "20px"
    }
  }, [_c('scroller', {
    staticClass: ["scroller"],
    staticStyle: {
      paddingBottom: "130px"
    }
  }, [_vm._l((_vm.infoArr), function(info) {
    return _c('div', [_c('ImgCard', {
      attrs: {
        "message": info
      },
      on: {
        "link": function($event) {
          _vm.jumpLink(info.type)
        }
      }
    })], 1)
  }), _c('loading', {
    staticClass: ["loading"],
    attrs: {
      "display": _vm.loadinging ? 'show' : 'hide'
    },
    on: {
      "loading": _vm.onloading
    }
  }, [_c('text', {
    staticClass: ["indicator-text"]
  }, [_vm._v("Loading ...")]), _c('loading-indicator', {
    staticClass: ["indicator"]
  })])], 2), _c('Footer', {
    on: {
      "jumpIndex": _vm.jumpIndex,
      "jumpWrite": _vm.jumpWrite,
      "jumpMe": _vm.jumpMe
    }
  })], 1)
},staticRenderFns: []}
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

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(50)
)

/* script */
__vue_exports__ = __webpack_require__(47)

/* template */
var __vue_template__ = __webpack_require__(53)
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
__vue_options__.__file = "/Users/wangxiaogang/lianxi/weex-demo/src/components/imgCard/imgCard.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-1f641e7b"
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

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(18)
)

/* script */
__vue_exports__ = __webpack_require__(11)

/* template */
var __vue_template__ = __webpack_require__(26)
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
__vue_options__.__file = "/Users/wangxiaogang/lianxi/weex-demo/src/views/articleIndex.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-fb0858cc"
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

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
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
  data: function data() {
    return {
      info: {}
    };
  },

  props: {
    'message': {
      type: Object
    }
  },

  methods: {
    link: function link() {
      this.info = this.message;
      this.$emit('link', this.info);
    }
  }
};

/***/ }),

/***/ 50:
/***/ (function(module, exports) {

module.exports = {
  "head-img-style": {
    "width": 60,
    "height": 60,
    "borderRadius": 2,
    "border": "1px solid #d5d5d5",
    "fontSize": 24,
    "color": "#555555"
  },
  "img-card-title-wrapper-style": {
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center",
    "marginTop": 20,
    "marginLeft": 30,
    "marginBottom": 15
  },
  "shape-img-style": {
    "width": 28,
    "height": 30
  },
  "shape-wrapper-style": {
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center",
    "marginLeft": 20,
    "marginBottom": 20
  },
  "shape-nub-style": {
    "fontSize": 24,
    "color": "#bbbbbb"
  },
  "img-card-wrapper-style": {
    "borderBottomStyle": "solid",
    "borderBottomWidth": 1,
    "borderBottomColor": "#dddddd",
    "marginTop": 42,
    "marginLeft": 40,
    "marginRight": 40
  },
  "con-wrapper-style": {
    "marginTop": 16,
    "marginLeft": 40,
    "marginRight": 40,
    "marginBottom": 20
  },
  "title-style": {
    "fontSize": 36,
    "color": "#212121",
    "letterSpacing": 1.2,
    "marginBottom": 8
  },
  "content-style": {
    "fontSize": 28,
    "color": "#6d6d6d",
    "letterSpacing": 0.94,
    "fontFamily": "PingFangSC-Light",
    "overflow": "hidden",
    "textOverflow": "ellipsis",
    "display": "-webkit-box",
    "WebkitLineClamp": 2,
    "WebkitBoxOrient": "vertical",
    "lineHeight": 44
  }
}

/***/ }),

/***/ 53:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["img-card-wrapper-style"],
    on: {
      "click": function($event) {
        _vm.link(_vm.message.id)
      }
    }
  }, [_c('div', {
    staticClass: ["img-card-title-wrapper-style"]
  }, [_c('image', {
    staticClass: ["head-img-style"],
    attrs: {
      "src": "http://192.168.100.17:8085/src/assets/image/9.png"
    }
  }), _c('text', {
    staticStyle: {
      marginLeft: "20px"
    }
  }, [_vm._v(_vm._s(_vm.message.author))]), _c('text', {
    staticStyle: {
      marginLeft: "20px",
      color: "#bbb"
    }
  }, [_vm._v("2小时前")])]), _c('div', {
    staticClass: ["con-wrapper-style"]
  }, [_c('div', {
    staticClass: ["title-style"]
  }, [_vm._v(_vm._s(_vm.message.title))]), _c('div', {
    staticClass: ["content-style"]
  }, [_vm._v(_vm._s(_vm.message.content))])]), _vm._m(0)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["shape-wrapper-style"]
  }, [_c('image', {
    staticClass: ["shape-img-style"],
    attrs: {
      "src": "http://192.168.100.17:8085/src/assets/image/Shape_black@2x.png"
    }
  }), _c('text', {
    staticClass: ["shape-nub-style"],
    staticStyle: {
      marginLeft: "20px"
    }
  }, [_vm._v("23")])])
}]}
module.exports.render._withStripped = true

/***/ })

/******/ });
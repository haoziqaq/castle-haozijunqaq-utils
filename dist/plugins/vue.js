'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _axios = require('../axios');

var _axios2 = _interopRequireDefault(_axios);

var _exp = require('../exp');

var _exp2 = _interopRequireDefault(_exp);

var _formatter = require('../formatter');

var _formatter2 = _interopRequireDefault(_formatter);

var _tools = require('../tools');

var _tools2 = _interopRequireDefault(_tools);

var _md = require('../md5');

var md5 = _interopRequireWildcard(_md);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    install: function install(Vue, options) {
        Object.keys(_formatter2.default).forEach(function (key) {
            Vue.filter('' + key, _formatter2.default[key]);
            Vue.prototype['' + key] = _formatter2.default[key];
        });

        Object.keys(_exp2.default).forEach(function (key) {
            Vue.prototype['' + key] = _exp2.default[key];
        });

        Object.keys(_tools2.default).forEach(function (key) {
            Vue.prototype['' + key] = _tools2.default[key];
        });

        Object.keys(md5).forEach(function (key) {
            Vue.prototype['' + key] = md5[key];
        });

        Vue.prototype.$axios = _axios2.default;
    }
};
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (React) {
    return function (_React$Component) {
        _inherits(ReactInjectClass, _React$Component);

        function ReactInjectClass(props) {
            _classCallCheck(this, ReactInjectClass);

            var _this = _possibleConstructorReturn(this, (ReactInjectClass.__proto__ || Object.getPrototypeOf(ReactInjectClass)).call(this, props));

            _this.$axios = _axios2.default;
            Object.keys(_exp2.default).forEach(function (key) {
                _this['' + key] = _exp2.default[key];
            });
            Object.keys(_formatter2.default).forEach(function (key) {
                _this['' + key] = _formatter2.default[key];
            });
            Object.keys(_tools2.default).forEach(function (key) {
                _this['' + key] = _tools2.default[key];
            });
            Object.keys(md5).forEach(function (key) {
                _this['' + key] = md5[key];
            });
            return _this;
        }

        return ReactInjectClass;
    }(React.Component);
};

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
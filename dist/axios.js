'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var headerExceptRequestURLs = [];
var headerOptions = [];

var service = _axios2.default.create();
service.withCredentials = true;

service.interceptors.request.use(function (config) {
    var hasUrl = headerExceptRequestURLs.some(function (url) {
        return url === config.url;
    });
    if (!hasUrl) {
        headerOptions.forEach(function (header) {
            config.headers[header[0]] = header[1];
        });
    }
    return config;
}, function (error) {
    Promise.reject(error);
});

service.getData = function (url, params) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var queryParams = {
        params: {
            _t: new Date().getTime()
        }
    };
    if (params) {
        queryParams = {
            params: _extends({}, params, {
                _t: new Date().getTime()
            })
        };
    }
    queryParams = Object.assign(queryParams, options);
    return new Promise(function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
            var res;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return service.get(url, queryParams).catch(function (error) {
                                reject(error);
                            });

                        case 2:
                            res = _context.sent;

                            resolve(res);

                        case 4:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        return function (_x2, _x3) {
            return _ref.apply(this, arguments);
        };
    }());
};

service.getBlob = function (url, params) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var queryParams = {
        params: {
            _t: new Date().getTime()
        }
    };
    var config = {
        responseType: 'blob'
    };
    if (params) {
        queryParams = {
            params: _extends({}, params, {
                _t: new Date().getTime()
            })
        };
    }
    queryParams = Object.assign(queryParams, config, options);
    return new Promise(function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve, reject) {
            var res;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return service.get(url, queryParams).catch(function (error) {
                                reject(error);
                            });

                        case 2:
                            res = _context2.sent;

                            resolve(res);

                        case 4:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        }));

        return function (_x5, _x6) {
            return _ref2.apply(this, arguments);
        };
    }());
};

service.postData = function (url, params) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    return new Promise(function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(resolve, reject) {
            var res;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return service.post(url, _qs2.default.stringify(params), options).catch(function (error) {
                                reject(error);
                            });

                        case 2:
                            res = _context3.sent;

                            resolve(res);

                        case 4:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, undefined);
        }));

        return function (_x8, _x9) {
            return _ref3.apply(this, arguments);
        };
    }());
};

service.postJSON = function (url, params) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    return new Promise(function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(resolve, reject) {
            var res;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.next = 2;
                            return service.post(url, params, options).catch(function (error) {
                                reject(error);
                            });

                        case 2:
                            res = _context4.sent;

                            resolve(res);

                        case 4:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, undefined);
        }));

        return function (_x11, _x12) {
            return _ref4.apply(this, arguments);
        };
    }());
};

service.postMultipart = function (url, params) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var formdata = null;
    var config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
    if (params) {
        formdata = new FormData();
        Object.keys(params).forEach(function (key) {
            formdata.append(key, params[key]);
        });
    }
    options = Object.assign(config, options);
    return new Promise(function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(resolve, reject) {
            var res;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.next = 2;
                            return service.post(url, formdata, options).catch(function (error) {
                                reject(error);
                            });

                        case 2:
                            res = _context5.sent;

                            resolve(res);

                        case 4:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, undefined);
        }));

        return function (_x14, _x15) {
            return _ref5.apply(this, arguments);
        };
    }());
};

service.setBaseUrl = function (baseURL) {
    service.defaults.baseURL = baseURL;
};

service.getBaseUrl = function (baseURL) {
    return service.defaults.baseURL;
};

service.setTimeout = function (time) {
    service.defaults.timeout = time;
};

service.getTimeout = function (time) {
    return service.defaults.timeout;
};

service.addHeader = function () {
    var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    headerOptions.push([key, value]);
};

service.resetHeaders = function () {
    headerOptions = [];
};

service.setHeadersExcept = function () {
    var URLs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    headerExceptRequestURLs = URLs;
};

service.changeIsWithCredentials = function (isWithCredentials) {
    service.withCredentials = isWithCredentials;
};

exports.default = service;
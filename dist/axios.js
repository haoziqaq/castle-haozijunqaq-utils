'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        var _params = Object.assign(queryParams.params, _params);
        queryParams = {
            params: _params
        };
    }
    queryParams = Object.assign(queryParams, options);
    return new Promise(function (resolve, reject) {
        service.get(url, queryParams).then(function (res) {
            resolve(res);
        }).catch(function (error) {
            reject(error);
        });
    });
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
        var _params2 = Object.assign(queryParams.params, _params2);
        queryParams = {
            params: _params2
        };
    }
    queryParams = Object.assign(queryParams, config, options);
    return new Promise(function (resolve, reject) {
        service.get(url, queryParams).then(function (res) {
            resolve(res);
        }).catch(function (error) {
            reject(error);
        });
    });
};

service.postData = function (url, params) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    return new Promise(function (resolve, reject) {
        service.post(url, _qs2.default.stringify(params), options).then(function (res) {
            resolve(res);
        }).catch(function (error) {
            reject(error);
        });
    });
};

service.postJSON = function (url, params) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    return new Promise(function (resolve, reject) {
        service.post(url, params, options).then(function (res) {
            resolve(res);
        }).catch(function (error) {
            reject(error);
        });
    });
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
    return new Promise(function (resolve, reject) {
        service.post(url, formdata, options).then(function (res) {
            resolve(res);
        }).catch(function (error) {
            reject(error);
        });
    });
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
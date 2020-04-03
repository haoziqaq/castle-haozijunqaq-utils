import axios from 'axios'
import qs from 'qs'

let headerExceptRequestURLs = [];
let headerOptions = [];
let handleGlobalServerCode = (error) => {};

const service = axios.create();
service.defaults.withCredentials = true;

service.interceptors.request.use(config => {
    let hasUrl = headerExceptRequestURLs.some(url => url === config.url);
    if (!hasUrl) {
        headerOptions.forEach((header) => {
            config.headers[header[0]] = header[1];
        });
    }
    return config;
}, error => {
    Promise.reject(error)
});

service.interceptors.response.use(
    response => {
        handleGlobalServerCode(response);
        return response;
    },
    error => {  //响应错误处理
        handleGlobalServerCode(error.response);
        return error.response;
    }
);

service.getData = (url, par, options = {}) => {
    let queryParams = {
        params: {
            _t: new Date().getTime()
        }
    };
    if (par) {
        let params = Object.assign(queryParams.params, par);
        queryParams = {
            params
        }
    }
    queryParams = Object.assign(queryParams, options);
    return new Promise((resolve, reject) => {
        service.get(url, queryParams)
            .then(res => {
                resolve(res);
            })
            .catch(error => {
                reject(error);
            });
    });
};

service.getBlob = (url, par, options = {}) => {
    let queryParams = {
        params: {
            _t: new Date().getTime()
        }
    };
    let config = {
        responseType: 'blob'
    };
    if (par) {
        let params = Object.assign(queryParams.params, par);
        queryParams = {
            params
        }
    }
    queryParams = Object.assign(queryParams, config, options);
    return new Promise((resolve, reject) => {
        service.get(url, queryParams)
            .then(res => {
                resolve(res);
            })
            .catch(error => {
                reject(error);
            });
    });
};

service.postData = (url, params, options = {}) => {
    return new Promise((resolve, reject) => {
        service.post(url, qs.stringify(params), options)
            .then(res => {
                resolve(res);
            })
            .catch(error => {
                reject(error);
            });
    });
};

service.postJSON = (url, params, options = {}) => {
    return new Promise((resolve, reject) => {
        service.post(url, params, options)
            .then(res => {
                resolve(res);
            })
            .catch(error => {
                reject(error);
            });
    });
};

service.postMultipart = (url, params, options = {}) => {
    let formdata = null;
    let config = {
        headers:{
            'Content-Type':'multipart/form-data'
        }
    };
    if (params) {
        formdata = new FormData();
        Object.keys(params).forEach(key => {
            formdata.append(key, params[key]);
        })
    }
    options = Object.assign(config, options);
    return new Promise((resolve, reject) => {
        service.post(url, formdata, options)
            .then(res => {
                resolve(res);
            })
            .catch(error => {
                reject(error);
            });
    });
};

service.setBaseUrl = (baseURL) => {
    service.defaults.baseURL = baseURL;
};

service.setTimeout = (time) => {
    service.defaults.timeout = time;
};

service.addHeader = (key = '', value = '') => {
    headerOptions.push([key, value])
};

service.setHeadersExcept = (URLs = []) => {
    headerExceptRequestURLs = URLs;
};

service.changeIsWithCredentials = (isWithCredentials) => {
    service.defaults.withCredentials = isWithCredentials;
};

service.setResultCodeHandler = (fn) => {
    handleGlobalServerCode = fn;
};

export default service;

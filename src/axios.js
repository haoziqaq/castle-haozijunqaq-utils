import axios from 'axios'
import qs from 'qs'

let headerExceptRequestURLs = [];
let headerOptions = [];

const service = axios.create();
service.withCredentials = true;

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

service.getData = (url, params, options = {}) => {
    let queryParams = {
        params: {
            _t: new Date().getTime()
        }
    };
    if (params) {
        queryParams = {
            params: {
                ...params,
                _t: new Date().getTime()
            }
        }
    }
    queryParams = Object.assign(queryParams, options);
    return new Promise(async (resolve, reject) => {
        let res = await service.get(url, queryParams).catch(error => {
            reject(error);
        });
        resolve(res);
    });
};

service.getBlob = (url, params, options = {}) => {
    let queryParams = {
        params: {
            _t: new Date().getTime()
        }
    };
    let config = {
        responseType: 'blob'
    };
    if (params) {
        queryParams = {
            params: {
                ...params,
                _t: new Date().getTime()
            }
        }
    }
    queryParams = Object.assign(queryParams, config, options);
    return new Promise(async (resolve, reject) => {
        let res = await service.get(url, queryParams).catch(error => {
                reject(error);
            });
        resolve(res);
    });
};

service.postData = (url, params, options = {}) => {
    return new Promise(async (resolve, reject) => {
        let res = await service.post(url, qs.stringify(params), options).catch(error => {
                reject(error);
            });
        resolve(res);
    });
};

service.postJSON = (url, params, options = {}) => {
    return new Promise(async (resolve, reject) => {
        let res = await service.post(url, params, options).catch(error => {
                reject(error);
            });
        resolve(res);
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
    return new Promise(async (resolve, reject) => {
        let res = await service.post(url, formdata, options).catch(error => {
                reject(error);
            });
        resolve(res);
    });
};

service.setBaseUrl = (baseURL) => {
    service.defaults.baseURL = baseURL;
};

service.getBaseUrl = (baseURL) => service.defaults.baseURL;

service.setTimeout = (time) => {
    service.defaults.timeout = time;
};

service.getTimeout = (time) => service.defaults.timeout;

service.addHeader = (key = '', value = '') => {
    headerOptions.push([key, value])
};

service.resetHeaders = () => {
    headerOptions = [];
};

service.setHeadersExcept = (URLs = []) => {
    headerExceptRequestURLs = URLs;
};

service.changeIsWithCredentials = (isWithCredentials) => {
    service.withCredentials = isWithCredentials;
};


export default service;
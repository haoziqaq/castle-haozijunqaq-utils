'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = {

    /**
     * 函数柯里化
     * @param fn {function} 需要函数柯里化的函数
     * @param args 需要被解耦的参数集
     */
    $curring: function $curring(fn) {
        var _this = this;

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        return function () {
            for (var _len2 = arguments.length, _args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                _args[_key2] = arguments[_key2];
            }

            return fn.call.apply(fn, [_this].concat(_toConsumableArray(args), _args));
        };
    },


    /**
     * 浏览器直接下载文件
     * @param blob {File | Blob} 文件blob | file 对象
     * @param fileName {String} 文件名
     */
    $download: function $download(blob, fileName) {
        if ('download' in document.createElement('a')) {
            // 非IE下载
            var elink = document.createElement('a');
            elink.download = fileName;
            elink.style.display = 'none';
            elink.href = window.URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            window.URL.revokeObjectURL(elink.href);
            document.body.removeChild(elink);
        } else {
            // IE10+下载
            navigator.msSaveBlob(blob, fileName);
        }
    },


    /**
     * 加载图片完成
     * @param imgElement
     * @return {Promise<any>}
     */
    $imgLoad: function $imgLoad(imgElement) {
        return new Promise(function (resolve) {
            imgElement.onload = function (result) {
                resolve(result);
            };
        });
    },


    /**
     * 压缩(放大)图片
     * @param imgFile {File} 图片文件对象
     * @param scale {Number} 压缩率
     * @param mime {String} 文件类型
     * @return {Promise<*|File>}
     */
    $compressImage: function $compressImage(imgFile) {
        var _this2 = this;

        var scale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

        return new Promise(function (resolve, reject) {
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            var fileName = imgFile.name;
            var imgUrl = window.URL.createObjectURL(imgFile);
            var imgElement = document.createElement('img');
            imgElement.src = imgUrl;
            document.body.appendChild(imgElement);
            _this2.$imgLoad(imgElement).then(function (res) {
                var imgWidth = imgElement.width;
                var imgHeight = imgElement.height;
                canvas.width = imgWidth * scale;
                canvas.height = imgHeight * scale;
                context.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
                var base64 = canvas.toDataURL('image/jpeg');
                document.body.removeChild(imgElement);
                resolve(_this2.$convertBase64ToFile(base64, fileName));
            }).catch(function (e) {
                reject(e);
            });
        });
    },


    /**
     * 压缩(放大)图片大小
     * @param imgFile {File} 图片文件对象
     * @param maxSize {Number} 文件大小基准点
     * @param isFixSize {Boolean} 是否开启文件大小修正 开启后会等到精度更高的压缩效果
     * @return {Promise<*|File>}
     */
    $compressImageSize: function $compressImageSize(imgFile) {
        var _this3 = this;

        var maxSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100 * 1024;
        var isFixSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        function appendCanvas(img) {
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            var imgUrl = window.URL.createObjectURL(img);
            var imgElement = document.createElement('img');
            imgElement.src = imgUrl;
            document.body.appendChild(imgElement);
            return [canvas, imgElement, context];
        }
        return new Promise(function (resolve, reject) {
            if (isFixSize) {
                _this3.$compressImageSize(imgFile, maxSize, false).then(function (file) {
                    var fileName = file.name;
                    var fileSize = file.size;
                    if (fileSize <= maxSize) {
                        resolve(file);
                        return;
                    }
                    var scale = (fileSize / maxSize).toFixed(2);

                    var _appendCanvas = appendCanvas(file),
                        _appendCanvas2 = _slicedToArray(_appendCanvas, 3),
                        canvas = _appendCanvas2[0],
                        imgElement = _appendCanvas2[1],
                        context = _appendCanvas2[2];

                    _this3.$imgLoad(imgElement).then(function (res) {
                        var imgWidth = imgElement.width;
                        var imgHeight = imgElement.height;
                        canvas.width = imgWidth / Math.sqrt(scale);
                        canvas.height = imgHeight / Math.sqrt(scale);
                        context.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
                        var base64 = canvas.toDataURL('image/jpeg', 1);
                        document.body.removeChild(imgElement);
                        resolve(_this3.$convertBase64ToFile(base64, fileName));
                    }).catch(function (e) {
                        reject(e);
                    });
                });
            } else {
                var _appendCanvas3 = appendCanvas(imgFile),
                    _appendCanvas4 = _slicedToArray(_appendCanvas3, 3),
                    canvas = _appendCanvas4[0],
                    imgElement = _appendCanvas4[1],
                    context = _appendCanvas4[2];

                _this3.$imgLoad(imgElement).then(function (res) {
                    var imgWidth = imgElement.width;
                    var imgHeight = imgElement.height;
                    canvas.width = imgWidth;
                    canvas.height = imgHeight;
                    context.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
                    var base64 = canvas.toDataURL('image/jpeg', 1);
                    document.body.removeChild(imgElement);
                    resolve(_this3.$convertBase64ToFile(base64, imgFile.name));
                }).catch(function (e) {
                    reject(e);
                });
            }
        });
    },


    /**
     * 将base64转成file对象
     * @param base64 {String} 带mime前缀的base64字符串
     * @param fileName {String} 文件名(后缀强制为mime类型)
     * @return {File}
     */
    $convertBase64ToFile: function $convertBase64ToFile(base64, fileName) {
        var arr = base64.split(',');
        var mime = arr[0].match(/:(.*?);/)[1];
        var bstr = window.atob(arr[1]);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], fileName, { type: mime });
    },


    /**
     * 文件对象转base64字符串
     * @param {File} file 文件对象
     * @return {Promise<any>}
     */
    $convertFileToBase64: function $convertFileToBase64(file) {
        return new Promise(function (resolve, reject) {
            var fileReader = new FileReader();
            fileReader.onload = function () {
                resolve(fileReader.result);
            };
            fileReader.onerror = function (error) {
                reject(error);
            };
            fileReader.readAsDataURL(file);
        });
    },


    /**
     * 防抖函数
     * @param method 事件触发的操作
     * @param delay 多少毫秒内连续触发事件，不会执行
     * @returns {Function}
     */
    $debounce: function $debounce(method, delay) {
        var timer = null;
        return function () {
            var self = this;
            var args = arguments;
            timer && clearTimeout(timer);
            timer = setTimeout(function () {
                method.apply(self, args);
            }, delay);
        };
    },


    /**
     * 节流函数
     * @param method 事件触发的操作
     * @param mustRunDelay 间隔多少毫秒需要触发一次事件
     */
    $throttle: function $throttle(method, mustRunDelay) {
        var timer = void 0;
        var args = arguments;
        var start = void 0;
        return function loop() {
            var self = this;
            var now = Date.now();
            if (!start) {
                start = now;
            }
            if (timer) {
                clearTimeout(timer);
            }
            if (now - start >= mustRunDelay) {
                method.apply(self, args);
                start = now;
            } else {
                timer = setTimeout(function () {
                    loop.apply(self, args);
                }, 50);
            }
        };
    },
    $setSession: function $setSession(key, value) {
        window.sessionStorage.setItem(key, JSON.stringify(value));
    },
    $getSession: function $getSession(key) {
        return JSON.parse(window.sessionStorage.getItem(key));
    },
    $setLocal: function $setLocal(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    },
    $getLocal: function $getLocal(key) {
        return JSON.parse(window.localStorage.getItem(key));
    },

    //获取当前月的最后一天
    $getCurrentMonthLastDay: function $getCurrentMonthLastDay() {
        var date = new Date();
        var currentMonth = date.getMonth();
        var nextMonth = ++currentMonth;
        var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
        var oneDay = 1000 * 60 * 60 * 24;
        var lastTime = new Date(nextMonthFirstDay - oneDay);
        var month = parseInt(lastTime.getMonth() + 1);
        var day = lastTime.getDate();
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }
        return new Date(date.getFullYear() + '-' + month + '-' + day);
    },

    //获取当前日期
    $getToday: function $getToday() {
        var day = new Date();
        day.setTime(day.getTime());
        var month = null;
        var today = null;
        if (day.getMonth() + 1 < 10) {
            month = '0' + (day.getMonth() + 1);
        } else {
            month = day.getMonth() + 1;
        }
        if (day.getDate() < 10) {
            today = '0' + day.getDate();
        } else {
            today = day.getDate();
        }
        return day.getFullYear() + "-" + month + "-" + today;
    },

    //判断是否金额数字
    $checkMoney: function $checkMoney(val) {
        if (val === '') {
            return true;
        }
        var money = /^([1-9][\d]{0,9}|0)(\.[\d]{1,2})?$/;
        return money.test(val);
    }
};
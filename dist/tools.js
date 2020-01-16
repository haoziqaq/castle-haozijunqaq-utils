'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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
     * @param widthScale {Number} 宽度缩放倍率
     * @param heightScale {Number} 高度缩放倍率
     * @param mime {String} 文件类型
     * @return {Promise<*|File>}
     */
    $compressImage: function $compressImage(imgFile) {
        var widthScale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

        var _this2 = this;

        var heightScale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var mime = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'image/png';

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
                canvas.width = imgWidth * widthScale;
                canvas.height = imgHeight * heightScale;
                context.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
                var base64 = canvas.toDataURL(mime);
                document.body.removeChild(imgElement);
                resolve(_this2.$convertBase64ToFile(base64, fileName));
            }).catch(function (e) {
                reject(e);
            });
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
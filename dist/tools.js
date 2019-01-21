'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
    /**
     * 浏览器直接下载文件
     * @param blob {File | Blob} 文件blob | file 对象
     * @param fileName {String} 文件名
     */
    download: function download(blob, fileName) {
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
    imgLoad: function imgLoad(imgElement) {
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
    compressImage: function compressImage(imgFile) {
        var widthScale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

        var _this = this;

        var heightScale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var mime = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'image/png';
        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var canvas, context, fileName, imgUrl, imgElement, imgWidth, imgHeight, base64;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            canvas = document.createElement('canvas');
                            context = canvas.getContext('2d');
                            fileName = imgFile.name;
                            imgUrl = window.URL.createObjectURL(imgFile);
                            imgElement = document.createElement('img');

                            imgElement.src = imgUrl;
                            document.body.appendChild(imgElement);
                            _context.next = 9;
                            return _this.imgLoad(imgElement);

                        case 9:
                            imgWidth = imgElement.width;
                            imgHeight = imgElement.height;

                            canvas.width = imgWidth * widthScale;
                            canvas.height = imgHeight * heightScale;
                            context.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
                            base64 = canvas.toDataURL(mime);

                            document.body.removeChild(imgElement);
                            return _context.abrupt('return', _this.convertBase64ToFile(base64, fileName));

                        case 17:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }))();
    },


    /**
     * 将base64转成file对象
     * @param base64 {String} 带mime前缀的base64字符串
     * @param fileName {String} 文件名(后缀强制为mime类型)
     * @return {File}
     */
    convertBase64ToFile: function convertBase64ToFile(base64, fileName) {
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
    convertFileToBase64: function convertFileToBase64(file) {
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
    setSession: function setSession(key, value) {
        window.sessionStorage.setItem(key, JSON.stringify(value));
    },
    getSession: function getSession(key) {
        return JSON.parse(window.sessionStorage.getItem(key));
    },
    setLocal: function setLocal(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    },
    getLocal: function getLocal(key) {
        return JSON.parse(window.localStorage.getItem(key));
    }
};
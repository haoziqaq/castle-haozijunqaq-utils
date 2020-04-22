const getChildren = (arr, pid, pidKey) => {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][pidKey] === pid) {
            result.push(arr[i]);
        }
    }
    return result;
};
const mapChildren = (arr, result, pidKey, idKey) => {
    if (result.length === 0) {
        return
    }
    for (let i = 0; i < result.length; i++) {
        result[i].children = getChildren(arr, result[i][idKey], pidKey);
        mapChildren(arr, result[i].children, pidKey);
    }
};

export default {

    /**
     * 数组去重
     * @param arr 去重数组
     * @returns {any[]}
     */
    uniq(arr) {
        return [...new Set(arr)];
    },

    /**
     * 数组取最大值
     * @param arr
     * @returns {number}
     */
    max(arr) {
        return Math.max.apply(null, arr);
    },

    /**
     * 数组取最小值
     * @param arr
     * @returns {number}
     */
    min(arr) {
        return Math.min.apply(null, arr);
    },

    /**
     * 对象数组排序
     * @param arr
     * @param attr 属性key
     * @param order 排序方式 asc 升序 desc 降序
     */
    sortBy(arr, attr, order = 'asc') {
        const copy = JSON.parse(JSON.stringify(arr));
        for (let i = 0; i < copy.length - 1; i++) {
            for (let j = 0; j < copy.length - 1 - i; j++) {
                if (typeof copy[j] === 'object' && !Array.isArray(copy[j])) {
                    if (order === 'asc') {
                        if (copy[j][attr] > copy[j + 1][attr]) {
                            const temp = copy[j];
                            copy[j] = copy[j + 1];
                            copy[j + 1] = temp;
                        }
                    } else if (order === 'desc') {
                        if (copy[j][attr] < copy[j + 1][attr]) {
                            const temp = copy[j];
                            copy[j] = copy[j + 1];
                            copy[j + 1] = temp;
                        }
                    }
                } else {
                    throw Error('item type is invalid')
                }
            }
        }
        return copy;
    },

    /**
     * 构建树形结构(不会改变原数组)
     * @param {Array} arr 所有节点组成的数组
     * @param {String | null} rootId 根节点id的pid 如果没有传null
     * @param {String} idKey id的键名
     * @param {String} pidKey pid的键名
     * @returns {Array}
     */
    formatTree(arr, rootId, idKey, pidKey) {
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][pidKey] === rootId || arr[i][pidKey] === undefined) {
                result.push(arr[i]);
            }
        }
        for (let i = 0; i < result.length; i++) {
            result[i].children = getChildren(arr, result[i][idKey], pidKey);
            mapChildren(arr, result[i].children, pidKey, idKey);
        }
        return result
    },

    /**
     * 格式化时间戳
     * @param {Number | Date} time 毫秒时间戳 | 时间对象
     * @param {String} fmt 格式化方式
     * @returns {*}
     */
    formatDate(time, fmt) {
        if (!time) return '';
        let date = typeof time === 'number' ? new Date(time) : time;
        const expList = {
            "M+": date.getMonth() + 1,                //月份
            "d+": date.getDate(),                    //日
            "H+": date.getHours(),                   //小时
            "h+": date.getHours() <= 12 ? date.getHours() : date.getHours() - 12, //12制小时
            "m+": date.getMinutes(),                 //分
            "s+": date.getSeconds(),                 //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds(),             //毫秒
            "n": date.getHours() < 12 ? 'AM' : 'PM', //上午am,下午pm
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        for (let exp in expList) {
            if (new RegExp(`(${exp})`).test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ?
                  (expList[exp]) : ((`00${expList[exp]}`).substr((`${expList[exp]}`).length)));
            }
        }
        return fmt;
    },

    /**
     * 随机数方法,取[min, max]
     * @param min 最小值
     * @param max 最大值
     * @returns {number}
     */
    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    /**
     * 函数柯里化
     * @param fn {function} 需要函数柯里化的函数
     * @param args 需要被解耦的参数集
     */
    curring(fn, ...args) {
        return (..._args) => {
            return fn.call(this, ...args, ..._args);
        }
    },

    /**
     * 浏览器直接下载文件
     * @param blob {File | Blob} 文件blob | file 对象
     * @param fileName {String} 文件名
     */
    download(blob, fileName) {
        if ('download' in document.createElement('a')) { // 非IE下载
            const elink = document.createElement('a');
            elink.download = fileName;
            elink.style.display = 'none';
            elink.href = window.URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            window.URL.revokeObjectURL(elink.href) ;
            document.body.removeChild(elink);
        } else { // IE10+下载
            navigator.msSaveBlob(blob, fileName);
        }
    },

    /**
     * 加载图片完成
     * @param imgElement
     * @return {Promise<any>}
     */
    imgLoad(imgElement) {
        return new Promise((resolve) => {
            imgElement.onload = (result) => {
                resolve(result)
            }
        })
    },

    /**
     * 压缩(放大)图片
     * @param imgFile {File} 图片文件对象
     * @param scale {Number} 压缩率
     * @param mime {String} 文件类型
     * @return {Promise<*|File>}
     */
    compressImage(imgFile, scale = 1) {
        return new Promise((resolve, reject) => {
            let canvas = document.createElement('canvas');
            let context = canvas.getContext('2d');
            let fileName = imgFile.name;
            let imgUrl = window.URL.createObjectURL(imgFile);
            let imgElement = document.createElement('img');
            imgElement.src = imgUrl;
            document.body.appendChild(imgElement);
            this.imgLoad(imgElement).then(res => {
                let imgWidth = imgElement.width;
                let imgHeight = imgElement.height;
                canvas.width = imgWidth * scale;
                canvas.height = imgHeight * scale;
                context.drawImage(imgElement, 0 ,0 ,canvas.width, canvas.height);
                let base64 = canvas.toDataURL('image/jpeg');
                document.body.removeChild(imgElement);
                resolve(this.convertBase64ToFile(base64, fileName))
            }).catch(e => {
                reject(e)
            })
        })
    },

    /**
     * 压缩(放大)图片大小
     * @param imgFile {File} 图片文件对象
     * @param maxSize {Number} 文件大小基准点
     * @param isFixSize {Boolean} 是否开启文件大小修正 开启后会等到精度更高的压缩效果
     * @return {Promise<*|File>}
     */
    compressImageSize(imgFile, maxSize = 100 * 1024, isFixSize = true) {
        function appendCanvas(img) {
            let canvas = document.createElement('canvas');
            let context = canvas.getContext('2d');
            let imgUrl = window.URL.createObjectURL(img);
            let imgElement = document.createElement('img');
            imgElement.src = imgUrl;
            document.body.appendChild(imgElement);
            return [canvas, imgElement, context]
        }
        return new Promise((resolve, reject) => {
            if (isFixSize) {
                this.compressImageSize(imgFile, maxSize, false).then(file => {
                    let fileName = file.name;
                    let fileSize = file.size;
                    if (fileSize <= maxSize) {
                        resolve(file);
                        return
                    }
                    let scale = (fileSize / maxSize).toFixed(2);
                    let [canvas, imgElement, context] = appendCanvas(file);
                    this.imgLoad(imgElement).then(res => {
                        let imgWidth = imgElement.width;
                        let imgHeight = imgElement.height;
                        canvas.width = imgWidth / Math.sqrt(scale);
                        canvas.height = imgHeight / Math.sqrt(scale);
                        context.drawImage(imgElement, 0 ,0 ,canvas.width, canvas.height);
                        let base64 = canvas.toDataURL('image/jpeg', 1);
                        document.body.removeChild(imgElement);
                        resolve(this.convertBase64ToFile(base64, fileName))
                    }).catch(e => {
                        reject(e)
                    })
                })
            } else {
                let [canvas, imgElement, context] = appendCanvas(imgFile);
                this.imgLoad(imgElement).then(res => {
                    let imgWidth = imgElement.width;
                    let imgHeight = imgElement.height;
                    canvas.width = imgWidth;
                    canvas.height = imgHeight;
                    context.drawImage(imgElement, 0 ,0 ,canvas.width, canvas.height);
                    let base64 = canvas.toDataURL('image/jpeg', 1);
                    document.body.removeChild(imgElement);
                    resolve(this.convertBase64ToFile(base64, imgFile.name))
                }).catch(e => {
                    reject(e)
                })
            }
        })
    },


    /**
     * 将base64转成file对象
     * @param base64 {String} 带mime前缀的base64字符串
     * @param fileName {String} 文件名(后缀强制为mime类型)
     * @return {File}
     */
    convertBase64ToFile(base64, fileName) {
        let arr = base64.split(',');
        let mime = arr[0].match(/:(.*?);/)[1];
        let bstr = window.atob(arr[1]);
        let n = bstr.length;
        let u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], fileName, {type:mime});
    },

    /**
     * 文件对象转base64字符串
     * @param {File} file 文件对象
     * @return {Promise<any>}
     */
    convertFileToBase64(file) {
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader();
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
            fileReader.readAsDataURL(file);
        })
    },

    /**
     * 防抖函数
     * @param method 事件触发的操作
     * @param delay 多少毫秒内连续触发事件，不会执行
     * @returns {Function}
     */
    debounce(method, delay) {
        let timer = null;
        return function () {
            let self = this;
            let args = arguments;
            timer && clearTimeout(timer);
            timer = setTimeout(function () {
                method.apply(self, args);
            },delay);
        }
    },

    /**
     * 节流函数
     * @param method 事件触发的操作
     * @param mustRunDelay 间隔多少毫秒需要触发一次事件
     */
    throttle(method, mustRunDelay) {
        let timer;
        let args = arguments;
        let start;
        return function loop() {
            let self = this;
            let now = Date.now();
            if(!start){
                start = now;
            }
            if(timer){
                clearTimeout(timer);
            }
            if(now - start >= mustRunDelay){
                method.apply(self, args);
                start = now;
            }else {
                timer = setTimeout(function () {
                    loop.apply(self, args);
                }, 50);
            }
        }
    },

    setSession(key, value) {
        window.sessionStorage.setItem(key, JSON.stringify(value));
    },

    getSession(key) {
        return JSON.parse(window.sessionStorage.getItem(key));
    },

    setLocal(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    },

    getLocal(key) {
        return JSON.parse(window.localStorage.getItem(key));
    },
}

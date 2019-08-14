export default {

    /**
     * 函数柯里化
     * @param fn {function} 需要函数柯里化的函数
     * @param args 需要被解耦的参数集
     */
    $curring(fn, ...args) {
        return (..._args) => {
            return fn.call(this, ...args, ..._args);
        }
    },

    /**
     * 浏览器直接下载文件
     * @param blob {File | Blob} 文件blob | file 对象
     * @param fileName {String} 文件名
     */
    $download(blob, fileName) {
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
    $imgLoad(imgElement) {
        return new Promise((resolve) => {
            imgElement.onload = (result) => {
                resolve(result)
            }
        })
    },

    /**
     * 压缩(放大)图片
     * @param imgFile {File} 图片文件对象
     * @param widthScale {Number} 宽度缩放倍率
     * @param heightScale {Number} 高度缩放倍率
     * @param mime {String} 文件类型
     * @return {Promise<*|File>}
     */
    $compressImage(imgFile, widthScale = 1, heightScale = 1, mime = 'image/png') {
        return new Promise((resolve, reject) => {
            let canvas = document.createElement('canvas');
            let context = canvas.getContext('2d');
            let fileName = imgFile.name;
            let imgUrl = window.URL.createObjectURL(imgFile);
            let imgElement = document.createElement('img');
            imgElement.src = imgUrl;
            document.body.appendChild(imgElement);
            this.$imgLoad(imgElement).then(res => {
                let imgWidth = imgElement.width;
                let imgHeight = imgElement.height;
                canvas.width = imgWidth * widthScale;
                canvas.height = imgHeight * heightScale;
                context.drawImage(imgElement, 0 ,0 ,canvas.width, canvas.height);
                let base64 = canvas.toDataURL(mime);
                document.body.removeChild(imgElement);
                resolve(this.$convertBase64ToFile(base64, fileName))
            }).catch(e => {
                reject(e)
            })
        })
    },

    /**
     * 将base64转成file对象
     * @param base64 {String} 带mime前缀的base64字符串
     * @param fileName {String} 文件名(后缀强制为mime类型)
     * @return {File}
     */
    $convertBase64ToFile(base64, fileName) {
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
    $convertFileToBase64(file) {
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
    $debounce(method, delay) {
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
    $throttle(method, mustRunDelay) {
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

    $setSession(key, value) {
        window.sessionStorage.setItem(key, JSON.stringify(value));
    },

    $getSession(key) {
        return JSON.parse(window.sessionStorage.getItem(key));
    },

    $setLocal(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    },

    $getLocal(key) {
        return JSON.parse(window.localStorage.getItem(key));
    },
    //获取当前月的最后一天
    $getCurrentMonthLastDay() {
        let date = new Date();
        let currentMonth = date.getMonth();
        let nextMonth = ++currentMonth;
        let nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
        let oneDay = 1000 * 60 * 60 * 24;
        let lastTime = new Date(nextMonthFirstDay - oneDay);
        let month = parseInt(lastTime.getMonth() + 1);
        let day = lastTime.getDate();
        if (month < 10) {
            month = '0' + month
        }
        if (day < 10) {
            day = '0' + day
        }
        return new Date(date.getFullYear() + '-' + month + '-' + day);
    }
}

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
     * @param scale {Number} 压缩率
     * @param mime {String} 文件类型
     * @return {Promise<*|File>}
     */
    $compressImage(imgFile, scale = 1) {
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
                canvas.width = imgWidth * scale;
                canvas.height = imgHeight * scale;
                context.drawImage(imgElement, 0 ,0 ,canvas.width, canvas.height);
                let base64 = canvas.toDataURL('image/jpeg');
                document.body.removeChild(imgElement);
                resolve(this.$convertBase64ToFile(base64, fileName))
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
    $compressImageSize(imgFile, maxSize = 100 * 1024, isFixSize = true) {
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
                this.$compressImageSize(imgFile, maxSize, false).then(file => {
                    let fileName = file.name;
                    let fileSize = file.size;
                    if (fileSize <= maxSize) {
                        resolve(file);
                        return
                    }
                    let scale = (fileSize / maxSize).toFixed(2);
                    let [canvas, imgElement, context] = appendCanvas(file);
                    this.$imgLoad(imgElement).then(res => {
                        let imgWidth = imgElement.width;
                        let imgHeight = imgElement.height;
                        canvas.width = imgWidth / Math.sqrt(scale);
                        canvas.height = imgHeight / Math.sqrt(scale);
                        context.drawImage(imgElement, 0 ,0 ,canvas.width, canvas.height);
                        let base64 = canvas.toDataURL('image/jpeg', 1);
                        document.body.removeChild(imgElement);
                        resolve(this.$convertBase64ToFile(base64, fileName))
                    }).catch(e => {
                        reject(e)
                    })
                })
            } else {
                let [canvas, imgElement, context] = appendCanvas(imgFile);
                this.$imgLoad(imgElement).then(res => {
                    let imgWidth = imgElement.width;
                    let imgHeight = imgElement.height;
                    canvas.width = imgWidth;
                    canvas.height = imgHeight;
                    context.drawImage(imgElement, 0 ,0 ,canvas.width, canvas.height);
                    let base64 = canvas.toDataURL('image/jpeg', 1);
                    document.body.removeChild(imgElement);
                    resolve(this.$convertBase64ToFile(base64, imgFile.name))
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
    },
    //获取当前日期
    $getToday() {
        let day = new Date();
        day.setTime(day.getTime());
        let month = null;
        let today = null;
        if (day.getMonth() + 1 < 10) {
            month = '0' + (day.getMonth() + 1)
        }
        else {
            month = day.getMonth() + 1
        }
        if (day.getDate() < 10) {
            today = '0' + day.getDate();
        }
        else {
            today = day.getDate()
        }
        return day.getFullYear() + "-" + month + "-" + today;
    },
    //判断是否金额数字
    $checkMoney(val) {
        if (val === '') {
            return true
        }
        let money = /^([1-9][\d]{0,9}|0)(\.[\d]{1,2})?$/;
        return money.test(val)
    }
}

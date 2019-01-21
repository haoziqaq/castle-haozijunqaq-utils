'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * 格式化工具
 * author haozijunqaq
 * email 357229046@qq.com
 */
var getChildren = function getChildren(arr, pid, pidKey) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i][pidKey] === pid) {
            result.push(arr[i]);
        }
    }
    return result;
};
var mapChildren = function mapChildren(arr, result, pidKey) {
    if (result.length === 0) {
        return;
    }
    for (var i = 0; i < result.length; i++) {
        result[i].children = getChildren(arr, result[i].id, pidKey);
        mapChildren(arr, result[i].children, pidKey);
    }
};

exports.default = {

    /**
     * 去除字符串所有的空格
     * @param {String} str 待处理的字符串
     * @returns {string}
     */
    $clearSpace: function $clearSpace(str) {
        if (!str) return '-';
        return str.replace(/\s/g, '');
    },


    /**
     * 构建树形结构(不会改变原数组)
     * @param {Array} arr 所有节点组成的数组
     * @param {String | null} rootId 根节点id的pid 如果没有传null
     * @param {String} idKey id的键名
     * @param {String} pidKey pid的键名
     * @returns {Array}
     */
    $formatTree: function $formatTree(arr, rootId, idKey, pidKey) {
        var result = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][pidKey] === rootId || arr[i][pidKey] === undefined) {
                result.push(arr[i]);
            }
        }
        for (var _i = 0; _i < result.length; _i++) {
            result[_i].children = getChildren(arr, result[_i].id, pidKey);
            mapChildren(arr, result[_i].children, pidKey);
        }
        return result;
    },


    /**
     * 当前时间相对于目标时间的时差描述(刚刚 1分钟前 1个小时前 1天前 1月前 1年前 5年前 很久以前)
     * @param {Number | Date} target 目标毫秒时间戳 | 时间对象
     * @param {Number | Date} now 当前毫秒时间戳 | 时间对象
     * @returns {string}
     */
    $formatDateGap: function $formatDateGap(target) {
        var now = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();

        if (!target) return '';
        var targetTime = typeof target === 'number' ? target : target.getTime();
        var nowTime = typeof now === 'number' ? now : now.getTime();
        var timeGap = nowTime - targetTime;
        if (timeGap >= 0) {
            if (timeGap < 60 * 1000) {
                //60秒
                return '\u521A\u521A';
            }
            if (timeGap < 60 * 60 * 1000) {
                // 60分钟
                return Math.floor(timeGap / (1000 * 60)) + '\u5206\u949F\u524D';
            }
            if (timeGap < 24 * 60 * 60 * 1000) {
                return Math.floor(timeGap / (1000 * 60 * 60)) + '\u5C0F\u65F6\u524D';
            }
            if (timeGap < 30 * 24 * 60 * 60 * 1000) {
                return Math.floor(timeGap / (24 * 1000 * 60 * 60)) + '\u5929\u524D';
            }
            if (timeGap < 12 * 30 * 24 * 60 * 60 * 1000) {
                return Math.floor(timeGap / (30 * 24 * 1000 * 60 * 60)) + '\u6708\u524D';
            }
            if (timeGap < 6 * 12 * 30 * 24 * 60 * 60 * 1000) {
                return Math.floor(timeGap / (12 * 30 * 24 * 1000 * 60 * 60)) + '\u5E74\u524D';
            }
            return '\u5F88\u4E45\u4EE5\u524D';
        } else {
            return '此刻之后';
        }
    },


    /**
     * 当前时间相对于目标时间是否过期 (当前时间是否大于目标时间)
     * @param {Number | Date} target 目标毫秒时间戳 | 时间对象
     * @param {Number | Date} now 当前毫秒时间戳 | 时间对象
     * @returns {boolean}
     */
    $isExpire: function $isExpire(target) {
        var now = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();

        var nowTime = typeof now === 'number' ? now : now.getTime();
        var targetTime = typeof target === 'number' ? target : target.getTime();
        return nowTime > targetTime;
    },


    /**
     * 格式化时间戳
     * @param {Number | Date} time 毫秒时间戳 | 时间对象
     * @param {String} fmt 格式化方式
     * @returns {*}
     */
    $formatDate: function $formatDate(time, fmt) {
        if (!time) return '';
        var date = typeof time === 'number' ? new Date(time) : time;
        var expList = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "H+": date.getHours(), //小时
            "h+": date.getHours() <= 12 ? date.getHours() : date.getHours() - 12, //12制小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds(), //毫秒
            "n": date.getHours() < 12 ? 'AM' : 'PM' //上午am,下午pm
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        for (var exp in expList) {
            if (new RegExp('(' + exp + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? expList[exp] : ('00' + expList[exp]).substr(('' + expList[exp]).length));
            }
        }
        return fmt;
    }
};
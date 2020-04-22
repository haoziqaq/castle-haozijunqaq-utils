"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
//简易手机号
var easyMobilePhone = /^1\d{10}$/;
//手机号
var mobilePhone = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0-9])|(19[0-9]))\d{8}$/;
//国内座机
var telephone = /\d{3}-\d{8}|\d{4}-\d{7}/;
//身份证
var idCard = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
//ipV4
var ipV4 = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
//十六进制
var hex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
//QQ号码
var QQ = /^[1-9][0-9]{4,10}$/;
//微信号码
var WX = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
//包含中文
var includeCN = /[\u4E00-\u9FA5]/;
//只有中文
var onlyCN = /^[\u4e00-\u9fa5]*$/;
//URL
var URL = /^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i;
//HTTP
var HTTP = /^(http:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i;
//HTTPS
var HTTPS = /^(https:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i;
//中国邮政编码
var postalCode = /[1-9]\d{5}(?!\d)/;
//邮箱验证
var email = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;

exports.default = {
    isEasyMobilePhone: function isEasyMobilePhone(value) {
        return easyMobilePhone.test(value);
    },
    isMobilePhone: function isMobilePhone(value) {
        return mobilePhone.test(value);
    },
    isTelephone: function isTelephone(value) {
        return telephone.test(value);
    },
    isIdCard: function isIdCard(value) {
        return idCard.test(value);
    },
    isIpV4: function isIpV4(value) {
        return ipV4.test(value);
    },
    isHex: function isHex(value) {
        return hex.test(value);
    },
    isQQ: function isQQ(value) {
        return QQ.test(value);
    },
    isWX: function isWX(value) {
        return WX.test(value);
    },
    isIncludeCN: function isIncludeCN(value) {
        return includeCN.test(value);
    },
    isOnlyCN: function isOnlyCN(value) {
        return onlyCN.test(value);
    },
    isURL: function isURL(value) {
        return URL.test(value);
    },
    isHTTP: function isHTTP(value) {
        return HTTP.test(value);
    },
    isHTTPS: function isHTTPS(value) {
        return HTTPS.test(value);
    },
    isPostalCode: function isPostalCode(value) {
        return postalCode.test(value);
    },
    isEmail: function isEmail(value) {
        return email.test(value);
    }
};
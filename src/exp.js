//手机号
const mobilephone = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
//国内座机
const telephone = /\d{3}-\d{8}|\d{4}-\d{7}/;
//身份证
const idCard = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
//ipV4
const ipV4 = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
//十六进制
const hex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
//QQ号码
const QQ = /^[1-9][0-9]{4,10}$/;
//微信号码
const WX = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
//包含中文
const includeCN = /[\u4E00-\u9FA5]/;
//只有中文
const onlyCN = /^[\u4e00-\u9fa5]*$/;
//密码魔鬼强度正则，最少6位，包含数字，大写字母，小写字母，特殊字符
const devilPWD = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[-_!@#$%^&*?]).*$/;
//密码困难强度正则，最少6位，包含数字，大写字母，小写字母
const hardPWD = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/;
//密码普通强度正则，最少6位，包含数字，字母
const normalPWD = /^.*(?=.{6,})(?=.*\d)(?=.*[a-zA-Z]).*$/;
//密码简单强度正则，最少6位，包含数字
const simplePWD = /^.*(?=.{6,})(?=.*\d).*$/;
//URL
const URL = /^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i;
//中国邮政编码
const postalCode = /[1-9]\d{5}(?!\d)/;

export default {
    $isMobilephone: value => mobilephone.test(value),
    $isTelephone: value => telephone.test(value),
    $isIdCard: value => idCard.test(value),
    $isIpV4: value => ipV4.test(value),
    $isHex: value => hex.test(value),
    $isQQ: value => QQ.test(value),
    $isWX: value => WX.test(value),
    $isIncludeCN: value => includeCN.test(value),
    $isOnlyCN: value => onlyCN.test(value),
    $isDevilPWD: value => devilPWD.test(value),
    $isHardPWD: value => hardPWD.test(value),
    $isNormalPWD: value => normalPWD.test(value),
    $isSimplePWD: value => simplePWD.test(value),
    $isURL: value => URL.test(value),
    $isPostalCode: value => postalCode.test(value),
}

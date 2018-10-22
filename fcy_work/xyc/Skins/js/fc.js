// 获取当前时间 格式化
// var i=window.setInterval("test()",1000);
// function test(){
var date=new Date();
var seperator1 = "-";
var seperator2 = ":";
var month = date.getMonth() + 1;
var strDate = date.getDate();
var hours = date.getHours();
var minutes = date.getMinutes();
if (month >= 1 && month <= 9) {
    month = "0" + month;
}
if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
}
if (hours >= 0 && hours <= 9) {
    hours = "0" + hours;
}
if (minutes >= 0 && minutes <= 9) {
    minutes = "0" + minutes;
}
var myDate = new Date();
var systime = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-'
    + myDate.getDate() + ' ' + myDate.getHours() + ':'
    + myDate.getMinutes() + ':' + myDate.getSeconds();
// }

var myDate = new Date();
var systime = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-'
    + myDate.getDate() + ' ' + myDate.getHours() + ':'
    + myDate.getMinutes() + ':' + myDate.getSeconds();


//判断手机终端ios或者安卓
var iphoneType = '';
var u = navigator.userAgent;
if(u.indexOf('Android') > -1 || u.indexOf('Adr') > -1){
    iphoneType = 'android';
}
if(isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
    iphoneType = 'ios';
}

//获取URL中的参数
var getQueryValue = function(key, href) {
    href = href || window.location.search;
    var match = href.match(new RegExp('[?&]' + key + '=([^&]*)'));
    return match && match[1] && decodeURIComponent(match[1]) || '';
};


//表单验证不为空
function validate_required(el, alerttxt) {
    if (el.val() == null || el.val().length == 0 || el.val() == "") {
        $("#errMsg").html(alerttxt);
        delayOut();
        return false;
    } else {
        return true;
    }
}

//类似吐司弹框
delayOut = function(callback) {
    $("#errMsg").stop(true, true).show().delay(1500).fadeOut('slow', function() {
        if (callback) callback();
    });
}
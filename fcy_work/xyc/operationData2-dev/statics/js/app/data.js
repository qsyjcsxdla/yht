// 获取当前时间
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
var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + hours + seperator2 + minutes;
document.getElementById('date').innerHTML=currentdate;
// }


var myDate = new Date();
var systime = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-'
    + myDate.getDate() + ' ' + myDate.getHours() + ':'
    + myDate.getMinutes() + ':' + myDate.getSeconds();
var url = "http://www.cfxyc.com.cn/";// 定义测试环境变量
function sendRequest(content, fun) {
    $.ajax({
        type : "GET",
        contentType : "application/jsonp; charset=utf-8",
        url : url + "wxtapp/handle",
        data : {
            "BSData" : content
        },
        dataType : 'jsonp',
        jsonp : "jsonpCallback",
        jsonpCallback : "callbackFun",
        success : fun
    });
}

function mkrequestForOpeData(systime,bizcode) {
    return {
        "head" : {
            "device" : "android",
            "token" : "",
            "type" : "REQUEST",
            "gmt_created" :systime,
            "bizcode" : bizcode
        },
        "body" : {}
    };
}
function slicePart(n){
    var b=parseInt(n.split(',').join('')).toString();
    var len=b.length;
    if(len<=3){return b;}
    var r=len%3;
    return b.slice(0,r)+","+b.slice(r,len).match(/\d{3}/g).join(",");
}

// 动态获取数据
$(function(){
    sendRequest(JSON.stringify(mkrequestForOpeData(systime,'HOME_INFO')),mycallback);


})

function mycallback(data,Status){
    var h,m;
    if(data.body.totalhoure>=1&&data.body.totalhoure<=9){
        h = data.body.totalhoure - 0;
    }else{
        h = data.body.totalhoure;
    }
    /*if(data.body.totalMinue>=1&&data.body.totalMinue<=9){
        m = data.body.totalMinue - 0;
    }else{
        m = data.body.totalMinue
    }*/
    $("#operData1").html( data.body.totalFunds).countUp();
    $("#operData2").html(data.body.totalCollectInterest).countUp();
    $("#operDataDay").html(data.body.totaldate).countUp();
    /* $("#operDataTime").html(data.body.totalhoure+":"+data.body.totalMinue);*/
    $("#operDataTime").html(h).countUp();
    /*$("#operDataMin").html(m).countUp();*/
    $("#operData3").html(data.body.totalProjects).countUp();
    $("#operData5").html(data.body.totalUsers).countUp();
}
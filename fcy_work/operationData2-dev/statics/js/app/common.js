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
// 获取URL上的参数
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}

/**
 * @author 程泽赫
 * @explaination 获取运营数据
 * @param
 */
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


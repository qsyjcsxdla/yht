
//在页面未加载完毕之前显示的loading Html自定义内容
var _LoadingHtml ='<div id="loadingDiv" class="alert_bg" ><div class="alert_box" ><img src="../statics/img/loading1.png"> </div></div>';

//呈现loading效果
document.write(_LoadingHtml);

//window.onload = function () {
//    var loadingMask = document.getElementById('loadingDiv');
//    loadingMask.parentNode.removeChild(loadingMask);
//};

//监听加载状态改变
document.onreadystatechange = completeLoading;

//加载状态为complete时移除loading效果
function completeLoading() {
    if (document.readyState == "complete") {
        var loadingMask = document.getElementById('loadingDiv');
        loadingMask.parentNode.removeChild(loadingMask);
        document.getElementById('body').removeAttribute('class');
    }
}





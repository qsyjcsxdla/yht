
function headUrl() {
    var headUrl1;
    if(location.host ==='static.cfxyc.com.cn'){
        headUrl1='https://handle.cfxyc.com.cn'
    }else if(location.host ==='61.164.59.230:8008'){
        headUrl1='http://wxt.5iyht.com'
    }else if(location.host ==='61.164.59.232:8008'){
        headUrl1='http://61.164.59.232:8087'
    }else if(location.host ==='192.168.10.89:8080'){
        headUrl1='http://192.168.10.25:8084'
    }
    return headUrl1

}

function toWeixin() {//H5页面调用微信
    if($("#clientType").val()==='android'){
        document.location = "js://toWeixin";
    }else if($("#clientType").val()==='ios'){
        try {
            window.webkit.messageHandlers.isWechatInstall.postMessage('')
        }catch(error){
            console.log(error.message)
        }
    }
}

function toBrowser(o){  //唤起浏览器直接打开指定页面
    if($("#clientType").val()==='android'){
        /*document.location="http://" + location.host + location.pathname;*/
        document.location = "js://toBrowser?target_url="+o;
    }else if($("#clientType").val()==='ios'){
        try {
            window.webkit.messageHandlers.openURLOutside.postMessage(o)
        }catch(error){
            console.log(error.message)
        }
    }
}
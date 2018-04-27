var browser = {
  versions: function() {
    var u = navigator.userAgent, app = navigator.appVersion;
    return {//移动终端浏览器版本信息 
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
      iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
    };
  }(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
  


//微信
$(function(){
	
	
	if(is_weixn()){//判断是不是微信浏览器
		$("#btn").click(function(){				 
			 clickable();
		}); 
	}else{
		$("#btn").click(function(){				 
			jump_ios_andriod();
		}); 
	}
	//open popup and close popup
	popup();
	
})

/*
* open popup and close popup
*/
function popup(){
	//open popup
	$('.cd-popup-trigger').on('click', function(event){
		event.preventDefault();
		$('.cd-popup').addClass('is-visible');
	});
	
	//close popup
	$('.cd-popup').on('click', function(event){
		if( $(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') ) {
			event.preventDefault();
			$(this).removeClass('is-visible');
		}
	});
	//close popup when clicking the esc keyboard button
	$(document).keyup(function(event){
    	if(event.which=='27'){
    		$('.cd-popup').removeClass('is-visible');
	    }
    });
}

/*
* 判断是不是微信客户端
*/

function is_weixn(){
  var ua = navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i)=="micromessenger") {
      return true;
  } else {
      return false;
  }
}
/*
 * 判断是苹果客户端还是安卓户端-并且根据客户端进行跳转
 */
function jump_ios_andriod(){
	if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
		  window.location="https://itunes.apple.com/us/app/xin-yi-cang-li-cai/id990481405?l=zh&ls=1&mt=8";
		 //alert("亲,稍等片刻,ios工程师们正在努力开发中...");
		}
		/*else if (browser.versions.android) {
		  window.location="http://static.5iyht.com/mobile/ipms_product/update/ipms.apk";
		}*/
		else{
			//  window.location="http://static.5iyht.com/xyc/download/xyc.apk";
			// window.location="http://shouji.360tpcdn.com/150427/03feac02677637f12167a1c495fbfca1/com.cfxyc.app.xyc_1.apk";
			window.location= "http://www.cfxyc.com/app/xyc.apk";
		}

}


/*
* 点击弹出层事件
*/

function clickable(){
	event.preventDefault();
	$('.cd-popup').addClass('is-visible');
}

/*
* 加入信义仓
 */
function joinUs(){
	setTimeout(function(){
		 window.location="http://www.cfxyc.com:8080/wxtWei/xyc/LoginOrReg.action";
	},1000);
	
}
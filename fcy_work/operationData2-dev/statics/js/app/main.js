/**
 *上线请修改imgPath路劲
 *并根据coolie动态生成修改--"dirname": "/webroot-pro/","host": "/coolie/webroot-pro/"
 */
//var imgPath = "http://192.168.10.234:8008/";
var imgPath = "http://192.168.10.171:8080/";
window.addEventListener('touchstart', function(e) {
    e.preventDefault();
    return
});
// 翻转的绑定
window.onorientationchange = orientationChange;

function orientationChange() {
    setTimeout(wh, 100);
}
//自适应屏幕
function wh() {
    width = window.innerWidth + 'px';
    height = window.innerHeight + 'px';
    $(".load").css("width", width).css("height", height);
    $(".sec").css("width", width).css("height", height);
}
//loading：全部加载
(function() {
    wh();
    var getSource = function() {

        var sourceArr = [];

        $(".test-dom").each(function(index, domEle) {
            var imgSrc = $(domEle).attr("src");
            sourceArr.push(imgSrc);
        });

        for (var i = 0; i < sourceArr.length; i++) {
            sourceArr[i] = imgPath + sourceArr[i];
        };
        return sourceArr;
    }
    new mo.Loader(getSource(), {
        onLoading: function(cur, total) {
            $('#load_num').html(parseInt(cur / total * 100) + '%');
        },
        onComplete: function() {
            pageInit();
            //页面停留时长统计
            var pCount = pageCount(pageSlider, 1000, 'a20150428report.index.heartbeat');
            if (/iphone|ipod|ipad/i.test(navigator.userAgent)) {
                //
            } else if (/android/i.test(navigator.userAgent)) {
                document.body.setAttribute("class", "android");
            } else {
                document.body.setAttribute("class", "android");
            }
        },
        loadType: 1,
        minTime: 100
    });


})();

//页面loading以及初始化
function pageInit() {

    $('#load').css('-webkit-transform', 'translateY(-50%)');
    $('#load').css('opacity', '0');
    setTimeout(function() {
        $('#load').remove();
        $('#section').css('display', 'block');
    }, 600);

    //累计完成交易金额
    $('.coin_move1').css('opacity', '0');
    $('.coin_move2').css('opacity', '0');
    $('.coin_move3').css('opacity', '0');
    $('.coin_move4').css('opacity', '0');

    // pageSlider单屏滑动
    window.pageSlider = new mo.PageSlide({
        target: $('#section .sec'),
        event: {
            change: function(e) {
                if (this.curPage !== this.prevPage) {
                    $('#section').attr('class', 'section sec_on_' + this.curPage);
                }
            }
        }
    });

    //动态获取数据
    sendRequest(JSON.stringify(mkrequestForOpeData(systime,'HOME_INFO')),mycallback);
    function mycallback(data,Status){
        $("#operData1").html(data.body.totalFunds+"&nbsp;元");
        $("#operData2").html(data.body.totalCollectInterest+"&nbsp;元");
        $("#operDataDay").html(data.body.totaldate+"天");
        $("#operDataTime").html(data.body.totalhoure+":"+data.body.totalMinue);
    }


}
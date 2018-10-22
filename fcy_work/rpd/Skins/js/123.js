$.fn.extend({
    sfMessages: function(m) {
        $("p.tips").html('<span class="circle ioc absolute top0 left0"><span class="line absolute"></span></span>' + m).show();
    },
    sfClears: function() {
        $("p.tips").html("").hide();
    }
});
//验证码登录js
$(function() {
    function abc(){
        if ($('#sendMessage').timer()){
            $('#sendMessage').css('background-color','#f8f8f8');
            $('#sendMessage').css('border','1px solid #bbb');
            $('.tombox').show();
        }
        else{setTimeout(abc,3000)}
    }
    //点击'验证码登录'
    $('.code_btn').click(function(){
        $('.contg').hide();
        $('.contt').show();
        $('.changebbtn').click();
        $('.tip').text('').hide();
        $('#sUserName,#sPassword,#sVerCode').css({border:'1px solid #bbb'});
    });
    $('.mima_btn').click(function(){
        $('.contg').show();
        $('.contt').hide();
        $('.tips').text('').hide();
        $('#phone,#imgChecked,#phoneCode').css({border:'1px solid #bbb'});
    });
    // 获取手机验证码
    var phonenumStatus = false,
        phonenumCheck = function() {
            phonenumStatus = false;
            if ($('#phoneCode').val() != "") {
                if ($('#phoneCode').val().length == 4) {
                    phonenumStatus = true;
                } else {
                    $("p.tips").sfMessages("请输入手机验证码");
                    $("#phoneCode").css({border:'1px solid #E13831'});
                }
            } else{
                //$("#phoneCode").sfClear();
            }
        };
    $('#phoneCode').blur(phonenumCheck);
    phonenumCheck();
    //手机号、图片验证码,手机验证码输入纯数字
    var phoneNumberOrg = "",regexPhone = /^\d{0,11}$/;
    $("#sVerCode,#imgChecked,#phoneCode").keyup(function() {
        if (regexPhone.test($(this).val())){
            phoneNumberOrg = $(this).val();}
        else{
            $(this).val(phoneNumberOrg);}
    });
    var NumOrg = "",regex =/^1\d{0,10}$/;
    $("#phone").keyup(function() {
        if (regex.test($(this).val())){
            NumOrg = $(this).val();}
        else{
            $(this).val(NumOrg);
            if($(this).val().length==1){
                $(this).val('');
            }
        }

    });
    // 手机号码校验（输入完全以后校验其正确性）
    //var phoneStatus = false,
    /*var regexPhoneChecks = /^((13)|(15)|(18)|(17)|(14))\d{9}$/;
        phoneCheck = function() {
            //phoneStatus = false;
            if ($("#phone").val() != "") {
                //phoneStatus = false;
                if (regexPhoneChecks.test($("#phone").val())) {
                    //phoneStatus = true;
                    $("#phone").css('border','1px solid #bbb');
                } else{
                    $("#phone").sfMessages("手机号码格式不正确");
                    $("#phone").css('border','1px solid #E13831');
                }
            }else{
                $("p.tips").html("").hide();
                }
        };
        $("#phone").blur(phoneCheck);
        phoneCheck();
    //图片验证码更换
    $('.changebbtn').attr('src', $("#baseURL").val() + "/changeCheckCode/img.html"+"?t="+ Math.random());
    $('.changebbtn').bind('click', function () {
      $(".changebbtn").attr('src', $("#baseURL").val() + "/changeCheckCode/img.html"+"?t="+ Math.random());
    });

    //图片验证码----2
    $('#imgChecked').blur(function(){
        if ($('#imgChecked').val().length == 4) {
            //phonenumStatus = true;
            $.ajaxJson({
              url: $("#baseURL").val() + "/check/pictureCode/json.html",
              data: {checkCode: $('#imgChecked').val()},
              success: function (data) {
                if (data.status == "0" && data.checkCodeMap.status == "1") {
                    $("#imgChecked").css({border:'1px solid #59a1e2'});
                } else {
                  //若图片验证码输入错误，点击获取验证码按钮，提示：图片验证码错误。不改变图片验证码但清空已输入的图片验证码信息。
                  //$('#phonecode_box').hide();
                  $("p.tips").sfMessages("图片验证码错误");
                  $("#imgChecked").css({border:'1px solid #E13831'});
                }
              }
            });
          }else if($('#imgChecked').val().length == ''){
                $("p.tips").sfMessages("请输入图形验证码");
                  $("#imgChecked").css({border:'1px solid #E13831'});
          }else if($('#imgChecked').val().length !=4&&($('#imgChecked').val().length !='')){
              $("p.tips").sfMessages("图片验证码错误");
                $("#imgChecked").css({border:'1px solid #E13831'});
          }
        });*/

    //获取短信验证码
    $("#sendMessage").click(function () {
        if ($("#phone").val() == "") {
            $("p.tips").sfMessages("请输入手机号");
            $("#phone").css({border:'1px solid #E13831'});
            return;
        }
        if ($('#phone').val().length > 0 && $('#phone').val().length < 11) {
            $("p.tips").sfMessages("请输入正确的11位手机号码");
            $("#phone").css({border:'1px solid #E13831'});
            return;
        }
        if ($('#imgChecked').val().length != 4) {
            $("p.tips").sfMessages("请输入图片验证码");
            $("#imgChecked").css({border:'1px solid #E13831'});
            return;
        }
        if ($("#sendMessage").timer()) {
            // 弹框验证码
            if ($('#imgChecked').val().length == 4) {
                phonenumStatus = true;
                $.ajaxJson({
                    url: $("#baseURL").val() + "/check/pictureCode/json.html",
                    data: {checkCode: $('#imgChecked').val()},
                    success: function (data) {
                        if (data.status == "0" && data.checkCodeMap.status == "1") {
                            $("#sendMessage").timer(60, "重发(", ")秒", "重发验证码");
                            setTimeout(abc,3000);
                            $.ajaxJson({
                                url: $("#baseURL").val() + "/safe/sendPhoneLoginMessage/json.html",
                                data: {tel: $("#phone").val(), checkCode: $('#imgChecked').val()},
                                success: function (data) {
                                    //若图片验证码输入正确，点击获取验证码按钮，按钮变为60秒倒计时状态，当后台短信发送成功后，
                                    //改变图片验证码但不清空已输入的图片验证码信息，60秒倒计时结束后按钮重新变为获取验证码状态。
                                    $('#imgChecked').sfClears();
                                    if (data.loginSmsCodeMap) {
                                        if(data.loginSmsCodeMap.status=='fail'){
                                            $("p.tips").sfMessages(data.loginSmsCodeMap.message);
                                            $(".changebbtn").attr('src', $("#baseURL").val() + "/changeCheckCode/img.html"+"?t="+ Math.random());
                                            return false;
                                        }else if(data.loginSmsCodeMap.status=='success'){
                                            $("#sendMessage").timer(60, "重发(", ")秒", "重发验证码");
                                            setTimeout(abc,3000);
                                            $("#imgChecked").css({border:'1px solid #59a1e2'});
                                            $('.tombox').hide();
                                        }
                                    }
                                    /*if (data.status == "0" && data.checkCodeMap != undefined && data.checkCodeMap.status == "1") {
                                              $("#sendMessage").timer(60, "重发(", ")秒", "重发验证码");
                                          setTimeout(abc,3000);
                                        $("#imgChecked").css({border:'1px solid #bbb'});
                                    } else {
                                         $("#imgChecked").css({border:'1px solid #bbb'});
                                    }*/
                                }
                            });
                        } else {
                            //若图片验证码输入错误，点击获取验证码按钮，提示：图片验证码错误。不改变图片验证码但清空已输入的图片验证码信息。
                            $("p.tips").sfMessages("图片验证码错误,请重新输入");
                            $("#imgChecked").css({border:'1px solid #E13831'});
                            $(".changebbtn").attr('src', $("#baseURL").val() + "/changeCheckCode/img.html"+"?t="+ Math.random());
                        }
                    }
                });
            }
        }
        if ($("#phone").val() == ""){
            $("p.tips").sfMessages("请输入手机号");
            $("#phone").css({border:'1px solid #E13831'});
        }
    });
    //语音验证码
    $("#sendAudioMessage").click(function () {
        if ($("#phone").val() == "") {
            $("p.tips").sfMessages("请输入手机号");
            $("#phone").css({border:'1px solid #E13831'});
            return;
        }
        if ($('#phone').val().length > 0 && $('#phone').val().length < 11) {
            $("p.tips").sfMessages("请输入正确的11位手机号码");
            $("#phone").css({border:'1px solid #E13831'});
            return;
        }
        if ($('#imgChecked').val().length != 4) {
            $("p.tips").sfMessages("请输入图片验证码");
            $("#imgChecked").css({border:'1px solid #E13831'});
            return;
        }
        if ($("#sendMessage").timer()) {
            // 弹框验证码
            if ($('#imgChecked').val().length == 4) {
                phonenumStatus = true;
                $.ajaxJson({
                    url: $("#baseURL").val() + "/check/pictureCode/json.html",
                    data: {checkCode: $('#imgChecked').val()},
                    success: function (data) {
                        if (data.status == "0" && data.checkCodeMap.status == "1") {
                            $("#sendMessage").timer(60, "重发(", ")秒", "重发验证码");
                            setTimeout(abc,3000);
                            $('.tombox').hide();
                            $.ajaxJson({
                                url: $("#baseURL").val() + "/safe/sendAudioPhoneMessage/json.html",
                                data: {tel: $("#phone").val(), checkCode: $('#imgChecked').val()},
                                success: function (data) {
                                    //若图片验证码输入正确，点击获取验证码按钮，按钮变为60秒倒计时状态，当后台短信发送成功后，
                                    //改变图片验证码但不清空已输入的图片验证码信息，60秒倒计时结束后按钮重新变为获取验证码状态。
                                    $('#imgChecked').sfClears();
                                    if (data.loginSmsCodeMap) {
                                        if(data.loginSmsCodeMap.status=='fail'){
                                            $("p.tips").sfMessages(data.loginSmsCodeMap.message);
                                            $(".changebbtn").attr('src', $("#baseURL").val() + "/changeCheckCode/img.html"+"?t="+ Math.random());
                                            return;
                                        }else if(data.loginSmsCodeMap.status=='success'){
                                            $("#sendMessage").timer(60, "重发(", ")秒", "重发验证码");
                                            setTimeout(abc,3000);
                                            $("#imgChecked").css({border:'1px solid #59a1e2'});
                                            $('.tombox').hide();
                                        }
                                    }
                                }
                            });
                        } else {
                            //若图片验证码输入错误，点击获取验证码按钮，提示：图片验证码错误。不改变图片验证码但清空已输入的图片验证码信息。
                            $("p.tips").sfMessages("图片验证码错误,请重新输入");
                            $("#imgChecked").css({border:'1px solid #E13831'});
                            $(".changebbtn").attr('src', $("#baseURL").val() + "/changeCheckCode/img.html"+"?t="+ Math.random());
                        }
                    }
                });
            }
        }
        if ($("#phone").val() == ""){
            $("p.tips").sfMessages("请输入手机号");
            $("#phone").css({border:'1px solid #E13831'});
        }
    });
    // 点击验证码'登录'
    $("#stepBtn1").bind("click", registerFinished);
    function registerFinished() {
        if ($("#phone").val() == "") {
            $("p.tips").sfMessages("请输入手机号");
            $("#phone").css({border:'1px solid #E13831'});
            return;
        }
        if ($('#phone').val().length > 0 && $('#phone').val().length < 11) {
            $("p.tips").sfMessages("请输入正确的11位手机号码");
            $("#phone").css({border:'1px solid #E13831'});
            return;
        }
        if ($("#imgChecked").val() == "" && $("#imgChecked").val().length!=4){
            $("p.tips").sfMessages("请输入图片验证码");
            $('#imgChecked').css('border','1px solid #E13831');
            return;
        }
        if ($('#phoneCode').val() == ""){
            $("p.tips").sfMessages("请输入手机验证码");
            $("#phoneCode").css('border','1px solid #E13831');
            return;
        }
        if ($('#phoneCode').val() == "") {
            if ($('#imgChecked').val().length != 4) {
                $("p.tips").sfMessages("请输入图片验证码");
                $("#imgChecked").css('border','1px solid #E13831');
            } else {
                $("p.tips").sfMessages("请输入手机验证码");
                $("#phoneCode").css('border','1px solid #E13831');
            }
        }
        if (phonenumStatus) {
            $("#registForm").unbind("click");
            $.ajaxJson({
                type: 'post',
                url: $("#baseURL").val() + '/login/json.html',
                data: {
                    "username": $("#phone").val(),
                    "msgLoginCode": $("#phoneCode").val(),
                    "user_source": "",
                    "client_type": "PC",
                },
                dataType: 'json',
                success: function(json) {
                    if (json.status == '3') {
                        //登录成功,判断是进入'我的账户'还是留在'投资详情页'
                        if(location.href.indexOf('login')>0){
                            location.href=$("#baseURL").val() + '/myAccount/synopsis/home.do';
                        }else if(location.href.indexOf('detail')>0){
                            location.href=location.href;
                        }
                    } else {
                        $("p.tips").sfMessages(json.message);
                        $('.changebbtn').click();
                        $('#imgChecked').val('');
                        if($('.tips').text().indexOf('该用户被锁定')>-1){
                            $('#phoneCode').val('');
                        }
                        $("#phoneCode").css({border:'1px solid #bbb'});
                    }
                },
                error: function() {
                    alert("错误");
                }
            });
        }
    }
    // input获得焦点，则去掉错误提示信息
    $('#registForm .bred_input').on('focus', function() {
        var $this = $(this);
        var $menuLink=$('#registForm .bred_input');
        var index=$menuLink.index($this);
        $('#registForm .bred_input').eq(index).css({border:'1px solid #59a1e2'});
        $this.sfClears();
    });

    $('#registForm .bred_input').on('blur', function() {
        var $this = $(this);
        var $menuLink=$('#registForm .bred_input');
        var index=$menuLink.index($this);
        $(this).css({border:'1px solid #bbb'});
    });
})
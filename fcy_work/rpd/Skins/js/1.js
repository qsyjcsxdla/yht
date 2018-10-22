/*!
 * jQeury Data Pkugin
 * version: 1.0.0-2016.03.03
 * Requires jQuery v1.10.2 or later
 * Copyright (c) 2016 M. Hudun
 */
$.extend({
    // 移动端图片验证码弹框
    alertCheckCodeApp: function(b, u, v) {
        var $html = '<div class="mat-bg-alert imgBg" style="display: block"></div>' + '<div class="mat-content-alert imgCheck" style="display: block;width: 628px;height: 275px;left: 50%;top:50%;margin-left: -314px;margin-top: -137.5px;background: #fff;border-radius: 5px;">' + '<div class="clearfix" style="padding: 0 36px;background: #f0f0f0;border-top-left-radius: 5px;border-top-right-radius: 5px;height: 77px;">' + '<div class="title float-left" style="font-size: 28px;line-height: 77px;height: 77px;color: #000;float:left;">图片验证</div>' + '<div class="float-right" style="font-size: 64px;line-height: 77px;color: #999;cursor: pointer;float:right;" id="alert-close">×</div></div>' + '<div class="clearfix" style="padding: 0 36px;margin-top: 40px;"><input class="float-left" placeholder="请输入验证码"  style="font-size: 32px;line-height: 35px;padding:28px 30px 28px 30px;width: 302px;border: 1px solid #ccc;" maxlength="4" type="text" id="imgChecked" />' + '<img src="' + $(b).val() + u + '" alt="获取验证码" title="更换验证码"  class="changeimg" style="width: 174px;height: 93px;display:inline-block;cursor: pointer;float:right;text-align: center;line-height: 93px;" onclick="this.src=\'' + $(b).val() + v + '?v=\'+Math.random();"/></div><div style="padding: 0px 36px; font-size: 28px; color: rgb(255, 0, 0); margin-top: 10px; margin-left: 30px;display:none;" id="wrongMsg">图片验证码错误</div></div>';

        $('body').append($html);
        $('#alert-close').click(function() {
            $('.mat-bg-alert').hide();
            $('.imgCheck').hide();
            $('.imgCheck input').val('');
            $('.imgCheck').remove();
            $('.mat-bg-alert').remove();
        });

        $(".changeimg").click();
    },

    /**
     * 图片验证码
     */
    alertCheckCode: function(b, u, v) {
        var $html = $('<div class="mat-bg-alert" style="display: block;"></div>' + '<div class="mat-content-alert" style="display: block;width: 480px;height: 170px;position:absolute;top: 50%;left: 50%;margin-top: -85px;margin-left: -240px;background: #fff;color: #333;">' + '<div id="alert-close" style="position: absolute;line-height: 44px;top: 0;right: 20px;font-size: 24px;color: #999;cursor: pointer;" title="关闭">×</div>' + '<div class="alert-title" style="line-height: 44px;;background: #f0f0f0;font-size: 16px;padding-left: 20px;">图片验证</div>' + '<div class="center alert-div"style="line-height: 32px;margin: 36px 0px 10px;">' + '请输入图片中验证码：<input class="" type="text" id="imgChecked" maxlength="4" style="line-height: 30px;border: 1px solid rgb(221, 221, 221);padding:0 10px;border-radius: 4px;color: #333;width:120px;margin:0 10px;"/>' + '<img src="' + $(b).val() + u + '" alt="获取验证码" title="更换验证码"  class="changeimg" style="width: 105px;height: 32px;margin: -10px 0;display:inline-block;cursor: pointer;" onclick="this.src=\'' + $(b).val() + v + '?v=\'+Math.random();"/></div>' + '<div class="tsxx hide" style="margin-left: 178px;"><span class="relative" style="padding-left:21px;font-size:12px;color:#f00"><span class="circle ioc absolute position-top position-left"><span class="line absolute"></span></span><span class="tsxx1"></span></span></div></div>');

        $('body').append($html);
        $('#alert-close').click(function() {
            $('.mat-bg-alert').hide();
            $('.mat-content-alert').hide();
            $('.alert-contenter input').val('');
            $('.mat-content-alert').remove();
            $('.mat-bg-alert').remove();
        });

        $(".changeimg").click();
    },

    /**
     * 异步json交互
     */
    ajaxJson: function(o) {
        o.type = o.type || "post";
        o.dataType = o.dataType || "json";
        $.ajax(o);
    },

    /**
     * 将目标文本格式化
     */
    formatText: function(jQ) {
        jQ = (jQ && (jQ.attr("format") || jQ.find("[format]"))) || $("[format]");
        jQ.each(function() {
            var formats = $(this).attr("format") || "",
                format = formats.split("#");
            for (var i = 0; i < format.length; i++) {
                var text = $(this).vals(),
                    name = format[i].substring(0, format[i].indexOf("(")),
                    params = format[i].substring(format[i].indexOf("(") + 1, format[i].indexOf(")"));
                if (name == "substring") $(this).text(eval("text.substring(" + params + ")"));
                if (name == "value") params == "" ? $(this).val(text) : $(this).text($(params).val());
                if (name == "moneySplit") {
                    var c = text.indexOf(".") == -1 ? text.length : text.indexOf(".");
                    $(this).text($.dataFormatMethod.toSplit(text.substring(0, c), 3, ",") + text.substr(c));
                }
                if (name == "decimal") {
                    var val = parseFloat(text);
                    if (text != val) return;
                    $(this).text(val.toFixed(params));
                }
                if (name == "before") $(this).text(params + text);
                if (name == "after") $(this).text(text + params);
                if (name == "long2date") text.trim() != "" && !isNaN(text * 1000) && $(this).text($.dataFormatMethod.toDATE(text * 1000, params || "yyyy-MM-dd"));
                if (name == "long2val") text.trim() != "" && !isNaN(text * 1000) && $(this).val($.dataFormatMethod.toDATE(text * 1000, params || "yyyy-MM-dd"));
                if (name == "long2time") text.trim() != "" && !isNaN(text * 1000) && $(this).text($.dataFormatMethod.toTIME(parseInt(text), params || "yyyy-MM-dd HH:mm:ss"));
                if (name == "iphonetext") text.trim() != "" && $(this).text(text.slice(0, 3) + "****" + text.slice(-4));
                if (name == "eval") $(this).text(eval(text));
                if (name == "unselect") $(this).attr('unselectable', 'on').css({
                    '-moz-user-select': '-moz-none',
                    '-moz-user-select': 'none',
                    '-o-user-select': 'none',
                    '-khtml-user-select': 'none',
                    '-webkit-user-select': 'none',
                    '-ms-user-select': 'none',
                    'user-select': 'none'
                }).bind('selectstart', function() {
                    return false;
                });
                if (name == "view") {
                    var jq = $(this),
                        input = $("<input type='file' class='hide' name='" + params + "' id='" + params + "'>");
                    $(this).after(input).click(function() {
                        input.click();
                    });
                    input.change(function() {
                        var z = $(this).get(0);
                        if (z.files && z.files[0]) {
                            r = new FileReader();
                            r.onload = function(e) {
                                jq.html('<img src="' + e.target.result + '" class="full"/>');
                            };
                            r.readAsDataURL(z.files[0]);
                        } else {
                            jq.html('<div class="img full" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + z.value + '\'"></div>');
                        }
                    });
                }
                if (name == "devideBlock") {
                    var html = "";
                    for (var ind = 0; ind < text.trim().length; ind++) html += '<div class="inline-block mr-2" style="background:url(\'http://static.wjdai.com/img/home/bg-num.png\');width:24px;height:31px;"><p class="f-17 bold c-333 hidden-y full-x block relative" style="height:28px"><span class="block center-text lh-28 absolute full-x">' + text.trim().charAt(ind) + '</span></p></div>';
                    $(this).html(html);
                }
                if (name == "scrollUp") {
                    $(this).find("span").each(function(ind, e) {
                        var html = 0;
                        for (var j = 1; j < (ind * 2 + 1) * 10 + parseInt($(e).html()) + 1; j++) html += "<br>" + j % 10;
                        $(e).html(html).animate({
                            "top": "-" + ($(e).height() - 28) + "px"
                        }, ind * (params.split(",")[0] || 300) + parseInt(params.split(",")[1] || 2000));
                    });
                }
            }
        });
    },

    /**
     * 生成页码方法
     */
    toPageSpilt: function(jQ) {
        jQ = (jQ && jQ.find("._page")) || $("._page");
        jQ.each(function() {
            var showSize = 5,
                pageNumber = parseInt($(this).find("#pageNumber").val()),
                pageCount = parseInt($(this).find("#pageCount").val());
            $(this).append("<a href='javascript:void(0);' onclick='$.findPage(this,\"pageNumber\",1);'>首页</a> <a href='javascript:void(0);' onclick='$.findPage(this,\"pageNumber\"," + ((pageNumber - 1) || 1) + ");'>上一页</a>");
            for (var i = pageNumber - showSize; i < pageNumber + showSize; i++)
                if (i > 0 && i <= pageCount)
                    $(this).append("<a href='javascript:void(0);' " + (i == pageNumber ? "class='_this_page'" : "onclick='$.findPage(this,\"pageNumber\"," + i + ");'") + ">" + i + "</a>");
            $(this).append("<a href='javascript:void(0);' onclick='$.findPage(this,\"pageNumber\"," + (pageCount - pageNumber > 0 ? pageNumber + 1 : pageCount) + ");'>下一页</a> <a href='javascript:void(0);' onclick='$.findPage(this,\"pageNumber\"," + pageCount + ");'>尾页</a>");
        });
    },

    /**
     * 条件生成方法
     */
    findPage: function(o, n, v, r) {
        if (!$(o).parents("form").find("input[name='" + n + "']").length)
            $(o).parents("form").append($("<input type='hidden' name='" + n + "'></input>"));
        if ($(o).parents("form").find("input[name='" + r + "']").length)
            $(o).parents("form").find("input[name='" + r + "']").remove();
        $(o).parents("form").find("input[name='" + n + "']").val(v);
        $(o).parents("form").submit();
    },

    /**
     * 数据整合方法
     */
    dataFormatMethod: {
        toSplit: function(v, n, c) {
            var s = v.substring(0, v.length % n);
            for (var i = 0; i < parseInt(v.length / n); i++)
                s += (s == "" ? "" : c) + v.substring(i * n + v.length % n, (i + 1) * n + v.length % n);
            return s;
        },

        toGLRZ: function(t, p) {
            date = new Date();
            date.setFullYear(parseInt(t.substr(p.indexOf("yyyy"), 4) || t.substr(p.indexOf("YYYY"), 4)));
            date.setMonth(parseInt(t.substr(p.indexOf("MM"), 2)) - 1);
            date.setDate(parseInt(t.substr(p.indexOf("dd"), 2) || t.substr(p.indexOf("DD"), 2)));
            date.setHours(parseInt(t.substr(p.indexOf("HH"), 2) || t.substr(p.indexOf("hh"), 2)));
            date.setMinutes(parseInt(t.substr(p.indexOf("mm"), 2)));
            date.setSeconds(parseInt(t.substr(p.indexOf("ss"), 2) || t.substr(p.indexOf("SS"), 2)));
            return parseInt(date.getTime() / 1000);
        },

        toDATE: function(t, p) {
            var date = new Date(t);
            var yyyy = date.getFullYear();
            var MM = date.getMonth() + 1;
            var dd = date.getDate();
            var HH = date.getHours();
            var mm = date.getMinutes();
            var ss = date.getSeconds();
            return p.replace(/yyyy/gi, yyyy).replace(/MM/g, MM < 10 ? "0" + MM : MM).replace(/dd/g, dd < 10 ? "0" + dd : dd)
                .replace(/HH/g, HH < 10 ? "0" + HH : HH).replace(/mm/g, mm < 10 ? "0" + mm : mm).replace(/ss/g, ss < 10 ? "0" + ss : ss);
        },

        toTIME: function(t, p) {
            var ss = t % 60;
            var mm = ((t - ss) / 60) % 60;
            var HH = ((t - ss - 60 * mm) / (60 * 60)) % 24;
            var dd = parseInt((t - ss - 60 * mm - 60 * 60 * HH) / (24 * 60 * 60));
            return (dd > 0 ? dd + "天" : "") + (HH > 0 ? HH + "小时" : "") + (mm > 0 ? mm + "分钟" : "") + (ss > 0 ? ss + "秒" : "");
        },

        toNStr: function(s, n) {
            var ss = "";
            for (var i = 0; i < n || 0; i++)
                ss += s;
            return ss;
        }
    },

    interval: {
        _addInterval: {},
        _addInterval_status: true,
        add: function(a, b, c) {
            if ($.interval._addInterval_status) {
                $.interval._addInterval_status = false;
                setInterval(function() {
                    for (var name in $.interval._addInterval)
                        eval($.interval._addInterval[name]);
                }, 1000);
            }
            $.interval._addInterval[a] = c ? b : $.interval._addInterval[a];
        }
    }
});

$.fn.extend({

    vals: function(v) {
        return v ? (this.val() && this.val(v)) || (this.text() && this.text(v)) : this.val() || this.text();
    },

    timer: function(a, b, c, d) {
        var e = a;
        a = a || this.data("timer");
        if (!this.attr("id")) {
            console.log("倒计时没有ID无法调用");
            return;
        }
        if (e) {
            this.data("timer", a);
            b = b || "剩余";
            c = c || "秒";
            d = d || "重新倒计时";
            $.interval.add(this.attr("id"),
                "if($('#" + this.attr("id") + "').data('timer'))" +
                "{$('#" + this.attr("id") + "').addClass('disabled').data('timer',$('#" + this.attr("id") + "').data('timer')-1);$('#" + this.attr("id") + "').vals('" + b + "'+$('#" + this.attr("id") + "').data('timer')+'" + c + "').css('background-color','#B7B7B7');}" +
                "else" +
                "{$('#" + this.attr("id") + "').vals('" + d + "').removeClass('disabled') ;$('#"+ this.attr("id") + "').vals('" + d + "').css('background-color','#f8f8f8') ;}",
                true);
        }
        return !a;
    }
});
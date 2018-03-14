var probe = {
    support: function(key) {
        var bln = true;
        switch (key) {
            case "boxshadow":
                bln = this.supportBoxShadow();
                break;
            default:
                break
        }
        return bln
    },
    supportBoxShadow: function() {
        var $testDiv = $('<div style="box-shadow:inset 0px -1px 1px  -1px #b2b2b2;"></div>');
        try {
            if ($testDiv.css("box-shadow")) {
                return true
            } else {
                return false
            }
        } catch (e) {
            return false
        }
    }
};
var secondSum = 0;
var dialog = {
	second : 0,
	msg : "",
    alert: function(options, callback) {
        var self = this;
        var closebtn = {
            title: "关闭",
            click: function() {}
        };
        var opt = {
            title: null,
            content: null,
            zindex: 4200,
            bgcolor: "#000",
            opacity: .6,
            topOffset: 0,
            width: "280",
            loadDefaultCss: true,
            buttons: {
                close: {
                    title: "关闭",
                    click: function() {}
                }
            }
        };
        if (typeof options == "string") {
            opt.content = options;
            if (callback) {
                closebtn.click = callback;
                opt = $.extend(true, opt, {
                    buttons: {
                        close: closebtn
                    }
                })
            }
        } else {
            opt = $.extend(true, opt, options)
        }
        self.dialog(opt)
    },
    confirm: function(options, callback) {
        var self = this;
        var confirmbtn = {
            title: "确定",
            click: function() {}
        };
        var opt = {
            title: null,
            content: null,
            zindex: 4200,
            bgcolor: "#000",
            opacity: .5,
            topOffset: 0,
            width: "280",
            loadDefaultCss: true,
            buttons: {
                confirm: {
                    title: "确定",
                    click: function() {}
                },
                close: {
                    title: "取消",
                    click: function() {}
                }
            }
        };
        if (typeof options == "string") {
            opt.content = options;
            if (callback) {
                confirmbtn.click = callback;
                opt = $.extend(true, opt, {
                    buttons: {
                        confirm: confirmbtn
                    }
                })
            }
        } else {
            opt = $.extend(true, opt, options)
        }
        self.dialog(opt)
    },
     dialog: function(options) {
        var self = this;
        var id = "dialog_" + (new Date).getTime();
        var opt = {
            title: null,
            content: null,
            zindex: 4200,
            bgcolor: "#000",
            opacity: .6,
            topOffset: 0,
            width: "280",
            loadDefaultCss: true,
            buttons: {
                close: {
                    title: "关闭",
                    click: function() {}
                }
            }
        };
        var sec= $("#timeshow").html();
        self.second=parseFloat(sec);
    	
    	secondSum=secondSum+self.second;
    	$('#timeshowSum').html(secondSum.toFixed(2));
        opt = $.extend(true, opt, options);
        opt.id = id;
        if (String(opt.width).indexOf("%") < 0) {
            opt.width = opt.width + "px"
        }
        if (opt.loadDefaultCss == true) {
            this.loadDialogCss()
        }
        var $mask = $('<div id="' + id + '_cover"  ></div>');
        $mask.css({
            "z-index": opt.zindex,
            "background-color": opt.bgcolor,
            position: "fixed",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            opacity: opt.opacity
        });
        $("body").append($mask);
        var $dialog = $('<div id="' + id + '" class="amsmobi_dialog"  style="width:' + opt.width + ";z-index:" + parseInt(opt.zindex + 1) + ";top:50%;left:50%;position:fixed;_position:absolute;_top:expression(eval(document.compatMode && document.compatMode=='CSS1Compat') ? documentElement.scrollTop+(document.documentElement.clientHeight - this.offsetHeight)/2+this.offsetHeight/2:document.body.scrollTop+(document.body.clientHeight - this.clientHeight)/2);\"></div>");
        var $head = $("<header></header>");
        var $body = $("<section></section>");
        if (probe.support("boxshadow")) {
            $body.css("box-shadow", "inset 0px -1px 2px  -1px #9b47ff")
        } else {
            $body.css("border-bottom", "2px solid #9b47ff")
        }
        var $footer = $("<footer></footer>");
        var closeDialog = function() {
            $dialog.remove();
            $mask.animate({
                opacity: 0
            }, 600, "ease-out", function() {
                $mask.remove()
            })
        };
        if (opt.title) {
            $head.append($("<h2>" + opt.title + "</h2>"))
        }
        $dialog.append($head);
        if (opt.content) {
            $body.append(opt.content)
        }
        $dialog.append($body);
        var newButtons = new Array;
        $.each(opt.buttons, function(key, btn) {
            if (key.toLowerCase() != "close") {
                btn.key = key;
                newButtons.push(btn)
            }
        });
        if (opt.buttons["close"]) {
            var btn = opt.buttons["close"];
            btn.key = "close";
            newButtons.push(btn)
        }
        var ibtnWidth = 100;
        $.each(newButtons, function(key, btn) {
            var $btn = $('<a href="javascript:;"  style="width:' + ibtnWidth + '%" data-key="' + key + '">' + btn.title + "</a>");
            if (btn.key != "close") {
                if (probe.support("boxshadow")) {
                    $btn.css("box-shadow", "inset -1px 0px 1px -1px #b2b2b2")
                } else {
                    $btn.css("border-right", "1px solid #b2b2b2")
                }
            }
            if ($.os.ios) {
                $btn.click(function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    if (btn.click) {
                        btn.click();
                        closeDialog()
                    }
                })
            } else {
                $btn.click(function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    if (btn.click) {
                        btn.click();
                        closeDialog()
                    }
                })
            }
            $footer.append($btn)
        });
        $dialog.append($footer);
        $("body").append($dialog);
        var fixDialog = function() {
            var maxHeight = $(window).height() - 40;
            if ($dialog.height() > maxHeight) {
                var mTop = -(maxHeight / 2) + $(window).scrollTop();
                if ($.os.ios) {
                    $dialog.css({
                        "margin-left": -($dialog.width() / 2) + "px",
                        "margin-top": mTop + "px",
                        position: "absolute"
                    })
                } else {
                    $mask.css("position", "absolute");
                    $(window).on("scroll", function() {
                        var newHeight = $(window).height() + $(window).scrollTop();
                        $mask.css("height", newHeight + "px")
                    });
                    var left = ($(window).width() - $dialog.width()) / 2;
                    var style = "width:" + opt.width + ";z-index:" + parseInt(opt.zindex + 1) + ";position:absolute;top:" + ($(window).scrollTop() + 20) + "px;left:" + left + "px;";
                    $dialog.attr("style", style)
                }
            } else {
                $dialog.css({
                    "margin-left": -($dialog.width() / 2) + "px",
                    "margin-top": -($dialog.height() / 2) + "px"
                })
            }
        };
        fixDialog();
        $(window).on("resize", function() {
            fixDialog()
        });
        $(window).on("orientationchange", function() {
            fixDialog()
        }, false);
        return $dialog
    },
    showLoading: function(options) {
        this.loadLoadingCSS();
        var opt = {
            zindex: 4100,
            bgcolor: "#000",
            opacity: .6
        };
        opt = $.extend(true, opt, options);
        var id = "amsmobi_loading";
        if ($("#" + id).length == 0) {
            var $mask = $('<div id="' + id + '_cover"   style="z-index:' + opt.zindex + ";background-color:" + opt.bgcolor + ";position:fixed;left:0;top:0;width:100%;height:100%;filter:alpha(opacity=" + opt.opacity * 100 + ");opacity:" + opt.opacity + ';_position:absolute;_top:expression(eval(document.compatMode && document.compatMode==\'CSS1Compat\') ? documentElement.scrollTop+(document.documentElement.clientHeight-this.offsetHeight)/2:document.body.scrollTop+(document.body.clientHeight - this.clientHeight)/2); "><iframe style="position:fixed;_position:absolute;width:100%;height:100%;border:none;filter:alpha(opacity=0);opacity:0;left:0;top:0;z-index:-1;"  src="about:blank"></iframe></div>');
            var $dialog = $('<div id="' + id + '"   style="background-color:#999;width:106px;height:106px;margin-left:-53px;margin-top:-53px;-moz-border-radius: 8px;-webkit-border-radius: 8px;border-radius:8px; z-index:' + parseInt(opt.zindex + 1) + ";top:50%;left:50%;position:fixed;_position:absolute;_top:expression(eval(document.compatMode && document.compatMode=='CSS1Compat') ? documentElement.scrollTop+(document.documentElement.clientHeight - this.offsetHeight)/2+this.offsetHeight/2:document.body.scrollTop+(document.body.clientHeight - this.clientHeight)/2);\"></div>");
            if (probe.support("boxshadow")) {
                $dialog.append('<div class="amsmobi_loader" >Loading...</div>')
            } else {
                $dialog.append('<div style="margin-top:41px;margin-left:15px;color:#666">Loading...</div>')
            }
            $("body").append($mask).append($dialog)
        } else {
            $("#" + id + "_cover").show();
            $("#" + id).show()
        }
    },
    hideLoading: function() {
        $("#amsmobi_loading").hide();
        $("#amsmobi_loading_cover").hide()
    },
    loadLoadingCSS: function() {
        var style = ".amsmobi_loader {margin: 4em auto;font-size: 12px;width: 1em;height: 1em;border-radius: 50%;position: relative;text-indent: -9999em;-webkit-animation: amsmobi_load5 1.1s infinite ease;animation: amsmobi_load5 1.1s infinite ease;}" + " @-webkit-keyframes amsmobi_load5 {0%,100% {box-shadow: 0em -2.6em 0em 0em #ffffff, 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.5), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7);}" + " 12.5% {box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.7), 1.8em -1.8em 0 0em #ffffff, 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5);}" + " 25% {box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.5), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7), 2.5em 0em 0 0em #ffffff, 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);} " + " 37.5% {box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5), 2.5em 0em 0 0em rgba(255, 255, 255, 0.7), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);}" + " 50% {box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.5), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.7), 0em 2.5em 0 0em #ffffff, -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);} " + " 62.5% {box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.5), 0em 2.5em 0 0em rgba(255, 255, 255, 0.7), -1.8em 1.8em 0 0em #ffffff, -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);} " + " 75% {box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.5), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.7), -2.6em 0em 0 0em #ffffff, -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);} " + " 87.5% {box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.5), -2.6em 0em 0 0em rgba(255, 255, 255, 0.7), -1.8em -1.8em 0 0em #ffffff;} }" + " @keyframes amsmobi_load5 {0%,100% { box-shadow: 0em -2.6em 0em 0em #ffffff, 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.5), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7);} " + " 12.5% {box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.7), 1.8em -1.8em 0 0em #ffffff, 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5);} " + " 25% {box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.5), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7), 2.5em 0em 0 0em #ffffff, 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);}" + " 37.5% {box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5), 2.5em 0em 0 0em rgba(255, 255, 255, 0.7), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);}" + " 50% {box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.5), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.7), 0em 2.5em 0 0em #ffffff, -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);} " + " 62.5% {box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.5), 0em 2.5em 0 0em rgba(255, 255, 255, 0.7), -1.8em 1.8em 0 0em #ffffff, -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);}" + " 75% {box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.5), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.7), -2.6em 0em 0 0em #ffffff, -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);}" + " 87.5% {box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.5), -2.6em 0em 0 0em rgba(255, 255, 255, 0.7), -1.8em -1.8em 0 0em #ffffff;}}";
        this.loadCss("mobi_loading_style", style)
    },
    loadDialogCss: function() {
        var style = ".amsmobi_dialog {color:#000;background-color:#fff; text-align:center;-moz-border-radius: 8px;-webkit-border-radius: 8px;border-radius:8px;font-family:Arial,Helvetica,sans-serif;font-weight:normal;font-size:14px;}" + " .amsmobi_dialog header{font-weight:bold;margin-top:10px;line-height:20px;text-align:center;font-family:Arial,Helvetica,sans-serif;height:auto;width:auto;}" + " .amsmobi_dialog footer{height:40px;padding:0px 0px;width:auto;}" + " .amsmobi_dialog footer a{display:block;color:#007afe;float:left;text-align:center;height:40px;line-height:36px;font-weight:bold;text-decoration: none;font-family:Arial,Helvetica,sans-serif;font-size:16px; }" + " .amsmobi_dialog footer a:hover{text-decoration:none;}" + " .amsmobi_dialog footer button{border:none;background:none;}" + " .amsmobi_dialog section{padding:20px;overflow-x:hidden;text-align:center;font-family:Arial,Helvetica,sans-serif;font-weight:normal;height:auto;width:auto;}";
        this.loadCss("mobi_dialog_style", style)
    },
    loadCss: function(id, style) {
        if ($("#" + id).length == 0) {
            var newStyle = $('<style id="' + id + '">' + style + "</style>");
            $("head").append(newStyle)
        }
    }
};
var randomDomain = "heromm" + Math.floor(Math.random() * 1e5);
var datajsDom = document.getElementById("gamedata");
var version = datajsDom.getAttribute("data-version");
var share_url = "http://k03.ali.118us.com/game/mrg1/index.html";
var share_img = "http://0579jhms.duapp.com/game/mrg1/images/cover20140829.jpg";

var picgame = {
    action: {
//  	共几处不同
        totalNum: 0,
//      找出几处不同
        clickNum: 0,
//      正确几次
        correctNum: 0,
//      正确率
        correctPecent: 0,
        timerPasser: 0,
        clickData: null
    },
    timer: null,
    second: 0,
    maxSecond: 120,
    currIndex: 0,
    firstInit: 0,
    secondSum:0,
    
    init: function(index, type) {
        var img = picimgs[index];
        this.currIndex = index;
        var self = this;
        this.action.totalNum = img.data.length;
        this.action.clickData = img.data;
        for (var i = 0; i < this.action.clickData.length; i++) {
            this.action.clickData[i].find = false
        }
        $("#leftpic").css({
            width: img.w + "px",
            height: img.h + "px",
            background: "url(" + img.url1 + "?v=" + version + ")",
            "background-size": img.w + "px " + img.h + "px"
        });
        //$("#rightpic").css({width:img.w+"px",height:img.h+"px",background:"url(http://static.weiue.com/game/heromm2/"+img.url2+"?v="+version+")","background-size":img.w+"px "+img.h+"px"});
        $("#rightpic").css({
            width: img.w + "px",
            height: img.h + "px",
            background: "url(" + img.url2 + "?v=" + version + ")",
            "background-size": img.w + "px " + img.h + "px"
        });
        for (var i = 0; i < img.data.length; i++) {
            var item = img.data[i];
            var $mask1 = $("<div id='maskleft" + i + "' data-id='" + i + "'></div>").addClass("floatmask").css({
                width: item.w + "px",
                height: item.h + "px",
                left: item.l + "px",
                top: item.t + "px"
            });
            var $mask2 = $("<div  id='maskright" + i + "'  data-id='" + i + "'></div>").addClass("floatmask").css({
                width: item.w + "px",
                height: item.h + "px",
                left: item.l + "px",
                top: item.t + "px"
            });
            $mask1.click(function(e) {
                var id = $(this).attr("data-id");
                $("#maskleft" + id).addClass("showborder");
                $("#maskright" + id).addClass("showborder");
                self.action.clickData[id].find = 1;
                self.action.clickNum = self.action.clickNum + 1;
                self.showTips();
                e.stopPropagation();
                e.preventDefault()
            });
            $mask2.click(function(e) {
                var id = $(this).attr("data-id");
                $("#maskleft" + id).addClass("showborder");
                $("#maskright" + id).addClass("showborder");
                self.action.clickData[id].find = 1;
                self.action.clickNum = self.action.clickNum + 1;
                self.showTips();
                e.stopPropagation();
                e.preventDefault()
            });
            if (type == 1) {
                $mask1.addClass("showborder");
                $mask2.addClass("showborder")
            }
            $("#leftpic").append($mask1);
            $("#rightpic").append($mask2)
        }
        if (self.firstInit == 0) {
            self.firstInit = 1;
            $("#picbox").click(function() {
                self.action.clickNum = self.action.clickNum + 1;
                self.showTips()
            })
        }
        self.showTips()
    },
    showTips: function() {
        var self = this;
        var correctNum = 0;
        for (var i = 0; i < this.action.clickData.length; i++) {
            var item = this.action.clickData[i];
            if (item.find) {
                correctNum = correctNum + 1
            }
        }
        this.action.correctNum = correctNum;
        this.action.correctPecent = parseInt(correctNum * 100 / this.action.clickNum) ? parseInt(correctNum * 100 / this.action.clickNum) : 0;
        $("#totalNum").html(this.action.totalNum);
        $("#clickNum").html(this.action.clickNum);
        $("#correctNum").html(this.action.correctNum);
        $("#correctPecent").html(this.action.correctPecent);
        $("#currLevel").html(self.currIndex + 1);

        if (this.action.correctNum == this.action.totalNum) {
            self.gameNext()
        }
//      if (this.action.clickNum > 5 && this.action.correctPecent < 0) {
//          self.gameover('本关您的正确率低于60%，过关失败！再来一局？<br><div style=\'text-align:left;color:#999;\'> 关注公众号 <a href="http://mp.weixin.qq.com/s?__biz=MzA5NDgwNjg0Nw==&mid=501926235&idx=1&sn=5164938ddf57df8f4525b2e23bfcabc7&scene=20#rd"><strong style="color:red;">码农联盟</strong></a> ,<br>第一时间畅玩微信游戏！</div>')
//      }
    },
    startTimer: function() {
        var self = this;
        this.timer = setInterval(function() {
        	self.second=self.second+0.01;
            $("#timeshow").html(self.second.toFixed(2));
        }, 10)
    },
    stopTimer: function() {
        clearInterval(this.timer)
    },
    gamestart: function() {
        if (this.timer) {
            this.stopTimer()
        }
        this.action = {
            totalNum: 0,
            clickNum: 0,
            correctNum: 0,
            correctPecent: 0,
            timerPasser: 0,
            clickData: null
        };
        this.timer = null;
        this.second = 0;
        this.maxSecond = 60;
        $("#leftpic").empty();
        $("#rightpic").empty();
        this.init(this.currIndex);
        this.startTimer()
    },
    gameNext: function() {
        var self = this;
        var title = "";

//      secondSum =parseFloat($("#timeshowSum").html());
        if (picimgs.length - 1 == this.currIndex) {
            title = "恭喜通关！";
            var finishSec = secondSum + parseFloat($("#timeshow").html());
            var msg = "您本次游戏一共耗时 " + finishSec.toFixed(2) + "秒!";
            dialog.dialog({
                title: title,
                content: msg,
                buttons: {
                    close: {
                        title: "我好棒！必须炫耀一下",
                        click: function() {
                            self.showShare(function() {
                                self.currIndex = 0;
                                self.gamestart()
                            });
                            dataForWeixin = {
                                appId: "",
                                MsgImg: share_img,
                                TLImg: share_img,
                                url: share_url,
                                title: "找不同，赢大奖！我已通关啦！霸气侧漏！你能过几关？",
                                desc: "我已经通关啦！" + (self.currIndex + 1) + "个美景图全过！我才是霸气侧漏慧眼识美人的大英雄，你能过几关？",
                                desc_tl: "我已经通关啦！" + (self.currIndex + 1) + "个美景图全过！我才是霸气侧漏慧眼识美人的大英雄，你能过几关？",
                                fakeid: "",
                                callback: function() {}
                            }
                        }
                    }
                }
            })
        } else {
            title = "恭喜过第<span class='num_ys'>" + (self.currIndex + 1) + "</span>关";
//          msg = "你一共找出了" + this.action.correctNum + "个不同，正确率" + this.action.correctPecent + "%,耗时" + this.second.toFixed(2) + "秒!";
			msg = "你一共找出了<span class='num_ys'>"+this.action.totalNum+"</span>个不同，耗时 <span class='num_ys'>" + this.second.toFixed(2) + "</span>秒!";
            dialog.dialog({
                title: title,
                content: msg,
                buttons: {
                    confirm: {
                        title: "下一关",
                        click: function() {
                            dataForWeixin = {
                                appId: "",
                                MsgImg: share_img,
                                TLImg: share_img,
                                url: share_url,
                                title: "找不同，赢大奖！我已过" + (self.currIndex + 1) + "个美景图，你能过几关？",
                                desc: "我已过了" + (self.currIndex + 1) + "个美景图，本关正确率" + self.action.correctPecent + "%,耗时" + self.second + "秒!",
                                desc_tl: "我已过了" + (self.currIndex + 1) + "个美景图，本关正确率" + self.action.correctPecent + "%,耗时" + self.second + "秒!",
                                fakeid: "",
                                callback: function() {}
                            };
                            self.currIndex = self.currIndex + 1;
                            self.gamestart()
                        }
                    },
                    /*close: {
                        title: "炫耀一下",
                        click: function() {
                            self.showShare(function() {
                                self.currIndex = self.currIndex + 1;
                                self.gamestart()
                            });
                            dataForWeixin = {
                                appId: "",
                                MsgImg: share_img,
                                TLImg: share_img,
                                url: share_url,
                                title: "找不同，赢大奖！我已过" + (self.currIndex + 1) + "个美景图，你能过几关？",
                                desc: "我已过了" + (self.currIndex + 1) + "个美景图，本关正确率" + self.action.correctPecent + "%,耗时" + self.second + "秒!",
                                desc_tl: "我已过了" + (self.currIndex + 1) + "个美景图，本关正确率" + self.action.correctPecent + "%,耗时" + self.second + "秒!",
                                fakeid: "",
                                callback: function() {}
                            }
                        }
                    }*/
                }
            })
        }
        self.stopTimer()
    },
   /* gamefinish: function() {
    	console.log()
    },
    gameover: function(optmsg) {
        var self = this;
        var msg = optmsg;
        dialog.dialog({
            title: "GAME OVER",
            content: msg,
            buttons: {
                confirm: {
                    title: "再来一局",
                    click: function() {
                        self.currIndex = 0;
                        self.gamestart()
                    }
                },
                close: {
                    title: "炫耀一下",
                    click: function() {
                        dataForWeixin = {
                            appId: "",
                            MsgImg: share_img,
                            TLImg: share_img,
                            url: share_url,
                            title: "找不同，赢大奖！我已过" + self.currIndex + "个美景图，你能过几关？",
                            desc: "我已过了" + self.currIndex + "个美景图，本关正确率" + self.action.correctPecent + "%,耗时" + self.second + "秒!",
                            desc_tl: "我已过了" + self.currIndex + "个美景图，本关正确率" + self.action.correctPecent + "%,耗时" + self.second + "秒!",
                            fakeid: "",
                            callback: function() {}
                        };
                        self.showShare(function() {
                            self.currIndex = 0;
                            self.gamestart()
                        })
                        
                    }
                }
            }
        });
        self.stopTimer()
    },*/
    showShare: function(callback) {
        $("#share").show();
        $("#share").click(function() {
            $(this).hide();
            callback()
        })
    }
};
/*var dataForWeixin = {
    appId: "",
    MsgImg: share_img,
    TLImg: share_img,
    url: share_url,
    title: "找不同，赢大奖,全新6幅美景图，等你来挑战！",
    desc: "我过了0关，你能过几关？推荐引爆疯狂转发的奥伦达部落项目找茬类游戏，小伙伴快来挑战吧！",
    desc_tl: "我过了0关，你能过几关？推荐引爆疯狂转发的奥伦达部落项目找茬类游戏，小伙伴快来挑战吧！",
    fakeid: "",
    callback: function() {}
};*/
/*! function() {
    var onBridgeReady = function() {
        WeixinJSBridge.on("menu:share:appmessage", function(argv) {
            WeixinJSBridge.invoke("sendAppMessage", {
                appid: dataForWeixin.appId,
                img_url: dataForWeixin.MsgImg,
                img_width: "120",
                img_height: "120",
                link: dataForWeixin.url,
                desc: dataForWeixin.desc,
                title: dataForWeixin.title
            }, function(res) {
                dataForWeixin.callback()
            })
        });
        WeixinJSBridge.on("menu:share:timeline", function(argv) {
            dataForWeixin.callback();
            WeixinJSBridge.invoke("shareTimeline", {
                img_url: dataForWeixin.TLImg,
                img_width: "120",
                img_height: "120",
                link: dataForWeixin.url,
                desc: dataForWeixin.desc_tl,
                title: dataForWeixin.title
            }, function(res) {})
        });
        WeixinJSBridge.on("menu:share:weibo", function(argv) {
            WeixinJSBridge.invoke("shareWeibo", {
                content: dataForWeixin.title,
                url: dataForWeixin.url
            }, function(res) {
                dataForWeixin.callback()
            })
        });
        WeixinJSBridge.on("menu:share:facebook", function(argv) {
            dataForWeixin.callback();
            WeixinJSBridge.invoke("shareFB", {
                img_url: dataForWeixin.TLImg,
                img_width: "120",
                img_height: "120",
                link: dataForWeixin.url,
                desc: dataForWeixin.desc,
                title: dataForWeixin.title
            }, function(res) {})
        })
    };
    if (document.addEventListener) {
        document.addEventListener("WeixinJSBridgeReady", onBridgeReady, false)
    } else if (document.attachEvent) {
        document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
        document.attachEvent("onWeixinJSBridgeReady", onBridgeReady)
    }
}();*/
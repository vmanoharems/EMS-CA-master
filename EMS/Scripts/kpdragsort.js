
$.fn.kpdragsort = function(options) {
    var container = this;
   
    $(container).children().off("mousedown").mousedown(function(e) {

    
        if (e.which != 1 || $(e.target).is("input, textarea") || window.kp_only)
            return;

        e.preventDefault(); 

        var x = e.pageX;
        var y = e.pageY;
        var _this = $(this); 
        var w = _this.width();
        var h = _this.height();
        var w2 = w / 2;
        var h2 = h / 2;
        var p = _this.offset();
        var left = p.left;
        var top = p.top;
        window.kp_only = true;

        var aa = e.toElement.id;
       
        var ass = $('#' + aa).html();
        //alert(ass);
        $('#' + aa).attr('style', 'display:none;');
        _this.before('<div id="kp_widget_holder"><ul class="cont" id=' + aa + '>' + ass + '</ul> </div>');
        var wid = $("#kp_widget_holder");
        wid.css({"border": "2px dashed #ccc", "height": _this.outerHeight(true) - 4});
      
       

        ///  Start Changes here  Command Code // sanjay

        //_this.css({
        //    "width": w,
        //    "height": h,
        //    "position": "absolute",
        //    opacity: 0.8,
        //    "z-index": 999,
        //    "left": left,
        //    "top": top
        //});


        ///  End Changes here // sanjay


        // 绑定mousemove事件
        $(document).mousemove(function(e) {
            e.preventDefault();

            // 移动选中块
            var l = left + e.pageX - x;
            var t = top + e.pageY - y;
            _this.css({"left": l, "top": t});

            // 选中块的中心坐标
            var ml = l + w2;
            var mt = t + h2;

            // 遍历所有块的坐标
            $(container).children().not(_this).not(wid).each(function(i) {
                var obj = $(this);
                var p = obj.offset();
                var a1 = p.left;
                var a2 = p.left + obj.width();
                var a3 = p.top;
                var a4 = p.top + obj.height();

                // 移动虚线框
                if (a1 < ml && ml < a2 && a3 < mt && mt < a4) {
                    if (!obj.next("#kp_widget_holder").length) {
                        wid.insertAfter(this);
                    } else {
                        wid.insertBefore(this);
                    }
                    return;
                }
            });
        });

        // 绑定mouseup事件
        $(document).mouseup(function() {
            $(document).off('mouseup').off('mousemove');

            // 检查容器为空的情况
            $(container).each(function() {
                var obj = $(this).children();
                var len = obj.length;
                if (len == 1 && obj.is(_this)) {
                    $("<div></div>").appendTo(this).attr("class", "kp_widget_block").css({"height": 10});
                } else if (len == 2 && obj.is(".kp_widget_block")) {
                    $(this).children(".kp_widget_block").remove();
                }
            });

            // 拖拽回位，并删除虚线框
            var p = wid.offset();
            _this.animate({"left": p.left, "top": p.top}, 100, function() {
                _this.removeAttr("style");
                wid.replaceWith(_this);
                window.kp_only = null;

                // 完成之后调用回调函数
                if (options && typeof options.onEnd == "function")
                    options.onEnd(this);

            });

        });

    });

};

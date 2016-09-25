(function(id, w) {
    id      = id || null;
    w       = w || null;
    var _rs = {
        //
        opts            : {
            attention   : {
                title   : '提示',
                btnClose: '知道了'
            }
        },
        //
        getOpts         : function (type, opts) {
            opts    = opts || {};
            opts    = $.extend({}, this.opts[type], opts);
            opts.id = opts.id || id + parseInt(Math.random()*10000);
            return opts;
        },
        //
        showAttention   : function (msg, opts) {
            msg     = msg || '';
            opts    = this.getOpts('attention', opts);
            if($("#"+opts.id).length <= 0) {
                var html= '\
                <!-- 提示{ -->\
                <div class="pop hide" id="'+opts.id+'">\
                    <div class="pop-box">\
                        <div class="pop-box-hd">\
                            <h3 class="title">'+opts.title+'</h3>\
                            <div class="act">\
                                <a title="关闭" class="btn-close J_btnClose" href="#"></a>\
                            </div>\
                        </div>\
                        <div class="pop-box-bd">\
                            <p class="js_pop_msg">'+msg+'</p>\
                            <p class="mvl"><a class="btn J_btnClose">'+opts.btnClose+'</a></p>\
                        </div>\
                    </div>\
                </div>\
                <!-- }提示 -->\
                ';
                $(document.body).append(html);
            }
            this.showPopup(opts.id);
        },
        //
        showPopup       : function(id) {
            $("#"+id).show();
            $("#"+id+" .J_btnClose").click(function(e){
                e.preventDefault();
                $("#"+id).hide();
            });
        }
    };
    if (id && w) {
        w[id]   = _rs;
    }
    return _rs;
})/*('__POPUP__', window)*/
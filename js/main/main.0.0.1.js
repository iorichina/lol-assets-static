var __MAIN__ = {
    __assets_root  : '/static-assets',
    __loadedScript : {},
    __loadedStyle  : [],
    loadScript  : function(url, c, i, w) {
        var slice   = c && 'function' == typeof c ? 2 : 1,
            args    = [].slice.call(arguments, slice),
            w       = 2 == slice ? w : i,
            i       = 2 == slice ? i : c,
            that    = this,
            sk      = that.uniqueScriptKey(url);
        if (that.__loadedScript[sk]) {
            var res = that.__loadedScript[sk];
            res.apply(that, [i, w]);
            return true;
        };
        $.ajax({
            url: url,
            dataType:'script',
            cache: true,
            success: function(res, status) {
                if ('success' == status) {
                    res = $.trim(res.replace(new RegExp("\\/\\*(.|\\n)*\\*\\/"), ''));
                    if ('function' == typeof eval(res)) {
                        res = eval(res);
                        if (w && w[i]) {
                            res.apply(that, [i, w]);
                            c.apply(w[i], []);
                        }else{
                            res.apply(that, [sk, that.__loadedScript]);
                            c.apply(that.__loadedScript[sk], []);
                        }
                    };
                }
            }
        });
    },
    uniqueScriptKey : function(key) {
        return 's'+key.replace(new RegExp(":", "g"), '_-_-').replace(new RegExp("\\/", "g"), '_-_').replace(new RegExp("\\?", "g"), '_-').replace(new RegExp("\\.", "g"), '_');
    },
    loadStyle       : function (url) {
        if(-1 !== $.inArray(url, this.__loadedStyle)) {
            return true;
        }
        $("<link>")
        .attr({
            "rel": "stylesheet",
            "type": "text/css",
            "href": url
        })
        .appendTo("head");
        this.__loadedStyle.push(url);
    }
};
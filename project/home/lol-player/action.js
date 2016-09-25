(function($){
    var popupfun = function(callback, id, w) {
        // id= id || 'lol_player_popup';
        // w = w || this;
        __MAIN__.loadStyle(__MAIN__.__assets_root + '/extension/popup/css/popup.0.0.1.css?e');
        __MAIN__.loadScript(__MAIN__.__assets_root + '/extension/popup/js/popup.0.0.1.js', callback, id, w);
    }
    $(document).on('click', '[data-submit]', function(e) {
        e.preventDefault();
        var action  = $(this).attr('data-submit'),
            that    = this;
        switch(action) {
            case 'search':
                var url = $(that).attr("href");
                $.ajax({
                    url: url,
                    data:{
                        name: $("#name").val()
                    },
                    dataType:'json',
                    type:'post',
                    success: function (json) {
                        if (json.error) {
                            popupfun(function(){
                                try{
                                    this.showAttention(json.msg);
                                }catch(e){
                                    console.log(e);
                                }
                            });
                            return false;
                        }
                        location.href = json.to;
                    }
                });
        }
    });
})(jQuery);
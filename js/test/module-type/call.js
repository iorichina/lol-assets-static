(function(name, context){
    function gogo(){
        console.info(name);
    }
    return {
        go:gogo
    };
}).call(this);
function object(o) {
  var f = object.f, i, len, n, prop;
  f.prototype = o;
  n = new f;
  for (i=1, len=arguments.length; i<len; ++i)
    for (prop in arguments[i])
      n[prop] = arguments[i][prop];
  return n;
}

object.f = function(){};


//スマートフォン用のaudio オーバーライド
var TyranoStart = (function() {
    // クラス内定数
    //var COUNTRY = 'aaaaa';
    this.parser = {};
    this.config = {};
    
    // コンストラクタ
    var TyranoStart = function(obj) {
        
        var that = this;
        
        if(!(this instanceof TyranoStart)) {
            return new TyranoStart(obj);
        }
        
        this.parser = object(tyrano.plugin.kag.parser);
        //コンフィグファイルの読み込み
        this.parser.loadConfig(function(map_config){
        
            that.config = map_config;
            
            //読み込み完了したら表示する
            console.log(that.config);
            
            that.init();
            that.fitBaseSize(that.config.scWidth,that.config.scHeight);
            
            $("#tyrano_frame").attr("src","./tyrano.html").on("load",function(){
                $("#tyrano_frame")[0].contentWindow.opener = window.opener;
            });
            
        });

        
        
    }

    var p = TyranoStart.prototype;

    // プロトタイプ内でメソッドを定義
    p.setName = function(name) {
//        alert("name");
        this.name = name;
    }
    
    //画面サイズをぴったりさせます
    p.fitBaseSize = function(width,height){
        
        //tyrano_frame
         
        var that = this;
      	var view_width = $.getViewPort().width;
        var view_height = $.getViewPort().height;
        
        var width_f = view_width / width ;
        var height_f = view_height / height;
        
        var scale_f = 0;
        
        var space_width = 0;
        
        var screen_ratio = this.config.ScreenRatio;
        
        //比率を固定にしたい場合は以下　以下のとおりになる
        if(screen_ratio =="fix"){
        	
        	if(width_f > height_f){
               scale_f = height_f;
             }else{
                scale_f = width_f;
        	}
        	
            setTimeout(function() {
                    
                   //中央寄せなら、画面サイズ分を引く。
                   if(that.config["ScreenCentering"] && that.config["ScreenCentering"]=="true"){
                       
                       
                       $("#tyrano_frame").css("transform-origin","0 0");
                       $("#tyrano_frame").css({
                           margin: 0
                       });
                       
                       var width = Math.abs(parseInt(window.innerWidth) - parseInt(that.config.scWidth*scale_f))/2;
                       var height = Math.abs(parseInt(window.innerHeight) - parseInt(that.config.scHeight*scale_f))/2;
                       
                       if(width_f > height_f){
                            $("#tyrano_frame").css("left",width+"px");
                            $("#tyrano_frame").css("top","0px");
                       }else{
                            
                            $("#tyrano_frame").css("left","0px");
                            $("#tyrano_frame").css("top",height+"px");
                            
                       }
                       
                   }else{
                        
                        $("#tyrano_frame").css("transform-origin","0 0");
                      
                   }
                   
                   $("#tyrano_frame").css("transform", "scale(" + scale_f + ") ");
                   if (parseInt(view_width) < parseInt(width)) {
                        if (scale_f < 1) {
                            window.scrollTo(width, height);
                        }
                   }

            }, 100);        	
            
        }else if(screen_ratio =="fit"){
            
            $("#tyrano_frame").css("transform-origin","0 0");
            
            //スクリーンサイズに合わせて自動的に調整される
            setTimeout(function() {
                       $("#tyrano_frame").css("transform","scaleX("+width_f+") scaleY("+height_f+")");
                       window.scrollTo(width, height);
            },100);
            
        }else{
        	
        	//スクリーンサイズ固定
        	
        }
       
        
    }
    
    p.init = function(){
        var that = this;
        
        var screen_ratio = this.config.ScreenRatio;
        
        if(screen_ratio != "fix"){
            this.config["ScreenCentering"] = false;
        }
        
        /*
        if(this.config["ScreenCentering"] && this.config["ScreenCentering"]=="false"){
            
            //センタリングをキャンセルする
            $("#tyrano_frame").css("transform-origin","0 0");
            $("#tyrano_frame").css({
                margin: 0
            });
            
        }else{
            //指定がない or yes なら こっち
            //$("#tyrano_frame").css("transform-origin","50 50");
            $("#tyrano_frame").css("transform-origin","0 0");
            $("#tyrano_frame").css({
                margin: 0
            });
            
        }
        
        */

        
        $(window).bind("load orientationchange resize",function(){
            if(Math.abs(window.orientation) === 90){
                if(window.pageYOffset===0){window.scrollTo(0,1);}
                that.fitBaseSize(that.config.scWidth,that.config.scHeight);
            }
            else{
                if (window.pageYOffset === 0) { window.scrollTo(0,1); }
                that.fitBaseSize(that.config.scWidth,that.config.scHeight);
            }
            
        });
    }
        
    return TyranoStart;
    
})();

var tyrano_start = new TyranoStart({});

//サイズ変更




//tyrano_start.setName("bbbbbbb");





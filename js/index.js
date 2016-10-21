var newsList = document.getElementById("newsList");
var imgs = newsList.getElementsByTagName("img");
//获取数据
;
(function getData() {
    var xhr = new XMLHttpRequest();
    xhr.open("get", "JSON/data.txt", false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /2\d{2}/.test(xhr.status)) {
            window.data = utils.jsonParse(xhr.responseText);
        }
    };
    xhr.send(null);
})();
console.log(data);
//绑定数据
;
(function bindData() {
    if (window.data) {
        var str = "";
        for (var i = 0; i < data.length; i++) {
            var curData = data[i];
            str += "<li>";
            str += "<div><img src='' realSrc='" + curData.img + "'/></div>";
            str += "<div><h2>" + curData.title + "</h2><p>" + curData.desc + "</p></div>";
            str += "</li>";
        }
        newsList.innerHTML = str;
    }
})();
//先完成单张图片延迟加载
function imgDeplayLoad(img){
    if(img.isLoaded==true){
        return;
    }
    var temp = new Image();
    temp.src=img.getAttribute("realSrc");
    temp.onload=function(){
        img.src=this.src;
       utils.setCss(img,"display","block");
        fadeIn(img);
    };
    img.isLoaded =true;
}
//淡入效果
function fadeIn(img){
    var speed =0.01;

    img.timer=window.setInterval(function(){
        var curOpacity=utils.getCss(img,"opacity");
        if(curOpacity>=1){
            window.clearInterval(img.timer);
            utils.setCss(img,"opacity",1);
            return;
        }
        curOpacity+=speed;
        utils.setCss(img,"opacity",curOpacity);
    },10)

}
//多张图片延迟加载，多个单张图片延迟加载
function allImgDeplayLoad(){
    for(var i=0;i<imgs.length;i++){
        var curImg=imgs[i];
        var _a = utils.win("scrollTop")+utils.win("clientHeight");
        var _b = utils.offset(curImg.parentNode).top+curImg.parentNode.offsetHeight;
        if(_a>_b){
            imgDeplayLoad(curImg);
        }
    }
}

window.onscroll=allImgDeplayLoad;
window.setTimeout(allImgDeplayLoad,500);


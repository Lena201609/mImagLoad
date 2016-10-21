//获取要操作的元素
var list= document.getElementById("newsList");
var imgs = list.getElementsByTagName("img");
//获取数据
;(function(){
    var xhr = new XMLHttpRequest();
    xhr.open("get","JSON/data.txt",false);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&/2\d{2}/.test(xhr.status)){
            window.data=utils.jsonParse(xhr.responseText);
        }
    };
    xhr.send(null);
})();
//console.log(data);
//绑定数据
;(function(){
    if(window.data){
        var str="";
        for(var i=0;i<data.length;i++){
            var cur=data[i];
            str+="<li>";
            str+="<div><img src='' rSrc='"+cur.img+"'/></div>";
            str+="<div><h2>"+cur.title+"</h2><p>"+cur.desc+"</p></div>";
            str+="</li>";
        }
        list.innerHTML=str;
    }
})();
//单张图片延迟加载
function sLoad(img){
    if(img.flag===true){
        return;
    }
    var temp = document.createElement("img");
    temp.src=img.getAttribute("rSrc");
    temp.onload=function(){
        img.src=this.src;
        utils.setCss(img,"display","block");
        fadeOut(img);
    };
    img.flag=true;
    temp=null;
}
//淡出效果
function fadeOut(img){
    img.timer=window.setInterval(function(){
        var opa=utils.getCss(img,"opacity");
        if(opa>=1){
            window.clearInterval(img.timer);
            utils.setCss(img,"opacity",1);
        }
        opa+=0.01;
        utils.setCss(img,"opacity",opa);
    },10)
}
//多张图片延迟加载
function mLoad(){
    for(var i=0;i<imgs.length;i++){
        var cur=imgs[i];
        var winH=utils.win("scrollTop")+utils.win("clientHeight");
        var imgH=cur.parentNode.offsetHeight+utils.offset(cur.parentNode).top;
        if(winH>imgH){
            sLoad(cur);
        }
    }
}
mLoad();
window.onscroll=mLoad;


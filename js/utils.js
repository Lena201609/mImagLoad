var utils = {
    listToArray: function (likeArray) {//类数组转为数组
        var ary = [];
        try {
            ary = Array.prototype.slice.call(likeArray);
        } catch (e) {
            for (var i = 0; i < likeArray.length; i++) {
                ary.push(likeArray[i]);
            }
        }
        return ary;
    },
    jsonParse: function (jsonStr) {//json字符串转化为json格式对象
        return "JSON" in window ? JSON.parse(jsonStr) : eval("(" + jsonStr + ")");
    },
    getRondom: function (n, m) {//获取随机数
        var n = Number(n);
        var m = Number(m);
        if (isNaN(n) || isNaN(m)) {
            return Math.random();
        }
        if (n > m) {
            var temp = n;
            n = m;
            m = temp;
        }
        return Math.round(Math.random() * (m - n) + n);
    },
    win: function (attr, val) {//浏览器窗口
        if (typeof val != "undefined") {
            document.documentElement[attr] = val;
            document.body[attr] = val;
            return;
        }
        return document.documentElement[attr] || document.body[attr];
    },
    offset: function (ele) {//距离body偏移量
        var totalLeft = null;
        var totalTop = null;
        totalLeft += ele.offsetLeft;
        totalTop += ele.offsetTop;
        var par = ele.offsetParent;
        while (par) {
            if (window.navigator.userAgent.indexOf("MSIE 8") === -1) {
                totalLeft += par.clientLeft;
                totalTop += par.clientTop;
            }
            totalLeft += par.offsetLeft;
            totalTop += par.offsetTop;
            par = par.offsetParent;
        }
        return {left: totalLeft, top: totalTop};
    },
    getCss: function (ele, attr) {//获取元素的值
        var val = null;
        if (window.getComputedStyle) {
            val = window.getComputedStyle(ele, null)[attr];
        } else {
            if (attr === "opacity") {
                val = ele.currentStyle.filter;
                var reg = /alpha\(opacity=(\d+(?:\.\d+)?)\)/;
                val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                val = ele.currentStyle[attr];
            }
        }
        var reg = /-?\d+(\.\d+)?(px|pt|rem|em|deg)?/;
        return reg.test(val) ? parseFloat(val) : val;
    },
    setCss: function (ele, attr, val) {//设置元素的样式
        if (attr == "opacity") {
            ele.style.opacity = val;
            ele.style.filter = "alpha(opacity=" + val * 100 + ")";
            return;
        }
        if (attr == "float") {
            ele.style.cssFloat = val;
            ele.style.styleFloat = val;
            return;
        }
        var reg = /width|height|top|left|right|bottom|(margin|padding)(Left|Top|Right|Bottom)?/;
        if (reg.test(attr)) {
            if(!isNaN(val)){
                val += "px";
            }
        }
        ele.style[attr] = val;
    }
};

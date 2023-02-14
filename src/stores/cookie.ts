//设置cookie,全局调用
export function 设置Cookie(名字,数值,时间){
    var 持续时间 = new Date();
    持续时间.setDate(持续时间.getDate() + 时间);
    document.cookie = 名字 + "=" + escape(数值) + ((时间 == null) ? "" : ";expires=" + 持续时间.toUTCString());
   
}


//获取cookie,全局调用
export function 获取Cookie(名字){
    if (document.cookie.length>0){
        var c_start = document.cookie.indexOf(名字 + "=")
        if (c_start!=-1){ 
            c_start = c_start + 名字.length+1 
            var c_end = document.cookie.indexOf(";",c_start)
            if (c_end==-1) c_end=document.cookie.length
            return unescape(document.cookie.substring(c_start,c_end))
        } 
    }
    return ""
}
//删除cookie,全局调用
export function 删除Cookie(名字){
    var 持续时间 = new Date();
    持续时间.setTime(持续时间.getTime() - 1);
    var cval=获取Cookie(名字);
    if(cval!=null) document.cookie= 名字 + "="+cval+";expires="+持续时间.toUTCString();
}
 

/**
 * Created by Administrator on 2016/4/13.
 */
$(function(){
    var serverUrl = "/laikanxing_v1/star/info/brief/";
    if(currentMatch()=='pc'){
        $('body').width(1000);
    }
    $.ajax({
        url:serverUrl+getUrlParam('id'),
        headers:{"FanShowAuth":"9bb819497fdec90f82633bef5040a6c0"},
        contentType: "application/json",
        type:"GET",
        dataType:"json",
        timeout:10000,
        success:function(data, status) {
            console.log(data);
            for(var index in data){
                if($('#' + index).length!=0){
                    if($('#' + index)[0].localName=='img'){
                        $('#' + index).attr('src',data[index]);
                    }else{
                    $('#' + index).html(data[index]);
                    }
                }
            }
        },
        error:function(xhr, status, error) {
            console.log(error);
            if (xhr.status==403) {
                alert("请管理员登陆");
                location.href="login.html";
            } else {
                alert(status);
            }
        }
    });
    function getUrlParam(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r!=null) return unescape(r[2]); return null; //返回参数值
    }
    function postTime(time){
        var ctime=new Date();
        var stime=new Date(new Number(time));
        var year=ctime.getYear()-stime.getYear();
        var month=ctime.getMonth()-stime.getMonth();
        var day=ctime.getDay()-stime.getDay();
        var h=ctime.getHours()-stime.getHours();
        var m=ctime.getMinutes()-stime.getMinutes();
        if(year>0){
            return year+'年前';
        }
        if(month>0){
            return month+'月前';
        }
        if(day>0){
            return day+'天前';
        }
        if(h>0){
            return h+'小时前';
        }
        if(m>0){
            return m+'分钟之前';
        }
        if(ctime>stime){
            return '';
        }else{
            return '1分钟之前';
        }
    }
});
/**
 * Created by Administrator on 2016/4/13.
 */
$(function(){
    var serverUrl = "/laikanxing_v1/video/";
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
            for(var index in data){//数据回填
                if($('#' + index).length!=0){
                    if($('#' + index)[0].localName=='video' || $('#' + index)[0].localName=='img'){
                        $('#' + index).attr('src',data[index]);
                    }else{
                        $('#' + index).html(data[index]);
                    }
                }
            }
            $('#coverUrl').on('load',function(){
                var pWidth=$('#coverUrl').width();
                var pHeight=$('#coverUrl').height();
                $('#alertDiv').find('img').css('margin-top',(pHeight-$('#alertDiv').find('img').height())/2);
            });
            $('#alertDiv').on('click',function(){//播放按钮添加事件
                $('#alertDivToApp').show();
            });
            $('.left-button').on('click',function(){
                $('#alertDivToApp').hide();
            });
            if(data.commentNumber>0){//是否有评论
                $.ajax({
                    url: '/laikanxing_v1/comment/regexp/5/'+getUrlParam('id')+'/0/3',
                    headers: {"FanShowAuth": "9bb819497fdec90f82633bef5040a6c0"},
                    contentType: "application/json",
                    type: "GET",
                    dataType: "json",
                    timeout: 10000,
                    success: function (data, status) {
                        if(data.length==0){
                            $('.comments').hide();//隐藏评论区
                            return;
                        }
                        for(var index in data){
                            $('.comments').append(
                                '<div class="comments-comment"><div class="comments-comment-info info clearfix"><span class="info-img float-left">'
                                +'<img src="'+data[index].toUserHeadUrl+'" alt=""/></span><span class="info-name float-left">'+data[index].toUserName+'</span><span class="info-time float-left">'
                                +'<img src="../img/time_watch.png" class="info-time-img" alt="这是时间图片"/><span class="info-time-text">'+postTime(data[index].createTime)+'</span></span>'
                                +'</div><div class="comments-comment-context">'+data[index].content+'</div></div>'
                            );
                        }
                    }
                });
            }else{
                $('.comments').hide();//隐藏评论区
            }
           /* $.ajax({//观看次数
                url: '/laikanxing_v1/liveH5/praisAndOnlineNum/'+getUrlParam('id'),
                headers: {"FanShowAuth": "4914d4f206f7c3e2f017f20ee159314a"},
                contentType: "application/json",
                type: "GET",
                dataType: "json",
                timeout: 10000,
                success: function (data, status) {
                    $('#onlineNum').html(data.onlineNum);
                }
            });*/
        },
        error:function(xhr, status, error) {
            console.log(error);
            if (xhr.status==403) {
                console.log("请管理员登陆");
            } else {
                console.log(status);
            }
        }
    });
    function getUrlParam(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r!=null) return unescape(r[2]); return null; //返回参数值
    }
    function getUrlParam2222(name,url){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        url=url.split("?")[1];
        var r = url.match(reg);  //匹配目标参数
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
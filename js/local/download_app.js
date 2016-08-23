/**
 * Created by Administrator on 2016/4/14.
 */
$(function(){
    $('.download-app-button').on('click',function(){
            window.location='laikanxing://';//打开某手机上的某个app应用
            setTimeout(function(){
                if (navigator.userAgent.indexOf("MicroMessenger") >= 0) {
                    window.location.href='http://a.app.qq.com/o/simple.jsp?pkgname=com.kwcxkj.lookstars';
                } else if (navigator.userAgent.indexOf("Android") >= 0) {
                    window.location.href='http://a.app.qq.com/o/simple.jsp?pkgname=com.kwcxkj.lookstars';
                } else if (navigator.userAgent.indexOf("iPhone") >= 0) {
                    window.location.href = 'https://itunes.apple.com/cn/app/id1050096202';
                }
            },1500);

    });
});

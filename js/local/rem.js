/**
 * Created by Administrator on 2016/4/13.
 */
(function(){
    var dpr, rem, scale;
    var docEl = document.documentElement;
    var fontEl = document.createElement('style');
    var metaEl = document.querySelector('meta[name="viewport"]');
    var clientWidth=docEl.clientWidth;
    dpr = window.devicePixelRatio || 1;
    console.log('current dpr'+dpr);
    scale = 1 / dpr;
    if(currentMatch().isPc){//如果是PC,设置最大宽度1000px
        clientWidth=1000;
        rem = clientWidth * 100 / 750 * dpr;
        rem=rem/dpr;//高分辨率
    }else{
        rem = clientWidth * 100 / 750 * dpr;
    }
    metaEl.setAttribute('content', 'width=' + dpr * clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');

    docEl.setAttribute('data-dpr', dpr);
    docEl.firstElementChild.appendChild(fontEl);
    fontEl.innerHTML = 'html{font-size:' + rem + 'px!important;}';
    window.rem2px = function (v) {
        v = parseFloat(v);
        return v * rem;
    };
    window.px2rem = function (v) {
        v = parseFloat(v);
        return v / rem;
    };
    window.dpr = dpr;
    window.rem = rem;
})();
function currentMatch(){
    var match={};
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        match.isMobile=true;
        match.isPc=false;
    } else {
        match.isMobile=false;
        match.isPc=true;
    }
    return match;
}

/**
 * Created by Administrator on 2016/4/18.
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
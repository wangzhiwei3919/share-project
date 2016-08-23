/**
 * Created by Administrator on 2016/4/19.
 */
var player = new CloudVodPlayer();
$.get(serverUrl + '/live/' + wzw.getUrlParam('id',window.location.href), function (data) {
player.init({uu:wzw.getUrlParam('uu',data.liveUrl),vu:wzw.getUrlParam('vu',data.liveUrl),auto_play:0}, 'player');
    }
);

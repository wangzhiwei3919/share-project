var serverUrl = "/laikanxing_v1/liveH5";
(function(){
	var live_h5 = angular.module('live_h5', []);
	var playerTime=0;
	var currentTime=0;
    var	liveFlag=-1;
	var imgFlag=false;
	var videoFlag=false;
	var stop;
	var datas;
	function getUrlParam(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg);  //匹配目标参数
		if (r!=null) return unescape(r[2]); return null; //返回参数值
	}

	live_h5.controller('LiveH5', ["$http", "$location", '$rootScope','$scope','$window', function($http, $location, $rootScope,$scope,$window) {
		
		$scope.download = function () {
			$window.location.href = "http://www.laikanxing.com?cross=1";
		}
		
		$scope.starApp=function(){
			window.location='laikanxing://';//打开某手机上的某个app应用
			setTimeout(function(){
				if (navigator.userAgent.indexOf("MicroMessenger") >= 0) {
					window.location.href='http://www.laikanxing.com?cross=1';
				} else if (navigator.userAgent.indexOf("Android") >= 0) {
					window.location.href='http://www.laikanxing.com?cross=1';
				} else if (navigator.userAgent.indexOf("iPhone") >= 0) {
					window.location.href = 'https://itunes.apple.com/cn/app/id1050096202';
				}
			},1000);
			/*var ua = navigator.userAgent;
			if(ua.match(/iPhone|iPod/i) != null){
				$window.location.href = 'laikanxing://';
				
				setTimeout(function(){
					$window.location.href = "http://www.laikanxing.com?cross=1";
				},5000);
				
				
			}else if(ua.match(/Android/i) != null){
			  $window.location.href = "http://www.laikanxing.com?cross=1";
			}else if(ua.match(/iPad/i) != null){
			 $window.location.href = 'laikanxing://'; 
			}*/
		};
		
		
		stop=setInterval (showOnlineNum,10000);
		function showOnlineNum() 
		{ 
			$http({
				url: serverUrl + '/praisAndOnlineNum/'+getUrlParam('id'),
				method: 'GET'
			}).success(function (data){
				$rootScope.praiseNum=data.praiseNum;
				$rootScope.onlineNum=data.onlineNum;
				console.log(data.currentTime);
				currentTime=data.currentTime;
				showImgOrVideo();
			});

		$http({
				url: serverUrl + '/live/'+getUrlParam('id'),
				method: 'GET',
				async:false
			}).success(function (data){
				playerTime=new Date(new Number(data.liveTime));
				liveFlag=data.liveFlag;
				datas=data;
				showImgOrVideo();
				$rootScope.title=data.title;
				$rootScope.starName=data.starName;
				$rootScope.starHeadUrl=data.starHeadUrl;
				$rootScope.starCoverUrl=data.starCoverUrl;
			});
		} 	
		showOnlineNum();

	}]);
	
	function showImgOrVideo(){
		if(liveFlag==0 && videoFlag==false){//如果是录播并且是第一次加载
			$('#blive').remove();
			videoFlag=true;
			var ssrc='<script src="../js/local/cloud-video.js"></script>';
			$('#player').append(ssrc);
			$('#player-frame').hide();
			$('#player').show();//显示播放器
			$('.hideDiv').hide();
			window.clearInterval(stop);
			return;
		}else if(videoFlag==false && liveFlag!=-1) {//如果是第一次加载并且获得数据
			//$('#bcloud').remove();
			videoFlag=true;
			var ssrc='<script src="../js/local/cloud-live.js"></script>';
			$('#player').append(ssrc);
		}else{//未获得数据
			return;
		}
		if(currentTime ==0 || playerTime==0){//两个请求有一个没有返回数据
			return;
		}
		if(liveFlag==1){//停播
			$('#player-frame').find('img').attr('src',datas.pictureEndUrl);
			$('#player-frame').show();//显示图片
			$('#player').hide();
			$('.hideDiv').hide();
		}else{
			$('#player-frame').find('img').attr('src',datas.pictureUrl);
			if(playerTime.getTime()<=currentTime){//如果播放时间>服务器时间
				$('#player-frame').hide();
				$('#player').show();//显示播放器
				$('.hideDiv').hide();
			}else{
				$('#player-frame').show();//显示图片
				$('#player').hide();
				initDate();
			}
		}
	}
	function initDate(){//测试
		if(imgFlag==false){
			imgFlag=true;
			var ctime=currentTime;
			var ptime=playerTime.getTime();
			$('#player-frame').find('img').on('load',function(){
				var top=$(this).offset().top;
				var left=$(this).offset().left;
				var width=$(this).width();
				var height=$(this).height();
				$('.hideDiv').css('top',top).css('width',width).css('height',height).css('padding-top',height *.4);
			});
			$('#month').html((playerTime.getMonth()+1)<10?'0'+(playerTime.getMonth()+1):(playerTime.getMonth()+1));
			$('#day').html(playerTime.getDate()<10?'0'+playerTime.getDate():playerTime.getDate());
			$('#hour').html(playerTime.getHours()<10?'0'+playerTime.getHours():playerTime.getHours());
			$('#minute').html(playerTime.getMinutes()<10?'0'+playerTime.getMinutes():playerTime.getMinutes());
		}
	}
	
}) ();

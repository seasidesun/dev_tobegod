$(function() {
	//117.157428, 35.058230
// (function (exports) {


	// imageLayer=new AMap.ImageLayer({
	//         url: 'http://localhost:3006/favicon.ico',
	//         bounds: new AMap.Bounds( //经纬度边界
	//           new AMap.LngLat(116.340408,39.890114),
	//           new AMap.LngLat(116.463146,39.937645)),
	//           zooms: [14, 15] //可见zoom范围
	// });
	//   var mapObj=new AMap.Map("container",{
	//   layers:[
	//    imageLayer
	//   ],
	//   view: new AMap.View2D({
	//   center:new AMap.LngLat(116.397428,39.90923),//设置地图中心点
	//   zoom:13,//设置地图缩放级别
	//   rotation:0 //设置地图旋转角度
	//  })
	// });


	var map = new AMap.Map('mapContainer', {
	// 	layers:[
	// 	   imageLayer
	//      ],
		//resizeEnable: true,
		//rotateEnable: true,
		//dragEnable: true,
		//zoomEnable: true,
		//设置可缩放的级别
		//zooms: [3,18],
		//传入2D视图，设置中心点和缩放级别
		view: new AMap.View2D({
			center: new AMap.LngLat(116.384377, 39.935029),
			zoom: 12
		})
	});

	var marker = new AMap.Marker({ //创建自定义点标注                 
	  map: map,
	  position: new AMap.LngLat(116.406326, 39.903942),
	  offset: new AMap.Pixel(-10, -34),               
	  icon: "http://localhost:3006/favicon.ico"
	});



	var markerContent = document.createElement("div");
	markerContent.className = "markerContentStyle";

	var markerImg = document.createElement("img");
		    markerImg.className = "markerlnglat";
			markerImg.src = "http://localhost:3006/images/test.jpg";	
			// markerImg.src = "http://localhost:3006/favicon.ico";	
			// markerImg.href = "http://localhost:3006/favicon.ico";	
			markerContent.appendChild(markerImg);

	// var markerSpan = document.createElement("span");
	// 		markerSpan.innerHTML = "Hi，我换新装备啦！";
	// 		markerContent.appendChild(markerSpan);

	// var markerSpan = document.createElement("a");
	// 		markerSpan.href = "/";
	// 		markerContent.appendChild(markerSpan);

	marker.setContent(markerContent);
	marker.setAnimation('AMAP_ANIMATION_BOUNCE'); 
	// var info = [];                 
	// info.push("<b>  高德软件</b>");                 
	// info.push("  电话 :  010-84107000   邮编 : 100102");                 
	// info.push("  地址 : 北京市望京阜通东大街方恒国际中心A座16层");                 
	               
	// var inforWindow = new AMap.InfoWindow({                 
	//   offset:new AMap.Pixel(0,-23),                 
	//   content:info.join("<br>")              
	// });  

	AMap.event.addListener(marker,"click",function(e){  
		window.location.href='/';
	  // inforWindow.open(map,marker.getPosition());                 
	}); 
	
	
	        

	// var groundimageOpts = {   
	//   map: map,     //添加到地图 
	//   opacity:0.8,    //设置图片的透明度 
	//   clickable:true  //图片相应鼠标点击事件，默认：false 
	// }; 

	// var sw = new AMap.LngLat(116.384377, 39.935029); 
	// var ne = new AMap.LngLat(116.388331, 39.939577);  
	// var bounds = new AMap.Bounds(sw,ne);//图片叠加的地理范围 
	   
	// var groundImage = new AMap.GroundImage("http://localhost:3006/favicon.icon", bounds, groundimageOpts);//图片地址，图片叠加的地理范围，图片初始化对象 
	// groundImage.setMap(map);
// })(window);
})
$(function() {
    var origin = window.parent.location.origin;
    var smallMap = null;
    var IMG_STYLE = "?imageView2/1/w/30/h/30";

    (function load () {
        $.ajax({
            type: "GET",
            url: origin + "/memory/api/v1/picture/list",
            success: function (ret) {
                refresh(ret.list);
            },
            error: function (error) {
                alert(error);
            }
        });
    })(); //direct call

    var mainMap = new AMap.Map('mapContainer', {
        view: new AMap.View2D({
            center: new AMap.LngLat(117.157428, 35.058230), //117.157428, 35.058230
            zoom: 4
        })
    });

    function refresh (list) {

        for (var i = list.length - 1; i >= 0; i--) {
            var marker = new AMap.Marker({ //创建自定义点标注                 
                map: mainMap,
                position: new AMap.LngLat(list[i].position.lng, list[i].position.lat),
                offset: new AMap.Pixel(-10, -15)
                // icon: "http://localhost:3006/favicon.ico"
            });
            
            var markerContent = document.createElement("div");
                markerContent.className = "markerContentStyle";

            var markerImg = document.createElement("img");
                markerImg.className = "markerlnglat";

            markerImg.src = list[i].imgArray[0].imgUrl + IMG_STYLE;
            // console.log(markerImg.src);
            markerContent.appendChild(markerImg);
            markerImg.setAttribute("class", "img-circle");
            marker.setContent(markerContent);
            marker.setAnimation('AMAP_ANIMATION_BOUNCE');

            AMap.event.addListener(marker,"click",function(e){  
                // window.location.href='/';
            });
        };
    }

    function refreshSmallMap (bounds) {

        smallMap = new AMap.Map('smallmap', {
            view: new AMap.View2D({
                // center: new AMap.LngLat(lng, lat), //117.157428, 35.058230
                zoom: 4
            })
        });

        smallMap.setBounds(bounds);

        // //加载城市查询插件
        // AMap.service(["AMap.CitySearch"], function() {
        //     //实例化城市查询类
        //     var citysearch = new AMap.CitySearch();
        //     //自动获取用户IP，返回当前城市
        //     citysearch.getLocalCity(function(status, result){
        //         if(status === 'complete' && result.info === 'OK'){
        //             if(result && result.city && result.bounds) {
        //                 var cityinfo = result.city;
        //                 var citybounds = result.bounds;
        //                 document.getElementById('info').innerHTML = "您当前所在城市：" + cityinfo + "";
        //                 //地图显示当前城市
        //                 console.log(citybounds);
        //                 // map.setBounds(null, null, citybounds);
        //             }
        //         }else{
        //             document.getElementById('info').innerHTML = "您当前所在城市：" + result.info + "";
        //         }
        //     });
        // });


        // var mapCenter = map.getCenter();
        // document.getElementById('centerInfo').innerHTML = '当前地图中心点坐标：' + mapCenter.getLng() + ',' + mapCenter.getLat();         
    }

    $("#upshow").click(function (e) {
        $(".overlay").css("display", "block");
        $(".uploaddialog").css("display", "block");

                //加载城市查询插件
        AMap.service(["AMap.CitySearch"], function() {
            //实例化城市查询类
            var citysearch = new AMap.CitySearch();
            //自动获取用户IP，返回当前城市
            citysearch.getLocalCity(function(status, result){
                if(status === 'complete' && result.info === 'OK'){
                    if(result && result.city && result.bounds) {
                        var cityinfo = result.city;
                        var citybounds = result.bounds;
                        // document.getElementById('info').innerHTML = "您当前所在城市：" + cityinfo + "";
                        //地图显示当前城市
                        // console.log(citybounds);
                        refreshSmallMap(citybounds);
                        // map.setBounds(citybounds);
                        return;
                    }
                }else{
                    // document.getElementById('info').innerHTML = "您当前所在城市：" + result.info + "";
                }
            });
        });


        // refreshSmallMap(117.157428, 35.058230);
    });
    $("#uploadclose").click(function (e) {
        $(".overlay").css("display", "none");
        $(".uploaddialog").css("display", "none");
    });
    // $("#upload").click(function (e) {
    //     uploader.start();
    // });
    // $(".close").click(function (e) {
    //     $(".overlay").css("display", "none");
    //     $(".uploaddialog").css("display", "none");
    // });

    $(".left").delegate(".remove", "click", function (e) {
        // $(this).parent().hide(1000, function () {
        //     $(this).parent().remove();
        //     var length = $(".left").find(".item").length;

        //     if  (length < 9) {
        //         $("#pickfiles").css("display", "inline-block");
        //     }
        // });
        $(this).parent().remove();

        var length = $(".left").find(".item").length;
        if  (length < 9) {
            $("#pickfiles").css("display", "inline-block");
        }
    });

    $("#upload").click(function () {

        var user = $("#user").val().replace(/\ +/g,"");
        if (user.length === 0) {
            $("#user").val("");
            $("#user").focus();
            $("#user").attr("placeholder", "不能为空!");
            return;
        }

        var title = $("#title").val().replace(/\ +/g,"") || "";


        if (!smallMap) return alert("地图加载错误, 请检查网络!");
        var mapCenter = smallMap.getCenter();

        var imgList = $(".left").find(".picture");
        var imgArray = [];

        for (var i = 0, len = imgList.length; i < len; i++) {
            var src = $(imgList[i]).attr('src');
            src = src.slice(0, src.indexOf("?"));
            imgArray.push(src);
            // console.log(src);
            // return;
            // imgArray.push({imgUrl: $(imgList[i]).attr('src')});
        };

        if(imgArray.length === 0) return alert("请选择照片！");

        var data = {
            user: user,
            title: title,
            position: {
                lng: mapCenter? mapCenter.getLng(): null,
                lat: mapCenter? mapCenter.getLat(): null
            },
            imgArray: imgArray
        }

        $.ajax({
            type: "post",
            contentType: "application/json", 
            data: JSON.stringify(data),
            url: origin + "/memory/api/v1/picture",
            success: function (ret) {
                $(".overlay").css("display", "none");
                $(".uploaddialog").css("display", "none");
                return;
            }
        });

    });
    
    var uploader = Qiniu.uploader({
        runtimes: 'html5,flash,html4',
        browse_button: 'pickfiles',
        // container: 'container',
        // drop_element: 'container',
        dragdrop: false,
        max_file_size: '100mb',
        flash_swf_url: 'js/plupload/Moxie.swf',
        chunk_size: '4mb',
        uptoken_url: '/qiniu/uptoken',
        domain: 'http://7xii35.com1.z0.glb.clouddn.com/',
        unique_names: true,
        auto_start: true,
        init: {
            'FilesAdded': function(up, files) {
                // console.log("!!!!");
                // plupload.each(files, function(file) {
                //     console.log("file");
                //     console.log(file);
                //     var progress = new FileProgress(file, 'fsUploadProgress');
                //     console.log("progress");
                //     console.log(progress);
                //     // progress.setStatus("等待...");
                // });
                // console.log("added");
                // console.log("!!");
                // console.log(typeof files);
                // console.log(JSON.stringify(files[0]));
                // var test = files[0].getSource().getSource();
                // console.log("uploader:");
                // console.log(uploader;
                // console.log(test);
                // console.log(files[0].getSource);
                // console.log(up);
            },
            'BeforeUpload': function(up, file) {
            },
            'UploadProgress': function(up, file) {
            },
            'UploadComplete': function() {
            },
            'FileUploaded': function(up, file, info) {

                var length = $(".left").find(".item").length;
                if (length < 9) {
                    var info = JSON.parse(info);
                    var img = '<div class="item"><img class="remove" src="/images/icon/remove.ico"></img><img class="picture" src="http://7xii35.com1.z0.glb.clouddn.com/' + info.key + '?imageView2/1/w/80/h/80"></img></div>';
                    $(img).insertBefore($("#pickfiles"));
                } else {
                    $("#pickfiles").css("display", "none");
                }
            },
            'Error': function(up, err, errTip) {
            }
        }
    });
    // console.log("uploader:");
    // console.log(uploader);

    
    
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


    

    /*
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
    */

    // var markerSpan = document.createElement("span");
    //      markerSpan.innerHTML = "Hi，我换新装备啦！";
    //      markerContent.appendChild(markerSpan);

    // var markerSpan = document.createElement("a");
    //      markerSpan.href = "/";
    //      markerContent.appendChild(markerSpan);

//  marker.setContent(markerContent);
//  marker.setAnimation('AMAP_ANIMATION_BOUNCE'); 
    // var info = [];                 
    // info.push("<b>  高德软件</b>");                 
    // info.push("  电话 :  010-84107000   邮编 : 100102");                 
    // info.push("  地址 : 北京市望京阜通东大街方恒国际中心A座16层");                 
                   
    // var inforWindow = new AMap.InfoWindow({                 
    //   offset:new AMap.Pixel(0,-23),                 
    //   content:info.join("<br>")              
    // });  

//  AMap.event.addListener(marker,"click",function(e){  
//      window.location.href='/';
      // inforWindow.open(map,marker.getPosition());                 
//  }); 
    
    
            

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
});
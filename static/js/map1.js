// ********************************   shawn map ***************************************



var geoXml = null;
var geoXmlDoc = null;
var map = null;
var myLatLng = null;
var myGeoXml3Zoom = true;
var sidebarHtml = "";
var infowindow = null;
var filename = "http://arc.garc.opendata.arcgis.com/datasets/ad5209eef1e1460c9e39d4b0a8829c0a_65.kml";
var cdata={};  

      
    function initialize() {



       getJSON('http://115.146.93.74:5984/tweet_db/_design/testtopic/_view/districtnumber?group_level=1').then(function(data){
        dealdata(data);
        }, function(status) { //error detection....
        alert('Something went wrong.');
      });

      // Map style
      var styles = [
    {
      stylers: [
        { hue: "#00ffe6" },
        { saturation: -20 }
      ]
    },{
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { lightness: 100 },
        { visibility: "simplified" }
      ]
    },{
      featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    }
  ];

      var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"}); 

      myLatLng = new google.maps.LatLng(33.76666666666667,-84.41666666666667);
      
                var myOptions = {
                    center: myLatLng,
                    zoom: 12,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    mapTypeControlOptions: {mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']}
                };
                map = new google.maps.Map(document.getElementById("map_canvas"),
                      myOptions);
                map.mapTypes.set('map_style', styledMap);
                map.setMapTypeId('map_style');
                //infowindow = new google.maps.InfoWindow({});

   geoXml = new geoXML3.parser({
                    map: map,
                    //infoWindow: infowindow,
                    singleInfoWindow: true,
                    suppressInfoWindows: true,
                    zoom: myGeoXml3Zoom,
                    afterParse: useTheData
                });
                geoXml.parse(filename);

    };

function kmlPgClick(pm) {
   if (geoXml.docs[0].placemarks[pm].polygon.getMap()) {
      google.maps.event.trigger(geoXmlDoc.placemarks[pm].polygon,"click");
   } else {
      geoXmlDoc.placemarks[pm].polygon.setMap(map);
      google.maps.event.trigger(geoXmlDoc.placemarks[pm].polygon,"click");
   }
}

function kmlShowPlacemark(pm) {
  if (geoXmlDoc.placemarks[pm].polygon) {
    map.fitBounds(geoXmlDoc.placemarks[pm].polygon.bounds);
  } else if (geoXmlDoc.placemarks[pm].polyline) {
    map.fitBounds(geoXmlDoc.placemarks[pm].polyline.bounds);
  } else if (geoXmlDoc.placemarks[pm].marker) {
    map.setCenter(geoXmlDoc.placemarks[pm].marker.getPosition());
  } 
   
   for (var i=0;i<geoXmlDoc.placemarks.length;i++) {
     var placemark = geoXmlDoc.placemarks[i];
     if (i == pm) {
       if (placemark.polygon) placemark.polygon.setMap(map);
       if (placemark.polyline) placemark.polyline.setMap(map);
       if (placemark.marker) placemark.marker.setMap(map);
     } else {
       if (placemark.polygon) placemark.polygon.setMap(null);
       if (placemark.polyline) placemark.polyline.setMap(null);
       if (placemark.marker) placemark.marker.setMap(null);
     }
   }
}

var highlightOptions = {fillColor: "#A52A2A", strokeColor: "#000000", fillOpacity: 0.8, strokeWidth: 10};
var highlightLineOptions = {strokeColor: "#FFFF00", strokeWidth: 10};
function kmlHighlightPoly(pm) {
   for (var i=0;i<geoXmlDoc.placemarks.length;i++) {
     var placemark = geoXmlDoc.placemarks[i];
     if (i == pm) {
       if (placemark.polygon) placemark.polygon.setOptions(highlightOptions);
       if (placemark.polyline) placemark.polyline.setOptions(highlightLineOptions);
     } else {
       if (placemark.polygon) placemark.polygon.setOptions(placemark.polygon.normalStyle);
       if (placemark.polyline) placemark.polyline.setOptions(placemark.polyline.normalStyle);
     }
   }
}
function kmlUnHighlightPoly(pm) {
   for (var i=0;i<geoXmlDoc.placemarks.length;i++) {
     if (i == pm) {
       var placemark = geoXmlDoc.placemarks[i];
       if (placemark.polygon) placemark.polygon.setOptions(placemark.polygon.normalStyle);
       if (placemark.polyline) placemark.polyline.setOptions(placemark.polyline.normalStyle);
     }
   }
}


function showAll() {
   map.fitBounds(geoXmlDoc.bounds);
   for (var i=0;i<geoXmlDoc.placemarks.length;i++) {
     var placemark = geoXmlDoc.placemarks[i];
     if (placemark.polygon) placemark.polygon.setMap(map);
     if (placemark.polyline) placemark.polyline.setMap(map);
     if (placemark.marker) placemark.marker.setMap(map);
   }
}

function highlightPoly(poly, polynum) {
  
  google.maps.event.addListener(poly,"mouseover",function(event) {
    if (poly instanceof google.maps.Polygon) {
      poly.setOptions(highlightOptions);
    } else if (poly instanceof google.maps.Polyline) {
      poly.setOptions(highlightLineOptions);
    };
        
  });
  google.maps.event.addListener(poly,"mouseout",function() {
    poly.setOptions(poly.normalStyle);
    //remove detailed data from map
    //infowindow.close();
    //infowindow=null;
  });

  google.maps.event.addListener(poly,"click", function(event){
    //trigger echart
    //cdata.rows[polynum]
    makebar(polynum);
    standardpiemap();
    //show detailed data 
    makeInfoWidonwRight(event,poly,polynum);
      
  });
}

// == build sidebar to show detailss about each district
function makeInfoWidonwRight(event,poly,pnum){
  
  var i=pnum+1;
  var name="District #"+i;
  //get data from couchdb
  var totaltwitters=0;//cdata.rows[pnum].value;
  var contentstring="<table><tr><td>District Name: "+name+"</td></tr><tr><td>Total Twitters: "+ totaltwitters +"</td></tr></table>";    
  infowindow = new google.maps.InfoWindow({content:contentstring, position: event.latLng});
  infowindow.open(map);
  
}  



function useTheData(doc){
  var currentBounds = map.getBounds();
  if (!currentBounds) currentBounds=new google.maps.LatLngBounds();

  geoXmlDoc = doc[0];
  for (var i = 0; i < geoXmlDoc.placemarks.length; i++) {

    var placemark = geoXmlDoc.placemarks[i];
    if (placemark.polygon) {

      var normalStyle = {
          strokeColor: placemark.polygon.get('strokeColor'),
          strokeWeight: placemark.polygon.get('strokeWeight'),
          strokeOpacity: placemark.polygon.get('strokeOpacity'),
          fillColor: placemark.polygon.get('fillColor'),
          fillOpacity: placemark.polygon.get('fillOpacity')
          };
      placemark.polygon.normalStyle = normalStyle;

      highlightPoly(placemark.polygon, i);
    }

  }

};
            

   function hide_kml(){

            geoXml.hideDocument();  

   }

   function unhide_kml(){

            geoXml.showDocument();  

   }
function reload_kml(){
   geoXml.hideDocument();
   delete geoXml;
   geoXml = new geoXML3.parser({
                    map: map,
                    singleInfoWindow: true,
                    afterParse: useTheData
   });
   geoXml.parse(filename); 

}
   function hide_markers_kml(){
     for (var i=0;i<geoXmlDoc.markers.length;i++) {
       geoXmlDoc.markers[i].setVisible(false);
     }
   }

   function unhide_markers_kml(){
     for (var i=0;i<geoXmlDoc.markers.length;i++) {
       geoXmlDoc.markers[i].setVisible(true);
     }
   }
   function hide_polys_kml(){
     for (var i=0;i<geoXmlDoc.gpolylines.length;i++) {
       geoXmlDoc.gpolylines[i].setMap(null);
     }
   }

   function unhide_polys_kml(){
     for (var i=0;i<geoXmlDoc.gpolylines.length;i++) {
       geoXmlDoc.gpolylines[i].setMap(map);
     }
   }

<!-- CODE FOR DEAL COUCHDB DATA-->
function dealdata(data){
  //== set json data to global
 cdata=data;
}

<!-- CODE FOR ECHART -->

function makebar(polynum){
var num=polynum+1;
var bardata={};
getJSON('http://115.146.93.74:5984/tweet_db/_design/testtopic/_view/districtnumber?group_level=1&district='+num+'').then(function(data){
       bardata=data;
        }, function(status) { //error detection....
        alert('Something went wrong.');
      });


//PROCESS     
  var myChart = echarts.init(document.getElementById('echart')); 
        
        var option = {
    title : {
        text: '某站点用户访问来源',
        subtext: '纯属虚构',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient : 'vertical',
        x : 'left',
        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {
                show: true, 
                type: ['pie', 'funnel'],
                option: {
                    funnel: {
                        x: '25%',
                        width: '50%',
                        funnelAlign: 'left',
                        max: 1548
                    }
                }
            },
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    series : [
        {
            name:'访问来源',
            type:'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ]
        }
    ]
};
        
                // 为echarts对象加载数据 
                myChart.setOption(option); 

}


// <!-- ************************ standardpie *********************** -->
function standardpiemap(data){
    var myChart = echarts.init(document.getElementById('echart1')); 
    var option4 = {
    title : {
        text: '某站点用户访问来源',
        subtext: '纯属虚构',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient : 'vertical',
        x : 'left',
        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    },
    toolbox: {
        show : false,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {
                show: true, 
                type: ['pie', 'funnel'],
                option: {
                    funnel: {
                        x: '25%',
                        width: '50%',
                        funnelAlign: 'left',
                        max: 1548
                    }
                }
            },
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    series : [
        {
            name:'访问来源',
            type:'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ]
        }
    ]
};

        myChart.setOption(option4);

}
// <!-- ************************ standardpie end *********************** -->





// <!-- ************************ goodbar map *********************** -->
function goodbarmap(data){

var myChart = echarts.init(document.getElementById('summary1')); 
getJSON('http://115.146.93.74:5984/tweet_db/_design/topic/_view/get_time_topic').then(function (data){

                var option111 =  {
    timeline:{
        data:[
            '2002-01-01','2003-01-01','2004-01-01','2005-01-01','2006-01-01',
            '2007-01-01','2008-01-01','2009-01-01','2010-01-01','2011-01-01'
        ],
        label : {
            formatter : function(s) {
                return s.slice(0, 4);
            }
        },
        autoPlay : true,
        playInterval : 1000
    },
    options:[
        {
            title : {
                'text':'2002全国宏观经济关联分析（GDP vs 房地产）',
                'subtext':'数据来自国家统计局'
            },
            tooltip : {
                trigger: 'axis',
                showDelay : 0,
                axisPointer:{
                    show: true,
                    type : 'cross',
                    lineStyle: {
                        type : 'dashed',
                        width : 1
                    }
                }
            },
            toolbox : {
                'show':true, 
                orient : 'vertical',
                x: 'right', 
                y: 'center',
                'feature':{
                    'mark':{'show':true},
                    'dataView':{'show':true,'readOnly':false},
                    'restore':{'show':true},
                    'saveAsImage':{'show':true}
                }
            },
            grid : {'y':80,'y2':100},
            xAxis : [{
                'type':'value',
                'name':'房地产（亿元）',
                'max':3400
            }],
            yAxis : [{
                'type':'value',
                'name':'GDP（亿元）',
                'max':53500
            }],
            series : [
                {
                    'name':'GDP',
                    'type':'scatter',
                    markLine : {
                        data : [
                            {type : 'average', name: 'y平均值', itemStyle:{normal:{borderColor:'red'}}},
                            {type : 'average', name: 'x平均值', valueIndex : 0, itemStyle:{normal:{borderColor:'red'}}}
                        ]
                    },
                    symbolSize : 5,
                    itemStyle: {
                        normal : {
                            label : {
                                show: true,
                                formatter : '{b}'
                            }
                        }
                    },
                    'data': dataMap.dataGDP_Estate['2002']
                }
            ]
        },
        {
            title : {'text':'2003全国宏观经济关联分析（GDP vs 房地产）'},
            series : [
                {'data': dataMap.dataGDP_Estate['2003']}
            ]
        },
        {
            title : {'text':'2004全国宏观经济关联分析（GDP vs 房地产）'},
            series : [
                {'data': dataMap.dataGDP_Estate['2004']}
            ]
        },
        {
            title : {'text':'2005全国宏观经济关联分析（GDP vs 房地产）'},
            series : [
                {'data': dataMap.dataGDP_Estate['2005']}
            ]
        },
        {
            title : {'text':'2006全国宏观经济关联分析（GDP vs 房地产）'},
            series : [
                {'data': dataMap.dataGDP_Estate['2006']}
            ]
        },
        {
            title : {'text':'2007全国宏观经济关联分析（GDP vs 房地产）'},
            series : [
                {'data': dataMap.dataGDP_Estate['2007']}
            ]
        },
        {
            title : {'text':'2008全国宏观经济关联分析（GDP vs 房地产）'},
            series : [
                {'data': dataMap.dataGDP_Estate['2008']}
            ]
        },
        {
            title : {'text':'2009全国宏观经济关联分析（GDP vs 房地产）'},
            series : [
                {'data': dataMap.dataGDP_Estate['2009']}
            ]
        },
        {
            title : {'text':'2010全国宏观经济关联分析（GDP vs 房地产）'},
            series : [
                {'data': dataMap.dataGDP_Estate['2010']}
            ]
        },
        {
            title : {'text':'2011全国宏观经济关联分析（GDP vs 房地产）'},
            series : [
                {'data': dataMap.dataGDP_Estate['2011']}
            ]
        }
    ]
};
        myChart.setOption(option111);},function(status){
            alert('Something wrong');
        });

}

// <!-- ************************ goodbar end *********************** -->


// <!-- ************************ goodbar map *********************** -->
function timelinepietry(data){

var myChart = echarts.init(document.getElementById('timelinepietryp')); 
getJSON('http://115.146.93.74:5984/tweet_db/_design/topic/_view/get_daily_topic?group_level=1').then(function (data){
var idx = 1;
var day = ["",
"",
"",
"",
"",
"",
"",
"",
"",
""];

for (var i=0; i< day.length; i++)
{
  day[i] = data.rows[i].key+ "-May";
}
var count=0;
var count2=0;
var datalist = new Array(10);
for (var i = 0; i < 10; i++) {
  datalist[i] = new Array(5);

}

for (var j=0; j<10; j++)
{
    for (var i=0; i<5; i++)
    {
      var dic={"value":data.rows[j].value[i].counter,"name":data.rows[j].value[i].text};
      // alert(dic.value);
      datalist[j][i]=dic;
      alert("count2");
      alert(count2);
    }
    count++;
    alert(count);
}
alert(datalist[0][0]);
                var option111 =  {
    timeline : {
        data : day,


        // [
        //     "01",
        //     "02", 
        //     "03", 
        //     "04", 
        //     "05",
        //     { name:"06", symbol:'emptyStar6', symbolSize:8 },
        //     "07",
        //     "08",
        //     "09",
        //     "10",
        //     "11",
        //     { name:"12", symbol:'star6', symbolSize:8 }
        // ],
        label : {
            formatter : function(s) {
                return s.slice(0, 7);
            }
        }
    },
    options : [
        {
            title : {
                text: '浏览器占比变化',
                subtext: '纯属虚构'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
  
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {
                        show: true, 
                        type: ['pie', 'funnel'],
                        option: {
                            funnel: {
                                x: '25%',
                                width: '50%',
                                funnelAlign: 'left',
                                max: 1700
                            }
                        }
                    },
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            series : [
                {
                    name:'浏览器（数据纯属虚构）',
                    type:'pie',
                    center: ['50%', '45%'],
                    radius: '50%',
                    data:[
                        {value:data.rows[0].value[0].counter,  name:data.rows[0].value[0].text},
                        {value: idx * 64  + 160,  name:'Firefox'},
                        {value: idx * 32  + 320,  name:'Safari'},
                        {value: idx * 16  + 640,  name:'IE9+'},
                        {value: idx++ * 8  + 1280, name:'IE8-'}
                    ]
                }
            ]
        },
        {
            series : [
                {
                    name:'浏览器（数据纯属虚构）',
                    type:'pie',
                    data:[
                        {value: idx * 128 + 80,  name:'Chrome'},
                        {value: idx * 64  + 160,  name:'Firefox'},
                        {value: idx * 32  + 320,  name:'Safari'},
                        {value: idx * 16  + 640,  name:'IE9+'},
                        {value: idx++ * 8  + 1280, name:'IE8-'}
                    ]
                }
            ]
        },
        {
            series : [
                {
                    name:'浏览器（数据纯属虚构）',
                    type:'pie',
                    data:[
                        {value: idx * 128 + 80,  name:'Chrome'},
                        {value: idx * 64  + 160,  name:'Firefox'},
                        {value: idx * 32  + 320,  name:'Safari'},
                        {value: idx * 16  + 640,  name:'IE9+'},
                        {value: idx++ * 8  + 1280, name:'IE8-'}
                    ]
                }
            ]
        },
        {
            series : [
                {
                    name:'浏览器（数据纯属虚构）',
                    type:'pie',
                    data:[
                        {value: idx * 128 + 80,  name:'Chrome'},
                        {value: idx * 64  + 160,  name:'Firefox'},
                        {value: idx * 32  + 320,  name:'Safari'},
                        {value: idx * 16  + 640,  name:'IE9+'},
                        {value: idx++ * 8  + 1280, name:'IE8-'}
                    ]
                }
            ]
        },
        {
            series : [
                {
                    name:'浏览器（数据纯属虚构）',
                    type:'pie',
                    data:[
                        {value: idx * 128 + 80,  name:'Chrome'},
                        {value: idx * 64  + 160,  name:'Firefox'},
                        {value: idx * 32  + 320,  name:'Safari'},
                        {value: idx * 16  + 640,  name:'IE9+'},
                        {value: idx++ * 8  + 1280, name:'IE8-'}
                    ]
                }
            ]
        },
        {
            series : [
                {
                    name:'浏览器（数据纯属虚构）',
                    type:'pie',
                    data:[
                        {value: idx * 128 + 80,  name:'Chrome'},
                        {value: idx * 64  + 160,  name:'Firefox'},
                        {value: idx * 32  + 320,  name:'Safari'},
                        {value: idx * 16  + 640,  name:'IE9+'},
                        {value: idx++ * 8  + 1280, name:'IE8-'}
                    ]
                }
            ]
        },
        {
            series : [
                {
                    name:'浏览器（数据纯属虚构）',
                    type:'pie',
                    data:[
                        {value: idx * 128 + 80,  name:'Chrome'},
                        {value: idx * 64  + 160,  name:'Firefox'},
                        {value: idx * 32  + 320,  name:'Safari'},
                        {value: idx * 16  + 640,  name:'IE9+'},
                        {value: idx++ * 8  + 1280, name:'IE8-'}
                    ]
                }
            ]
        },
        {
            series : [
                {
                    name:'浏览器（数据纯属虚构）',
                    type:'pie',
                    data:[
                        {value: idx * 128 + 80,  name:'Chrome'},
                        {value: idx * 64  + 160,  name:'Firefox'},
                        {value: idx * 32  + 320,  name:'Safari'},
                        {value: idx * 16  + 640,  name:'IE9+'},
                        {value: idx++ * 8  + 1280, name:'IE8-'}
                    ]
                }
            ]
        },
        {
            series : [
                {
                    name:'浏览器（数据纯属虚构）',
                    type:'pie',
                    data:[
                        {value: idx * 128 + 80,  name:'Chrome'},
                        {value: idx * 64  + 160,  name:'Firefox'},
                        {value: idx * 32  + 320,  name:'Safari'},
                        {value: idx * 16  + 640,  name:'IE9+'},
                        {value: idx++ * 8  + 1280, name:'IE8-'}
                    ]
                }
            ]
        },
        {
            series : [
                {
                    name:'浏览器（数据纯属虚构）',
                    type:'pie',
                    data:[
                        {value: idx * 128 + 80,  name:'Chrome'},
                        {value: idx * 64  + 160,  name:'Firefox'},
                        {value: idx * 32  + 320,  name:'Safari'},
                        {value: idx * 16  + 640,  name:'IE9+'},
                        {value: idx++ * 8  + 1280, name:'IE8-'}
                    ]
                }
            ]
        },
        {
            series : [
                {
                    name:'浏览器（数据纯属虚构）',
                    type:'pie',
                    data:[
                        {value: idx * 128 + 80,  name:'Chrome'},
                        {value: idx * 64  + 160,  name:'Firefox'},
                        {value: idx * 32  + 320,  name:'Safari'},
                        {value: idx * 16  + 640,  name:'IE9+'},
                        {value: idx++ * 8  + 1280, name:'IE8-'}
                    ]
                }
            ]
        },
        {
            series : [
                {
                    name:'浏览器（数据纯属虚构）',
                    type:'pie',
                    data:[
                        {value: idx * 128 + 80,  name:'Chrome'},
                        {value: idx * 64  + 160,  name:'Firefox'},
                        {value: idx * 32  + 320,  name:'Safari'},
                        {value: idx * 16  + 640,  name:'IE9+'},
                        {value: idx++ * 8  + 1280, name:'IE8-'}
                    ]
                }
            ]
        }
    ]
};
        myChart.setOption(option111);},function(status){
            alert('Something wrong');
        });

}

// <!-- ************************ goodbar end *********************** -->
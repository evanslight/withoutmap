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
    standardpiemap(polynum);
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
var num=polynum;
var disnum = polynum+1;
getJSON('http://115.146.93.74:5984/tweet_db/_design/topic/_view/get_district_topic?group_level=1').then(function (data){

//PROCESS     
  var myChart = echarts.init(document.getElementById('echart')); 
        
        var option =  {
    title : {
        text: 'District: ' + disnum
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['Topic Count']
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            data : [data.rows[num].value[0].text,
                    data.rows[num].value[1].text,
                    data.rows[num].value[2].text,
                    data.rows[num].value[3].text,
                    data.rows[num].value[4].text]
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'Topic Count',
            type:'bar',
            data:[
                  data.rows[num].value[0].counter,
                  data.rows[num].value[1].counter,
                  data.rows[num].value[2].counter,
                  data.rows[num].value[3].counter,
                  data.rows[num].value[4].counter],
            markPoint : {
                data : [
                    {type : 'max', name: 'max'},
                    {type : 'min', name: 'min'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name: '平均值'}
                ]
            }
        }
    ]
};     
                // 为echarts对象加载数据 
                myChart.setOption(option); },function(status){
            alert('Something wrong');
        });

}


// <!-- ************************ standardpie *********************** -->
function standardpiemap(polynum){
    var myChart = echarts.init(document.getElementById('echart1')); 
getJSON('http://115.146.93.74:5984/tweet_db/_design/topic/_view/get_district_writer?group_level=1').then(function(data){
    

    var option4 =  {
    title : {
        text: 'Writing hard Writer',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        x : 'center',
        y : 'bottom',
        data:[data.rows[polynum].value[0].screen_name,
              data.rows[polynum].value[1].screen_name,
              data.rows[polynum].value[2].screen_name,
              data.rows[polynum].value[3].screen_name,
              data.rows[polynum].value[4].screen_name]
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: false},
            dataView : {show: true, readOnly: false},
            magicType : {
                show: true, 
                type: ['pie', 'funnel']
            },
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    series : [
        {
            name:'面积模式',
            type:'pie',
            radius : [30, 110],
            center : ['50%', 200],
            roseType : 'area',
            x: '50%',               // for funnel
            max: 40,                // for funnel
            sort : 'ascending',     // for funnel
            data:[
                {value:data.rows[polynum].value[0].counter, name:data.rows[polynum].value[0].screen_name},
                {value:data.rows[polynum].value[1].counter, name:data.rows[polynum].value[1].screen_name},
                {value:data.rows[polynum].value[2].counter, name:data.rows[polynum].value[2].screen_name},
                {value:data.rows[polynum].value[3].counter, name:data.rows[polynum].value[3].screen_name},
                {value:data.rows[polynum].value[4].counter, name:data.rows[polynum].value[4].screen_name}
            ]
        }
    ]
};

        myChart.setOption(option4); },function(status){
            alert('Something wrong');
        });

}
// <!-- ************************ standardpie end *********************** -->



// <!-- ************************ goodbar map *********************** -->
function timelinepietry(data){

var myChart = echarts.init(document.getElementById('timelinepietryp')); 
getJSON('http://115.146.93.74:5984/tweet_db/_design/topic/_view/get_daily_topic?group_level=1').then(function (data){
var idx = 1;
var count = 0;
var day = ["","","","","","","","","",""];


var name = new Array(10);
for (var i = 0; i < 10; i++) {
  name[i] = new Array(5);

}

var amount = new Array(10);
for (var i = 0; i < 10; i++) {
  amount[i] = new Array(5);

}



for (var i = data.rows.length-1;i>=0;i--)
{
   if (count == 10) {break;}
   day[count] = data.rows[i].key;

      for(var j = 0;j<5;j++)
   {   
     name[count][j] = data.rows[i].value[j].text;
 
     amount[count][j] = data.rows[i].value[j].counter;
   }
   count = count +1;
}

for (var i=0; i< day.length; i++)
{
  day[i] = day[i]+ "-May";
}

day.reverse();
                var option111 =  {
    timeline : {
        data : day,
        label : {
            formatter : function(s) {
                return s.slice(0, 7);
            }
        }
    },
    options : [
        {
            title : {
                text: 'Top 5 topics'
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
                    name:'Top5 Topics',
                    type:'pie',
                    center: ['50%', '45%'],
                    radius: '50%',
                    data:[
                        {value:amount[9][0] ,name:name[9][0]},
                        {value:amount[9][1] ,name:name[9][1]},
                        {value:amount[9][2] ,name:name[9][2]},
                        {value:amount[9][3] ,name:name[9][3]},
                        {value:amount[9][4] ,name:name[9][4]}
                  ]
                }
            ]
        },
        {
            series : [
                {
                    name:'Top5 Topics',
                    type:'pie',
                    data:[
                        {value:amount[8][0],name:name[8][0]},
                        {value:amount[8][1],name:name[8][1]},
                        {value:amount[8][2],name:name[8][2]},
                        {value:amount[8][3],name:name[8][3]},
                        {value:amount[8][4],name:name[8][4]}
                    ]
                }
            ]
        },
        {
            series : [
                {
                    name:'Top5 Topics',
                    type:'pie',
                    data:[
                        {value:amount[7][0],name:name[7][0]},
                        {value:amount[7][1],name:name[7][1]},
                        {value:amount[7][2],name:name[7][2]},
                        {value:amount[7][3],name:name[7][3]},
                        {value:amount[7][4],name:name[7][4]}
                    ]
                }
            ]
        },
        {
            series : [
                {
                    name:'Top5 Topics',
                    type:'pie',
                    data:[
                        {value:amount[6][0],name:name[6][0]},
                        {value:amount[6][1],name:name[6][1]},
                        {value:amount[6][2],name:name[6][2]},
                        {value:amount[6][3],name:name[6][3]},
                        {value:amount[6][4],name:name[6][4]}
                    ]
                }
            ]
        },
        {
            series : [
                {
                    name:'Top5 Topics',
                    type:'pie',
                    data:[
                        {value:amount[5][0],name:name[5][0]},
                        {value:amount[5][1],name:name[5][1]},
                        {value:amount[5][2],name:name[5][2]},
                        {value:amount[5][3],name:name[5][3]},
                        {value:amount[5][4],name:name[5][4]}
                    ]
                }
            ]
        },
        {
            series : [
                {
                    name:'Top5 Topics',
                    type:'pie',
                    data:[
                        {value:amount[4][0],name:name[4][0]},
                        {value:amount[4][1],name:name[4][1]},
                        {value:amount[4][2],name:name[4][2]},
                        {value:amount[4][3],name:name[4][3]},
                        {value:amount[4][4],name:name[4][4]}
                    ]
                }
            ]
        },
        {
            series : [
                {
                    name:'Top5 Topics',
                    type:'pie',
                    data:[
                        {value:amount[3][0],name:name[3][0]},
                        {value:amount[3][1],name:name[3][1]},
                        {value:amount[3][2],name:name[3][2]},
                        {value:amount[3][3],name:name[3][3]},
                        {value:amount[3][4],name:name[3][4]}
                    ]
                }
            ]
        },
        {
            series : [
                {
                    name:'Top5 Topics',
                    type:'pie',
                    data:[
                        {value:amount[2][0],name:name[2][0]},
                        {value:amount[2][1],name:name[2][1]},
                        {value:amount[2][2],name:name[2][2]},
                        {value:amount[2][3],name:name[2][3]},
                        {value:amount[2][4],name:name[2][4]}
                    ]
                }
            ]
        },
        {
            series : [
                {
                    name:'Top5 Topics',
                    type:'pie',
                    data:[
                        {value:amount[1][0],name:name[1][0]},
                        {value:amount[1][1],name:name[1][1]},
                        {value:amount[1][2],name:name[1][2]},
                        {value:amount[1][3],name:name[1][3]},
                        {value:amount[1][4],name:name[1][4]}
                    ]
                }
            ]
        },
        {
            series : [
                {
                    name:'Top5 Topics',
                    type:'pie',
                    data:[
                        {value:amount[0][0],name:name[0][0]},
                        {value:amount[0][1],name:name[0][1]},
                        {value:amount[0][2],name:name[0][2]},
                        {value:amount[0][3],name:name[0][3]},
                        {value:amount[0][4],name:name[0][4]}
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
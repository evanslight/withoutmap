// <!-- ************************ goodbar map *********************** -->
function usagepie(data){

var myChart = echarts.init(document.getElementById('usagepiep')); 
getJSON('http://115.146.93.74:5984/tweet_db/_design/TweetsActivity/_view/liveness?group_level=1').then(function (data){
    var amount = [0,0,0,0,0,0,0,0,0,0];
    for(var i=0;i<amount.length;i++)
    {
          if(data.rows[i].key=="2006"){amount[0]=data.rows[i].value;}
          if(data.rows[i].key=="2007"){amount[1]=data.rows[i].value;}
          if(data.rows[i].key=="2008"){amount[2]=data.rows[i].value;}
          if(data.rows[i].key=="2009"){amount[3]=data.rows[i].value;}
          if(data.rows[i].key=="2010"){amount[4]=data.rows[i].value;}
          if(data.rows[i].key=="2011"){amount[5]=data.rows[i].value;}
          if(data.rows[i].key=="2012"){amount[6]=data.rows[i].value;}
          if(data.rows[i].key=="2013"){amount[7]=data.rows[i].value;}
          if(data.rows[i].key=="2014"){amount[8]=data.rows[i].value;}
          if(data.rows[i].key=="2015"){amount[9]=data.rows[i].value;}
    }


    var usagepied =       {
    title : {
        text: 'The Liveness of Twitters',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        x : 'center',
        y : 'bottom',
        data:['2006','2007','2008','2009','2010','2011','2012','2013','2014','2015']
    },
    calculable : true,
    series : [
        {
            name:'Amount',
            type:'pie',
            radius : [30, 110],
            center : ['50%', 200],
            roseType : 'area',
            x: '50%',               // for funnel
            max: 40,                // for funnel
            sort : 'ascending',     // for funnel
            data:[
                {value:amount[0], name:'2006'},
                {value:amount[1], name:'2007'},
                {value:amount[2], name:'2008'},
                {value:amount[3], name:'2009'},
                {value:amount[4], name:'2010'},
                {value:amount[5], name:'2011'},
                {value:amount[6], name:'2012'},
                {value:amount[7], name:'2013'},
                {value:amount[8], name:'2014'},
                {value:amount[9], name:'2015'}]
        }
                    
    ]
};      
        myChart.setOption(usagepied);
                }, function(status) { //error detection....
        alert('Something went wrong.');
      });

}

// <!-- ************************ goodbar end *********************** -->



// <!-- ************************ goodbar map *********************** -->
function usagebar(data){

var myChart = echarts.init(document.getElementById('usagebarp')); 
getJSON('http://115.146.93.74:5984/tweet_db/_design/film%20Topic/_view/avenger_view?group_level=1').then(function (data){


    var usagebard =       {
    title: {
        x: 'center',
        text: 'ECharts例子个数统计',
        subtext: 'Rainbow bar example',
        link: 'http://echarts.baidu.com/doc/example.html'
    },
    tooltip: {
        trigger: 'item'
    },
    toolbox: {
        show: true,
        feature: {
            dataView: {show: true, readOnly: false},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    calculable: true,
    grid: {
        borderWidth: 0,
        y: 80,
        y2: 60
    },
    xAxis: [
        {
            type: 'category',
            show: false,
            data: ['Line', 'Bar', 'Scatter', 'K', 'Pie']
        }
    ],
    yAxis: [
        {
            type: 'value',
            show: false
        }
    ],
    series: [
        {
            name: 'ECharts例子个数统计',
            type: 'bar',
            itemStyle: {
                normal: {
                    color: function(params) {
                        // build a color map as your need.
                        var colorList = [
                          '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                           '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                           '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                        ];
                        return colorList[params.dataIndex]
                    },
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{b}\n{c}'
                    }
                }
            },
            data: [12,21,10,4,12],
            markPoint: {
                tooltip: {
                    trigger: 'item',
                    backgroundColor: 'rgba(0,0,0,0)',
                    formatter: function(params){
                        return '<img src="' 
                                + params.data.symbol.replace('image://', '')
                                + '"/>';
                    }
                },
                data: [
                    {xAxis:0, y: 350, name:'Line', symbolSize:20, symbol: 'image://./static/images/video-icon.png'},
                    {xAxis:1, y: 350, name:'Bar', symbolSize:20, symbol: 'image://./static/images/zoom.png'},
                    {xAxis:2, y: 350, name:'Scatter', symbolSize:20, symbol: 'image://./static/images/gravatar.png'},
                    {xAxis:3, y: 350, name:'K', symbolSize:20, symbol: 'image://./static/images/beachflag.png'},
                    {xAxis:4, y: 350, name:'Pie', symbolSize:20, symbol: 'image://./static/images/bg-nav.png'},
                ]
            }
        }
    ]
};
                    
                    
                  
        myChart.setOption(usagebard);
                }, function(status) { //error detection....
        alert('Something went wrong.');
      });

}

// <!-- ************************ goodbar end *********************** -->



// <!-- ************************ goodbar map *********************** -->
function usageline(data){

var myChart = echarts.init(document.getElementById('usagelinep')); 
getJSON('http://115.146.93.74:5984/tweet_db/_design/TweetsActivity/_view/get_hourly_date_senti?group_level=1').then(function (data){

    var date = new Date();
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day - 02;
    
    var happy = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var nature = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var unhappy = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var amount = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    for(var i =0;i<happy.length;i++)
    {
         if(data.rows[i].key=='00'){happy[i]=data.rows[i].value.op;}        
         if(data.rows[i].key=='01'){happy[i]=data.rows[i].value.op;}
         if(data.rows[i].key=='02'){happy[i]=data.rows[i].value.op;}
         if(data.rows[i].key=='03'){happy[i]=data.rows[i].value.op;}
         if(data.rows[i].key=='04'){happy[i]=data.rows[i].value.op;}
         if(data.rows[i].key=='05'){happy[i]=data.rows[i].value.op;}
         if(data.rows[i].key=='06'){happy[i]=data.rows[i].value.op;}
         if(data.rows[i].key=='07'){happy[i]=data.rows[i].value.op;}
         if(data.rows[i].key=='08'){happy[i]=data.rows[i].value.op;}
         if(data.rows[i].key=='09'){happy[i]=data.rows[i].value.op;}
         if(data.rows[i].key=='10'){happy[i]=data.rows[i].value.op;}
         if(data.rows[i].key=='11'){happy[i]=data.rows[i].value.op;}
         if(data.rows[i].key=='12'){happy[i]=data.rows[i].value.op;}
         if(data.rows[i].key=='13'){happy[i]=data.rows[i].value.op;}
         if(data.rows[i].key=='14'){happy[i]=data.rows[i].value.op;}
         if(data.rows[i].key=='15'){happy[i]=data.rows[i].value.op;}
         if(data.rows[i].key=='16'){happy[i]=data.rows[i].value.op;}
         if(data.rows[i].key=='17'){happy[i]=data.rows[i].value.op;}
         if(data.rows[i].key=='18'){happy[i]=data.rows[i].value.op;}
         if(data.rows[i].key=='19'){happy[i]=data.rows[i].value.op;}
         if(data.rows[i].key=='20'){happy[i]=data.rows[i].value.op;}
         if(data.rows[i].key=='21'){happy[i]=data.rows[i].value.op;}
         if(data.rows[i].key=='22'){happy[i]=data.rows[i].value.op;}
         if(data.rows[i].key=='23'){happy[i]=data.rows[i].value.op;}
    }

    for(var i =0;i<nature.length;i++)
    {
         if(data.rows[i].key=='00'){nature[i]=data.rows[i].value.nu;}
         if(data.rows[i].key=='01'){nature[i]=data.rows[i].value.nu;}
         if(data.rows[i].key=='02'){nature[i]=data.rows[i].value.nu;}
         if(data.rows[i].key=='03'){nature[i]=data.rows[i].value.nu;}
         if(data.rows[i].key=='04'){nature[i]=data.rows[i].value.nu;}
         if(data.rows[i].key=='05'){nature[i]=data.rows[i].value.nu;}
         if(data.rows[i].key=='06'){nature[i]=data.rows[i].value.nu;}
         if(data.rows[i].key=='07'){nature[i]=data.rows[i].value.nu;}
         if(data.rows[i].key=='08'){nature[i]=data.rows[i].value.nu;}
         if(data.rows[i].key=='09'){nature[i]=data.rows[i].value.nu;}
         if(data.rows[i].key=='10'){nature[i]=data.rows[i].value.nu;}
         if(data.rows[i].key=='11'){nature[i]=data.rows[i].value.nu;}
         if(data.rows[i].key=='12'){nature[i]=data.rows[i].value.nu;}
         if(data.rows[i].key=='13'){nature[i]=data.rows[i].value.nu;}
         if(data.rows[i].key=='14'){nature[i]=data.rows[i].value.nu;}
         if(data.rows[i].key=='15'){nature[i]=data.rows[i].value.nu;}
         if(data.rows[i].key=='16'){nature[i]=data.rows[i].value.nu;}
         if(data.rows[i].key=='17'){nature[i]=data.rows[i].value.nu;}
         if(data.rows[i].key=='18'){nature[i]=data.rows[i].value.nu;}
         if(data.rows[i].key=='19'){nature[i]=data.rows[i].value.nu;}
         if(data.rows[i].key=='20'){nature[i]=data.rows[i].value.nu;}
         if(data.rows[i].key=='21'){nature[i]=data.rows[i].value.nu;}
         if(data.rows[i].key=='22'){nature[i]=data.rows[i].value.nu;}
         if(data.rows[i].key=='23'){nature[i]=data.rows[i].value.nu;}

    }

    for(var i =0;i<unhappy.length;i++)
    {
         if(data.rows[i].key=='00'){unhappy[i]=data.rows[i].value.ne;}
         if(data.rows[i].key=='01'){unhappy[i]=data.rows[i].value.ne;}
         if(data.rows[i].key=='02'){unhappy[i]=data.rows[i].value.ne;}
         if(data.rows[i].key=='03'){unhappy[i]=data.rows[i].value.ne;}
         if(data.rows[i].key=='04'){unhappy[i]=data.rows[i].value.ne;}
         if(data.rows[i].key=='05'){unhappy[i]=data.rows[i].value.ne;}
         if(data.rows[i].key=='06'){unhappy[i]=data.rows[i].value.ne;}
         if(data.rows[i].key=='07'){unhappy[i]=data.rows[i].value.ne;}
         if(data.rows[i].key=='08'){unhappy[i]=data.rows[i].value.ne;}
         if(data.rows[i].key=='09'){unhappy[i]=data.rows[i].value.ne;}
         if(data.rows[i].key=='10'){unhappy[i]=data.rows[i].value.ne;}
         if(data.rows[i].key=='11'){unhappy[i]=data.rows[i].value.ne;}
         if(data.rows[i].key=='12'){unhappy[i]=data.rows[i].value.ne;}
         if(data.rows[i].key=='13'){unhappy[i]=data.rows[i].value.ne;}
         if(data.rows[i].key=='14'){unhappy[i]=data.rows[i].value.ne;}
         if(data.rows[i].key=='15'){unhappy[i]=data.rows[i].value.ne;}
         if(data.rows[i].key=='16'){unhappy[i]=data.rows[i].value.ne;}
         if(data.rows[i].key=='17'){unhappy[i]=data.rows[i].value.ne;}
         if(data.rows[i].key=='18'){unhappy[i]=data.rows[i].value.ne;}
         if(data.rows[i].key=='19'){unhappy[i]=data.rows[i].value.ne;}
         if(data.rows[i].key=='20'){unhappy[i]=data.rows[i].value.ne;}
         if(data.rows[i].key=='21'){unhappy[i]=data.rows[i].value.ne;}
         if(data.rows[i].key=='22'){unhappy[i]=data.rows[i].value.ne;}
         if(data.rows[i].key=='23'){unhappy[i]=data.rows[i].value.ne;}

    }

    for (var i =0;i<amount.length;i++)
    {
        amount[i] = parseInt((happy[i]+nature[i]+unhappy[i])/day);
    }

    var usage4 =         {
    tooltip : {
        trigger: 'axis'
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    legend: {
        data:['Happy','Unhappy','Average amount']
    },
    xAxis : [
        {
            type : 'category',
            data : ['00','01','02','03','04','05','06','07','08','09','10','11',
                    '12','13','14','15','16','17','18','19','20','21','22','23']
        }
    ],
    yAxis : [
        {
            type : 'value',
            name : 'Happy',
            axisLabel : {
                formatter: '{value} p'
            }
        },
        {
            type : 'value',
            name : 'Unhappy',
            axisLabel : {
                formatter: '{value} p'
            }
        }
    ],
    series : [

        {
            name:'Happy',
            type:'bar',
            data:happy
        },
        {
            name:'Unhappy',
            type:'bar',
            data:unhappy
        },
        {
            name:'Average amount',
            type:'line',
            yAxisIndex: 1,
            data:amount
        }
    ]
};
   
        myChart.setOption(usage4);
                }, function(status) { //error detection....
        alert('Something went wrong.');
      });

}

// <!-- ************************ goodbar end *********************** -->




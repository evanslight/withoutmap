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


    var usagepied = {
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
getJSON('http://115.146.93.74:5984/tweet_db/_design/film%20Topic/_view/avenger_view?group_level=1').then(function (data){


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
        data:['蒸发量','降水量','平均温度']
    },
    xAxis : [
        {
            type : 'category',
            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
        }
    ],
    yAxis : [
        {
            type : 'value',
            name : '水量',
            axisLabel : {
                formatter: '{value} ml'
            }
        },
        {
            type : 'value',
            name : '温度',
            axisLabel : {
                formatter: '{value} °C'
            }
        }
    ],
    series : [

        {
            name:'蒸发量',
            type:'bar',
            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },
        {
            name:'降水量',
            type:'bar',
            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        },
        {
            name:'平均温度',
            type:'line',
            yAxisIndex: 1,
            data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        }
    ]
};
   
        myChart.setOption(usage4);
                }, function(status) { //error detection....
        alert('Something went wrong.');
      });

}

// <!-- ************************ goodbar end *********************** -->




// <!-- ************************ goodbar map *********************** -->
function usagelist(data){

var myChart = echarts.init(document.getElementById('usagelistp')); 
getJSON('http://115.146.93.74:5984/tweet_db/_design/film%20Topic/_view/avenger_view?group_level=1').then(function (data){


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
        data:['蒸发量','降水量','平均温度']
    },
    xAxis : [
        {
            type : 'category',
            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
        }
    ],
    yAxis : [
        {
            type : 'value',
            name : '水量',
            axisLabel : {
                formatter: '{value} ml'
            }
        },
        {
            type : 'value',
            name : '温度',
            axisLabel : {
                formatter: '{value} °C'
            }
        }
    ],
    series : [

        {
            name:'蒸发量',
            type:'bar',
            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },
        {
            name:'降水量',
            type:'bar',
            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        },
        {
            name:'平均温度',
            type:'line',
            yAxisIndex: 1,
            data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        }
    ]
};
   
        myChart.setOption(usage4);
                }, function(status) { //error detection....
        alert('Something went wrong.');
      });

}

// <!-- ************************ goodbar end *********************** -->


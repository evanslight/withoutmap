// <!-- ************************ goodbar map *********************** -->
function usagepie(data){

var myChart = echarts.init(document.getElementById('usagepiep')); 
getJSON('http://115.146.93.74:5984/tweet_db/_design/film%20Topic/_view/avenger_view?group_level=1').then(function (data){


    var usagepied =       {
    title : {
        text: '南丁格尔玫瑰图',
        subtext: '纯属虚构',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        x : 'center',
        y : 'bottom',
        data:['rose1','rose2','rose3','rose4','rose5','rose6','rose7','rose8']
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
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
                {value:10, name:'rose1'},
                {value:5, name:'rose2'},
                {value:15, name:'rose3'},
                {value:25, name:'rose4'},
                {value:20, name:'rose5'},
                {value:35, name:'rose6'},
                {value:30, name:'rose7'},
                {value:40, name:'rose8'}
            ]
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


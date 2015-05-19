// <!-- ************************ goodbar map *********************** -->
function film(data){

var myChart = echarts.init(document.getElementById('filmstartl')); 
getJSON('http://115.146.93.74:5984/tweet_db/_design/film%20Topic/_view/film_vote?group_level=1').then(function (data){

var numberOfWatch = [0,0,0,0,0,0];
for(var i = 0;i<6;i++){
    if(i == data.rows.length) { break;}
    if(data.rows[i].key == 'madmax') {numberOfWatch[0] = data.rows[i].value;}
    if(data.rows[i].key == 'pitch') {numberOfWatch[1] = data.rows[i].value;}
    if(data.rows[i].key == 'hotpursuit') {numberOfWatch[2] = data.rows[i].value;}
    if(data.rows[i].key == 'avengers2') {numberOfWatch[3] = data.rows[i].value;}
    if(data.rows[i].key == 'adaline') {numberOfWatch[4] = data.rows[i].value;}
    if(data.rows[i].key == 'furious7') {numberOfWatch[5] = data.rows[i].value;}
}

                var piefilm =     {
    title : {
        text: 'The Percentage of Films Watched',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        x : 'center',
        y : 'bottom',
        data:['Mad Max','Pitch Perfect2','Hot Pursuit','Avengers:Age of Ultron','The age of Adaline','Furious 7']
    },

    calculable : true,
    series : [
        {
            name:'',
            type:'pie',
            radius : [30, 110],
            center : ['50%', 200],
            roseType : 'area',
            x: '50%',               // for funnel
            max: 40,                // for funnel
            sort : 'ascending',     // for funnel
            data:[
                {value:numberOfWatch[0], name:'Mad Max'},
                {value:numberOfWatch[1], name:'Pitch Perfect2'},
                {value:numberOfWatch[2], name:'Hot Pursuit'},
                {value:numberOfWatch[3], name:'Avengers:Age of Ultron'},
                {value:numberOfWatch[4], name:'The age of Adaline'},
                {value:numberOfWatch[5], name:'Furious 7'}
                ]
        }
    ]
};
                    
                  
        myChart.setOption(piefilm);
                }, function(status) { //error detection....
        alert('Something went wrong.');
      });

}

// <!-- ************************ goodbar end *********************** -->


// <!-- ************************ goodbar map *********************** -->
function filmpie(data){

var myChart = echarts.init(document.getElementById('filmpiep')); 
getJSON('http://115.146.93.74:5984/tweet_db/_design/film%20Topic/_view/avenger_view?group_level=1').then(function (data){

var dataStyle = {
    normal: {
        label: {show:false},
        labelLine: {show:false}
    }
};
var placeHolderStyle = {
    normal : {
        color: 'rgba(0,0,0,0)',
        label: {show:false},
        labelLine: {show:false}
    },
    emphasis : {
        color: 'rgba(0,0,0,0)'
    }
};

    var piefilm =      {
    title: {
        text: '你幸福吗？',
        subtext: 'From ExcelHome',
        sublink: 'http://e.weibo.com/1341556070/AhQXtjbqh',
        x: 'center',
        y: 'center',
        itemGap: 20,
        textStyle : {
            color : 'rgba(30,144,255,0.8)',
            fontFamily : '微软雅黑',
            fontSize : 35,
            fontWeight : 'bolder'
        }
    },
    tooltip : {
        show: true,
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient : 'vertical',
        x : document.getElementById('main2').offsetWidth / 2,
        y : 45,
        itemGap:12,
        data:['68%的人表示过的不错','29%的人表示生活压力很大','3%的人表示“我姓曾”']
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    series : [
        {
            name:'1',
            type:'pie',
            clockWise:false,
            radius : [125, 150],
            itemStyle : dataStyle,
            data:[
                {
                    value:68,
                    name:'68%的人表示过的不错'
                },
                {
                    value:32,
                    name:'invisible',
                    itemStyle : placeHolderStyle
                }
            ]
        },
        {
            name:'2',
            type:'pie',
            clockWise:false,
            radius : [100, 125],
            itemStyle : dataStyle,
            data:[
                {
                    value:29, 
                    name:'29%的人表示生活压力很大'
                },
                {
                    value:71,
                    name:'invisible',
                    itemStyle : placeHolderStyle
                }
            ]
        },
        {
            name:'3',
            type:'pie',
            clockWise:false,
            radius : [75, 100],
            itemStyle : dataStyle,
            data:[
                {
                    value:3, 
                    name:'3%的人表示“我姓曾”'
                },
                {
                    value:97,
                    name:'invisible',
                    itemStyle : placeHolderStyle
                }
            ]
        }
    ]
};
                    
                  
        myChart.setOption(piefilm);
                }, function(status) { //error detection....
        alert('Something went wrong.');
      });

}

// <!-- ************************ goodbar end *********************** -->




// <!-- ************************ goodbar map *********************** -->
function filmbar(data){

var myChart = echarts.init(document.getElementById('filmbarp')); 
getJSON('http://115.146.93.74:5984/tweet_db/_design/film%20Topic/_view/hero_vote?group_level=1').then(function (data){



    var filmbard =      {
    title : {
        text: '世界人口总量',
        subtext: '数据来自网络'
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['2011年', '2012年']
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
    xAxis : [
        {
            type : 'value',
            boundaryGap : [0, 0.01]
        }
    ],
    yAxis : [
        {
            type : 'category',
            data : ['巴西','印尼','美国','印度','中国','世界人口(万)']
        }
    ],
    series : [
        {
            name:'2011年',
            type:'bar',
            data:[18203, 23489, 29034, 104970, 131744, 630230]
        },
        {
            name:'2012年',
            type:'bar',
            data:[19325, 23438, 31000, 121594, 134141, 681807]
        }
    ]
};
                    
                    
                  
        myChart.setOption(filmbard);
                }, function(status) { //error detection....
        alert('Something went wrong.');
      });

}

// <!-- ************************ goodbar end *********************** -->
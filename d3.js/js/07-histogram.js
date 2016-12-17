window.onload = function(){
    function defineData(){
        window.base = {};
        base.data = [1,3,5,7,9,
                    11,12,13,14,15,16,17,18,19,20,
                    21,22,23,24,25,26,27,28,29,30,
                    31,32,33,34,35,36,37,38,39,40,
                    31,32,33,34,35,
                    41,42,43,44,45,46,47,48,49,50
                ];
    };
    function createSVG(){
        return d3.select(document.body)
                .append('svg')
    }

    function setBaseValue(object){
        base.maxAmount = 1000;
        base.trbl = {top:20, right:20, bottom:30, left:50};
        base.svgWidth = parseInt(object.style('width'));
        base.graphWidth = base.svgWidth - base.trbl.left - base.trbl.right;
        base.svgHeight = parseInt(object.style('height'));
        base.graphHeight = base.svgHeight - base.trbl.top - base.trbl.bottom;
    }

    function drawHistogram(object){
        base.color = d3.scale.category10();
        var histogram = d3.layout.histogram()
        // 0에서 50을 지정하면 20이 11~20에 속하지 않고
        // 20~29에 속하게 되어 막대 크기가 달라진다.
        .range([1,50])
        // 계급(구간)갯수
        .bins(5);

        // 히스토그램 레아아웃을 반영한 max값을 구한다.
        var max = d3.max(histogram(base.data),function(data, index){
            return data.y;
        })
        base.yScale = d3.scale.linear()
            .domain([0,max])
            .range([base.graphHeight, 0]);
        base.xScale = d3.scale.linear()
            .domain([0,50])
            .range([0, base.graphWidth]);

        var obj = object.append('g').selectAll('rect').data(histogram(base.data)).enter();

        obj.append('rect').attr({
            x:function(data, index){
                return base.xScale(data.dx) * index + base.trbl.left;
            },
            y:function(data, index){
                return base.yScale(data.y) + base.trbl.top;
            },
            width:function(data, index){
                // -2는 간격을 띄우기 이후새더ㅏ
                return base.xScale(data.dx) - 2;
            },
            height:function(data, index){
                return base.graphHeight - base.yScale(data.y);
            },
        }).style('fill', function(data, index){
            return base.color(index);
        });
    }

    function drawYAxis(object){
        base.yAxis = d3.svg.axis().scale(base.yScale).orient('left');
        //y축표시
        object.append('g')
            .attr('transform',`translate(${base.trbl.left},${base.trbl.top})`)
            .append('g').attr('class','axis').call(base.yAxis);
    }

    function drawXAxis(object){
        base.xAxis = d3.svg.axis().scale(base.yScale).orient('bottom')
            .scale(base.xScale)
            .orient('bottom')

        object.append('g')
            .attr('transform',`translate(${base.trbl.left},${base.svgHeight - base.trbl.bottom})`)
            .attr('class','axis')
            .call(base.xAxis);
    }

    defineData();
    var object = createSVG();
    setBaseValue(object);
    drawHistogram(object);
    drawYAxis(object);
    drawXAxis(object);
}

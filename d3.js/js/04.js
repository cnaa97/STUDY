window.onload = function(){

    function defineData(){
        window.base = {};
        base.data = [
            {mon:1, amt:450},
            {mon:2, amt:850},
            {mon:3, amt:350},
            {mon:4, amt:650},
            {mon:5, amt:250},
            {mon:6, amt:550},
            {mon:7, amt:190},
            {mon:8, amt:250},
            {mon:9, amt:350},
            {mon:10, amt:450},
            {mon:11, amt:550},
            {mon:12, amt:850},
        ]
    };

    function createSVG(){
        return d3.select(document.body)
                .append('svg')
                .attr('id','idSvgGraph')
    }

    function setBaseValue(object){
        base.maxAmount = 1000;
        base.trbl = {top:20, right:20, bottom:30, left:50};
        base.svgWidth = parseInt(object.style('width'));
        base.graphWidth = base.svgWidth - base.trbl.left - base.trbl.right;
        base.svgHeight = parseInt(object.style('height'));
        base.graphHeight = base.svgHeight - base.trbl.top - base.trbl.bottom;
    }

    function drawYAxis(object){
        base.yScale = d3.scale.linear()
            .domain([0, base.maxAmount])
            .range([base.graphHeight, 0]);
        base.yAxis = d3.svg.axis()
            .scale(base.yScale)
            .orient('left');
        object.append('g')
            .attr('transform',`translate(${base.trbl.left},${base.trbl.top})`)
            .append('g').attr('class','axis').call(base.yAxis);
    }

    function drawXAxis(object){
        base.xScale = d3.scale.linear()
            .domain([01, 12])
            .range([0, base.graphWidth]);
        base.xAxis = d3.svg.axis()
            .scale(base.xScale)
            .orient('bottom')
            ////////// 2개월 단위로 표시하기
            .ticks(6)
            ////////// 포맷 바꿀 수 있음
            .tickFormat(function(mon){
                return mon + '월';
            })
        object.append('g')
            .attr('transform',`translate(${base.trbl.left},${base.svgHeight - base.trbl.bottom})`)
            .attr('class','axis')
            .call(base.xAxis);
    }

    function drawLine(object){
        // path 변환을 위한 line 생성자 생성
        var obj = d3.svg.line()
            .x(function(data, index){
                return base.xScale(data.mon);
            })
            .y((data, indx)=>{
                return base.yScale(data.amt);
            })
            ///////////// 계단으로 바꿀 수 있음
            .interpolate('step');
            ///////////// Area 그래프 (아랫부분 채우기)
        object.append('g')
            .attr({
                'class':'line',
                'transform':`translate(${base.trbl.left},${base.trbl.top})`
            })
            // <path> 첨부
            .append('path')
            .attr('d',obj(base.data));
            // enter로 하지 않고 d속성에 데이터만 넣어줌
    }

    ////////////// Area 로 그래프 그리기
    function drawArea(object){
        var area = d3.svg.area()
            .x((data,index)=>{
                return base.xScale(data.mon);
            })
            .y0(base.graphHeight)
            .y1((data, index)=>{
                return base.yScale(data.amt);
            });

        object.append('g')
            .attr({
                'class':'area',
                'transform':`translate(${base.trbl.left},${base.trbl.top})`
            })
            .append('path')
            .attr('d',area(base.data));
    }





    defineData();
    var object = createSVG();
    setBaseValue(object);
    drawYAxis(object);
    drawXAxis(object);
    drawLine(object);
    //drawArea(object);

}

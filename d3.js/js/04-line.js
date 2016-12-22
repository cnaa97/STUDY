window.onload = function(){

/*
    함수별로 화면에 들어갈 요소를 나누어서 설명
*/

    // 데이터 정의
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


    //// y축에 선,눈금자,금액을 표시한다
    function drawYAxis(object){

        //// 구간(최소,최대) 값을 일정하게 분할
        base.yScale = d3.scale.linear()
            // [0,1000]은 데이터 범위
            .domain([0, base.maxAmount])
            .range([base.graphHeight, 0]);
            // [base.graphHeight, 0] 출력할 좌표 범위
            // 그래프를 좌상단 꼭지점에서 우하단으로 그리므로
            // graphHeight에 큰 값을 작성해야 1000, 900 ... 순서로 표시한다

        //// y축을 표시하기 위한 기준 설정
        base.yAxis = d3.svg.axis()
            .scale(base.yScale)
            .orient('left');
            // y축을 왼쪽에 표시한다

        //// y축 표시
        object.append('g')
            // 그래프의 꼭지점 설정
            .attr('transform',`translate(${base.trbl.left},${base.trbl.top})`)
            .append('g')
            .attr('class','axis')
            .call(base.yAxis);
    }


    function drawXAxis(object){
        base.xScale = d3.scale.linear()
            .domain([01, 12])
            .range([0, base.graphWidth]);
        base.xAxis = d3.svg.axis()
            .scale(base.xScale)
            .orient('bottom')
            ////// 눈금 간격 수
            // 2개월 단위로 눈금자를 표시하기 위해 6으로 지정한다
            .ticks(6)
            // 포맷 바꿀 수 있음
            // `12`를 `12월`로 표시한다
            .tickFormat(function(mon){
                return mon + '월';
            })
        object.append('g')
            .attr('transform',`translate(${base.trbl.left},${base.svgHeight - base.trbl.bottom})`)
            .attr('class','axis')
            .call(base.xAxis);
    }


    var methods = [ //interpolation methods
        'linear',
        'step-before',
        'step-after',
        'basis',
        'basis-open',
        'basis-closed',
        'bundle',
        'cardinal',
        'cardinal-open',
        'cardinal-closed',
        'monotone'
        ];

    function drawLine(object){
        // path 변환을 위한 line 생성자 생성
        var obj = d3.svg.line()
            // x축 좌표 값 반환
            .x(function(data, index){
                return base.xScale(data.mon);
            })
            .y((data, indx)=>{
                return base.yScale(data.amt);
            })
            //// 계단 그래프로 바꾸기
            //.interpolate('step');
            //// 부드러운 그래프로 바꾸기
            //.interpolate('basis');
            .interpolate(methods[9]);

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

    //// Area 그래프
    // 그래프 영역이 채워진 형태로 표시하기 (아랫부분 채우기)
    // fill 속성에 채워질 영역의 색 지정
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

    /*************************************************/

    defineData();
    var object = createSVG();
    setBaseValue(object);
    drawYAxis(object);
    drawXAxis(object);
    //// Line
    drawLine(object);
    //// Area
    //drawArea(object);

}

window.onload = function(){

/** 그래프 그리기 */

    // 데이터 정의하는 함수 설정
    function defineData(){
        window.base = {};
        base.data = [
            {mon:1, amt:950},
            {mon:2, amt:550},
            {mon:3, amt:450},
            {mon:4, amt:350},
            {mon:5, amt:250},
            {mon:6, amt:150},
            {mon:7, amt:190},
            {mon:8, amt:250},
            {mon:9, amt:350},
            {mon:10, amt:450},
            {mon:11, amt:550},
            {mon:12, amt:850},
        ]
    };

    defineData();

    // 기본 svg select 정의
    function createSVG(){
        return d3.select(document.body)
                .append('svg')
                .attr('id','idSvgGraph')
    }

    // (1)
    // 사각형 박스 먼저 그리기
    var object = createSVG();

    function setBaseValue(object){
        // 데이터 최대값을 100단위로 정의
        // 계산식을 사용해야 하지만 부가적인 사항이므로 값 할당
        base.maxAmount = 1000;

        //width, height, top, right, bottom, left값 정의
        base.trbl = {top:20, right:20, bottom:30, left:50};

        // 670px 형태로 반환되므로 단위(px)를 제외시켜 숫자로 변환
        // attr()은 값을 반환하지 않는다.
        base.svgWidth = parseInt(object.style('width'));
        base.graphWidth = base.svgWidth - base.trbl.left - base.trbl.right;

        // 450px 형태로 반환되므로 단위(px)를 제외시켜 숫자로 변환
        base.svgHeight = parseInt(object.style('height'));
        base.graphHeight = base.svgHeight - base.trbl.top - base.trbl.bottom;

    }

    setBaseValue(object);

    // (2) Y축 눈금자
    function drawYAxis(object){

        // var yAxis = d3.svg.asix().scale(yScale).orient('left');
        // d3.svg.axis()로 축 제어 인스턴스 생성
        // scale()의 파라미터에 앞에서 작성한 yScale
        base.yScale = d3.scale.linear()
            //[0, 1000]은 데이터 범위
            .domain([0, base.maxAmount])
            // [base.graphHeight, 0]는 출력할 좌표 범위
            // 그래프를 최상 꼭지점에서 우하로 그리므로
            // graphHeight에 큰 값을 작성해야 1000, 9000 순서로 표시
            .range([base.graphHeight, 0]);

        // y축을 표시하기 위한 기준 설정
        base.yAxis = d3.svg.axis()
            .scale(base.yScale)
            // 왼쪽에 표시
            .orient('left');

        // y축 표시
        object.append('g')
            //.attr('transform','translate('+ base.trbl.left + ','+ base.trbl.top + ')')
            .attr('transform',`translate(${base.trbl.left},${base.trbl.top})`)
            .append('g').attr('class','axis').call(base.yAxis);

    }
    drawYAxis(object);


    // (3) x축 눈금자
    function drawXAxis(object){

        // 서수 형태로 배열 순서와 값 매핑
        base.xScale = d3.scale.ordinal()
            // 데이터에서 mon값을 범위로 지정한다
            .domain(base.data.map(function(obj){
                return obj.mon;
            }))
            // 소수가 아닌 정수 반환
            .rangeRoundBands([0, base.graphWidth], .4);

        base.xAxis = d3.svg.axis()
            .scale(base.xScale)
            // x축 아래에 표시
            .orient('bottom');

        object.append('g')
            .attr('transform',`translate(${base.trbl.left},${base.svgHeight - base.trbl.bottom})`)
            .attr('class','axis')
            .call(base.xAxis);
    }
    drawXAxis(object);

    var xAxisList = [];
    // (4) 막대바 그리기
    function drawBar(object){
        object
            .append('g')
            .attr({
                'class':'bar',
                'transform' : `translate(${base.trbl.left},${base.trbl.top})`
            })
            .selectAll('rect')
            .data(base.data)
            .enter()
            .append('rect')
            .attr({
                'x' : function(obj){
                    var coord = base.xScale(obj.mon);
                    xAxisList.push(coord);
                    return base.xScale(obj.mon)
                },
                'width' : base.xScale.rangeBand(),
                'y': function(obj){
                    // 데이터가 950일 때 최대값이 1000이므로
                    //  400 * (1 - 0.95) * 0.95 형태로 계산되며 결과는 20
                    return base.yScale(obj.amt);
                },
                'height':function(obj){
                    // 데이터가 950일때
                    // 그래프 높이 400에서 20을 빼면 380
                    return base.graphHeight - base.yScale(obj.amt);
                }
            });
    }
    drawBar(object);

    function drawText(object){

        object
            .append('g')
            .attr({
                'transform' : `translate(${base.trbl.left},${base.trbl.top})`
            })
            .selectAll('g')
            .data(base.data)
            .enter()
            .append('text')
            .attr({
                'class':'datatext',
                'x' : function(obj, index){
                    return xAxisList[index] + (base.xScale.rangeBand() / 2);
                },
                'y': base.graphHeight
            })
            .text(function(obj){
                return obj.amt;
            });
    }
    drawText(object);


}// onload

// coord = base.xScale(obj.mon)















//

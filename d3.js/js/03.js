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
       

}
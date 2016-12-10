window.onload = function(){

/** 그래프 그리기 */
    
    // 기본 svg select 정의
    function createSVG(){
        return d3.select(document.body)
                .append('svg')
                .attr('id','idSvgGraph')     
    }

    // 사각형 박스 먼저 그리기 
    var object = createSVG();

    function drawBar(object){
        var salesData = [950,550,450,350,250,150,180,250,350,450,550,850];
        
        // 막대폭 계산. 막대와 막대 사이 20픽셀 띄움
        var barWidth = 600 / salesData.length - 20;
        var postList = [];
        
        return object.append('g')
            .attr('class','bar')
            // 셀렉트 할 걸 미리 선택해놓음 (인스턴스)
            .selectAll('rect')
            .data(salesData)
            // 데이터를 읽어가면서 rect를 그린다
            .enter()
            .append('rect')
            .attr('transform','translate(50,20)')
            .attr('width',barWidth)
            .attr('height',function(value, index){
                // 세로축 높이가 400 픽셀이므로
                // 데이터가 700 이면 280픽셀이 됨
                postList.push(Math.round(400 * value / 1000));
                return postList[index];
            })
            // <rect>이 시작점에서 우하로 사각형을 그리기 때문에
            .attr('x',function(value, index){
                // 첫번째 x 좌표는 10이며 공간을 띄운다
                // 두 번째는 (30*1) + (20*1) + 10인 결과인 60이 된다
                return (barWidth * index) + (20 * index) + 10;
            })
            .attr('y',function(value,index){
                return 400 - postList[index];
            })
    }

    // 사각형 그래프 그리기
    drawBar(object);

    

    
       

}
window.onload = function(){

    // 데이터 정의
    defineData();
    var object = createSVG();
    setBaseValue(object);
    showColor(object);

    /***********************************************/
    // 데이터 정의
    function defineData(){
        window.base = {};
        base.data = [
            11, 22, 33, 44, 55, 66, 77, 88, 99, 0,
            91, 81, 71, 61, 51, 41, 31, 21, 11, 99,
            2, 14, 26, 38, 50, 62, 24, 36, 48, 80,
            31, 33, 35, 37, 39, 61, 63, 65, 67, 69,
            23, 33, 44, 55, 23, 33, 44, 55, 66, 77,
            2, 4, 6, 58, 0, 2, 74, 6, 8, 0,
            1, 13, 35, 57, 79, 81, 73, 55, 37, 19,
            9, 7, 5, 53, 1, 89, 7, 5, 3 ,100,
            1, 33, 5, 7, 59, 1, 3, 65, 7, 9,
            2, 54, 6, 78, 0, 92, 4, 36, 58, 0
        ]
    }

    function createSVG(){
        return d3.select(document.body).append('svg')
    }

    function setBaseValue(object){
        // top, right, bottom, left 값을 설정한다.
        base.trbl = {top:50, right:50, left:50 ,bottom:50};
        // 600px 형태로 반환되므로 단위(px)를 제외시켜 숫자로 변환
        base.svgWidth = parseInt(object.style('width'));
        base.graphWidth = base.svgWidth - base.trbl.left - base.trbl.right;
        // 400px 형태로 반환되므로 단위(px)를 제외시켜 숫자로 변환
        base.svgHeight = parseInt(object.style('height'));
        base.graphHeight = base.svgHeight - base.trbl.top - base.trbl.bottom;
    }

    function showColor(object){
        var rgbColor = d3.interpolateRgb('#50ff1f','#ef1ac8');
        var maxValue = d3.max(base.data);

        var obj = object.append('g').selectAll('rect').data(base.data).enter();

        // 사각형으로 컬러 표시
        obj.append('rect')
			.attr('x',function(data,idx){
				return (idx % 10) * 40;
			})
			.attr('y', function(data, idx){
                return Math.floor(idx / 10) * 30;
            })
			.attr('width', 40)
			.attr('height', 30)
			.style('fill', function(data){
                return rgbColor(data / maxValue);
			});
	}
}

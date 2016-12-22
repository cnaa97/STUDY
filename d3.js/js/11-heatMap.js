window.onload = function(){

    //// 데이터
    // 가로, 세로 10개씩 1에서 100까지 값
    //// 히트맵
    // 두 개 컬러 지정
    // 데이터 값의 컬러 값을 구해 색 표시

    function defineData(){
        window.base = {};
        base.data = {
        	name: "city"
        }
    }

    function createSVG(){
        return d3.select(document.body).append('svg')
    }

    function setBaseValue(object){
        base.trbl = {top:50, right:50, left:50 ,bottom:50};
        base.svgWidth = parseInt(object.style('width'));
        base.svgHeight = parseInt(object.style('height'));
      	base.graphWidth = base.svgWidth - base.trbl.left - base.trbl.right;
        base.graphHeight = base.svgHeight - base.trbl.top - base.trbl.bottom;
    }

    function showColor(object){
        var rgbColor = d3.interpolateRgb('#50ff1f','#ef1ac8');
        var maxValue = d3.max(base.data);

        base.data = [];

        // 0.1씩 증가하면서 보간 함수를 호출하여 컬러값을 구한다.
        /*for(var k=0; k<1; k+=0.1){
            base.data.push(rgbColor(k));
        }*/
        let k = 0;
        while (k < 1){
            base.data.push(rgbColor(k));
            k += 0.1;
        }

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
                var rgb = d3.rgb(data);
				return `rgb(${rgb.r},${rgb.g},${rgb.b})`;
			});
	}

    /****************************** 함수 실행 **********************************/

    defineData();
    var object = createSVG();
    setBaseValue(object);
    showColor(object);

}

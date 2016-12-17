window.onload = function(){

    function defineData(){
        window.base = {};
        base.data = {
        	name: "city",
        	children: [
        		{name: 'state',
        			children: [
		        		{name: 'newyork', value:150},
		        		{name: 'texas', value:550},
		        		{name: 'miami', value:400},
		        		{name: 'california', value:250}
	        		]
	        	},
	        	{name:'europe',
	        		children: [
		        		{name: 'london', value:150},
		        		{name: 'paris', value:550},
		        		{name: 'milano', value:400},
		        		{name: 'berlin', value:250}
	        		]
	        	}
        	]
        }
    }

    function createSVG(){
        return d3.select(document.body)
                .append('svg')
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
        for(var k=0; k<1; k+=0.1){
            base.data.push(rgbColor(k));
        }
        console.log(base.data);

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
                console.log(rgb);
				return `rgb(${rgb.r},${rgb.g},${rgb.b})`;
			});
	}

    ////////////////////////// 함수 실행

    defineData();
    var object = createSVG();
    setBaseValue(object);
    showColor(object);

}

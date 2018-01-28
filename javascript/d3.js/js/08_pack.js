window.onload = function(){

    function defineData(){
        window.base = {};
        base.data = {
            // root 작성 필수
        	name: "city",
            // children에 서브 트리 작성
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
		base.color = d3.scale.category20();

        var pack = d3.layout.pack()
						.size([base.graphWidth, base.graphHeight]);
		var obj = object.append('g')
						.selectAll('circle')
						.data(pack.nodes(base.data));

		obj.enter()
			.append('circle')
			.attr('cx',function(data,idx){
				return data.x;
			})
			.attr('cy',function(data,idx){
				return data.y;
			})
			.attr('r',function(data,idx){
				return data.r;
			})
			.style('fill', function(data,idx){
				return base.color(idx);
			});

		obj.enter()
			.append('text')
			.attr('transform',function(data,idx){
				return 'translate(' + data.x + ', ' + data.y + ')';
			})
			.text(function(data,idx){
                if((data.depth === 0) || data.children){
					return null;
				}
				return data.value +' '+ data.name;
			})
			.style({
                'text-anchor':'middle',
                'font-size':'12px'
            });
	}

    ////////////////////////// 함수 실행

    defineData();
    var object = createSVG();
    setBaseValue(object);
    showColor(object);

}

window.onload = function(){

    function defineData(){
        window.base = {};
        base.data = {
        	name: "city",
        	children: [
        		{name: 'state',
        			children: [
		        		{name: 'newyork', value:150},
		        		{name: 'texas', value:350},
		        		{name: 'miami', value:400},
		        		{name: 'california', value:250}
	        		]
	        	},
	        	{name:'europe',
	        		children: [
		        		{name: 'london', value:50},
		        		{name: 'paris', value:150},
		        		{name: 'milano', value:40},
		        		{name: 'berlin', value:80}
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
        //////
        var treemap = d3.layout.treemap().size([base.graphWidth, base.graphHeight]);

        var obj = object.append('g')
						.selectAll('rect')
						.data(treemap.nodes(base.data));

		obj.enter()
			.append('rect')
			.attr('x',function(data,idx){
				return data.x;
			})
			.attr('y',function(data,idx){
				return data.y;
			})
			.attr('width',function(data,idx){
				return data.dx;
			})
			.attr('height',function(data,idx){
				return data.dy;
			})
			.style('fill', function(data,idx){
				return base.color(idx);
			});

		obj.enter()
			.append('text')
			.attr('transform',function(data,idx){
				return 'translate(' + (data.x + data.dx / 2) + ', ' + (data.y + data.dy / 2) + ')';
			})
			.text(function(data,idx){
				if((data.depth === 0)|| data.children){
					return null;
				}
				return data.name;
			})
			.style('text-anchor','middle');
	}

    ////////////////////////// 함수 실행

    defineData();
    var object = createSVG();
    setBaseValue(object);
    showColor(object);

}

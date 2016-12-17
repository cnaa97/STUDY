window.onload = function(){
    function defineData(){
        window.base = {};
        base.data = [[100,300],[130,100],[50,250],[80,30],[160,250],[10,300],[170,120],[253, 234]];
    };
    function createSVG(){
        return d3.select(document.body)
                .append('svg')
                .attr('id','idSvgGraph')
    }
    function setBaseValue(object){
        base.trbl = {top:20, bottom:20, right:50, left:50};

        base.svgWidth = parseInt(object.style('width'));
        base.graphWidth = base.svgWidth - base.trbl.left - base.trbl.right;
        base.svgHeight = parseInt(object.style('height'));
        base.graphHeight = base.svgHeight - base.trbl.top - base.trbl.bottom;

        base.color = d3.scale.category10();
    }

    function drawYAxis(object){
        base.yScale = d3.scale.linear()
            .domain([0, 300])
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
            .domain([0, 500])
            .range([0, base.graphWidth]);
        base.xAxis = d3.svg.axis()
            .scale(base.xScale)
            .orient('bottom');
        object.append('g')
            .attr('transform',`translate(${base.trbl.left},${base.svgHeight - base.trbl.bottom})`)
            .attr('class','axis')
            .call(base.xAxis);
    }

    function drawScatter(object){
        base.color = d3.scale.category20();
        var obj = object.append('g').selectAll('circle').data(base.data).enter();
        obj.append('circle').attr({
            cx : function(data){
                return data[0] + base.trbl.left;
            },
            cy : function(data){
                return base.graphHeight - data[1] + base.trbl.top;
            },
            r : 5
        }).style('fill',function(data, index){
            return base.color(index);
        })
    }

    /////// 그리그 그리기
    function drawGrid(object){
        var rangeX = d3.range(0, 500, 50);
        var rangeY = d3.range(0, 300, 50);
        object.append('g').selectAll('.gridx').data(rangeX).enter().append('line').attr({
            'class':'gridx',
            'x1':function(data, index){
                return data + base.trbl.left + 50;
            },
            'y1':base.trbl.top,
            'x2':function(data, index){
                return data + base.trbl.left + 50
            },
            'y2': base.graphHeight + base.trbl.top
        });
        object.append('g').selectAll('.gridy').data(rangeY).enter().append('line').attr({
            'class':'gridy',
            'x1':base.trbl.left,
            'y1':function(data, index){
                return data + base.trbl.top;
            },
            'x2': base.graphWidth + base.trbl.left,
            'y2':function(data, index){
                return data + base.trbl.top;
            }
        });
    }

    defineData();
    var object = createSVG();
    setBaseValue(object);
    drawYAxis(object);
    drawXAxis(object);
    drawScatter(object);
    drawGrid(object);
}

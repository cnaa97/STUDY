window.onload = function(){
    function defineData(){
        window.base = {};
        base.data = [100,300,500,700,600,400];
    };

    function createSVG(){
        return d3.select(document.body)
                .append('svg')
                .attr('id','idSvgGraph')
    }

    function setBaseValue(object){
        base.trbl = {top:20, bottom:20};

        // 600px 형태로 반환되므로 단위(px)를 제외시켜 숫자로 변환
        base.svgWidth = parseInt(object.style('width'));
        base.svgHeight = parseInt(object.style('height'));
        base.graphHeight = base.svgHeight - base.trbl.top - base.trbl.bottom;
        // 원의 중심 좌표
        // centerX는 오른쪽에 범례를 작성하기 위해 왼쪽에 표시한다
        base.centerX = (base.svgWidth - 150) / 2;
        base.centerY = base.svgHeight / 2 + base.trbl.top;

        ////// d3에서 제공하는 색을 사용해서 각 파이 조각에 적용
        // 파이 조각에 반영할 색
        // base.color = ['blue','red','#aa88ff'] 형태로도 작성 가능
        base.color = d3.scale.category10(); // 10가지 색 제공
        // d3.scale.category20() 20가지 색 제공
        // d3.scale.category20b() 다른 조합의 20가지 색 제공
        // d3.scale.category20c() 또 다른 조합의 20가지 색 제공
    }

    //// Pie 그리기
    function drawPie(object){
        // 레이아웃 인스턴스 생성

        ////// 일반 파이
        var pie = d3.layout.pie();
        ////// 정렬된 파이
        var pie = d3.layout.pie().sort(d3.ascending);
        var pie = d3.layout.pie().sort(d3.decending);

        // 내외측 반지름 지정
        var arc = d3.svg.arc()
            // 도너츠 형태일 때 값 지정
            // .innerRadius(0)
            ////// 도너츠이기 때문에 값을 바꾼다
            .innerRadius(60)
            .outerRadius(base.graphHeight / 2);

        var obj = object.selectAll('g')
            .data(pie(base.data))
            .enter()
            .append('g')
            .attr('transform',`translate(${base.centerX}, ${base.centerY})`);

        obj.append('path')
            .attr('class','pie')
            .attr('d',arc)
            ////// d3에서 제공하는 색상 적용
            .style('fill', function(data, index){
                return base.color(index);
            });

        obj.append('text')
            .attr('transform',function(data){
                return `translate(${arc.centroid(data)})`;
            })
            .attr('text-anchor', 'middle')
            .text(function(data){
                return data.value;
            })
    }

    ////// 도넛 가운데에 합계 텍스트 표시 (sum)
    function showTotal(object){
        object.append('g')
        .attr('transform',`translate(${base.centerX}, ${base.centerY})`)
        .append('text')
        .attr({'font-size':20, 'y':10, 'text-anchor':'middle'})
        .text(`합계 : ${d3.sum(base.data)}`);
    }

    ////// 범례 표시
    function showLegend(object){
        base.legend = ['Laptop','iPhone','Mouse','Earphone','HDD','Macbook'];
        var xcoord = base.svgWidth - 130, ycoord = 100;

        // object가 이전에 설정한 값을 갖고 있으므로 <g>를 다시 설정해서 구조를 만든다.
        var obj = object.append('g')
            .selectAll('g')
            .data(base.legend)
            .enter()
            .append('g');

        // 범례의 사각형을 그린다
        obj.append('rect').attr({
            x:xcoord,
            width:20,
            height:20,
            y:function(data,index){
                return ycoord + (30 * index);
            },
            fill:function(data, index){
                return base.color(index);
            }
        })

        // 범례 텍스트 작성
        obj.append('text')
            .attr({
                x:function(data, index){
                    return xcoord + 30;
                },
                y: function(data, index){
                    return ycoord + (30 * index) + 15;
                }
            })
            .text(function(data, index){
                return base.legend[index];
            })
    }




    var object = createSVG();
    defineData();
    setBaseValue(object);
    drawPie(object);
    showTotal(object);
    showLegend(object);

}

window.onload = function(){

// 기본 SVG 도형 그리기

    d3.select(document.body)
    .append('svg')
    .attr('id','idsvg')
    .attr('width',150)
    .attr('height',100)
    .style({
        position:'absolute',
        top:'40px',
        left:'20px',
        border:'1px solid blue'
    })
    .append('rect') // 사각형 그리기
    .attr({x:10, y:10, width:100, height:50, stroke:"blue", fill:"lime", "stroke-width":"5", rx:5, ry:5})
    // d3.으로 시작하는 것은 select()로 시작되는 그룹을 만드는 것 wrapper method라고 생각하면 됨.
    
// select()

    // JS의 selector
    var node = document.querySelector('em')
    console.log('node.nodeName : '+ node.nodeName);
    // node.nodeName : EM

    // d3 selector
    var d3node = d3.select('em');
    console.log("Array.isArray(d3node) : " + Array.isArray(d3node));
    // Array.isArray(d3node) : true 
    // Array type으로 반환된다.

    var el = d3node[0];
    el[0].nodeName
    console.log('el[0].nodeName : '+ el[0].nodeName);

// selectAll()

/** attr() */
/** append() */

    var node2 = d3.select('#idsvg2');
    node2.append('circle')
        .attr('cx',100)
        .attr('cy',70)
        .attr('r',50);
    node2.attr({stroke:'black',fill:'pink'});
    node2.attr('stroke-width',function(){
        return 5;
    })
    
/** style() */

    var node3 = d3.select('#idsvg3');
    node3.append('circle')
        .attr('cx',100)
        .attr('cy',70)
        .attr('r',50)
        .style({
            'stroke':'blue',
            'fill':'lime'
        })
        .style('stroke-width',function(){
            return 4;
        })
    
    //d="M100,160 L160,100 L220,160 z"
    var testNode1 = d3.select('#idsvg-test1');
    testNode1.append('path')
    .attr('d','M30,150 l90,0 l-45,-80 z')
    .style({
        'fill':'red',
        'stroke':'black',
        'stroke-width':'5'
    })
    
    testNode1.append('path')
    .attr('d','M129,150 l90,0 l-45,-80 z')
    .style({
        'fill':'blue',
        'stroke':'magenta',
        'stroke-width':'5'
    })


/** data(), enter() */
    var acumY = 0, circleData = [30,40,50];
    /*var dataObj = d3.select('#idsvg4')
            .selectAll('circle')
            // selectAll 환경을 만들어주는 것 
            // data의 루핑 돌기 위해서 미리 준비시켜준다고 보면 됨 (for문 돌리려고)
            // 인스턴스에 circle Data 설정 환경 작성하고
            // 데이터를 설정하진 않음
            .data(circleData);
            // d3의 가장 큰 특징
            // data-driven 데이터 받아서 그려준다 

    // data(), enter() 결과물 보기 위해 코드 분리
    var obj = dataObj.enter();
    obj.append('circle')
        .attr({'cx':100, 'fill':'blue'})
        .attr('cy',function(value, index){
            // value 값에 따라 acumY 를 설정해준다
            acumY += value;
            if(index > 0){
                acumY += circleData[index-1];
            }
            return acumY;
        })
        .attr('r',function(value, index){
            // value : [30,40,50]
            return value;
        })*/

    d3.select("#idsvg4")
        .selectAll("circle")
        .data(circleData)
        .enter()
        .append("circle")
        .attr({
        cx: 100,
        fill: "red",
        cy: function (d, i) {
            acumY = acumY + d;
            if(i > 0){
                acumY = acumY + circleData[i-1];
            }
            return acumY;
        },
        r: function (d, i) {
            return d;
        }
        })

        
    
}
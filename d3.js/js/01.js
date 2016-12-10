window.onload = function(){
    d3.select(document.body)
    .append('svg')
    .attr('id','idsvg')
    .attr('width',150)
    .attr('height',100)
    .style({
        position:'absolute',
        top:'200px',
        left:'100px',
        border:'1px solid blue'
    })
}
/**
 * Created by ParkJunHo on 10/06/2017.
 */

var health = (function(){
    var render = function () {
        data && console.log(data);
    };
    return {
        render: render
    }
})();


google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawLineColors);

function drawLineColors() {
    var chartData = new google.visualization.DataTable();
    chartData.addColumn('string', 'Date');
    chartData.addColumn('number', '체중 (KG)');
    chartData.addColumn('number', '골격근량 (KG)');
    chartData.addColumn('number', '체지방량 (KG)');

    var tempDataArr = [];

    data.map(function (item) {
        if(item['muscleMass']){
            tempDataArr.push([
                moment(item['date'], "YYYYMMDD").format("YYYY-MM-DD"),
                item['weight'],
                item['muscleMass'],
                item['fatMass']
            ])
        }
    });

    chartData.addRows(tempDataArr);

    var chart = new google.visualization.LineChart(document.getElementById('chartDiv'));

    chart.draw(chartData, {
        title: '체성분 변화 추이',
        hAxis: {
            // title: 'Date',
        },
        vAxis: {

        },
        pointSize: 6,
        // colors: ['#a52714', '#097138']
        // selectionMode: "multiple",
});
}

window.onload = function () {
    $("#grid").jsGrid({
        width: "100%",
        // height: "400px",

        heading: true,
        // inserting: true,
        // editing: true,
        sorting: true,
        // paging: true,

        data: data,

        fields: [
            {name: "date", title: "날짜", type: "text",width:80},
            {name: "weight", title: "체중(KG)", type: "number", width:60},
            {name: "muscleMass", title: "골격근량(KG)", type: "number", width:60},
            {name: "fatMass", title: "체지방량(KG)", type: "number", width:60},
            {name: "percentBodyFat", title: "체지방률(%)", type: "number", width:60},
            {name: "bmi", title: "BMI", type: "number", width:60},
            {name: "bmiResult", title: "BMI 결과", type: "text"},
            {name: "waist", title: "허리", type: "number", width:60},
            {name: "hip", title: "엉덩이", type: "number", width:60},
            {name: "leftForearm", title: "왼팔", type: "number", width:60},
            {name: "rightForearm", title: "오른팔", type: "number", width:60},
            {name: "leftThigh", title: "왼허벅", type: "number", width:60},
            {name: "rightThigh", title: "오른허벅", type: "number", width:60},
            {name: "allCm", title: "총 CM", type: "number", width:60},
            {name: "allInch", title: "총 인치", type: "number", width:60},
        ]
    });
};
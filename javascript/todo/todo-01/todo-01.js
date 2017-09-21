var tasks = [];

var STATE_P = '진행';
var STATE_C = '완료';


var addTask = (function () {
    var id = 0;

    return function (title) {
        tasks.push({
            id: id += 1,
            title: title,
            state: STATE_P
        });
        render();
    };
})();

var removeTask = function (id, state) {
    for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].id == id) {
                tasks[i].state = state;
                break;
            }
    }
    render();
};

var render = function () {
    var task;

    console.log(STATE_P);

    for (var i = 0; i < tasks.length; i++) {
        task = tasks[i];
        if (task.state === STATE_P) {
            console.log(task.id + ' : ' + task.title + ' (' + task.state +')');
        }
    }

    console.log(STATE_C);

    for (var i = 0; i < tasks.length; i++) {
        task = tasks[i];
        if (task.state === STATE_C) {
            console.log(task.id + ' : ' + task.title + ' (' + task.state +')');
        }
    }
};
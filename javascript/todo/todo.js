/**
 * Created by junho on 07/06/2017.
 */

var todo = (function(){
    var tasks = [];

    // 은닉
    var STATE_P = '진행';
    var STATE_C = '완료';

    var add = (function(){
        var id = 0;

        return function(title){
            tasks.push({id: id++, title: title, state: STATE_P});
            render();
        }
    })();
    var remove = function(id){};
    var change = function(id, state){};
    var render = function(){
        console.log(tasks);
    };

    return {
        add : add,
        remove: remove,
        change: change
    }
})();
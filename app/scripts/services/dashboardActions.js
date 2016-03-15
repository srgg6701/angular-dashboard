app.service('DashboardActions', function($http, DashboardContents){

    this.removeColumn = function(scope, status){
        delete scope['dashboard'].columns[status]; //console.log('removeColumn', status, $scope.dashboard.columns);
    };
    this.removePanel = function(scope, status){
        delete scope['dashboard'].panels[status]; //console.log('removePanel', status, $scope.dashboard.panels);
    };
    this.removeCard = function(scope, cardId, status, index){
        //console.log({cardId: cardId, scope:scope, status:status, index:index});
        //console.log('removeCard', scope.dashboard.columns[status][1][index]);
        scope.dashboard.columns[status][1].splice([index],1);
    };

    function getLastInsertId(scope){
        var contents = scope.dashboard.columns;
        return contents.new[1].length+contents.processed[1].length+contents.done[1].length+ 1;
    }

    function saveData(scope, lastInsertId){
        var dashboard = scope.dashboard;
        /** добавляется всегда, аналогично вставке новой записи в SQL-таблицу;
         *  нужно для назначения корректного task.id  */
        if(!lastInsertId) dashboard.lastId = getLastInsertId(scope);
        $http.post('app/data/dashboard', dashboard).then( function(){
            scope.newtask.show=false;
        });
    }
    // добавить задачу (task, issue) на панель и в JSON
    this.addTask = function(scope){
        var lastInsertId = getLastInsertId(scope),
            dataToPush=[ lastInsertId, scope.newtask.text ];
        console.log('add task', { lastInsertId:lastInsertId, push_into: scope.dashboard.columns.new[1], dataToPush:dataToPush});
        try{
            scope.dashboard.columns.new[1].push(dataToPush);
            saveData(scope, lastInsertId);
        }catch(e){
            console.error(e.message);
        }
    };
    this.addGroup = function(data){
        console.log('add group', data);
    };
    this.addPanel = function(data){
        console.log('add panel', data);
    };
});
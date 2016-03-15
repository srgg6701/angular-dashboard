app.service('DashboardActions', function($http, DashboardContents){

    this.removeColumn = function(scope, status){
        delete scope['dashboard'].columns[status]; //console.log('removeColumn', status, $scope.dashboard.columns);
    };
    this.removePanel = function(scope, status){
        delete scope['dashboard'].panels[status]; //console.log('removePanel', status, $scope.dashboard.panels);
    };
    this.removeCard = function(scope, cardId, status, index){
        //console.log({cardId: cardId, scope:scope, status:status, index:index});
        console.log('removeCard before', { path: 'scope.dashboard.columns['+status+'][1].splice('+index+',1)', object: scope.dashboard.columns[status][1], columns: scope.dashboard.columns});
        var removed=scope.dashboard.columns[status][1].splice(index,1);
        console.log('removeCard after', { columns: scope.dashboard.columns, removed: removed });
    };

    function getNewLastInsertId(scope){
        return scope.dashboard.lastId+1;
    }

    function saveData(scope, lastInsertId){
        var dashboard = scope.dashboard;
        /** добавляется всегда, аналогично вставке новой записи в SQL-таблицу;
         *  нужно для назначения корректного task.id  */
        if(!lastInsertId) dashboard.lastId = getNewLastInsertId(scope);
        console.log('%csave', 'color: green', dashboard);
        $http.post('app/data/dashboard', dashboard).then( function(){
            scope.newtask.show=false;
        });
    }
    // добавить задачу (task, issue) на панель и в JSON
    this.addTask = function(scope){
        try{
            var lastInsertId = getNewLastInsertId(scope),
            dataToPush=[ lastInsertId, scope.newtask.text ];
            console.log('add task', { lastInsertId:lastInsertId, push_into: scope.dashboard.columns.new[1], dataToPush:dataToPush});
            scope.dashboard.columns.new[1].push(dataToPush);
            saveData(scope, lastInsertId);
        }catch(e){
            console.error(e.message);
        }
    };
    this.addGroup = function(scope){ //.newgroup
        console.log('addGroup, scope', scope);
        //var pn={}; //pn[data.class]=[data.name, [data.color]];
        try{
            var newgroup = scope.newgroup;
            scope.dashboard.columns[newgroup.class]=[newgroup.name, [], [newgroup.color]];
            saveData(scope);
        }catch(e){
            console.error(e.message);
        }
    };
    this.addPanel = function(scope){
        console.log('add panel, scope', scope);
        try{
            var newcategory = scope.newcategory;
            scope.dashboard.panels[newcategory.class]=[newcategory.name, [newcategory.color]];
            saveData(scope);
        }catch(e){
            console.error(e.message);
        }
    };
});
app.service('DashboardActions', function($http, DashboardContents){

    this.removeColumn = function(scope, status){
        delete scope['dashboard'].columns[status];
    };
    this.removePanel = function(scope, status){
        delete scope['dashboard'].panels[status];
    };
    function getNewLastInsertId(scope){
        return scope.dashboard.lastId+1;
    }

    function saveData(scope, lastInsertId){
        var dashboard = scope.dashboard;
        /** добавляется всегда, аналогично вставке новой записи в SQL-таблицу;
         *  нужно для назначения корректного task.id  */
        if(!lastInsertId) dashboard.lastId = getNewLastInsertId(scope);
        $http.post('app/data/dashboard', dashboard).then( function(){
            scope.newtask.show=false;
        });
    }
    // добавить задачу (task, issue) на панель и в JSON
    this.addTask = function(scope){
        try{
            var lastInsertId = getNewLastInsertId(scope),
            dataToPush=[ lastInsertId, scope.newtask.text ];

            scope.dashboard.columns.new[1].push(dataToPush);
            saveData(scope, lastInsertId);
        }catch(e){
            console.error(e.message);
        }
    };
    this.addGroup = function(scope){ //.newgroup

        try{
            var newgroup = scope.newgroup;
            scope.dashboard.columns[newgroup.class]=[newgroup.name, [], [newgroup.color]];
            saveData(scope);
        }catch(e){
            console.error(e.message);
        }
    };
    this.addPanel = function(scope){

        try{
            var newcategory = scope.newcategory;
            scope.dashboard.panels[newcategory.class]=[newcategory.name, [newcategory.color]];
            saveData(scope);
        }catch(e){
            console.error(e.message);
        }
    };
});
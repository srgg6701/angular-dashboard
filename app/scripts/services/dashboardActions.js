app.service('DashboardActions', function($http, DashboardContents){

    this.removeColumn = function(scope, status){
        delete scope['dashboard'].columns[status];
        //console.log('removeColumn', status, $scope.dashboard.columns);
    };
    this.removePanel = function(scope, status){
        delete scope['dashboard'].panels[status];
        //console.log('removePanel', status, $scope.dashboard.panels);
    };
    this.removeCard = function(scope, cardId){
        console.log({cardId: cardId, scope:scope});
        //delete scope['dashboard'].panels[status];
        //console.log('removePanel', status, $scope.dashboard.panels);
    };
    this.addTask = function(scope){
        var contents = scope.dashboard.columns,
            lastNumber=contents.new[1].length+contents.processed[1].length+contents.done[1].length, lastInsertId = lastNumber+ 1,
            dataToPush=[ lastInsertId, scope.newtask.text ];

        console.log('add task', { push_into: contents.new[1], dataToPush:dataToPush});

        try{
            contents.new[1].push(dataToPush);
            scope.dashboard.lastId=lastInsertId;

            $http.post('app/data/dashboard', scope.dashboard)
                .then(function(data) {
                    scope.newtask.show=false;
                    console.log('Data saved, newtask show: ', scope.newtask.show);
                });
            console.log({dataToPush:dataToPush, tasksNew:contents.new[1]});
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
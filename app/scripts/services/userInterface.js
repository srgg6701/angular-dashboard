app.service('UserInterface', function(){
    this.removeColumn = function(scope, status){
        delete scope['dashboard'].columns[status];
        //console.log('removeColumn', status, $scope.dashboard.columns);
    };
    this.removePanel = function(scope, status){
        delete scope['dashboard'].panels[status];
        //console.log('removePanel', status, $scope.dashboard.panels);
    };
    this.addTask = function(){
        console.log('add task');
    };
    this.addGroup = function(){
        console.log('add group');
    };
    this.addPanel = function(){
        console.log('add panel');
    };
});
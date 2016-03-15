app.service('UserInterface', function(){
    this.removeColumn = function(scope, status){
        delete scope['dashboard'].columns[status];
        //console.log('removeColumn', status, $scope.dashboard.columns);
    };
    this.removePanel = function(scope, status){
        delete scope['dashboard'].panels[status];
        //console.log('removePanel', status, $scope.dashboard.panels);
    };
    this.addTask = function(form){
        console.log('add task', form);
    };
    this.addGroup = function(form){
        console.log('add group', form);
    };
    this.addPanel = function(form){
        console.log('add panel', form);
    };
});
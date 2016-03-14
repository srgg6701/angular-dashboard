// strict mode coming later
app.controller('defaultCtrl', function ($scope, DashboardData) {
    $scope.dashboard = DashboardData.contents;
    $scope.removeColumn = function(status){
        delete $scope.dashboard.columns[status];
        //console.log('removeColumn', status, $scope.dashboard.columns);
    };
    $scope.removePanel = function(status){
        delete $scope.dashboard.panels[status];
        //console.log('removePanel', status, $scope.dashboard.panels);
    };
});
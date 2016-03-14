// strict mode coming later
app.controller('defaultCtrl', function ($scope, DashboardData, UserInterface) {
    $scope.dashboard = DashboardData.contents;
    $scope.removeColumn = function(status){
        UserInterface.removeColumn($scope, status);
    };
    $scope.removePanel = function(status){
        UserInterface.removePanel($scope, status);
    };
    $scope.addTask = function(){
        UserInterface.addTask();
    };
    $scope.addGroup = function(){
        UserInterface.addGroup();
    };
    $scope.addPanel = function(){
        UserInterface.addPanel();
    };
});
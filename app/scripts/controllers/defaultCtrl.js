// strict mode coming later
app.controller('defaultCtrl', function ($scope, DashboardData, UserInterface) {
    $scope.dashboard = DashboardData.contents;
    $scope.newtask={};
    $scope.newgroup={};
    $scope.newcategory={};
    $scope.removeColumn = function(status){
        UserInterface.removeColumn($scope, status);
    };
    $scope.removePanel = function(status){
        UserInterface.removePanel($scope, status);
    };
    $scope.addTask = function(){
        UserInterface.addTask($scope.newtask);
        $scope.newtask.show=false;
    };
    $scope.addGroup = function(){
        UserInterface.addGroup($scope.newgroup);
        $scope.newgroup.show=false;
    };
    $scope.addPanel = function(){
        UserInterface.addPanel($scope.newcategory);
        $scope.newcategory.show=false;
    };
});
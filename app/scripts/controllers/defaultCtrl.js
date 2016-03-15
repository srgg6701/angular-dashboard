// strict mode coming later
app.controller('defaultCtrl', function ($scope, DashboardContents, DashboardActions) {
    DashboardContents.getDashboardContents().then(function(data){
        $scope.dashboard = data; //console.log(data);
    });

    $scope.newtask={};
    $scope.newgroup={};
    $scope.newcategory={};

    $scope.removeColumn = function(status){
        DashboardActions.removeColumn($scope, status);
    };
    $scope.removePanel = function(status){
        DashboardActions.removePanel($scope, status);
    };
    $scope.addTask = function(){
        DashboardActions.addTask($scope);
    };
    $scope.addGroup = function(){
        DashboardActions.addGroup($scope.newgroup);
        $scope.newgroup.show=false;
    };
    $scope.addPanel = function(){
        DashboardActions.addPanel($scope.newcategory);
        $scope.newcategory.show=false;
    };
});
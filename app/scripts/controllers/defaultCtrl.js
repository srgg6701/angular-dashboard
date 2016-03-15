// strict mode coming later
app.controller('defaultCtrl', function ($scope, DashboardContents, DashboardActions) {
    DashboardContents.getDashboardContents().then(function(data){
        $scope.dashboard = data; //console.log(data);
    });

    $scope.newtask={};
    $scope.newgroup={};
    $scope.newcategory={};

    $scope.relocateCard = function(scope){ //card
        //alert('relocate!');
        console.log('%ccard', 'font-size:20px', scope);
    };

    $scope.removeColumn = function(status){
        DashboardActions.removeColumn($scope, status);
    };
    $scope.removePanel = function(status){
        DashboardActions.removePanel($scope, status);
    };
    $scope.removeCard = function(cardId, status, index){
        console.log('args', arguments[2], $scope);
        DashboardActions.removeCard($scope, cardId, status, index);
    };
    $scope.addTask = function(){
        DashboardActions.addTask($scope);
    };
    $scope.addGroup = function(){
        DashboardActions.addGroup($scope);
    };
    $scope.addPanel = function(){
        DashboardActions.addPanel($scope);
    };
});
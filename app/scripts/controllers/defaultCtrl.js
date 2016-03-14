// strict mode coming later
app.controller('defaultCtrl', function($scope, Dashboard){
    console.log('default controller works, dashboard:', Dashboard);
    $scope.testAreaVisible=true;
});
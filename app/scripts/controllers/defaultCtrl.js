// strict mode coming later
app.controller('defaultCtrl', function ($scope, DashboardData) {
    $scope.dashboard = DashboardData.contents;
});
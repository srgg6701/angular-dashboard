// strict mode coming later
app.controller('defaultCtrl', function ($scope, Dashboard, DashboardData) {
    $scope.dashboard = DashboardData.contents;
});
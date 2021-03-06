app.service('DashboardContents', function ($http, $q) {
    // get data from JSON
    this.getDashboardContents = function() {
        var defer = $q.defer();
        $http.get('app/data/dashboard.json')
            .then(function(response) {
                defer.resolve(response.data);
        }, function(response) {
            defer.reject(response);
        });
        return defer.promise;
    };
});
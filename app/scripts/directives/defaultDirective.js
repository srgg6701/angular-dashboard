app.directive('test', function(){
    return{
        restrict: 'A',
        replace: true,
        /*scope: {
            inner2: '@',
            contents: '&'
        },*/
        templateUrl: 'app/templates/test.html',
        controller: function($scope){
            $scope.getStuff = function(){
                /*console.log('$scope.inner2, $scope.contents', {
                    // returns the key "context"
                    '$scope.inner2':$scope.inner2,
                    // returns function (???)
                    '$scope.contents':$scope.contents,
                    // returns "undefined"
                    '$scope.context':$scope.contents[$scope.inner2]
                });*/
            }
        }
    };
});
/*app.directive('inner1', function(){
    return{
        restrict: 'A',
        replace: true,
        scope: {
            inner1: '=',
            outstuff: '='
        },
        templateUrl: 'app/templates/inner-directive-1.html',
        controller: function($scope){

        }
    };
});
*/

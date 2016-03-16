// strict mode coming later
app.controller('defaultCtrl', function ($scope, DashboardContents, DashboardActions) {
    DashboardContents.getDashboardContents().then(function(data){
        $scope.dashboard = data; //console.log(data);
    });

    $scope.newtask={};
    $scope.newgroup={};
    $scope.newcategory={};

    $scope.relocateCard = function(scope, statuses){ //card
        //alert('relocate!');
        var columnScope = $scope.dashboard.columns,
            old_status=statuses[0], new_status=statuses[1],
            oldScopeCardBox=columnScope[old_status][1], newScopeCardBox=columnScope[new_status][1];
        console.log('%ccard', 'font-size:14px; background-color:yellow; padding:3px 6px; border-radius:3px;', {
            '0 old status': old_status,
            '1 new status': new_status,
            '2 card': {
                '0 index':scope.$index,
                '1 issue':scope.issue
            },
            '3 card scope': scope,
            '4 data': {
                '1 old scope (cards box)': oldScopeCardBox,
                '1 new scope (cards box)': newScopeCardBox,
                '2 length': columnScope[new_status].length-1,
                '3 remove from old scope': oldScopeCardBox[scope.$index]
            },
            '5 $scope': $scope/*,
            '6 push':{
                'card scope': newScopeCardBox[1][scope.$index],
                'to column scope': newScopeCardBox[1]/!*,
                'remove card from prev scope': newScopeCardBox[1][scope.$index]*!/
            }*/
        });
        var cardScope = oldScopeCardBox.splice([scope.$index],1);
        newScopeCardBox.push(cardScope);

        console.log('%cResult', 'color: orangered; font-size:16px',{cardScope:cardScope,oldScopeCardBox:oldScopeCardBox, newScopeCardBox:newScopeCardBox});

        alert('scope is modified');

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
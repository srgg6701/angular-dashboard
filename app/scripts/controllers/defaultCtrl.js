// strict mode coming later
app.controller('defaultCtrl', function ($scope, DashboardContents, DashboardActions) {
    DashboardContents.getDashboardContents().then(function(data){
        $scope.dashboard = data;
    });

    $scope.newtask={};
    $scope.newgroup={};
    $scope.newcategory={};

    $scope.relocateCard = function(scope, statuses){ //card
        //
        var columnScope = $scope.dashboard.columns,
            old_status=statuses[0], new_status=statuses[1],
            oldScopeCardBox=columnScope[old_status][1], newScopeCardBox=columnScope[new_status][1];
        oldScopeCardBox.splice(scope.$index,1);
        newScopeCardBox.push(scope.issue);

        $scope.$apply();

    };

    $scope.imposeCard = function(cardScope){
        var index = cardScope.$index,
            parentData = cardScope.$parent.data[1];
        parentData.splice(index,1);
        $scope.$apply();
    };

    $scope.removeClone = function(panel, cardId, sectionId){

        var clonesArray=$scope.dashboard.panels[panel.status][1],
            cardNativeId = cardId.substring(4, cardId.indexOf("_")),
            cloneIndex=clonesArray.indexOf(cardNativeId);

        var removed=$scope.dashboard.panels[panel.status][1].splice(cloneIndex,1);

        $scope.$apply();
    };

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
        DashboardActions.addGroup($scope);
    };
    $scope.addPanel = function(){
        DashboardActions.addPanel($scope);
    };
});
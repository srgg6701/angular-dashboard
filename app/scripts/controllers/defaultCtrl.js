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
        console.groupCollapsed('%ccard', 'font-size:14px; background-color:yellow; padding:3px 6px; border-radius:3px;');
        console.log({
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
            '5 $scope': $scope
        });
        console.log('oldScopeCardBox before', {'1':oldScopeCardBox, '2':columnScope[old_status]});

        //var cardScope =
        oldScopeCardBox.splice(scope.$index,1);
        newScopeCardBox.push(scope.issue);

        console.groupEnd();

        $scope.$apply();

    };

    $scope.imposeCard = function(cardScope){
        var index = cardScope.$index,
            parentData = cardScope.$parent.data[1];
        console.log({
            'index':index,
            'cardScope':cardScope,
            'parentData1': parentData
        });
        parentData.splice(index,1);
        $scope.$apply();
        console.log('scope', $scope);
    };

    $scope.removeClone = function(panel, cardId, sectionId){
        console.log('removeClone', arguments);
        var clonesArray=$scope.dashboard.panels[panel.status][1],
            cardNativeId = cardId.substring(4, cardId.indexOf("_")),
            cloneIndex=clonesArray.indexOf(cardNativeId);
        console.log({
            panels: $scope.dashboard.panels,
            status: panel.status,
            panelData: $scope.dashboard.panels[panel.status],
            dataArray: $scope.dashboard.panels[panel.status][1],
            scopeSegment: clonesArray
        });

        var removed=$scope.dashboard.panels[panel.status][1].splice(cloneIndex,1);

        // console.log('panelData', {panelData:$scope.dashboard.panels[panel.status], removed:removed});
        // 1: "task4_0_"
        // 2: "box-rows-0"


        $scope.$apply();
    };

    $scope.removeColumn = function(status){
        DashboardActions.removeColumn($scope, status);
    };
    $scope.removePanel = function(status){
        DashboardActions.removePanel($scope, status);
    };

    $scope.removeCard = function(event){ // cardId, status, index
        console.trace();
        console.log('event', event); //, $scope
        //DashboardActions.removeCard($scope, cardId, status, index);
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
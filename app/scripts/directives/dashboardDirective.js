app.directive('dashboardTemplate', function(){
    return{
        restrict: 'EA',
        templateUrl: 'app/templates/dashboard.html',
        link:function(scope, element, attr){

        }
    };
}).directive('draggableElement', function(Dashboard){
    return function(scope, element){
        //console.log('draggableElement', element[0]);
        element[0].draggable = true;
        Dashboard.dragStore.setListeners(element[0]);
    }
}).directive('droppableElement', function(Dashboard){
    return function(scope, element){
        //console.log('droppableElement', element[0]);
        element[0].draggable = true;
        Dashboard.dragStore.setListeners(element[0]);
    }
});
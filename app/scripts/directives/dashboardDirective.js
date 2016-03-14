app.directive('dashboardTemplate', function(){
    return{
        restrict: 'EA',
        templateUrl: 'app/templates/dashboard.html',
        controller: function(){
            window.dragStore=dragStoreInit();
        }
    };
}). // вызывать установщика наблюдателей для перемещаемых элементов
    directive('draggableElement', function(){
        return function(scope, element){
            element[0].draggable = true;
            window.dragStore.setListeners(element[0]);
        }
})  // вызывать установщика наблюдателей для принимающих элементов
    .directive('droppableElement', function(){
        return function(scope, element){
            window.dragStore.setListeners(element[0]);
        }
});
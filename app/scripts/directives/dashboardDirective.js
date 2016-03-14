app.directive('dashboardTemplate', function(){
    return{
        restrict: 'EA',
        templateUrl: 'app/templates/dashboard.html',
        controller: function($scope){
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
})
    .directive('columnRemove', function(){
        return {
            scope: {
                clickgroup: '&', // parent
                clickpanel: '&' // parent
            },
            link: function(scope, element) {
                //console.log('this', value);
                element[0].addEventListener('click', function(e) {
                        if (e.stopPropagation) e.stopPropagation();
                        scope.$apply('clickgroup()');
                        return false;
                    },  false );
                element[0].addEventListener('click', function(e) {
                    if (e.stopPropagation) e.stopPropagation();
                    scope.$apply('clickpanel()');
                    return false;
                },  false );
            }
        }
    });
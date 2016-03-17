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
            window.dragStore.setListeners(element[0], 'drag');
        }
})  // вызывать установщика наблюдателей для принимающих элементов
    .directive('droppableElement', function(){
        return function(scope, element){
            window.dragStore.setListeners(element[0], 'drop');
        }
})
    .directive('cardsRemove', function(){
        function addListener(fn, scope){
          this.addEventListener('click', function(e) {
              if (e.stopPropagation) e.stopPropagation();
              scope.$apply('click'+fn+'remove()');
              return false;
          },  false );
        }
        return {
            scope: {
                clickgroupremove: '&',
                clickpanelremove: '&'
            },
            link: function(scope, element) {
                ['group', 'panel'].forEach(function(target){
                    if(element[0].getAttribute('click'+target+'remove'))
                        addListener.call(element[0],target, scope);
                });
            }
        }
    });
app.directive('draggableContent', function () {
        return function (scope, element) {

            console.log('scope, element', scope, element);

            var el = element[0];

            el.draggable = true;

            el.addEventListener('dragstart', dragstart, false);

            el.addEventListener('dragend', dragend, false);

            function dragstart(e) {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('Text', this.id);
                this.classList.add('drag');
                return false;
            }
            function dragend(e){
                this.classList.remove('drag');
                return false;
            }
        };
    })
    .directive('testDropZone', function () {
        return {
            templateUrl: 'app/templates/testDnD.html',
            link: function (scope, element) {
                // again we need the native object
                var el = element[0];
                console.log('el [testDropZone]', el);
            }
            /*controller: function ($scope) {
             console.log('hello from test drop zone! Scope: ', $scope);
             }*/
        };
    })
    .directive('droppableContent', function () {
        return {
            scope: {
                drop: '&',
                bin: '='
            },
            link: function(scope, element) {
                // again we need the native object
                var el = element[0];

                el.addEventListener('dragover', dragover, false);

                el.addEventListener('dragenter',dragenter, false);

                el.addEventListener('dragleave',dragleave,false);

                el.addEventListener('drop',drop,false);

                function dragover(e) {
                    e.dataTransfer.dropEffect = 'move';
                    // allows us to drop
                    if (e.preventDefault) e.preventDefault();
                    this.classList.add('over');
                    return false;
                }

                function dragenter(e){
                    this.classList.add('over');
                    return false;
                }

                function dragleave(e){
                    this.classList.remove('over');
                    return false;
                }

                function drop(e){
                    // Stops some browsers from redirecting.
                    if (e.stopPropagation) e.stopPropagation();

                    this.classList.remove('over');

                    var binId = this.id;
                    var item = document.getElementById(e.dataTransfer.getData('Text'));
                    this.appendChild(item);
                    // call the passed drop function
                    scope.$apply(function(scope) {
                        var fn = scope.drop();
                        if ('undefined' !== typeof fn) {
                            fn(item.id, binId);
                        }
                    });
                    return false;
                }
            }
        };
});

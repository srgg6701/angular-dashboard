// strict mode coming later
app.controller('defaultCtrl', function($scope, Dashboard){
    console.log('default controller works, dashboard:', Dashboard);
    $scope.testAreaVisible=true;

    /*function switchSize() {
        console.log('switchSize');
        document.getElementById('test-area').classList.toggle('collapsed');
    }
    window.onload = function () {
        var eventsMap = {
            dragstart: Dragstart,
            dragover: Dragover,
            dragenter: Dragenter,
            dragleave: Dragleave,
            drop: Drop,
            dragend: Dragend
        };
        [].forEach.call(document.querySelectorAll('.test-move, .test-dropzone, .section-box'),
            function (element) {
                for (var event in eventsMap) {
                    element.addEventListener(event, eventsMap[event], false);
                }
            });
    };*/

    //function Dragstart(ev) {
    /*$scope.Dragstart = function(ev) {
        //console.log("dragStart: dropEffect = " + ev.dataTransfer.dropEffect + " ; effectAllowed = " + ev.dataTransfer.effectAllowed);
        console.log('%cDragstart: ', 'background-color:rgb(200,0,0); padding:4px 6px', {this: this, ev: ev});
        ev.dataTransfer.setData("text", ev.target.id);
        //ev.dataTransfer.effectAllowed = "move";
        ev.dataTransfer.effectAllowed = "copy";
    };*/

    /*$scope.Dragover = function(ev) {
        //console.log("dragOver: dropEffect = " + ev.dataTransfer.dropEffect + " ; effectAllowed = " + ev.dataTransfer.effectAllowed);
        console.log('%cDragover: ', 'background-color:rgb(0,200,0); padding:4px 6px', {this: this, ev: ev});
        ev.preventDefault();
        // Set the dropEffect to move
        //ev.dataTransfer.dropEffect = "move"
        ev.dataTransfer.dropEffect = "copy";
    };*/

    /*$scope.Dragenter = function(ev){
        console.log('%cDragenter: ', 'background-color:rgb(0,0,200); padding:4px 6px', {this: this, ev: ev});
        ev.preventDefault();
    };

    $scope.Dragleave = function(ev){
        console.log('%cDragleave: ', 'background-color:rgb(200,200,0); padding:4px 6px', {this: this, ev: ev});
        ev.preventDefault();
    };*/

    /*$scope.Drop = function(ev){
        //console.log("drop: dropEffect = " + ev.dataTransfer.dropEffect + " ; effectAllowed = " + ev.dataTransfer.effectAllowed);
        console.log('%cDrop: ', 'background-color:rgb(200,0,200); padding:4px 6px', {this: this, ev: ev});
        ev.preventDefault();
        // Get the id of the target and add the moved element to the target's DOM
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
    };*/

    /*$scope.Dragend = function(ev){
        console.log('%cDragend: ', 'background-color:rgb(50,50,50); color:white; padding:4px 6px', {
            this: this,
            ev: ev
        });
        ev.preventDefault();
    }*/
});
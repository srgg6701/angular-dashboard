app.service('Dashboard', function(){
    this.name='Dashboard';
    console.log('dnd works!');
    var debugCnt;
    function showArgs(){
        var args=[];
        for(var i= 0, j=arguments.length; i<j; i++){
            args.push(arguments[i]);
        }
        return args;
    }
    /**/
    //window.onload = function () {
        // Пора открывать лавочку, растоманы! ☺
        //window.dragStore = dragStoreInit();
        this.dragStore = dragStoreInit(); //console.log('dragStoreInit', window.dragStore);
        // установить наблюдателей для перемещаемых объектов:
        // группы карточек по статусам, карточки между группами и панелями
        // ['dragstart', 'dragenter', 'dragover', 'dragleave'] ■
        // ['dragover', 'drop', 'dragend']
        // выбираем все элементы, задействованные в перемещениях
        //window.dragStore.setListeners('.column, .card, .box-panel, .box-panel-container');
        this.dragStore.setListeners('.column, .card, .box-panel, .box-panel-container');
        console.log('%c======================================', 'color: rebeccapurple');
    //};
// тут будут закрома
    function dragStoreInit() {
        console.groupCollapsed('dragStoreInit', showArgs(arguments));
        var drawnElement,
            drawnElementsPanel={},
            eventsMap = {
                dragstart:  dragStart,
                dragover:   dragOver,
                dragenter:  dragEnter,
                dragleave:  dragLeave,
                drop:       drop,
                dragend:    dragEnd
            },
            classes={1:'over', 2:'moving'},
            currentTarget, currentThis;

        var setupData= {
            getClass: function(number){
                return classes[number];
            },
            getDrawnElement: function (key) {
                console.group('dragStore.getDrawnElement', showArgs(arguments));
                var element = key? drawnElementsPanel[key] : drawnElement;
                console.log('element: ', element);
                console.groupEnd();
                return element;
            },
            // вызывается в dragStart
            setDrawnElement: function (element, key) {
                console.group('dragStore.setDrawnElement', showArgs(arguments));
                key ? /** сохранить перетащенный на нижнюю панель элемент
                 чтобы исключить дублирование (далее будет сверяться)
                 по id задачи */
                    drawnElementsPanel[key] = element
                /**
                 сохранить последний перемещённый элемент; также
                 нужно для проверки -- исключить дублирование элементов
                 в колонках */
                    : drawnElement = element;
                //--------------------debug
                var el=(key)?  drawnElementsPanel[key]:drawnElement;
                console.log('set element to: ', el);
                //--------------------debug end
                console.groupEnd();
            },
            //
            setTransferParams: function(eTarget, eThis){
                currentTarget=eTarget;
                currentThis=eThis;
            },
            //
            getTransferParams: function(){
                return {
                    eTarget:currentTarget,
                    eThis:currentThis
                }
            },
            // удалить из набора перетащенных на нижнюю панель задач текущую
            removeDrawnElementCopy: function(key){
                console.groupCollapsed('dragStore.removeDrawnElementCopy', showArgs(arguments));
                delete drawnElementsPanel[key];
                console.groupEnd();
            },
            setListeners: function (selector, events) {
                console.groupCollapsed('dragStore.setListeners', showArgs(arguments));
                var /**
                     контейнер пар [событие: функциия], то, что будет передаваться
                     в качестве параметров при установке наблюдателей */
                    eventsHandler,
                // элементы, к которым будем присоединять наблюдателей:
                    elements = document.querySelectorAll(selector);
                console.log('elements: ', elements);
                /**
                 * Если набор событий не передан, извлекаем их (и функции) все,
                 иначе ─ только переданные с параметром events */
                if (!events) {
                    eventsHandler = eventsMap;
                } else { // если передаем, переформируем набор присоединяемых функций
                    eventsHandler = {};
                    console.groupCollapsed('form eventsHandler');
                    events.forEach(function(ev){
                        eventsHandler[ev] = eventsMap[ev];
                        console.log('eventsHandler['+ev+']', eventsHandler[ev]);
                    });
                    console.groupEnd();
                }   console.log('eventsHandler', eventsHandler);
                console.groupCollapsed('%cset listeners', 'color: violet');
                for (var i = 0, j = elements.length; i < j; i++) {
                    for (var event in eventsHandler) {
                        if (eventsHandler.hasOwnProperty(event)) {
                            console.log({ element: elements[i], event: event, method: eventsHandler[event] });
                            elements[i].addEventListener(event, eventsHandler[event], false);
                        }
                    }
                }
                console.groupEnd();
                console.groupEnd();
            }
        };  console.log('return %csetupData ', 'color:green',setupData);
        console.groupEnd();
        return setupData;
    }
    /**
     * Предотвращает "всплывание" события
     * Применяет к активному элементу вызвов функции назначения класса "moving"
     * Сохраняет перемещаемый элемент в приватной пер. drawnElement объекта dragStore
     * Назначает "эффект перетаскивания"
     * Определяет данные, которые будут перемещены из старого расположения в новое
     * @param e ─ event
     */
    function dragStart(e) {
        debugCnt='dragStart';
        if (e.stopPropagation) { // предотвратить дальнейшее распространение
            e.stopPropagation();
        }
        console.groupCollapsed('%cdragStart', 'background-color:rgb(180,180,255); padding:4px 10px',{
            '0 e.srcElement':e.srcElement,
            '1 e.target':e.target,
            '2 toElement':e.toElement,
            '3 e': e,
            '4 this': this
        }, showArgs(arguments));

        addElementClass(e.target, 2);
        //handleElementClassList('moving', this);
        // сохранить текущий активный элемент для обработки при следующих событиях
        dragStore.setDrawnElement(e.target);
        dragStore.setTransferParams(e.target, this);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', e.target.innerHTML);

        console.log('e.dataTransfer',  e.dataTransfer);
        console.groupEnd();
    }
    /**
     * Применяется к ПАССИВНОМУ элементу, в область над которым
     * входит перетаскиваемый элемент;
     * В настоящий момент ─ только назначает класс "over"
     * @param e ─ event
     */
    function dragEnter(e) {
        addElementClass(this, 1);
    }
    /**
     * Предотвращает вызов события по умолчанию;
     * Назначает "эффект перетаскивания" для элемента
     * @param e ─ event
     * @returns {boolean}
     */
    function dragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        return false;
    }
    /**
     * Шлюз для обработки события drop,
     * внутри ─ разводка по процедурам с карточками
     * @param e
     * @returns {boolean}
     */
    function drop(e) {
        debugCnt='drop';
        // e.target ─ элемент, на котором возникло событие drop
        var dropTargetStart = e.target.dataset.dropTarget,
        // элемент-инициатор перемещения; содержит класс "moving"
            drawnElement = prepareToDrop(e),
            drawnElementDropArea = drawnElement.dataset.dropArea,
            thisDropArea = this.dataset.dropArea,
            transferParams = dragStore.getTransferParams(),
            transferDatasetThis = transferParams.eThis.dataset,
            transferDatasetTarget = transferParams.eTarget.dataset,
            drawnElementDropTarget,
            dropTargetEndPanel;

        console.group('%cdrop', 'color:orange', {
            '1 drawnElement': drawnElement,
            '2 this': this,
            '3 drawnElementDropArea':drawnElementDropArea,
            '4 dropTargetStart': dropTargetStart,
            '5 drawnElementDropTarget': drawnElement.dataset.dropTarget,
            '6 dropTargetEndPanel': (this.dataset.dropTarget=='card-panel'),
            '7 e': e,
            '8 e.srcElement': e.srcElement,
            '9 e.target': e.target,
            '10 e.target.id': e.target.id,
            '11 transferParams': transferParams
        }, showArgs(arguments));

        // пытаемся переместить из панели в группу или между панелями
        if( transferDatasetThis.dropArea &&
            transferDatasetThis.dropArea=='panel'
        ){
            if(dropTargetStart){
                if( dropTargetStart =='card-panel' &&
                    transferParams.eThis.id!== e.target.id
                ){
                    dropCardPanelRelocate.call(this, e, drawnElement);
                }
            }
            console.log('%creturn false', 'color:green; font-size:13px');console.groupEnd();
            return false;
        }

        if( e.target.id && drawnElement.id &&
            ( e.target.id==drawnElement.id || /**
                 Проверяется при перемещении карточки из группы на нижнюю панель.
                 Сработает, если копия карточки сбрасываетя непосредственно на
                 свой предыдущий клон. В противном случае требуется доп. проверка
                 (см. в следующем блоке) */
                e.target.id==drawnElement.id+'_'
            )
        ) {
            console.log('%creturns false', 'color: red'); console.groupEnd();
            return false;
        }else {
            console.log('%cblock 2', 'color: darkorange', {
                '1 this.dataset.dropTarget':this.dataset.dropTarget,
                '2 this.children':this.children
            });
            // проверить все элементы в контейнере
            if( dropTargetEndPanel=this.dataset.dropTarget=='card-panel'){
                for(var i= 0, j=this.children.length; i<j; i++){
                    // если обнаружен клон, прерываем выполнение функции
                    if(this.children[i].id==drawnElement.id+'_'){
                        console.log('%creturns false', 'color: red'); console.groupEnd();
                        return false;
                    }
                }
            }
            drawnElementDropTarget = drawnElement.dataset.dropTarget;
        }
        // перемещаем панели
        if( drawnElementDropArea && thisDropArea &&
            drawnElementDropArea=='category-container' &&
            thisDropArea=='category-container'
        ){
            dropPanelExchange.call(this, e, drawnElement);
            console.log('%creturns false', 'color: navy'); console.groupEnd();
            return false;
        }
        // перемещали колонки
        if(drawnElementDropArea=='column'){
            dropColumnExchange.call(this, e, drawnElement);
            console.log('%creturns false', 'color: red'); console.groupEnd();
            return false;
        }else{
            // перемещали карточки на нижнюю панель и между панелями
            if( thisDropArea && thisDropArea=='panel' ||
                ( drawnElementDropTarget &&
                    drawnElementDropTarget=='card' &&
                    dropTargetStart &&
                    dropTargetStart =='card-panel'
                )
            ){
                dropCardBottomPanelCopy.call(this, e, drawnElement);
                console.log('%creturns false', 'color: navy'); console.groupEnd();
                return false;
            }
            dropCardRelocate.call(this, e, drawnElement);
            console.log('%creturns false', 'color: navy'); console.groupEnd();
            return false;
        }
        // для подстраховки
        console.groupEnd();
        return false;
    }
    /**
     * Поменять местами группу карточек
     * @param e ─ event
     * @param drawnElement ─ target-event
     */
    function dropColumnExchange(e, drawnElement){
        console.groupCollapsed('%c dropColumnExchange', 'color:white; background-color: blue; padding:4px 10px', showArgs(arguments));
        console.log({
            '0 e': e,
            '1 drawnElement': drawnElement,
            '2 this': this
        });
        // Если собираемся сбрасывать не туда же, откуда пришли
        if (drawnElement != this) {
            var // найти нужную колонку, если влезли глубже, чем надо
                findColumn = function(toColumn, i){

                    if(toColumn.tagName.toLocaleLowerCase()=='body'){
                        console.warn('not found up to "body"');
                        return false;
                    }

                    if(toColumn.dataset.dropArea &&
                        toColumn.dataset.dropArea=='column'){
                        return toColumn;
                    }else{
                        if(i>=10){
                            alert('Группа карточек не найдена после '+i+' итераций');
                            console.warn('Последняя найденная колонка: ', toColumn);
                            return false;
                        }
                        i=(!i)? 1:i+1;
                        findColumn(toColumn.parentNode, i);
                    }
                },
                toColumn=findColumn(this);
            // не повезло
            if(!toColumn) {
                console.groupEnd();
                return false;
            }else{
                console.log({
                    drawnElement:drawnElement,
                    toColumn:toColumn
                });
            }
            // контент
            drawnElement.innerHTML = toColumn.innerHTML;
            toColumn.innerHTML = e.dataTransfer.getData('text/html');
        }
        console.groupEnd();
    }
    /**
     * Поменять местами панели
     * @param e ─ event
     * @param drawnElement ─ target-event
     */
    function dropPanelExchange(e, drawnElement){
        console.groupCollapsed('%c dropPanelExchange', 'color:white; background-color: blue; padding:4px 10px', showArgs(arguments));
        console.log({
            '0 e': e,
            '1 drawnElement': drawnElement,
            '2 this': this
        });
        // Если собираемся сбрасывать не туда же, откуда пришли
        if (drawnElement != this) {
            var storedId = drawnElement.id;
            drawnElement.innerHTML = this.innerHTML;
            this.innerHTML = e.dataTransfer.getData('text/html');
            drawnElement.id=this.id;
            this.id=storedId;
        }
        console.groupEnd();
    }
    /**
     * Переместить карточку в другую группу
     * @param e ─ event
     * @param drawnElement ─ target-event
     */
    function dropCardRelocate(e, drawnElement) {
        console.group('%c dropCardRelocate', 'font-weight:normal; color:white; background-color: #999; padding:4px 10px', showArgs(arguments),
            { '1 e.target': e.target, '2 drawnElement':drawnElement }
        );
        // Если собираемся сбрасывать не туда же, откуда пришли
        if (drawnElement != this) {
            // назначим статус текущей группы (не заменять на класс!)
            if(e.target.dataset.dropTarget){
                console.log('%cdirection: forward', 'background-color:brown');
                // relocation forward
                if(e.target.parentNode.dataset.taskStatus){
                    drawnElement.dataset.taskStatus=e.target.parentNode.dataset.taskStatus;
                    e.target.parentNode.insertBefore(drawnElement, e.target);
                }
            }else{
                console.log('%cdirection: backward', 'background-color:violet');
                // relocation backward
                if(e.target.dataset.taskStatus){
                    drawnElement.dataset.taskStatus=e.target.dataset.taskStatus;
                    e.target.appendChild(drawnElement);
                }
            }
        }
        console.groupEnd();
    }
    /**
     * Переместить карточку между панелями
     * @param e
     * @param drawnElement
     */
    function dropCardPanelRelocate(e, drawnElement){
        console.group('%c dropCardPanelRelocate', 'font-weight:normal; color:white; background-color: #999; padding:4px 10px', showArgs(arguments),
            { '1 e.target': e.target, '2 drawnElement':drawnElement }
        );
        // Если собираемся сбрасывать не туда же, откуда пришли
        if (drawnElement != this) {
            e.target.appendChild(drawnElement);
        }
        console.groupEnd();
    }
    /**
     * Переместить карточку на другую панель
     * @param e
     * @param drawnElement
     */
    /*function dropCardBottomPanelRelocate(e, drawnElement){
     if(debugCnt=='dragOver') console.groupEnd();
     debugCnt='dropCardRelocate';
     console.groupCollapsed('%c dropCardBottomPanelRelocate', 'color:white; background-color: #999; padding:4px 10px', showArgs(arguments));
     console.log('drawnElement: ', drawnElement);
     // clarify: разобраться
     if (drawnElement != this) {
     // если сбрасываем на другую горизонтальную панель
     if(e.target.dataset.dropTarget&&e.target.dataset.dropTarget=='card-panel'){
     // добавить элемент в конец панели
     e.target.appendChild(drawnElement);
     }
     }
     console.groupEnd();
     }*/
    /**
     * копировать Карточку на нижнюю панель
     * @param e
     * @param drawnElement
     */
    function dropCardBottomPanelCopy(e, drawnElement) {
        debugCnt='dropCardBottomPanelCopy';
        console.groupCollapsed('%c dropCardBottomPanelCopy', 'color:rebeccapurple', showArgs(arguments));
        var taskId = getTaskId(drawnElement),
            drawnElementPanel = dragStore.getDrawnElement(taskId),
            row= e.target, clone, cloned = document.getElementById('task'+taskId+'_');

        // выяснить, нет ли уже такой (в т.ч. на панелях)
        if(cloned){
            console.log('%cблокировано дублирование карточки id '+taskId+'_', 'color: red');
            console.groupEnd();
            return false;
        }
        /**
         если пытаемся засунуть карточку внутрь другой карточки,
         передвинем всё на уровень выше */
        if( e.target.dataset.dropTarget &&
            e.target.dataset.dropTarget=='card') {
            row = row.parentNode;
        }
        /**
         если пытались засунули ещё глубже -- внутрь блока с командой,
         удаляющей карточку, поднимемся выше на 2 уровня   */
        if( e.target.parentNode.dataset.dropTarget &&
            e.target.parentNode.dataset.dropTarget=='card'){
            row = row.parentNode.parentNode;
        }
        console.log({ drawnElement:drawnElement, taskId:taskId, drawnElementPanel:drawnElementPanel, row:row });
        clone = drawnElement.cloneNode(true);
        clone.id=clone.id+'_';
        console.log('clone: ', clone);
        /** добавить в конец панели; да, можно сделать
         ещё красивше, но совершенству нет предела вообще */
        row.appendChild(clone);
        console.log('row after adding clone: ', row);
        dragStore.setDrawnElement(clone, taskId);
        console.groupEnd();
        // удалить с клона класс-эффект
        removeElementClass(2);
    }
    /**
     * Применяет к активному элементу функцию удаления класса "moving"
     * @param  e ─ event
     */
    function dragEnd(e) {
        if(debugCnt=='dragOver') console.groupEnd();
        console.groupCollapsed('%cdragEnd', 'background-color: #333; color: white; padding:4px 10px',{
            srcElement:arguments[0].srcElement,
            target:arguments[0].target,
            toElement:arguments[0].toElement
        }, showArgs(arguments));
        if (e.stopPropagation) { // предотвратить дальнейшее распространение
            e.stopPropagation();
        }
        console.groupEnd();
        removeElementClass(1);
        removeElementClass(2);
        console.log('%c*******************************************************', 'color: orange');
        debugCnt=null;
    }
// - Мини-сервисы -
    /**
     * Получить id задачи
     * @param element
     * @returns {string}
     */
    function getTaskId(element){
        if(debugCnt=='dragOver') console.groupEnd();
        debugCnt='getTaskId';

        console.groupCollapsed('%cgetTaskId', 'color:blue', showArgs(arguments));
        console.log('return: ', element.id.substr(4));
        console.groupEnd();
        return element.id.substr(4);
    }
    /**
     * Добавить класс
     * @param classNumber
     * @param element
     */
    function addElementClass(element, classNumber){
        element.classList.add(dragStore.getClass(classNumber));
    }
    /**
     * Удалить класс (с задержкой, чтобы юзер видел процесс)
     * @param classNumber
     */
    function removeElementClass(classNumber){
        var cnt= 0,
            className = dragStore.getClass(classNumber),
            el,
            intrvl = setInterval(function(){
                if(el=document.getElementsByClassName(className)[0]){
                    el.classList.remove(className);
                    clearInterval(intrvl);
                }
                cnt++;
                if(cnt>50){
                    clearInterval(intrvl);
                }
            },100);
    }
    /**
     * Применяет к пассивному элементу функцию удаления класса "over"
     * @param e ─ event
     */
    function dragLeave(e) {
        removeElementClass(1); // moving
    }
    /**
     * Выполнить стандартные действия перед "сбрасыванием" элемента
     * @param e
     * @returns {*} ─ активный элемент, сохранённый в dragStore при инициализации перетаскивания
     */
    function prepareToDrop(e) {
        var drawnElement = dragStore.getDrawnElement();
        // получить последний сохранённый элемент
        return drawnElement;
    }
    /**
     * Удалить копию задачи с нижней панели
     * @param element
     */
    function removeIssueCopyFromPanel(element){
        if(debugCnt=='dragOver') console.groupEnd();
        debugCnt='removeIssueCopyFromPanel';

        // clarify: Не нужно ли (и возможно ли?) добавить наблюдателей в цикле, убрав из тегов? И что с angular-подходом тогда?
        console.groupCollapsed('%cremoveIssueCopyFromPanel', 'color:darkred', showArgs(arguments));
        var card=element.parentNode,
            taskId = getTaskId(card),
            drawnElementPanel = dragStore.getDrawnElement(taskId);
        console.log({ card:card, taskId:taskId, drawnElementPanel:drawnElementPanel });
        /** удалить ранее сохранённый элемент, чтобы не блокировал
         повторное копирование данных */
        if(drawnElementPanel&&drawnElementPanel.innerHTML==card.innerHTML){
            dragStore.removeDrawnElementCopy(taskId);
        }
        console.log('remove card', { cardParentNode: card.parentNode, card: card});
        card.parentNode.removeChild(card);
        console.groupEnd();
    }
});
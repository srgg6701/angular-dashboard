// тут будут закрома
function dragStoreInit() {
    var drawnElement,
        drawnElementsPanel = {},
        eventsMap = {
            drag: {
                dragstart: dragStart,
                //dragover:   dragOver,
                dragenter: dragEnter,
                dragleave: dragLeave,
                dragend: dragEnd
            },
            drop: {
                dragover: dragOver,
                drop: drop
            }
        },
        classes = {1: 'over', 2: 'moving'},
        currentTarget, currentThis;

    var setupData = {
        getClass: function (number) {
            return classes[number];
        },
        getDrawnElement: function (key) {
            var element = key ? drawnElementsPanel[key] : drawnElement;
            return element;
        },
        // вызывается в dragStart
        setDrawnElement: function (element, key) {
            key ? /** сохранить перетащенный на нижнюю панель элемент
             чтобы исключить дублирование (далее будет сверяться)
             по id задачи */
                drawnElementsPanel[key] = element
            /**
             сохранить последний перемещённый элемент; также
             нужно для проверки -- исключить дублирование элементов
             в колонках */
                : drawnElement = element;
            var el = (key) ? drawnElementsPanel[key] : drawnElement;
        },
        //
        setTransferParams: function (eTarget, eThis) {
            currentTarget = eTarget;
            currentThis = eThis;
        },
        //
        getTransferParams: function () {
            return {
                eTarget: currentTarget,
                eThis: currentThis
            }
        },
        // удалить из набора перетащенных на нижнюю панель задач текущую
        removeDrawnElementCopy: function (key) {
            delete drawnElementsPanel[key];
        },
        //
        setListeners: function (element, event_type) {
            for (var event in eventsMap[event_type]) {
                if (eventsMap[event_type].hasOwnProperty(event)) {
                    element.addEventListener(event, eventsMap[event_type][event], false);
                }
            }

        }
    };
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
    if (e.stopPropagation) { // предотвратить дальнейшее распространение
        e.stopPropagation();
    }
    addElementClass(e.target, 2);
    //handleElementClassList('moving', this);
    // сохранить текущий активный элемент для обработки при следующих событиях
    dragStore.setDrawnElement(e.target);
    dragStore.setTransferParams(e.target, this);
    taskStatusStart = e.target.dataset.taskStatus;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.innerHTML);
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
    //
    var dropTargetStart = e.target.dataset.dropTarget,
        // элемент-инициатор перемещения; содержит класс "moving"
        drawnElement = prepareToDrop(e),
        drawnElementDropArea = drawnElement.dataset.dropArea,
        thisDropArea = this.dataset.dropArea,
        transferParams = dragStore.getTransferParams(),
        transferDatasetThis = transferParams.eThis.dataset,
        drawnElementDropTarget;

    // пытаемся переместить из панели в группу или между панелями
    if (transferDatasetThis.dropArea &&
        transferDatasetThis.dropArea == 'panel'
    ) {
        if (dropTargetStart) {
            if (dropTargetStart == 'card-panel' &&
                transferParams.eThis.id !== e.target.id
            ) {
                dropCardPanelRelocate.call(this, e, drawnElement);
            }
        }
        return false;
    }

    if (e.target.id && drawnElement.id &&
        ( e.target.id == drawnElement.id || /**
             Проверяется при перемещении карточки из группы на нижнюю панель.
             Сработает, если копия карточки сбрасываетя непосредственно на
             свой предыдущий клон. В противном случае требуется доп. проверка
             (см. в следующем блоке) */
            e.target.id == drawnElement.id + '_'
        )
    ) {
        return false;
    } else {
        // проверить все элементы в контейнере
        if (this.dataset.dropTarget == 'card-panel') {
            for (var i = 0, j = this.children.length; i < j; i++) {
                // если обнаружен клон, прерываем выполнение функции
                if (this.children[i].id == drawnElement.id + '_') {
                    return false;
                }
            }
        }
        drawnElementDropTarget = drawnElement.dataset.dropTarget;
    }
    // перемещаем панели
    if (drawnElementDropArea && thisDropArea &&
        drawnElementDropArea == 'category-container' &&
        thisDropArea == 'category-container'
    ) {
        dropPanelExchange.call(this, e, drawnElement);
        return false;
    }
    // перемещали колонки
    if (drawnElementDropArea == 'column') {
        dropColumnExchange.call(this, e, drawnElement);
        return false;
    } else {
        // перемещали карточки на нижнюю панель и между панелями
        if (thisDropArea && thisDropArea == 'panel') {
            dropCardBottomPanelCopy.call(this, e, drawnElement);
            return false;
        }
        /**
         Если текущий целевой элемент (подписанный на событие)
         ─ контейнер карточек.
         ВНИМАНИЕ! Функция срабатывает как при перемещении
         карточки в другую группу, так и при изменении порядка
         расположения карточек в той же самой */
        if (this.dataset.taskStatus) {
            // drawnElement ─ карточка
            dropCardRelocate.call(this, e, drawnElement);
        }
        return false;
    }
}
/**
 * Поменять местами группу карточек
 * @param e ─ event
 * @param drawnElement ─ target-event
 */
function dropColumnExchange(e, drawnElement) {
    // Если собираемся сбрасывать не туда же, откуда пришли
    if (drawnElement != this) {
        var // найти нужную колонку, если влезли глубже, чем надо
            findColumn = function (toColumn, i) {

                if (toColumn.tagName.toLocaleLowerCase() == 'body') {
                    return false;
                }

                if (toColumn.dataset.dropArea &&
                    toColumn.dataset.dropArea == 'column') {
                    return toColumn;
                } else {
                    if (i >= 10) {
                        alert('Группа карточек не найдена после ' + i + ' итераций');
                        console.warn('Последняя найденная колонка: ', toColumn);
                        return false;
                    }
                    i = (!i) ? 1 : i + 1;
                    findColumn(toColumn.parentNode, i);
                }
            },
            toColumn = findColumn(this);
        // не повезло
        if (!toColumn) {
            return false;
        }
        // контент
        drawnElement.innerHTML = toColumn.innerHTML;
        toColumn.innerHTML = e.dataTransfer.getData('text/html');
    }
}
/**
 * Поменять местами панели
 * @param e ─ event
 * @param drawnElement ─ target-event
 */
function dropPanelExchange(e, drawnElement) {
    // Если собираемся сбрасывать не туда же, откуда пришли
    if (drawnElement != this) {
        var storedId = drawnElement.id;
        drawnElement.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
        drawnElement.id = this.id;
        this.id = storedId;
    }
}
/**
 * Переместить карточку в другую группу или поменять порядок в той же
 * @param e ─ event
 * @param drawnElement ─ target-event
 * e.target, this ─ колонка, drawnElement ─ карточка
 */
function dropCardRelocate(e, drawnElement) {
   /**
     Сравнить статус задач родительской колонки (та, куда перемещается
     карточка) и карточки. Если они разные, значит, переместили в другую колонку*/
    if (this.dataset.taskStatus != drawnElement.dataset.taskStatus) {

        var scope = angular.element(drawnElement).scope();
        scope.relocateCard(scope, [ drawnElement.dataset.taskStatus, this.dataset.taskStatus ]);

    } else {
        this.appendChild(drawnElement);
    }

    drawnElement.dataset.taskStatus = this.dataset.taskStatus;
}
/**
 * Переместить карточку между панелями
 * @param e
 * @param drawnElement
 */
function dropCardPanelRelocate(e, drawnElement) {
    // Если собираемся сбрасывать не туда же, откуда пришли
    if (drawnElement != this) {
        e.target.appendChild(drawnElement);
    }
}
/**
 * копировать Карточку на нижнюю панель
 * @param e
 * @param drawnElement
 */
function dropCardBottomPanelCopy(e, drawnElement) {
    var panel_id_suffix=this.id.substr(this.id.lastIndexOf("-")+1),
        clone = drawnElement.cloneNode(),
        clonedIdSuffix='_'+panel_id_suffix+'_'; // 4_0_

    clone.innerHTML = drawnElement.innerHTML;

    // нет "_", пришли из группы
    if(!(clone.id.lastIndexOf("_")==clone.id.length-1)) {
        clone.id+=clonedIdSuffix; // task4_0_
    }else{  // пришли с другой панели (сорри за калмбур)
        // task4_1_0_
        clone.id=clone.id.substring(0,clone.id.indexOf("_"))+clonedIdSuffix;
        if(document.querySelector('#'+this.id+' #'+clone.id)){
            return false;
        }
    }
    this.appendChild(clone);
    // удалить с клона класс-эффект
    removeElementClass(2);
}
/**
 * Применяет к активному элементу функцию удаления класса "moving"
 * @param  e ─ event
 */
function dragEnd(e) {
    if (e.stopPropagation) { // предотвратить дальнейшее распространение
        e.stopPropagation();
    }
    removeElementClass(1);
    removeElementClass(2);
}
// - Мини-сервисы -
/**
 * Добавить класс
 * @param classNumber
 * @param element
 */
function addElementClass(element, classNumber) {
    element.classList.add(dragStore.getClass(classNumber));
}
/**
 * Удалить класс (с задержкой, чтобы юзер видел процесс)
 * @param classNumber
 */
function removeElementClass(classNumber) {
    var cnt = 0,
        className = dragStore.getClass(classNumber),
        el,
        intrvl = setInterval(function () {
            if (el = document.getElementsByClassName(className)[0]) {
                el.classList.remove(className);
                clearInterval(intrvl);
            }
            cnt++;
            if (cnt > 50) {
                clearInterval(intrvl);
            }
        }, 100);
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
    // ....
    // получить последний сохранённый элемент
    return drawnElement;
}
//===Test functions===►
function showArgs() {
    var args = [];
    for (var i = 0, j = arguments.length; i < j; i++) {
        args.push(arguments[i]);
    }
    return args;
}
function hideCard(deleter){
    var card=deleter.parentNode,
        cardScope,
        cardIdNative;
    // task4
    if(card.id[card.id.length-1]!='_'){
        try{
            cardScope = angular.element(card).scope();
            cardIdNative=card.id.substr(4);

            var tasks = document.querySelectorAll('[id^="task'+cardIdNative+'_"]');
            cardScope.imposeCard(cardScope);
            // прячем блоки, в scope -- удалим
            for(var i=0, j=tasks.length; i<j; i++){
                tasks[i].style.display='none';
            }
        }catch(e){
            console.error(e.message);
        }
    }else{
        var scope = angular.element(card.parentNode).scope();
        scope.removeClone(scope, card.id, card.parentNode.id);
        card.style.display='none';
    }
}

app.service('DashboardData', function () {
    this.contents = {
        columns: [
            [   'In progress',  // 0
                'processed',    // 1
                [               // 2
                    {'0': 'Тут некая задача из тех, что назначены, но ещё не начаты'},
                    {'2': 'А это уже задача, находящаяся в работе. Со всякими там описаниями, картинками и т.п.'},
                    {'3': 'Эти задачи можно перемещать туда-сюда между их родительскими контейнерами'},
                    {'4': 'Перемещение задачи означает изменение её статуса и это -- стандартная опция её жизненного цикла'}
                ]
            ],
            [   'Not started',
                'new',
                [
                    {'1': 'И тут тоже задача из того же разряда [1]'}
                ]
            ],
            ['Done',
                'done',
                [
                    {'5': 'И тут тоже задача из того же разряда [2]'}
                ]
            ]
        ],
        panels: [
            ['Urgent !!!',[]],
            ['Deadline: yesterday forever :(',[]]
        ]
    };
}).service('Dashboard', function () {

    // Пора открывать лавочку, растоманы! ☺
    var dashboard = this,
        dragStore = dashboard.dragStore // т.к. должны передать директиве для вызова след. функции
        = dragStoreInit.call(this); //console.log('dragStoreInit', window.dragStore);
    console.log('%c======================================', 'color: rebeccapurple');
    // тут будут закрома
    function dragStoreInit() {
        console.groupCollapsed('dragStoreInit', showArgs(arguments));
        var drawnElement,
            drawnElementsPanel = {},
            eventsMap = {
                dragstart:  dragStart,
                dragover:   dragOver,
                dragenter:  dragEnter,
                dragleave:  dragLeave,
                drop:       drop,
                dragend:    dragEnd
            },
            classes = {1: 'over', 2: 'moving'},
            currentTarget, currentThis;

        var setupData = {
            getClass: function (number) {
                return classes[number];
            },
            getDrawnElement: function (key) {
                console.group('dragStore.getDrawnElement', showArgs(arguments));
                var element = key ? drawnElementsPanel[key] : drawnElement;
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
                var el = (key) ? drawnElementsPanel[key] : drawnElement;
                console.log('set element to: ', el);
                //--------------------debug end
                console.groupEnd();
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
                console.groupCollapsed('dragStore.removeDrawnElementCopy', showArgs(arguments));
                delete drawnElementsPanel[key];
                console.groupEnd();
            },
            //
            setListeners: function (element) {
                element.addEventListener('click', hello, false);
                for (var event in eventsMap) {
                    if (eventsMap.hasOwnProperty(event)) {
                        element.addEventListener(event, eventsMap[event], false);
                    }
                }

            }
        };
            console.log('return %csetupData ', 'color:green', setupData);
        console.groupEnd();
        return setupData;
    }
});
(function (root) {
    var WATER = root.SHRI_ISLANDS.WATER;
    var ISLAND = root.SHRI_ISLANDS.ISLAND;
    var EXPLORED = true;
    var SPEED = 300;

    var delayedDraw = delay(draw);

    /**
     * Создает обертку функции для ее вызова через равные промежутки времени
     *
     * @param {function} func вызываемая функция
     * @returns {function} функция-обертка
     */
    function delay(func) {
        var args = [];
        var currentCall = 0;
        var timerId;

        function wrapper() {
            if (timerId) {
                args.push(arguments);
                return;
            }

            func.apply(null, arguments);

            timerId =
                setTimeout(function delayed() {
                    if (currentCall < args.length) {
                        func.apply(null, args[currentCall++]);

                        timerId = setTimeout(delayed, SPEED);
                    } else {
                        timerId = null;
                    }
                }, SPEED);
        }

        return wrapper;
    }

    /**
     * Закрашивает клетку карты, может изменить счетчик одновременно с закрашиванием
     *
     * @param {number} i номер строки
     * @param {number} j номер столбца
     * @param {number} cell значение клетки по i и j
     * @param {number} [count] значение счетчика
     */
    function draw(i, j, cell, count) {
        var mapRows = document.querySelectorAll('.map__row');
        var mapCells = mapRows[i].querySelectorAll('.map__cell');

        var className = (cell === ISLAND ? 'map__cell_island' : 'map__cell_water');

        mapCells[j].classList.add(className)

        if (count) {
            var mapRes = document.querySelector('.map__res');
            mapRes.innerText = 'Count: ' + count;
        }
    }

    /**
     * Чистит карту и счетчик
     */
    function reset() {
        var mapRows = document.querySelectorAll('.map__row');

        for (var i = 0; i < mapRows.length; i++) {
            var mapCells = mapRows[i].querySelectorAll('.map__cell');

            for (var j = 0; j < mapCells.length; j++) {
                mapCells[j].className = 'map__cell';
            }
        }

        var mapRes = document.querySelector('.map__res');
        mapRes.innerText = 'Count: 0';
    }

    /**
     * Бонусное задание.
     * Необходимо взять реализацию функции solution и доработать,
     * добавив функционал, который позволит пошагово визуализировать работу данного алгоритма.
     * Сигнатуру функции можно выбрать наиболее удобную для вашей визуализации
     */
    function visualizeSolution(map) {
        reset();

        var mapLength = map.length;
        var mapWidth = map[0].length;
        var count = 0;

        var explored = new Array(mapLength);
        for (var i = 0; i < mapLength; i++) {
            explored[i] = new Array(mapWidth);
        }

        for (var i = 0; i < mapLength; i++) {
            for (var j = 0; j < mapWidth; j++) {
                explore(i, j, true);
            }
        }

        function explore(i, j, lookForNewIsland) {
            if (explored[i][j]) return;

            explored[i][j] = EXPLORED;

            var cell = map[i][j];

            if (cell === WATER) {
                delayedDraw(i, j, cell);
            } else {
                if (lookForNewIsland) {
                    delayedDraw(i, j, cell, ++count);
                } else {
                    delayedDraw(i, j, cell);
                }

                exploreIsland(i, j);
            }
        }

        function exploreIsland(i, j) {
            if (i > 0) explore(i - 1, j, false); // вверх
            if (j < mapWidth - 1) explore(i, j + 1, false); // направо
            if (i < mapLength - 1) explore(i + 1, j, false); // вниз
            if (j > 0) explore(i, j - 1, false); // налево
        }

        return count;
    }

    root.SHRI_ISLANDS.visualizeSolution = visualizeSolution;
})(this);

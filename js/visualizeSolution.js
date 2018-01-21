(function (root) {
    var WATER = root.SHRI_ISLANDS.WATER;
    var ISLAND = root.SHRI_ISLANDS.ISLAND;
    var VISITED = true;
    var SPEED = 500;

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

                        setTimeout(delayed, SPEED);
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

        var visited = new Array(mapLength);
        for (var i = 0; i < mapLength; i++) {
            visited[i] = new Array(mapWidth);
        }

        var findNextLand = function(y, x, countLand) {
            if (y > 0) visit(y - 1, x, countLand);
            if (x > 0) visit(y, x - 1, countLand);
            if (x < mapWidth - 1) visit(y, x + 1, countLand);
            if (y < mapLength - 1) visit(y + 1, x, countLand);
        }

        var visit = function(i, j, countLand) {
            if ( visited[i][j] ) return;

            visited[i][j] = VISITED;

            if (map[i][j] === WATER) {
                delayedDraw(i, j, map[i][j]);
            } else {
                if (countLand) {
                    count++;
                    countLand = false;
                }

                delayedDraw(i, j, map[i][j], count);

                findNextLand(i, j, countLand);
            }
        }

        for (var i = 0; i < mapLength; i++) {
            for (var j = 0; j < mapWidth; j++) {
                visit(i, j, true);
            }
        }
    }

    root.SHRI_ISLANDS.visualizeSolution = visualizeSolution;
})(this);

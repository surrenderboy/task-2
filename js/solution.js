(function (root) {
    var WATER = root.SHRI_ISLANDS.WATER;
    var ISLAND = root.SHRI_ISLANDS.ISLAND;
    var EXPLORED = true;

    /**
     * Функция находит кол-во островов на карте
     * ВАЖНО! Сигнатуру функции изменять нельзя!
     *
     * @param {number[][]} map карта островов представленная двумерной матрицей чисел
     * @returns {number} кол-во островов
     */
    function solution(map) {
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

            if (map[i][j] === ISLAND) {
                if (lookForNewIsland) {
                    count++;
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

    root.SHRI_ISLANDS.solution = solution;
})(this);

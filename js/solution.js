(function (root) {
    var WATER = root.SHRI_ISLANDS.WATER;
    var ISLAND = root.SHRI_ISLANDS.ISLAND;
    var VISITED = true;

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

            if (map[i][j] === ISLAND) {
                if (countLand) {
                    count++;
                    countLand = false;
                }

                findNextLand(i, j, countLand);
            }
        }

        for (var i = 0; i < mapLength; i++) {
            for (var j = 0; j < mapWidth; j++) {
                visit(i, j, true);
            }
        }

        return count;
    }

    root.SHRI_ISLANDS.solution = solution;
})(this);

(function (root) {
    var map = root.SHRI_ISLANDS.MAP;
    var count = root.SHRI_ISLANDS.solution(map);

    document.querySelector('.outer').appendChild(
        root.SHRI_ISLANDS.render(map, count)
    );

    var button = document.createElement('button');
    button.innerText = 'Visualize!';
    button.className = 'map__button';
    button.addEventListener('click', function() {
        root.SHRI_ISLANDS.visualizeSolution(map);
    });

    document.querySelector('.map').appendChild(button);
})(this);

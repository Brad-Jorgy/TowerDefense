MyGame.screens['main-menu'] = (function(game) {
    'use strict';

    function initialize() {
        document.getElementById('id-play-game').addEventListener(
            'click',
            function() { game.showScreen('play-game'); });

        document.getElementById('id-high-scores').addEventListener(
            'click',
            function() { game.showScreen('high-scores'); });

        document.getElementById('id-credits').addEventListener(
            'click',
            function() { game.showScreen('credits'); });

    }

    function run() {

    }

    return {
        initialize : initialize,
        run : run
    };
}(MyGame.game));
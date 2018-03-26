MyGame.screens['main-menu'] = (function(game) {
    'use strict';

    function initialize() {
        document.getElementById('id-newGame').addEventListener(
            'click',
            function() { game.showScreen('newGame'); });

        document.getElementById('id-options').addEventListener(
            'click',
            function() { game.showScreen('options'); });

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
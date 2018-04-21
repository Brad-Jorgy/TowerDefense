MyGame.screens['high-scores'] = (function(game, persistence) {
    // 'use strict';
    //
    let presentScores = [];

    function initialize() {
        document.getElementById('high-scores-back').addEventListener(
            'click',
            function() { game.showScreen('main-menu'); });
    }

    async function run() {
        presentScores = await persistence.getTopFive();
        for(var i =0; i < presentScores.length; i++) {
            document.getElementById("scoreList").innerHTML += "<li>" + presentScores[i] + "</li>";
        }
    }

    return {
        initialize : initialize,
        run : run
    };

}(MyGame.game, MyGame.persistence));
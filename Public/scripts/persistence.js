MyGame.persistence = (function () {
    'use strict';
    let scoreList = [];
    let highScores = {};
    let scores = [];

    function add(highScores) {
        //highScores[key] = value;
        localStorage['MyGame.highScores'] = JSON.stringify(highScores);
    }

    function remove(key) {
        delete highScores[key];
        localStorage['MyGame.highScores'] = JSON.stringify(highScores);
    }

    function getTopFive() {
        let previousScores = localStorage.getItem('MyGame.highScores');
        if (previousScores.length > 0) {
            scoreList = JSON.parse([previousScores]);
            //scores = Object.values(scoreList);
            if(scoreList.length > 0) {
                scoreList.sort((a,b) => {return b-a});
            }
            if(scoreList.length > 5){
                scoreList.splice(5,scoreList.length - 5);
            }
            return scoreList;
        }
        return []
    }

    return{
        add: add,
        remove: remove,
        getTopFive: getTopFive,
    }
}());
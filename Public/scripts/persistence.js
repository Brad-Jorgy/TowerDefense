MyGame.persistence = (function () {
    'use strict';
    let scoreList = [];
    let highScores = {};
    let scores = [];

    function get(){
        console.log("Score ADDED");
        superagent.get('/scores/scores.txt').then((response) => {

            console.log(response.data);});
    }

    function add(){
        superagent.post('/scoresIn')
            .send( { scoreFile: 'scores.txt' , addScore: '10' }).then((response) => {
            console.log(response.data);
        }).catch( (err) => {
            console.log(err);
        });
    }

    function getTopFive() {

        return superagent.get('/scores/scores.txt')
            .set('Accept', 'application/json')
            .then((previousScores) => {
        if (previousScores.body.length > 0) {
            scoreList = previousScores.body;
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
        })
    }

    return{
        add: add,
        getTopFive: getTopFive,
    }
}());
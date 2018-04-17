MyGame.persistence = (function () {
    'use strict';
    let scoreList = [];
    let highScores = {};
    let scores = [];

    function add(){
        console.log("Score ADDED");
        superagent.get('/scores/scores.txt').then((response) => {
            console.log(response.data);});
    }

    function postScorez(){
        superagent.post('/scoresIn')
            .send( { scoreFile: 'scores.txt' , addScore: '10' }).then((response) => {
            console.log(response.data);
        }).catch( (err) => {
            console.log(err);
        });
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
        postScorez: postScorez,
        getTopFive: getTopFive,
    }
}());
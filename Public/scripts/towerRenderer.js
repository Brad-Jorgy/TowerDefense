MyGame.towerGraphics = (function() {
    let canvas = document.getElementById('canvas-main');
    let ctx = canvas.getContext('2d');
    let currentRunningList = [];
    let gridWidth = 600;
    let squares = gridWidth/15;
    // ctx.translate(0,0);

    function setCurrentGameList(currentList) {
        currentRunningList = currentList;
    }


    function updateScore() {
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("SCORE: " + score, 510, 590);
    }


    function textLevel(text) {
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(text, 60, 630);
    }

    function updateTime() {
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Time: ", 480, 630);
    }

    function updateMoney() {
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("$Money$: ", 780, 100);
    }

    function updateLife() {
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Life Remaining: ", 1000, 100);
    }

    function renderWalls(){
        //topLeftDown
        ctx.rect(0,0,40,200);
        ctx.fillStyle = "gray";
        ctx.fill();
        ctx.stroke();

        //topLeftSide
        ctx.rect(0,0,200,40);
        ctx.fillStyle = "gray";
        ctx.fill();
        ctx.stroke();

        //topRightDown
        ctx.rect(560,0,40,200);
        ctx.fillStyle = "gray";
        ctx.fill();
        ctx.stroke();

        //topRightSide
        ctx.rect(400,0,200,40);
        ctx.fillStyle = "gray";
        ctx.fill();
        ctx.stroke();

        //bottomRightUp
        ctx.rect(560,400,40,200);
        ctx.fillStyle = "gray";
        ctx.fill();
        ctx.stroke();

        //bottomRightSide
        ctx.rect(400,560,200,40);
        ctx.fillStyle = "gray";
        ctx.fill();
        ctx.stroke();

        //bottom:LeftUp
        ctx.rect(0,400,40,200);
        ctx.fillStyle = "gray";
        ctx.fill();
        ctx.stroke();

        //bottomLeftSide
        ctx.rect(0,560,200,40);
        ctx.fillStyle = "gray";
        ctx.fill();
        ctx.stroke();
    }

    function renderThree() {
        ctx.font = "200px Comic Sans MS";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText('3', canvas.width / 2, canvas.height / 2);
    }

    function renderTwo() {
        ctx.font = "200px Comic Sans MS";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText('2', canvas.width / 2, canvas.height / 2);
    }
    function renderOne() {
        ctx.font = "200px Comic Sans MS";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText('1', canvas.width / 2, canvas.height / 2);
    }

    function drawBackground(backGround) {
        ctx.save();
        //ctx.translate(600, 0);
        ctx.globalAlpha = .8;
        ctx.drawImage(backGround, 0,0);
        ctx.restore();
    }

    function drawGrid(){
        for (var x = 0; x <= gridWidth; x += squares) {
            ctx.moveTo(0.5 + x, 0);
            ctx.lineTo(0.5 + x, gridWidth);
        }


        for (var x = 0; x <= gridWidth; x += squares) {
            ctx.moveTo(0, 0.5 + x);
            ctx.lineTo(gridWidth, 0.5 + x);
        }

        ctx.stroke();
    }

    function clear() {
        //ctx.clear();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    function cancel() {
        ///nothing
    }

    return {

        clear: clear,
        renderOne: renderOne,
        renderTwo: renderTwo,
        renderThree: renderThree,
        cancel: cancel,
        drawBackground, drawBackground,
        drawGrid: drawGrid,
        textLevel: textLevel,
        updateTime: updateTime,
        updateMoney: updateMoney,
        updateLife: updateLife,
        renderWalls: renderWalls,

    }
}());
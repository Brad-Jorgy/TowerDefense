MyGame.towerGraphics = (function() {
    let canvas = document.getElementById('canvas-main');
    let ctx = canvas.getContext('2d');
    let currentRunningList = [];
    ctx.translate(0,0);

    function setCurrentGameList(currentList) {
        currentRunningList = currentList;
    }

    function renderTest() {
        ctx.moveTo(0,0);
        ctx.lineTo(800,400);
        ctx.stroke();
    }

    function renderText(toDisplay) {
        ctx.font = "300px Comic Sans MS";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText(toDisplay, canvas.width / 2, canvas.height / 2);
    }

    function renderThree() {
        ctx.font = "300px Comic Sans MS";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText('3', canvas.width / 2, canvas.height / 2);
    }

    function renderTwo() {
        ctx.font = "300px Comic Sans MS";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText('2', canvas.width / 2, canvas.height / 2);
    }
    function renderOne() {
        ctx.font = "300px Comic Sans MS";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText('1', canvas.width / 2, canvas.height / 2);
    }


    function drawBackground(backGround) {
        ctx.save();
        ctx.globalAlpha = .2;
        ctx.drawImage(backGround, 0,0);
        ctx.restore();
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
        renderText: renderText(),
        renderOne: renderOne,
        renderTwo: renderTwo,
        renderThree: renderThree,
        renderTest: renderTest,
        cancel: cancel,
    }
}());
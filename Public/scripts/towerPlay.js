MyGame.screens['play-game'] = (function(game, graphics, events, input) {
    'use strict';

    const backgroundImage = "./images/sand_template.jpg";
    let backGround = new Image();
    let ready = false;
    let mouseCapture = false,
        myMouse = input.Mouse(),
        myKeyboard = input.Keyboard(),
        cancelNextRequest = false,
        gameInfo,
        actionList = [],
        lastTimeStamp,
        gamePhase = 'levelOne',
        currentUpdateAndRenderList = [],
        levelOneRenderList = [
            () => { graphics.drawBackground(backGround); },
            () => { graphics.renderWalls(); },
            () => { graphics.drawGrid(); },
            () => { graphics.textLevel("Level: 1"); },
            () => { graphics.updateTime(); },
            () => { graphics.updateMoney(); },
            () => { graphics.updateLife(); },
        ],
        levelTwoRenderList = [
            () => { graphics.drawBackground(backGround); },
            () => { graphics.drawGrid(); },
            () => { graphics.textLevel("Level: 2"); },
            () => { graphics.updateTime(); },
            () => { graphics.updateMoney(); },
            () => { graphics.updateLife(); },
        ],
        levelThreeRenderList = [

            () => { graphics.drawBackground(backGround); },
            () => { graphics.drawGrid(); },
            () => { graphics.textLevel("Level: 3"); },
            () => { graphics.updateTime(); },
            () => { graphics.updateMoney(); },
            () => { graphics.updateLife(); },
        ],
        gameEndRenderList = [

        ],
        gameStartRenderList = [

        ],
        demoRenderList = [

        ];

    function startLevel(time, keyIn){
        console.log("level started");
        let countDown2 = (data) => { events.add('count-down', 1000, 1, '2', graphics.renderTwo, countDown1, '1')};
        let countDown1 = (data) => { events.add('count-down', 1000, 1, '1', graphics.renderOne, graphics.cancel, 'play')};
        events.add('count-down', 1000, 1, '3', graphics.renderThree, countDown2, '2');
        myKeyboard.keyProcessed(keyIn);
    }

    function initialize() {
        console.log('Tower game initializing...');

        gameInfo = {};
        backGround.src = backgroundImage;
        backGround.addEventListener('load', backgroundLoaded, false);
        document.getElementById('startLevel').addEventListener(
            'click',
            function() { startLevel(); });
        // Create the keyboard input handler and register the keyboard commands
        myKeyboard.registerCommand(KeyEvent.DOM_VK_G, startLevel);
        myKeyboard.registerCommand(KeyEvent.DOM_VK_ESCAPE, function() {

            cancelNextRequest = true;
            //
            // Then, return to the main menu
            game.showScreen('main-menu');
        });

        //
        // Create an ability to move the logo using the mouse
        // myMouse = input.Mouse();
        // myMouse.registerCommand('mousedown', function(e) {
        //   mouseCapture = true;
        //   myTexture.moveTo({x : e.clientX, y : e.clientY});
        // });
        //
        // myMouse.registerCommand('mouseup', function() {
        //   mouseCapture = false;
        // });
        //
        // myMouse.registerCommand('mousemove', function(e) {
        //   if (mouseCapture) {
        //     myTexture.moveTo({x : e.clientX, y : e.clientY});
        //   }
        // });
    }


    function update(elapsedTime) {
        // myKeyboard.update(elapsedTime);
        myMouse.update(elapsedTime);
        if (gamePhase === 'start-game') {
            currentUpdateAndRenderList = gameStartRenderList.slice(0);
            actionList = events.updateEvents(elapsedTime, currentUpdateAndRenderList);
        } else if (gamePhase === 'game-over' ) {
            currentUpdateAndRenderList = gameEndRenderList.slice(0);
            actionList = events.updateEvents(elapsedTime, currentUpdateAndRenderList);
        } else if (gamePhase === 'levelOne') {
            currentUpdateAndRenderList = levelOneRenderList.slice(0);
            actionList = events.updateEvents(elapsedTime, currentUpdateAndRenderList);
        } else if (gamePhase === 'levelTwo') {
            currentUpdateAndRenderList = levelTwoRenderList.slice(0);
            actionList = events.updateEvents(elapsedTime, currentUpdateAndRenderList);
        } else if (gamePhase === 'levelThree') {
            currentUpdateAndRenderList = levelThreeRenderList.slice(0);
            actionList = events.updateEvents(elapsedTime, currentUpdateAndRenderList);
        } else {
            currentUpdateAndRenderList = demoRenderList.slice(0);
            actionList = events.updateEvents(elapsedTime, currentUpdateAndRenderList);
        }

    }

    function render() {
        graphics.clear();
        while(currentUpdateAndRenderList.length) {
            currentUpdateAndRenderList.shift().call();
        }

    }

    //------------------------------------------------------------------
    //
    // This is the Game Loop function!
    //
    //------------------------------------------------------------------
    function gameLoop(time) {


        update(time - lastTimeStamp);

        for(let counter = 0; counter<15; counter++) {
            myKeyboard.update(time - lastTimeStamp);

        }

        lastTimeStamp = time;

        render();

        if (!cancelNextRequest) {
            requestAnimationFrame(gameLoop);
        }
    }


    function changePhase() {
        gamePhase = this;
    }

    function getPersisted() {
        saveData.topScores();
    }

    function backgroundLoaded(){
        ready = true;
        requestAnimationFrame(gameLoop);
    }

    function run() {
        lastTimeStamp = performance.now();
        cancelNextRequest = false;
        currentUpdateAndRenderList = gameStartRenderList;

        requestAnimationFrame(gameLoop);
    }

    return {
        initialize : initialize,
        run : run
    }

}(MyGame.game, MyGame.towerGraphics, MyGame.towerEvents, MyGame.input));

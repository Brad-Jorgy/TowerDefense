MyGame.screens['play-game'] = (function(game, graphics, events, input) {
    'use strict';

    let mouseCapture = false,
        myMouse = input.Mouse(),
        myKeyboard = input.Keyboard(),
        cancelNextRequest = false,
        blockOut,
        gameInfo,
        actionList = [],
        lastTimeStamp,
        backGroundReady = false,
        gamePhase = 'play',
        currentUpdateAndRenderList = [],
        playRenderList = [
            () => { graphics.renderTest(); },
        ],
        gameEndRenderList = [

        ],
        gameStartRenderList = [

        ],
        demoRenderList = [

        ];

    // function layTheBricks() {
    //   graphics.drawBricks();
    // }

    function initialize() {
        console.log('Tower game initializing...');

        gameInfo = {};

        // Create the keyboard input handler and register the keyboard commands
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
        } else if (gamePhase === 'play') {
            currentUpdateAndRenderList = playRenderList.slice(0);
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

        // renderList.forEach((thing) => {
        //   eval(`${ thing };
        // });
        // blockOut.draw();

    }

    //------------------------------------------------------------------
    //
    // This is the Game Loop function!
    //
    //------------------------------------------------------------------
    function gameLoop(time) {


        update(time - lastTimeStamp);


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

    function run() {
        lastTimeStamp = performance.now();
        cancelNextRequest = false;
        currentUpdateAndRenderList = gameStartRenderList;
        let countDown2 = (data) => { events.add('count-down', 1000, 1, '2', graphics.renderTwo, countDown1, '1')};
        let countDown1 = (data) => { events.add('count-down', 1000, 1, '1', graphics.renderOne, graphics.cancel, 'play')};
        events.add('count-down', 1000, 1, '3', graphics.renderThree, countDown2, '2');

        requestAnimationFrame(gameLoop);
    }

    return {
        initialize : initialize,
        run : run
    }

}(MyGame.game, MyGame.towerGraphics, MyGame.towerEvents, MyGame.input));

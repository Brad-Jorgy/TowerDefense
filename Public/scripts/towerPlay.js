MyGame.screens['play-game'] = (function(game, graphics, events, input, gameObjects) {
    'use strict';

    const backgroundImage = "./Images/sand_template.jpg";
    let backGround = new Image();
    let ready = false;
    let mouseCapture = false,
        myMouse = input.Mouse(),
        myKeyboard = input.Keyboard(),
        cancelNextRequest = false,
        gameInfo,
        actionList = [],
        lastTimeStamp,
        gamePhase = 'play-game',
        currentUpdateAndRenderList = [],
        levelStaticRenderElements = [
            () => { graphics.drawBackground(backGround); },
            () => { graphics.renderWalls(); },
            () => { graphics.drawGrid(); },
            () => { graphics.updateTime(); },
            () => { graphics.updateMoney(); },
            () => { graphics.updateLife(); },
        ],
        levelOneRenderList = [
            () => { graphics.textLevel("Level: 1"); },
        ],
        levelTwoRenderList = [
            () => { graphics.textLevel("Level: 2"); },
        ],
        levelThreeRenderList = [
            () => { graphics.textLevel("Level: 3"); },
        ],
        gameEndRenderList = [

        ],
        gameStartRenderList = [

        ],
        demoRenderList = [

        ],
        testTower,
        level = 'none';

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
        
        testTower = gameObjects.Tower({
            baseSprite: 'Images/turrets/turret-base.gif',
            weaponSprite: 'Images/turrets/turret-1-1.png',
            gridPosition: { x: 3, y: 5 },
            target: { x: 200, y: 100 },
            rotateRate: 6 * 3.14159 / 1000 // radians per second
        });
        
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
        } else if (gamePhase === 'game-over' ) {
            currentUpdateAndRenderList = gameEndRenderList.slice(0);
        } else if (gamePhase === 'play-game') {
            currentUpdateAndRenderList = levelStaticRenderElements.slice(0);
            testTower.update(elapsedTime);
            if (level === 'levelOne') {
                currentUpdateAndRenderList.push(...levelOneRenderList.slice(0));
            } else if (level === 'levelTwo') {
                currentUpdateAndRenderList.push(...levelTwoRenderList.slice(0));
            } else if (level === 'levelThree') {
                currentUpdateAndRenderList = levelThreeRenderList.slice(0);
            }
        } else if (gamePhase === 'levelOne') {
            currentUpdateAndRenderList = levelOneRenderList.slice(0);
        } else if (gamePhase === 'levelTwo') {
            currentUpdateAndRenderList = levelTwoRenderList.slice(0);
        } else if (gamePhase === 'levelThree') {
            currentUpdateAndRenderList = levelThreeRenderList.slice(0);
        } else {
            currentUpdateAndRenderList = demoRenderList.slice(0);
        }
        events.updateEvents(elapsedTime, currentUpdateAndRenderList);

    }

    function render() {
        graphics.clear();
        while(currentUpdateAndRenderList.length) {
            currentUpdateAndRenderList.shift().call();
        }
        testTower.render();

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

        // Testing turret rotation
        myMouse.registerCommand('mousedown', function (e, elapsedTime) {
            testTower.setTarget(e.clientX, e.clientY);
        });

        requestAnimationFrame(gameLoop);
    }

    return {
        initialize : initialize,
        run : run
    }

}(MyGame.game, MyGame.towerGraphics, MyGame.towerEvents, MyGame.input, MyGame.objects));

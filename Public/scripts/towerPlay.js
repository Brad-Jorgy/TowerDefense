MyGame.screens['play-game'] = (function(game, graphics, events, input, gameObjects) {
    'use strict';

    const backgroundImage = "./Images/sand_template.jpg";
    let backGround = new Image();
    let ready = false;
    let upgradeTowerKey = KeyEvent.DOM_VK_U;
    let upgradeTowerHandler = upgradeTower;
    let sellTowerKey = KeyEvent.DOM_VK_S;
    let sellTowerHandler = sellTower;
    let startLevelKey = KeyEvent.DOM_VK_G;
    let startLevelHandler = startLevel;
    let mouseCapture = false,
        myMouse = input.Mouse(),
        myKeyboard = input.Keyboard(),
        cancelNextRequest = false,
        gameInfo,
        actionList = [],
        lastTimeStamp,
        gamePhase = '',
        showGrid = false,
        money = 0,
        life = 0,
        currentUpdateAndRenderList = [],
        levelStaticRenderElements = [
            () => { graphics.drawBackground(backGround); },
            () => { graphics.renderWalls(); },
            () => { graphics.updateMoney(); },
            () => { graphics.updateLife(); },
            () => { graphics.updateLife(); },
        ],
        levelOneRenderList = [
            () => { graphics.textLevel("Level: 1"); },
            //creep left to right ground
        ],
        levelTwoRenderList = [
            () => { graphics.textLevel("Level: 2"); },
            //creeps left to right ground
            //creeps top to bottom ground
        ],
        levelThreeRenderList = [
            () => { graphics.textLevel("Level: 3"); },
            //creeps left to right ground Air
            //creeps top to bottom groud Air
        ],
        gameEndRenderList = [
            () => { graphics.drawGameOver(); },
        ],
        gameStartRenderList = [

        ],
        demoRenderList = [

        ],
        towerGroup,
        level = 'none',
        placeTowers = false,
        currentTowerType = '',
        myCreepManager;
    const canvas = document.getElementById('canvas-main');

    function releaseCreeps() {
      graphics.cancel();

      myCreepManager.initCreeps(towerGroup);

        myCreepManager.addCreep('creep1', {
            gridPosition: { x: 0, y: 5 },
            targetGridPosition: { x: 14, y: 5},
            rotation: 0,
            shortestPath: [],
            direction: 'left',
            nextTarget: { x: 1, y: 5 },
            towerGroup: towerGroup,
        });
        myCreepManager.addCreep('creep2', {
            gridPosition: { x: 0, y: 6 },
            targetGridPosition: { x: 14, y: 6},
            rotation: 0,
            shortestPath: [],
            direction: 'left',
            nextTarget: { x: 1, y: 5 },
            towerGroup: towerGroup,
        });
        myCreepManager.addCreep('creep3', {
            gridPosition: { x: 0, y: 7 },
            targetGridPosition: { x: 14, y: 7},
            rotation: 0,
            shortestPath: [],
            direction: 'left',
            nextTarget: { x: 1, y: 5 },
            towerGroup: towerGroup,
        });
    }

    function startLevel(time, keyIn){
        //if(gamePhase === 'levelOne'){
            console.log("level started");
            let countDown2 = (data) => { events.add('count-down', 1000, 1, '2', graphics.renderTwo, countDown1, '1')};
            let countDown1 = (data) => { events.add('count-down', 1000, 1, '1', graphics.renderOne, releaseCreeps, 'play')};
            events.add('count-down', 1000, 1, '3', graphics.renderThree, countDown2, '2');
            myKeyboard.keyProcessed(keyIn);
        // }else if(gamePhase === 'levelTwo'){
        //     console.log("level started");
        //     let countDown2 = (data) => { events.add('count-down', 1000, 1, '2', graphics.renderTwo, countDown1, '1')};
        //     let countDown1 = (data) => { events.add('count-down', 1000, 1, '1', graphics.renderOne, releaseCreeps, 'play')};
        //     events.add('count-down', 1000, 1, '3', graphics.renderThree, countDown2, '2');
        //     myKeyboard.keyProcessed(keyIn);
        // }else if(gamePhase === 'levelThree'){
        //     console.log("level started");
        //     let countDown2 = (data) => { events.add('count-down', 1000, 1, '2', graphics.renderTwo, countDown1, '1')};
        //     let countDown1 = (data) => { events.add('count-down', 1000, 1, '1', graphics.renderOne, releaseCreeps, 'play')};
        //     events.add('count-down', 1000, 1, '3', graphics.renderThree, countDown2, '2');
        //     myKeyboard.keyProcessed(keyIn);
        // }
    }

    function gameOver(){
        if(creeps === 0){
            graphics.drawGameOver();
        }
    }

    function upgradeTower(){
        graphics.smoke(500,500);
        graphics.explosion(500,500);
        graphics.dies(500, 500);
        graphics.sold(100, 100);
        graphics.smoke(100, 100);
    }

    function sellTower() {

    }


        let gridCheck = document.querySelector('input[id="grid"]');
        gridCheck.onchange = function() {
            showGrid = false;
            if(gridCheck.checked) {
              showGrid = true;
            }
        }

        let weaponCheck = document.querySelector('input[id="weapon"]');
        weaponCheck.onchange = function() {
            if(weaponCheck.checked) {
                //add tower range render thing here.
            }else if(weaponCheck.checked === false){
                // does not clear when changed back.
            }
        }

    function keyDown(e){
       let newKey = e.key;
       myKeyboard.redirectHere(undefined);
    }

    function getNewKey(keyIn){

            if (keyIn === 'ut'){
                myKeyboard.redirectHere((e) => {
                    myKeyboard.unRegisterCommand(localStorage.getItem('upGradeTowerKey'));
                    localStorage['upGradeTowerKey'] = e.code;
                    document.getElementById("upgradeTowerLabel").innerHTML = "<div>Upgrade Tower HotKey: " + e.key + "</div>";
                    document.getElementById("upgradeTower").value='';
                    myKeyboard.keyProcessed(e.code);
                    myKeyboard.registerCommand(e.code, upgradeTowerHandler);
                    if (document.activeElement != document.body) document.activeElement.blur();
                    myKeyboard.redirectHere(undefined);
                });
            }else if(keyIn === 'st'){
                myKeyboard.redirectHere((e) => {
                    myKeyboard.unRegisterCommand(localStorage.getItem('sellTowerKey'));
                    localStorage['sellTowerKey'] = e.code;
                    document.getElementById("sellTowerLabel").innerHTML = "<div>Sell Tower HotKey: " + e.key + "</div>";
                    document.getElementById("sellTower").value='';
                    myKeyboard.keyProcessed(e.code);
                    myKeyboard.registerCommand(e.code, sellTowerHandler);
                    if (document.activeElement != document.body) document.activeElement.blur();
                    myKeyboard.redirectHere(undefined);
                });
            }else if(keyIn === 'sl'){
                myKeyboard.redirectHere((e) => {
                    myKeyboard.unRegisterCommand(localStorage.getItem('startLevelKey'));
                    localStorage['startLevelKey'] = e.code;
                    document.getElementById("startNextLevelLabel").innerHTML = "<div>Start Next Level HotKey: " + e.key + "</div>";
                    document.getElementById("startNextLevel").value='';
                    myKeyboard.keyProcessed(e.code);
                    myKeyboard.registerCommand(e.code, startLevelHandler);
                    if (document.activeElement != document.body) document.activeElement.blur();
                    myKeyboard.redirectHere(undefined);
                });
            }
    }


    function initialize() {
        console.log('Tower game initializing...');

        gameInfo = {};
        money = 50;
        life = 10;
        backGround.src = backgroundImage;
        backGround.addEventListener('load', backgroundLoaded, false);
        let optionsPopUp = document.getElementById('diaOptions');
        document.getElementById('startLevel').addEventListener(
            'click',
            function() { startLevel(); });
        
        document.getElementById('gameOptions').addEventListener(
            'click',
            function() {
                document.getElementById("upgradeTowerLabel").innerHTML = "<div>Upgrade Tower HotKey: " + String.fromCharCode(localStorage.getItem('upGradeTowerKey')) + "</div>";
                document.getElementById("sellTowerLabel").innerHTML = "<div>Sell Tower HotKey: " + String.fromCharCode(localStorage.getItem('sellTowerKey')) + "</div>";
                document.getElementById("startNextLevelLabel").innerHTML = "<div>Start Next Level HotKey: " + String.fromCharCode(localStorage.getItem('startLevelKey')) + "</div>";
                optionsPopUp.showModal();
            });

        document.getElementById('upgradeTower').addEventListener(
            'focus',
            function () {
                getNewKey('ut');
            });

        document.getElementById('sellTower').addEventListener(
            'focus',
            function () {
                getNewKey('st');
            });

        document.getElementById('startNextLevel').addEventListener(
            'focus',
            function () {
                getNewKey('sl');
            });
            
        document.getElementById('exitGame').addEventListener(
            'click',
            function() {
                cancelNextRequest = true;
                game.showScreen('main-menu');
                towerGroup.reset();

                //save score
                //score = 0;
                //resetCreeps
            });
        
        document.getElementById('tower1').addEventListener('click', ()=> {
            placeTowers = true;
            currentTowerType = 'tower1';
        });
        
        document.getElementById('tower2').addEventListener('click', ()=> {
            placeTowers = true;
            currentTowerType = 'tower2';
        });
        
        document.getElementById('tower3').addEventListener('click', ()=> {
            placeTowers = true;
            currentTowerType = 'tower3';
        });
        
        document.getElementById('tower4').addEventListener('click', ()=> {
            placeTowers = true;
            currentTowerType = 'tower4';
        });
        
        towerGroup = gameObjects.TowerGroup({});

        myCreepManager = gameObjects.CreepManager({});


        myKeyboard.registerCommand(localStorage.getItem('upGradeTowerKey') || upgradeTowerKey, postScorez);  //Need upgrade tower function
        myKeyboard.registerCommand(localStorage.getItem('sellTowerKey') || sellTowerKey, scorez);              // Sell tower function needed
        myKeyboard.registerCommand(localStorage.getItem('startLevelKey') || startLevelKey, startLevel);       //Need to fix when setting buttons
        myKeyboard.registerCommand(KeyEvent.DOM_VK_ESCAPE, function() {

            cancelNextRequest = true;
            // Then, return to the main menu
            game.showScreen('main-menu');
        });

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
            towerGroup.update(elapsedTime);
            myCreepManager.update(elapsedTime);
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

        towerGroup.render();
        myCreepManager.render();
        if(showGrid){
            graphics.drawGrid();
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

    function alignToGameGrid(val) {
        return Math.floor(val / graphics.cellWidth);
    }

    function run() {
        lastTimeStamp = performance.now();
        cancelNextRequest = false;
        currentUpdateAndRenderList = gameStartRenderList;

        gamePhase = 'play-game';

        // Testing turret rotation
        myMouse.registerCommand('mousedown', function (e, elapsedTime) {
            if (placeTowers && e.target == canvas) {
                let gridPosition = {
                    x: alignToGameGrid(e.offsetX),
                    y: alignToGameGrid(e.offsetY)
                };
                if (!towerGroup.towerExistsAtPosition(gridPosition)) {
                    towerGroup.addTower(currentTowerType, gridPosition);
                    placeTowers = false;
                    currentTowerType = '';
                }
                
            }
        });

        requestAnimationFrame(gameLoop);
    }

    return {
        initialize : initialize,
        run : run,
        getNewKey: getNewKey,
    }

}(MyGame.game, MyGame.towerGraphics, MyGame.towerEvents, MyGame.input, MyGame.objects));

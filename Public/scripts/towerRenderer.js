MyGame.towerGraphics = (function(effects) {
    let canvas = document.getElementById('canvas-main');
    let ctx = canvas.getContext('2d');
    let currentRunningList = [];
    let gridWidth = 600;
    let squares = gridWidth/15;
    let deadCreep = [];
    let explodeCreeps = [];
    let towerSell = [];
    let creepParts = [];

    function setCurrentGameList(currentList) {
        currentRunningList = currentList;
    }

    function updateScore(score) {
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("SCORE: " + score, 510, 590);
    }

    function updateDeadCreeps() {
        deadCreep.forEach((creepParts) => {
            if (creepParts.brick.y > canvas.height * .6) {
                for(let i=0; i<12; i++) {
                    for(let j=0; j<6; j++) {
                        // sprites.explosionOne(ctx, deadBrick.brick.x+(brickWidth/2), deadBrick.brick.y+(brickHeight/2));
                        sprites.smokeBomb(ctx, deadBrick.brick.x+(brickWidth/2), deadBrick.brick.y+(brickHeight/2));
                        explodoBricks.push({ x: deadBrick.brick.x+1, y: deadBrick.brick.y+1, color: deadBrick.brick.color });
                    }
                }
                fallingBricks.splice(creep, 1);
            }
            if (creepParts.brick.y % 5 === 0) {
                creepParts.dropIndex = creep.dropIndex + 1;
            }
            creepParts.brick.y = creepParts.brick.y + creepParts.dropIndex;
        })
    }


    function textLevel(text) {
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(text, 60, 630);
    }

    function renderMoney(money) {
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(`$Money: ${money}`, 270, 630);
    }

    function updateLife() {
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Life Remaining: ", 480, 630);
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

    function drawGameOver(){
        ctx.font = "100px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
        // add "esc to go back to main screen"
        ctx.font = "25px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText('To main creeps got past you', canvas.width / 2, canvas.height / 1.75);
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

    function explosion(x,y){
        effects.explosionOne(ctx, x, y);
    }

    function smoke(x,y){
        effects.smokeBomb(ctx,x,y);
    }

    function dies(x,y){
        effects.creepDies(ctx,x,y);
    }

    function sold(x,y){
        effects.towerSold(ctx,x,y);
    }

    //------------------------------------------------------------------
    //
    // Simple sprite, one image in the texture.
    //
    //------------------------------------------------------------------
    function Sprite(spec) {
        var that = {},
            image = new Image();

        //
        // Load the image, set the ready flag once it is loaded so that
        // rendering can begin.
        image.onload = function () {
            //
            // Our clever trick, replace the draw function once the image is loaded...no if statements!
            that.draw = function () {
                ctx.save();

                ctx.translate(spec.center.x, spec.center.y);
                ctx.rotate(spec.rotation);
                ctx.translate(-spec.center.x, -spec.center.y);

                //
                // Pick the selected sprite from the sprite sheet to render
                ctx.drawImage(
                    image,
                    spec.center.x - image.width / 2,
                    spec.center.y - image.height / 2,
                    image.width, image.height);

                ctx.restore();
            };
            //
            // Once the image is loaded, we can compute the height and width based upon
            // what we know of the image and the number of sprites in the sheet.
            spec.height = image.height;
            spec.width = image.width / spec.spriteCount;
        };
        image.src = spec.sprite;

        that.rotateRight = function (angle) {
            spec.rotation += angle;
        };

        that.rotateLeft = function (angle) {
            spec.rotation -= angle;
        };

        //------------------------------------------------------------------
        //
        // Render the correct sprint from the sprite sheet
        //
        //------------------------------------------------------------------
        that.draw = function () {
            //
            // Starts out empty, but gets replaced once the image is loaded!
        };

        //
        // The other side of that hack job
        that.drawArc = function (radius) {
            ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
            ctx.beginPath();
            ctx.arc(spec.center.x, spec.center.y, radius*squares, 0, 2 * Math.PI);
            ctx.fill();
        };

        that.updateImage = (sprite) => {
            image.src = sprite;
        };

        return that;
    }

    //------------------------------------------------------------------
    //
    // Provides rendering support for a sprite animated from a sprite sheet.
    //
    //------------------------------------------------------------------
    function SpriteSheet(spec) {
        var that = {},
            image = new Image();

        //
        // Initialize the animation of the spritesheet
        spec.sprite = 0;		// Which sprite to start with
        spec.elapsedTime = 0;	// How much time has occured in the animation

        //
        // Load the image, set the ready flag once it is loaded so that
        // rendering can begin.
        image.onload = function () {
            //
            // Our clever trick, replace the draw function once the image is loaded...no if statements!
            that.draw = function () {
                ctx.save();

                ctx.translate(spec.center.x, spec.center.y);
                ctx.rotate(spec.rotation);
                ctx.translate(-spec.center.x, -spec.center.y);

                //
                // Pick the selected sprite from the sprite sheet to render
                ctx.drawImage(
                    image,
                    spec.width * spec.sprite, 0,	// Which sprite to pick out
                    spec.width, spec.height,		// The size of the sprite
                    spec.center.x - spec.width / 2,	// Where to draw the sprite
                    spec.center.y - spec.height / 2,
                    spec.width, spec.height);

                ctx.restore();
            };
            //
            // Once the image is loaded, we can compute the height and width based upon
            // what we know of the image and the number of sprites in the sheet.
            spec.height = image.height;
            spec.width = image.width / spec.spriteCount;
        };
        image.src = spec.spriteSheet;

        //------------------------------------------------------------------
        //
        // Update the animation of the sprite based upon elapsed time.
        //
        //------------------------------------------------------------------
        that.update = function (elapsedTime, forward) {
            spec.elapsedTime += elapsedTime;
            //
            // Check to see if we should update the animation frame
            if (spec.elapsedTime >= spec.spriteTime[spec.sprite]) {
                //
                // When switching sprites, keep the leftover time because
                // it needs to be accounted for the next sprite animation frame.
                spec.elapsedTime -= spec.spriteTime[spec.sprite];
                //
                // Depending upon the direction of the animation...
                if (forward === true) {
                    spec.sprite += 1;
                    //
                    // This provides wrap around from the last back to the first sprite
                    spec.sprite = spec.sprite % spec.spriteCount;
                } else {
                    spec.sprite -= 1;
                    //
                    // This provides wrap around from the first to the last sprite
                    if (spec.sprite < 0) {
                        spec.sprite = spec.spriteCount - 1;
                    }
                }
            }
        };

        //------------------------------------------------------------------
        //
        // Render the correct sprint from the sprite sheet
        //
        //------------------------------------------------------------------
        that.draw = function () {
            //
            // Starts out empty, but gets replaced once the image is loaded!
        };

        return that;
    }

    function drawGridSquare(position, color) {
        ctx.fillStyle = color;
        let xStart = position.x * squares;
        let xEnd = squares;
        let yStart = position.y * squares;
        let yEnd = squares;
        ctx.fillRect(xStart + 1, yStart + 1, xEnd - 2, yEnd - 2);
    }

    return {

        clear: clear,
        renderOne: renderOne,
        renderTwo: renderTwo,
        renderThree: renderThree,
        cancel: cancel,
        drawBackground: drawBackground,
        drawGrid: drawGrid,
        textLevel: textLevel,
        renderMoney: renderMoney,
        updateLife: updateLife,
        renderWalls: renderWalls,
        drawGameOver: drawGameOver,
        Sprite: Sprite,
        SpriteSheet: SpriteSheet,
        explosion:explosion,
        smoke: smoke,
        updateDeadCreeps: updateDeadCreeps,
        dies: dies,
        sold: sold,
        gridWidth: gridWidth,
        cellWidth: squares,
        drawGridSquare: drawGridSquare,
    };

}(MyGame.effectSystem));
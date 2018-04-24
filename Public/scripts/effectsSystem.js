MyGame.effectSystem = (function (game, graphics, events) {
  'use strict';

  let smokeFrames = [
    {
      "frame": {"x":45,"y":394,"w":31,"h":27},
      "spriteSourceSize": {"x":17,"y":20,"w":31,"h":27},
    },
    {
      "frame": {"x":199,"y":175,"w":37,"h":32},
      "spriteSourceSize": {"x":14,"y":17,"w":37,"h":32},
    },
    {
      "frame": {"x":1,"y":394,"w":42,"h":35},
      "spriteSourceSize": {"x":12,"y":15,"w":42,"h":35},
    },
    {
      "frame": {"x":199,"y":135,"w":46,"h":38},
      "spriteSourceSize": {"x":10,"y":14,"w":46,"h":38},
    },
    {
      "frame": {"x":199,"y":91,"w":49,"h":42},
      "spriteSourceSize": {"x":8,"y":12,"w":49,"h":42},
    },
    {
      "frame": {"x":199,"y":47,"w":51,"h":42},
      "spriteSourceSize": {"x":7,"y":12,"w":51,"h":42},
    },
    {
      "frame": {"x":199,"y":1,"w":54,"h":44},
      "spriteSourceSize": {"x":6,"y":11,"w":54,"h":44},
    },
    {
      "frame": {"x":198,"y":224,"w":56,"h":45},
      "spriteSourceSize": {"x":5,"y":10,"w":56,"h":45},
    },
    {
      "frame": {"x":196,"y":329,"w":58,"h":46},
      "spriteSourceSize": {"x":4,"y":10,"w":58,"h":46},
    },
    {
      "frame": {"x":195,"y":381,"w":59,"h":47},
      "spriteSourceSize": {"x":4,"y":9,"w":59,"h":47},
    },
    {
      "frame": {"x":132,"y":381,"w":61,"h":48},
      "spriteSourceSize": {"x":3,"y":9,"w":61,"h":48},
    },
    {
      "frame": {"x":133,"y":278,"w":62,"h":49},
       "spriteSourceSize": {"x":2,"y":8,"w":62,"h":49},
    },
    {
      "frame": {"x":132,"y":329,"w":62,"h":50},
      "spriteSourceSize": {"x":2,"y":8,"w":62,"h":50},
    },
    {
      "frame": {"x":67,"y":336,"w":63,"h":51},
      "spriteSourceSize": {"x":1,"y":7,"w":63,"h":51},
    },
    {
      "frame": {"x":67,"y":282,"w":63,"h":52},
      "spriteSourceSize": {"x":1,"y":7,"w":63,"h":52},
    },
    {
      "frame": {"x":133,"y":224,"w":63,"h":52},
      "spriteSourceSize": {"x":1,"y":7,"w":63,"h":52},
    },
    {
      "frame": {"x":1,"y":285,"w":64,"h":53},
      "spriteSourceSize": {"x":0,"y":6,"w":64,"h":53},
    },
    {
      "frame": {"x":67,"y":227,"w":64,"h":53},
      "spriteSourceSize": {"x":0,"y":6,"w":64,"h":53},
    },
    {
      "frame": {"x":133,"y":169,"w":64,"h":53},
      "spriteSourceSize": {"x":0,"y":6,"w":64,"h":53},
    },
    {
      "frame": {"x":1,"y":117,"w":64,"h":54},
      "spriteSourceSize": {"x":0,"y":6,"w":64,"h":54},
    },
    {
      "frame": {"x":67,"y":59,"w":64,"h":54},
      "spriteSourceSize": {"x":0,"y":6,"w":64,"h":54},
    },
    {
      "frame": {"x":133,"y":1,"w":64,"h":54},
      "spriteSourceSize": {"x":0,"y":6,"w":64,"h":54},
    },
    {
      "frame": {"x":1,"y":173,"w":64,"h":54},
      "spriteSourceSize": {"x":0,"y":6,"w":64,"h":54},
    },
    {
      "frame": {"x":67,"y":115,"w":64,"h":54},
      "spriteSourceSize": {"x":0,"y":6,"w":64,"h":54},
    },
    {
      "frame": {"x":133,"y":57,"w":64,"h":54},
      "spriteSourceSize": {"x":0,"y":6,"w":64,"h":54},
    },
    {
      "frame": {"x":1,"y":229,"w":64,"h":54},
      "spriteSourceSize": {"x":0,"y":6,"w":64,"h":54},
    },
    {
      "frame": {"x":67,"y":171,"w":64,"h":54},
      "spriteSourceSize": {"x":0,"y":6,"w":64,"h":54},
    },
    {
      "frame": {"x":133,"y":113,"w":64,"h":54},
      "spriteSourceSize": {"x":0,"y":6,"w":64,"h":54},
    },
    {
      "frame": {"x":1,"y":1,"w":64,"h":56},
      "spriteSourceSize": {"x":0,"y":4,"w":64,"h":56},
    },
    {
      "frame": {"x":1,"y":59,"w":64,"h":56},
      "spriteSourceSize": {"x":0,"y":4,"w":64,"h":56},
    },
    {
      "frame": {"x":67,"y":1,"w":64,"h":56},
      "spriteSourceSize": {"x":0,"y":4,"w":64,"h":56},
    },
    {
      "frame": {"x":1,"y":340,"w":64,"h":52},
      "spriteSourceSize": {"x":0,"y":4,"w":64,"h":52},
    }
  ];
  let explodeFrames = [
    {
      "frame": {"x":817,"y":1,"w":31,"h":31},
      "spriteSourceSize": {"x":1,"y":1,"w":31,"h":31},
    },
    {
      "frame": {"x":850,"y":1,"w":31,"h":31},
      "spriteSourceSize": {"x":1,"y":1,"w":31,"h":31},
    },
    {
      "frame": {"x":1,"y":1,"w":32,"h":32},
      "spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
    },
    {
      "frame": {"x":35,"y":1,"w":32,"h":32},
      "spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
    },
    {
      "frame": {"x":69,"y":1,"w":32,"h":32},
      "spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
    },
    {
      "frame": {"x":103,"y":1,"w":32,"h":32},
      "spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
    },
    {
      "frame": {"x":137,"y":1,"w":32,"h":32},
      "spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
    },
    {
      "frame": {"x":171,"y":1,"w":32,"h":32},
      "spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
    },
    {
      "frame": {"x":205,"y":1,"w":32,"h":32},
      "spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
    },
    {
      "frame": {"x":239,"y":1,"w":32,"h":32},
      "spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
    },
    {
      "frame": {"x":273,"y":1,"w":32,"h":32},
      "spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
    },
    {
      "frame": {"x":307,"y":1,"w":32,"h":32},
      "spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
    },
    {
      "frame": {"x":341,"y":1,"w":32,"h":32},
      "spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
    },
    {
      "frame": {"x":375,"y":1,"w":32,"h":32},
      "spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
    },
    {
      "frame": {"x":409,"y":1,"w":32,"h":32},
      "spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
    },
    {
      "frame": {"x":443,"y":1,"w":32,"h":32},
      "spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
    },
    {
      "frame": {"x":477,"y":1,"w":32,"h":32},
      "spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
    },
    {
      "frame": {"x":511,"y":1,"w":32,"h":32},
      "spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
    },
    {
      "frame": {"x":545,"y":1,"w":32,"h":32},
      "spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
    },
    {
      "frame": {"x":579,"y":1,"w":32,"h":32},
      "spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
    },
    {
      "frame": {"x":613,"y":1,"w":32,"h":32},
      "spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
    },
    {
      "frame": {"x":647,"y":1,"w":32,"h":32},
      "spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
    },
    {
      "frame": {"x":681,"y":1,"w":32,"h":32},
      "spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
    },
    {
      "frame": {"x":715,"y":1,"w":32,"h":32},
      "spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
    },
    {
      "frame": {"x":749,"y":1,"w":32,"h":32},
      "spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
    },
    {
      "frame": {"x":783,"y":1,"w":32,"h":32},
      "spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
    },
    {
      "frame": {"x":883,"y":1,"w":25,"h":29},
      "spriteSourceSize": {"x":4,"y":2,"w":25,"h":29},
    },
    {
      "frame": {"x":910,"y":1,"w":26,"h":28},
      "spriteSourceSize": {"x":3,"y":2,"w":26,"h":28},
    },
    {
      "frame": {"x":938,"y":1,"w":23,"h":27},
      "spriteSourceSize": {"x":6,"y":3,"w":23,"h":27},
    },
    {
      "frame": {"x":963,"y":1,"w":21,"h":11},
      "spriteSourceSize": {"x":7,"y":11,"w":21,"h":11},
    },
    {
      "frame": {"x":963,"y":14,"w":14,"h":8},
      "spriteSourceSize": {"x":7,"y":10,"w":14,"h":8},
    },
    {
      "frame": {"x":938,"y":30,"w":3,"h":3},
      "spriteSourceSize": {"x":18,"y":11,"w":3,"h":3},
    }];
///////////////////////////////////////////////////////////////////////////////////Explosion///////////////////////////////////////////////
  function explosionOne(ctx, x, y) {
  // eventName, spriteSheet, spriteCount, spritesRows, spritesCols, pixelsWidth, pixelsHeight, timeInterval
    let sprites = new Image();
    sprites.addEventListener('load', spritesLoaded, false);
    sprites.src = 'images/explosion/explosion.png';
    // let spriteData = require('images/explosion/explosion.json');
    // let frames = jsonStuff.length;
    let currentFrame = 0;

    function spritesLoaded() {
      // (name, interval, count, data, update, cb, cbParm, cancelWhen) {
      events.add('explosionAnimation', 50, explodeFrames.length, frames, renderSprite );
    }

    function renderSprite() {
      let frame = explodeFrames[currentFrame];
      if (frame) {
        ctx.drawImage(sprites, frame.frame.x, frame.frame.y, frame.frame.w, frame.frame.h, x-frame.spriteSourceSize.w/2, y-frame.spriteSourceSize.h/2, frame.spriteSourceSize.w, frame.spriteSourceSize.h);
      }
      // graphics.renderSprite(sprites, explodeFrames[currentFrame], x, y);
      // animateObject.nextSprite(ctx);
      currentFrame = currentFrame + 1;
    }
  }
///////////////////////////////////////////////////////////////////////////////////smokeBomb///////////////////////////////////////////////
  function smokeBomb(ctx, x, y) {
    // eventName, spriteSheet, spriteCount, spritesRows, spritesCols, pixelsWidth, pixelsHeight, timeInterval
    let sprites = new Image();
    sprites.addEventListener('load', spritesLoaded, false);
    sprites.src = 'images/explosion/smokePuff.png';
    // let spriteData = require('images/explosion/explosion.json');
    // let frames = jsonStuff.length;
    let smokeFrame = 0;

    function spritesLoaded() {
      // (name, interval, count, data, update, cb, cbParm, cancelWhen) {
      events.add('smokeAnimation', 200, smokeFrames.length, frames, renderSmoke );
    }

    function renderSmoke() {
      let frame = smokeFrames[smokeFrame];
      if (frame) {
        ctx.drawImage(sprites, frame.frame.x, frame.frame.y, frame.frame.w, frame.frame.h, x-frame.spriteSourceSize.w/2, y-frame.spriteSourceSize.h/2, frame.spriteSourceSize.w, frame.spriteSourceSize.h);
      }
      // graphics.renderSprite(sprites, explodeFrames[currentFrame], x, y);
      // animateObject.nextSprite(ctx);
      smokeFrame = smokeFrame + 1;
    }
  }
///////////////////////////////////////////////////////////////////////////////////CREEP-DIES///////////////////////////////////////////////
  function creepDies(ctx,x,y){
    let creepParts = [];

    for(let i=0; i<7; i++){
      for(let j=0; j<7; j++){
        creepParts.push({x:x+i*3,y:y+j*3, width:5, height:5});
        }
    }

      events.add('creepDeath', 65, 5, creepParts, renderExplodeCreeps);

      function getRandomInt(min, max) {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
      }

    function renderExplodeCreeps() {
        creepParts.forEach((part) => {
            part.x = part.x + getRandomInt(-6, 6);
            part.y = part.y + getRandomInt(-6, 6);
        })
        creepParts.forEach((particle) => {
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = 'black';
            ctx.rect(particle.x+1, particle.y+1, particle.width, particle.height);
            ctx.fillStyle = 'black';
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        })
    }

  }
 //////////////////////////////////////////////////////////////////////////////////////////CREEP-DIES///////////////////////////////////////////////
    function creepDies(ctx,x,y){
        let creepParts = [];

        for(let i=0; i<7; i++){
            for(let j=0; j<7; j++){
                creepParts.push({x:x+i*3,y:y+j*3, width:3, height:3});
            }
        }

        events.add('creepDeath', 65, 5, creepParts, renderExplodeCreeps);

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
        }

        function renderExplodeCreeps() {
            creepParts.forEach((part) => {
                part.x = part.x + getRandomInt(-6, 6);
                part.y = part.y + getRandomInt(-6, 6);
            })
            creepParts.forEach((particle) => {
                ctx.save();
                ctx.beginPath();
                ctx.strokeStyle = 'black';
                ctx.rect(particle.x+1, particle.y+1, particle.width, particle.height);
                ctx.fillStyle = '#b6732f';
                ctx.fill();
                ctx.stroke();
                ctx.closePath();
                ctx.restore();
            })
        }

    }
///////////////////////////////////////////////////////////////////////////////////TowerSold///////////////////////////////////////////////
    function towerSold(ctx,x,y){
        let towerParts = [];

        for(let i=0; i<7; i++){
            for(let j=0; j<7; j++){
                towerParts.push({x:x+i*3,y:y+j*3, width:3, height:3});
            }
        }

        events.add('towerSold', 65, 5, towerParts, renderExplodeTower);

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
        }

        function renderExplodeTower() {
            towerParts.forEach((part) => {
                part.x = part.x + getRandomInt(-6, 6);
                part.y = part.y + getRandomInt(-6, 6);
            })
            towerParts.forEach((particle) => {
                ctx.save();
                ctx.beginPath();
                ctx.strokeStyle = 'black';
                ctx.rect(particle.x+1, particle.y+1, particle.width, particle.height);
                ctx.fillStyle = 'gold';
                ctx.fill();
                ctx.stroke();
                ctx.closePath();
                ctx.restore();
            })
        }

    }
///////////////////////////////////////////////////////////////////////////////////missileTrail///////////////////////////////////////////////
    function missleTrail(ctx,x,y){
        let towerParts = [];

        for(let i=0; i<7; i++){
            for(let j=0; j<7; j++){
                towerParts.push({x:x+i*3,y:y+j*3, width:3, height:3});
            }
        }

        events.add('towerSold', 65, 5, towerParts, renderExplodeTower);

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
        }

        function renderExplodeTower() {
            towerParts.forEach((part) => {
                part.x = part.x + getRandomInt(-6, 6);
                part.y = part.y + getRandomInt(-6, 6);
            })
            towerParts.forEach((particle) => {
                ctx.save();
                ctx.beginPath();
                ctx.strokeStyle = 'black';
                ctx.rect(particle.x+1, particle.y+1, particle.width, particle.height);
                ctx.fillStyle = 'gold';
                ctx.fill();
                ctx.stroke();
                ctx.closePath();
                ctx.restore();
            })
        }

    }
  // function missleTrail() {
  //   let countDown2 = (data) => { events.add('count-down', 1000, 1, '2', updateAndRender, countDown1, '1')};
  //   let countDown1 = (data) => { events.add('count-down', 1000, 1, '1', graphics.renderOne, waitAnimation, 'play')};
  //   let waitAnimation = (data) => { events.add('waitAnimation', 3000, 1, '1', undefined  , changePhase, 'play', graphics.allBricksPlaced)};
  //   events.add('count-down', 1000, 1, '3', graphics.renderThree, countDown2, '2');
  // }
  //
  // function missleExplosion() {
  //   let countDown2 = (data) => { events.add('count-down', 1000, 1, '2', updateAndRender, countDown1, '1')};
  //   let countDown1 = (data) => { events.add('count-down', 1000, 1, '1', graphics.renderOne, waitAnimation, 'play')};
  //   let waitAnimation = (data) => { events.add('waitAnimation', 3000, 1, '1', undefined  , changePhase, 'play', graphics.allBricksPlaced)};
  //   events.add('count-down', 1000, 1, '3', graphics.renderThree, countDown2, '2');
  // }
  //
  // function towerSold() {
  //   let countDown2 = (data) => { events.add('count-down', 1000, 1, '2', updateAndRender, countDown1, '1')};
  //   let countDown1 = (data) => { events.add('count-down', 1000, 1, '1', graphics.renderOne, waitAnimation, 'play')};
  //   let waitAnimation = (data) => { events.add('waitAnimation', 3000, 1, '1', undefined  , changePhase, 'play', graphics.allBricksPlaced)};
  //   events.add('count-down', 1000, 1, '3', graphics.renderThree, countDown2, '2');
  // }

  // ------------------------------------------------------------------
  //
  // Allows a new event to be added to the array
  //
  // ------------------------------------------------------------------
  // function add(name, interval, count, data, update, cb, cbParm, cancelWhen) {
  //   console.log(`adding event ${name}`);
  //   boEvents.push( {
  //     name: name,
  //     interval: interval,
  //     count: count,
  //     startTime: performance.now(),
  //     updateAndRender: update,
  //     callBack: cb,
  //     elapsed: 0,
  //     data: data,
  //     callBackParms: cbParm,
  //     cancelWhen: cancelWhen,
  //   });
  // }

  return {
    explosionOne: explosionOne,
    smokeBomb: smokeBomb,
      creepDies: creepDies,
      towerSold: towerSold,

  };
}(MyGame.game, MyGame.towerGraphics, MyGame.towerEvents));

MyGame.particleSystem = (function (game, events) {
    'use strict';

    function creepDies() {
        let firstStage = (data) => { events.add('creep-die-one', 1000, 1, '1', creepDieSecond, secondStage, '')};
        let secondStage = (data) => { events.add('creep-die-two', 1000, 1, '2', creepDieThird, finalStage, '')};
        let finalStage = (data) => { events.add('creep-dead', 3000, 1, '3', creepDieFinal  , creepGone, '', allCreepPartsGone)};
        events.add('creep-die', 1000, 1, '3', creepDieStart, firstStage, '');
    }

    function bombTrail() {
        let firstStage = (data) => { events.add('bomb-trail-start', 1000, 1, '2', bombTrailSecond, secondStage, '')};
        let secondStage = (data) => { events.add('bomb-trail-two', 1000, 1, '1', bombTrailThird, finalStage, '')};
        let finalStage = (data) => { events.add('bomb-trail-done', 3000, 1, '1', bombTrailFinal  , bombDone, '', bombTrailComplete)};
        events.add('bomb-trail', 1000, 1, '', bombTrailStart, firstStage, '2');
    }

    function bombHits() {
        let firstStage = (data) => { events.add('bomb-hit-start', 1000, 1, '2', bombHitStart, secondStage, '')};
        let secondStage = (data) => { events.add('bomb-hit-two', 1000, 1, '1', bombHitSecond, finalStage, '')};
        let finalStage = (data) => { events.add('bomb-hit-done', 3000, 1, '1', undefined  , bombHitDone, '', bombHitComplete)};
        events.add('count-down', 1000, 1, '3', bombHitStart, finalStage, '2');
    }

    function missleTrail() {
        let countDown2 = (data) => { events.add('count-down', 1000, 1, '2', updateAndRender, countDown1, '1')};
        let countDown1 = (data) => { events.add('count-down', 1000, 1, '1', graphics.renderOne, waitAnimation, 'play')};
        let waitAnimation = (data) => { events.add('waitAnimation', 3000, 1, '1', undefined  , changePhase, 'play', graphics.allBricksPlaced)};
        events.add('count-down', 1000, 1, '3', graphics.renderThree, countDown2, '2');
    }

    function missleExplosion() {
        let countDown2 = (data) => { events.add('count-down', 1000, 1, '2', updateAndRender, countDown1, '1')};
        let countDown1 = (data) => { events.add('count-down', 1000, 1, '1', graphics.renderOne, waitAnimation, 'play')};
        let waitAnimation = (data) => { events.add('waitAnimation', 3000, 1, '1', undefined  , changePhase, 'play', graphics.allBricksPlaced)};
        events.add('count-down', 1000, 1, '3', graphics.renderThree, countDown2, '2');
    }

    function towerSold() {
        let countDown2 = (data) => { events.add('count-down', 1000, 1, '2', updateAndRender, countDown1, '1')};
        let countDown1 = (data) => { events.add('count-down', 1000, 1, '1', graphics.renderOne, waitAnimation, 'play')};
        let waitAnimation = (data) => { events.add('waitAnimation', 3000, 1, '1', undefined  , changePhase, 'play', graphics.allBricksPlaced)};
        events.add('count-down', 1000, 1, '3', graphics.renderThree, countDown2, '2');
    }

    // ------------------------------------------------------------------
    //
    // Allows a new event to be added to the array
    //
    // ------------------------------------------------------------------
    function add(name, interval, count, data, update, cb, cbParm, cancelWhen) {
        console.log(`adding event ${name}`);
        boEvents.push( {
            name: name,
            interval: interval,
            count: count,
            startTime: performance.now(),
            updateAndRender: update,
            callBack: cb,
            elapsed: 0,
            data: data,
            callBackParms: cbParm,
            cancelWhen: cancelWhen,
        });
    }

    return {
        creepDies: creepDies,
        bombTrail: bombTrail,
        bombHits: bombHits,
        missleTrail: missleTrail,
        missleExplosion: missleExplosion,
        towerSold: towerSold,
    };
}(MyGame.game, MyGame.towerEvents));
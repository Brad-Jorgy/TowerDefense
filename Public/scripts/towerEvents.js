MyGame.towerEvents = (function () {
    'use strict';
    let miniEvents = [];	// Array of the currently active events.

    // ------------------------------------------------------------------
    //
    // Allows a new event to be added to the array
    //
    // ------------------------------------------------------------------
    function add(name, interval, count, data, update, cb, cbParm, cancelWhen) {
        console.log(`adding event ${name}`);
        miniEvents.push( {
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

    // ------------------------------------------------------------------
    //
    // Updates the status of all events in the game.
    //
    // ------------------------------------------------------------------
    function updateEvents(elapsedTime, currentList) {
        var event,
            expiredEvents = [],
            actionsRequired = [];


        for (event = 0; event < miniEvents.length; event++) {
            miniEvents[event].elapsed += elapsedTime;
            if (miniEvents[event].cancelWhen && miniEvents[event].cancelWhen.call()) {
                expiredEvents[expiredEvents.length] = event;
                miniEvents[event].callBack.call(miniEvents[event].callBackParms);
            } else if (miniEvents[event].elapsed >= miniEvents[event].interval) {
                miniEvents[event].elapsed = (miniEvents[event].elapsed - miniEvents[event].interval);
                miniEvents[event].count--;
                //
                // Debugging statement, not a rendering...in other words, I'm doing what I say
                // console.log(miniEvents[event].name + ' - event hit! (' + miniEvents[event].count + ' remaining)');
                //
                // Add the event to the list of those that need rendering
                actionsRequired.push(miniEvents[event]);

                if (miniEvents[event].count === 0) {
                    expiredEvents[expiredEvents.length] = event;
                    if(miniEvents[event].callBackParms) {
                        console.log(`about to call ${miniEvents[event].callBackParms}`);
                        miniEvents[event].callBack.call(this, miniEvents[event].callBackParms);
                    }
                }
            } else if (miniEvents[event].updateAndRender) {
                // console.log(`pushing ${miniEvents[event].updateAndRender }`);
                // add stuff to needs to be rendered while this event is active
                currentList.push(miniEvents[event].updateAndRender);
            }
        }

        //
        // Clean up any events that have expired
        if (expiredEvents.length > 0) {
            for (event = expiredEvents.length - 1; event >= 0; event -= 1) {
                miniEvents.splice(expiredEvents[event], 1);
            }
        }

        // return list of triggered events
        return actionsRequired;
    }

    return {
        add: add,
        updateEvents: updateEvents,
    };
}());
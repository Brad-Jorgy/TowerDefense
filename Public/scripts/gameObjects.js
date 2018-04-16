MyGame.objects = (function (graphics) {

    //------------------------------------------------------------------
    //
    // Returns the magnitude of the 2D cross product.  The sign of the
    // magnitude tells you which direction to rotate to close the angle
    // between the two vectors.
    //
    //------------------------------------------------------------------
    function crossProduct2d(v1, v2) {
        return (v1.x * v2.y) - (v1.y * v2.x);
    }

    //------------------------------------------------------------------
    //
    // Computes the angle, and direction (cross product) between two vectors.
    //
    //------------------------------------------------------------------
    function computeAngle(rotation, ptCenter, ptTarget) {
        var v1 = {
                x: Math.cos(rotation),
                y: Math.sin(rotation)
            },
            v2 = {
                x: ptTarget.x - ptCenter.x,
                y: ptTarget.y - ptCenter.y
            },
            dp,
            angle;

        v2.len = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
        v2.x /= v2.len;
        v2.y /= v2.len;

        dp = v1.x * v2.x + v1.y * v2.y;
        angle = Math.acos(dp);

        //
        // Get the cross product of the two vectors so we can know
        // which direction to rotate.
        let cp = crossProduct2d(v1, v2);

        return {
            angle: angle,
            crossProduct: cp
        };
    }

    //------------------------------------------------------------------
    //
    // Simple helper function to help testing a value with some level of tolerance.
    //
    //------------------------------------------------------------------
    function testTolerance(value, test, tolerance) {
        if (Math.abs(value - test) < tolerance) {
            return true;
        } else {
            return false;
        }
    }

    //------------------------------------------------------------------
    //
    // Defines a tower that has a base sprite and a weapon sprite that will
    // rotate towards the current 'target'.
    //
    //------------------------------------------------------------------
    function Tower(spec) {
        spec.center = {
            x: spec.gridPosition.x * graphics.cellWidth + graphics.cellWidth/2,
            y: spec.gridPosition.y * graphics.cellWidth + graphics.cellWidth/2
        };
        var that = {},
            baseSprite = graphics.Sprite({
                sprite: spec.baseSprite,
                center: spec.center,
                rotation: 0
            }),
            weaponSprite = graphics.Sprite({
                sprite: spec.weaponSprite,
                center: spec.center,
                rotation: 0
            });

        spec.rotation = 0;

        //------------------------------------------------------------------
        //
        // Here we check to see if the tower should still rotate towards the target.
        //
        //------------------------------------------------------------------
        that.update = function (elapsedTime) {
            //
            // Check to see if the tower is pointing at the target or not
            var result = computeAngle(spec.rotation, spec.center, spec.target);
            if (testTolerance(result.angle, 0, .01) === false) {
                if (result.crossProduct > 0) {
                    weaponSprite.rotateRight(spec.rotateRate);
                    spec.rotation += spec.rotateRate;
                } else {
                    weaponSprite.rotateLeft(spec.rotateRate);
                    spec.rotation -= spec.rotateRate;
                }
            }
        };

        //------------------------------------------------------------------
        //
        // Two parts to the tower, a base and the weapon.
        //
        //------------------------------------------------------------------
        that.render = function () {
            baseSprite.draw();
            weaponSprite.draw();
            //
            // A little hack job to show something interesting.
            weaponSprite.drawArc(.4);
        };

        //------------------------------------------------------------------
        //
        // Point we want our weapon to point at.
        //
        //------------------------------------------------------------------
        that.setTarget = function (x, y) {
            spec.target = {
                x: x,
                y: y
            };
        };

        return that;
    }

    return {
        Tower: Tower
    };

}(MyGame.towerGraphics));
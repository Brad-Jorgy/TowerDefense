MyGame.objects = (function (graphics) {
    let showWeaponCoverage = false,
        specName = document.getElementById('tower-name'),
        specTargetType = document.getElementById('target-type'),
        specLevel = document.getElementById('tower-level'),
        specRange = document.getElementById('range'),
        specDamage = document.getElementById('damage'),
        specFireRate = document.getElementById('fire-rate');

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

    function alignToGameGrid(val) {
        return Math.floor(val / graphics.cellWidth);
    }

    //------------------------------------------------------------------
    //
    // Defines a tower that has a base sprite and a weapon sprite that will
    // rotate towards the current 'target'.
    //
    //------------------------------------------------------------------
    function Tower(spec) {
        spec.selected = false;
        spec.center = {
            x: spec.gridPosition.x * graphics.cellWidth + graphics.cellWidth/2,
            y: spec.gridPosition.y * graphics.cellWidth + graphics.cellWidth/2
        };
        spec.target = {
            x: spec.center.x + 50,
            y: spec.center.y
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

            if (spec.selected || showWeaponCoverage) {
                weaponSprite.drawArc(spec.radius);
            }
            if (spec.selected) {
                graphics.drawGridSquare(spec.gridPosition, 'rgba(0,255,0,0.5)');
            }
        };

        that.displayStats = () => {
            specName.innerHTML = spec.towerName;
            specTargetType.innerHTML = spec.creepType;
            specLevel.innerHTML = spec.level;
            specRange.innerHTML = spec.radius;
            specDamage.innerHTML = spec.damage;
            specFireRate.innerHTML = spec.fireRate;
            document.getElementById('tower-specs').classList.remove('hide');
        };

        that.upgradable = () => {
            return (spec.level < 3 /*TODO: check if funds available to purchase tower*/);
        };

        that.upgradeTower = (upgradeData) => {
            weaponSprite.updateImage(upgradeData.weaponSprite);
            spec.radius = upgradeData.radius;
            spec.damage = upgradeData.damage;
            spec.level = upgradeData.level;
            // TODO: remove money from available money
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

        that.setSelected = (bool) => {
            spec.selected = bool;
        };

        that.positionSame = (gridPosition) => {
            return (gridPosition.x == spec.gridPosition.x && gridPosition.y == spec.gridPosition.y);
        };

        return that;
    }

    function GroundBombTower(spec) {
        let stats = {
            towerName: 'Bomb Tower',
            radius: 2, // in CellWidths
            damage: 20,
            fireRate: 1000/4, // time between shots (ms) (subject to change)
            creepType: 'ground',
            cost: 20,
            level: 1
        };
        Object.assign(spec, stats);

        let that = Tower(Object.assign({
            baseSprite: 'Images/turrets/turret-base.gif',
            weaponSprite: 'Images/turrets/turret-2-1.png',
            gridPosition: { x: spec.gridPosition.x, y: spec.gridPosition.y },
            rotateRate: 6 * 3.14159 / 1000
        },spec));
        
        let base = {
            update: that.update,
            upgradeTower: that.upgradeTower
        };
        
        that.update = (elapsedTime) => {
            base.update(elapsedTime);
        };

        that.upgradeTower = () => {
            if (spec.level == 1) {
                spec.level = 2;
                spec.damage += 10;
                spec.radius += 1;
                base.upgradeTower({
                    weaponSprite: 'Images/turrets/turret-2-2.png',
                    radius: spec.radius,
                    damage: spec.damage,
                    level: spec.level
                });
            } else if (spec.level == 2) {
                spec.level = 3;
                spec.damage += 10;
                spec.radius += 1;
                base.upgradeTower({
                    weaponSprite: 'Images/turrets/turret-2-3.png',
                    radius: spec.radius,
                    damage: spec.damage,
                    level: spec.level
                });
            }
            that.displayStats();
        };

        return that;
    }

    function GroundProjectileTower(spec) {
        let stats = {
            towerName: 'Basic Tower',
            radius: 2.5, // in CellWidths
            damage: 10,
            fireRate: 1000/10, // time between shots (ms) (subject to change)
            creepType: 'ground',
            cost: 10,
            level: 1
        };
        Object.assign(spec, stats);
        
        let that = Tower(Object.assign({
            baseSprite: 'Images/turrets/turret-base.gif',
            weaponSprite: 'Images/turrets/turret-1-1.png',
            gridPosition: { x: spec.gridPosition.x, y: spec.gridPosition.y },
            rotateRate: 6 * 3.14159 / 1000
        },spec));
        
        let base = {
            update: that.update,
            upgradeTower: that.upgradeTower
        };
        
        that.update = (elapsedTime) => {
            base.update(elapsedTime);
        };

        that.upgradeTower = () => {
            if (spec.level == 1) {
                spec.level = 2;
                spec.damage += 10;
                spec.radius += 1;
                base.upgradeTower({
                    weaponSprite: 'Images/turrets/turret-1-2.png',
                    radius: spec.radius,
                    damage: spec.damage,
                    level: spec.level
                });
            } else if (spec.level == 2) {
                spec.level = 3;
                spec.damage += 10;
                spec.radius += 1;
                base.upgradeTower({
                    weaponSprite: 'Images/turrets/turret-1-3.png',
                    radius: spec.radius,
                    damage: spec.damage,
                    level: spec.level
                });
            }
            that.displayStats();
        };

        return that;
    }

    function AirMissileTower(spec) {
        let stats = {
            towerName: 'AA Tower',
            radius: 2.5, // in CellWidths
            damage: 10,
            fireRate: 1000 / 4, // time between shots (ms) (subject to change)
            creepType: 'air',
            cost: 10,
            level: 1
        };
        Object.assign(spec, stats);

        let that = Tower(Object.assign({
            baseSprite: 'Images/turrets/turret-base.gif',
            weaponSprite: 'Images/turrets/turret-4-1.png',
            gridPosition: { x: spec.gridPosition.x, y: spec.gridPosition.y },
            rotateRate: 6 * 3.14159 / 1000
        },spec));
        
        let base = {
            update: that.update,
            upgradeTower: that.upgradeTower
        };
        
        that.update = (elapsedTime) => {
            base.update(elapsedTime);
        };

        that.upgradeTower = () => {
            if (spec.level == 1) {
                spec.level = 2;
                spec.damage += 10;
                spec.radius += 1;
                base.upgradeTower({
                    weaponSprite: 'Images/turrets/turret-4-2.png',
                    radius: spec.radius,
                    damage: spec.damage,
                    level: spec.level
                });
            } else if (spec.level == 2) {
                spec.level = 3;
                spec.damage += 10;
                spec.radius += 1;
                base.upgradeTower({
                    weaponSprite: 'Images/turrets/turret-4-3.png',
                    radius: spec.radius,
                    damage: spec.damage,
                    level: spec.level
                });
            }
            that.displayStats();
        };

        return that;
    }

    function AirProjectileTower(spec) {
        let stats = {
            towerName: 'AA Guided Missile',
            radius: 2.5, // in CellWidths
            damage: 10,
            fireRate: 1000 / 4, // time between shots (ms) (subject to change)
            creepType: 'air',
            cost: 10,
            level: 1
        };
        Object.assign(spec, stats);

        let that = Tower(Object.assign({
            baseSprite: 'Images/turrets/turret-base.gif',
            weaponSprite: 'Images/turrets/turret-3-1.png',
            gridPosition: { x: spec.gridPosition.x, y: spec.gridPosition.y },
            rotateRate: 6 * 3.14159 / 1000
        },spec));
        
        let base = {
            update: that.update,
            upgradeTower: that.upgradeTower
        };
        
        that.update = (elapsedTime) => {
            base.update(elapsedTime);
        };

        that.upgradeTower = () => {
            if (spec.level == 1) {
                spec.level = 2;
                spec.damage += 10;
                spec.radius += 1;
                base.upgradeTower({
                    weaponSprite: 'Images/turrets/turret-3-2.png',
                    radius: spec.radius,
                    damage: spec.damage,
                    level: spec.level
                });
            } else if (spec.level == 2) {
                spec.level = 3;
                spec.damage += 10;
                spec.radius += 1;
                base.upgradeTower({
                    weaponSprite: 'Images/turrets/turret-3-3.png',
                    radius: spec.radius,
                    damage: spec.damage,
                    level: spec.level
                });
            }
            that.displayStats();
        };

        return that;
    }

    function TowerGroup(spec) {
        let that = {},
            selectedTower;
        spec.towers = [];

        that.towerExistsAtPosition = (gridPosition) => {
            for (const tower of spec.towers) {
                if (tower.positionSame(gridPosition)) return true;
            }
            return false;
        };

        that.addTower = (towerType, gridPosition) => {
            let tower;
            if (towerType === 'tower1') {
                tower = GroundProjectileTower({
                    gridPosition: gridPosition
                });
            } else if (towerType === 'tower2') {
                tower = GroundBombTower({
                    gridPosition: gridPosition
                });
            } else if (towerType === 'tower3') {
                tower = AirProjectileTower({
                    gridPosition: gridPosition
                });
            } else if (towerType === 'tower4') {
                tower = AirMissileTower({
                    gridPosition: gridPosition
                });
            }
            spec.towers.push(tower);
        };

        that.setSelected = (gridPosition) => {
            that.deselectAll();
            for (const tower of spec.towers) {
                if (tower.positionSame(gridPosition)) {
                    tower.setSelected(true);
                    tower.displayStats();
                    selectedTower = tower;
                    if (!(tower.upgradable())) {
                        document.getElementById('spec-upgrade-tower').disabled = true;
                    } else {
                        document.getElementById('spec-upgrade-tower').disabled = false;
                    }
                    return;
                }
            }
        };

        that.deselectAll = () => {
            for (const tower of spec.towers) {
                tower.setSelected(false);
            }
            selectedTower = {};
            document.getElementById('tower-specs').classList.toggle('hide');
        };

        that.showWeaponCoverage = (bool) => {
            showWeaponCoverage = bool;
        };

        that.update = (elapsedTime) => {
            for (const tower of spec.towers) {
                if (tower) {
                    tower.update(elapsedTime);
                }
            }
        };

        that.render = () => {
            for (const tower of spec.towers) {
                if (tower) {
                    tower.render();
                }
            }
        };

        that.upgradeSelected = () => {
            if (Object.keys(selectedTower).length !== 0) {
                selectedTower.upgradeTower();
            }
        };

        return that;
    }

    //------------------------------------------------------------------
    //
    // Defines a game object/model that animates simply due to the passage
    // of time.
    //
    //------------------------------------------------------------------
    function AnimatedModel(spec) {
        var that = {},
            sprite = graphics.SpriteSheet(spec);	// We contain a SpriteSheet, not inherited from, big difference

        that.update = function (elapsedTime) {
            sprite.update(elapsedTime);
        };

        that.render = function () {
            sprite.draw();
        };

        that.rotateRight = function (elapsedTime) {
            spec.rotation += spec.rotateRate * (elapsedTime);
        };

        that.rotateLeft = function (elapsedTime) {
            spec.rotation -= spec.rotateRate * (elapsedTime);
        };

        //------------------------------------------------------------------
        //
        // Move in the direction the sprite is facing
        //
        //------------------------------------------------------------------
        that.moveForward = function (elapsedTime) {
            //
            // Create a normalized direction vector
            var vectorX = Math.cos(spec.rotation + spec.orientation),
                vectorY = Math.sin(spec.rotation + spec.orientation);
            //
            // With the normalized direction vector, move the center of the sprite
            spec.center.x += (vectorX * spec.moveRate * elapsedTime);
            spec.center.y += (vectorY * spec.moveRate * elapsedTime);
        };

        //------------------------------------------------------------------
        //
        // Move in the negative direction the sprite is facing
        //
        //------------------------------------------------------------------
        that.moveBackward = function (elapsedTime) {
            //
            // Create a normalized direction vector
            var vectorX = Math.cos(spec.rotation + spec.orientation),
                vectorY = Math.sin(spec.rotation + spec.orientation);
            //
            // With the normalized direction vector, move the center of the sprite
            spec.center.x -= (vectorX * spec.moveRate * elapsedTime);
            spec.center.y -= (vectorY * spec.moveRate * elapsedTime);
        };

        that.getGridPosition = () => {
            return {
                x: alignToGameGrid(spec.center.x)
            };
        };

        that.getHealth = () => {
            return spec.health;
        };

        return that;
    }

    //------------------------------------------------------------------
    //
    // Defines a game object/model that animates based upon the elapsed time
    // that occurs only when moving.
    //
    //------------------------------------------------------------------
    function AnimatedMoveModel(spec) {
        var that = AnimatedModel(spec),	// Inherit from AnimatedModel
            base = {
                moveForward: that.moveForward,
                moveBackward: that.moveBackward,
                rotateRight: that.rotateRight,
                rotateLeft: that.rotateLeft,
                update: that.update
            },
            didMoveForward = false,
            didMoveBackward = false;

        //------------------------------------------------------------------
        //
        // Replacing the update function from the base object.  In this update
        // we check to see if any movement was performed, if so, then the animation
        // is updated.
        //
        //------------------------------------------------------------------
        that.update = function (elapsedTime) {
            if (didMoveForward === true) {
                base.update(elapsedTime, true);
            } else if (didMoveBackward === true) {
                base.update(elapsedTime, false);
            }

            didMoveForward = false;
            didMoveBackward = false;
        };

        that.moveForward = function (elapsedTime) {
            base.moveForward(elapsedTime);
            didMoveForward = true;
        };

        that.moveBackward = function (elapsedTime) {
            base.moveBackward(elapsedTime);
            didMoveBackward = true;
        };

        that.rotateRight = function (elapsedTime) {
            base.rotateRight(elapsedTime);
            didMoveForward = true;
        };

        that.rotateLeft = function (elapsedTime) {
            base.rotateLeft(elapsedTime);
            didMoveForward = true;
        };

        return that;
    }

    function GroundCreep1(spec) {
        spec.center = {
            x: spec.gridPosition.x * graphics.cellWidth + graphics.cellWidth / 2,
            y: spec.gridPosition.y * graphics.cellWidth + graphics.cellWidth / 2
        };
        let that = AnimatedModel(Object.assign({
            spriteSheet: 'Images/creeps/creep2-red.png',
            spriteCount: 4,
            spriteTime: [200, 1000, 200, 600],	// milliseconds per sprite animation frame
            orientation: 0,				// Sprite orientation with respect to "forward"
            moveRate: 50 / 1000,			// pixels per millisecond
            rotateRate: 3.14159 / 1000,		// Radians per millisecond
            health: 100
        }, spec));
        let base = {
            update: that.update
        };

        that.update = (elapsedTime) => {
            if (elapsedTime){
                that.moveForward(elapsedTime);
            }
            base.update(elapsedTime);
        };
        
        that.getGridPosition = () => {
            return { x: alignToGameGrid(spec.center.x), y: alignToGameGrid(spec.center.y)};
        };

        return that;
    }

    function GroundCreep2(spec) {
        spec.center = {
            x: spec.gridPosition.x * graphics.cellWidth + graphics.cellWidth / 2,
            y: spec.gridPosition.y * graphics.cellWidth + graphics.cellWidth / 2
        };
        let that = AnimatedModel(Object.assign({
            spriteSheet: 'Images/creeps/creep1-blue.png',
            spriteCount: 6,
            spriteTime: [1000, 200, 100, 1000, 100, 200],	// milliseconds per sprite animation frame
            orientation: 0,				// Sprite orientation with respect to "forward"
            moveRate: 75 / 1000,			// pixels per millisecond
            rotateRate: 3.14159 / 1000,		// Radians per millisecond
            health: 100
        }, spec));
        let base = {
            update: that.update
        };

        that.update = (elapsedTime) => {
            if (elapsedTime) {
                that.moveForward(elapsedTime);
            }
            base.update(elapsedTime);
        };

        that.getGridPosition = () => {
            return { x: alignToGameGrid(spec.center.x), y: alignToGameGrid(spec.center.y)};
        };

        return that;
    }

    function FlyingCreep(spec) {
        spec.center = {
            x: spec.gridPosition.x * graphics.cellWidth + graphics.cellWidth / 2,
            y: spec.gridPosition.y * graphics.cellWidth + graphics.cellWidth / 2
        };
        let that = AnimatedModel(Object.assign({
            spriteSheet: 'Images/creeps/creep3-green.png',
            spriteCount: 4,
            spriteTime: [1000, 200, 200, 200],	// milliseconds per sprite animation frame
            orientation: 0,				// Sprite orientation with respect to "forward"
            moveRate: 75 / 1000,			// pixels per millisecond
            rotateRate: 3.14159 / 1000,		// Radians per millisecond
            health: 100
        }, spec));
        let base = {
            update: that.update
        };

        that.update = (elapsedTime) => {
            if (elapsedTime){
                that.moveForward(elapsedTime);
            }
            base.update(elapsedTime);
        };
        
        that.getGridPosition = () => {
            return { x: alignToGameGrid(spec.center.x), y: alignToGameGrid(spec.center.y)};
        };

        return that;
    }

    function CreepManager(spec) {
        let that = {};

        spec.creeps = [];

        that.addCreep = (creepType, creepSpecs) => {
            let creep;
            if (creepType === 'creep1') {
                creep = GroundCreep1(creepSpecs);
            } else if (creepType === 'creep2') {
                creep = GroundCreep2(creepSpecs);
            } else if (creepType === 'creep3') {
                creep = FlyingCreep(creepSpecs);
            }
            spec.creeps.push(creep);
        };

        that.update = (elapsedTime) => {
            let creepsToKeep = [];
            for (const creep of spec.creeps) {
                if (creep) {
                    creep.update(elapsedTime);
                    let newGridPosition = creep.getGridPosition();
                    if (newGridPosition.x < 15 && newGridPosition.y < 15 && creep.getHealth() > 0) {
                        creepsToKeep.push(creep);
                    }
                }
            }
            spec.creeps = creepsToKeep;
        };

        that.render = () => {
            for (const creep of spec.creeps) {
                if (creep) {
                    creep.render();
                }
            }
        };

        return that;
    }

    return {
        Tower: Tower,
        TowerGroup: TowerGroup,
        CreepManager: CreepManager,
    };

}(MyGame.towerGraphics));
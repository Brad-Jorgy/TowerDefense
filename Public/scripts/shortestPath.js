MyGame.shortestPath = (function (objects) {
    'use strict';
    let gridSize = 15;
    let grid = [];

    function findShortestPath(startx, starty, endx, endy, towers) {
        grid = towers.getTowerGrid(startx, starty, endx, endy);

        let location = {
            distanceFromTop: starty,
            distanceFromLeft: startx,
            path: [],
            status: 'Start'
        };

        let queue = [location];

        while (queue.length > 0) {

            let currentLocation = queue.shift();

            let newLocation = exploreInDirection(currentLocation, 'up', grid);
            if (newLocation.status === 'Exit') {
                return newLocation.path;
            } else if (newLocation.status === 'Valid') {
                queue.push(newLocation);
            }

            newLocation = exploreInDirection(currentLocation, 'right', grid);
            if (newLocation.status === 'Exit') {
                return newLocation.path;
            } else if (newLocation.status === 'Valid') {
                queue.push(newLocation);
            }

            newLocation = exploreInDirection(currentLocation, 'down', grid);
            if (newLocation.status === 'Exit') {
                return newLocation.path;
            } else if (newLocation.status === 'Valid') {
                queue.push(newLocation);
            }

            newLocation = exploreInDirection(currentLocation, 'left', grid);
            if (newLocation.status === 'Exit') {
                return newLocation.path;
            } else if (newLocation.status === 'Valid') {
                queue.push(newLocation);
            }
        }

        return false;

    };

    function locationStatus(location, grid) {
// let gridSize = gridsize;
        let dft = location.distanceFromTop;
        let dfl = location.distanceFromLeft;

        if (location.distanceFromLeft < 0 ||
            location.distanceFromLeft >= gridSize ||
            location.distanceFromTop < 0 ||
            location.distanceFromTop >= gridSize) {

            return 'Invalid';
        } else if (grid[dfl][dft] === 'Exit') {
            return 'Exit';
        } else if (grid[dfl][dft] !== 'Empty') {
            return 'Blocked';
        } else {
            return 'Valid';
        }
    };

    function exploreInDirection(currentLocation, direction, grid) {
        let newPath = currentLocation.path.slice();
        newPath.push(direction);

        let dft = currentLocation.distanceFromTop;
        let dfl = currentLocation.distanceFromLeft;

        if (direction === 'up') {
            dft -= 1;
        } else if (direction === 'right') {
            dfl += 1;
        } else if (direction === 'down') {
            dft += 1;
        } else if (direction === 'left') {
            dfl -= 1;
        }

        let newLocation = {
            distanceFromTop: dft,
            distanceFromLeft: dfl,
            path: newPath,
            status: 'Unknown'
        };
        newLocation.status = locationStatus(newLocation, grid);

        if (newLocation.status === 'Valid') {
            grid[newLocation.distanceFromLeft][newLocation.distanceFromTop] = 'Visited';
        }

        return newLocation;
    };

    function shortestPath(startx, starty, endx, endy, towers) {
        return findShortestPath(startx, starty, endx, endy, towers);
    }

    return {
        shortestPath: shortestPath,
    };

}(MyGame.objects));
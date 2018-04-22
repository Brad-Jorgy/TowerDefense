MyGame.path = (function (objects) {

let gridSize = 15;
let grid = [];


findShortestPath = function(startx, starty, endx, endy) {
    for (let x = 0; x < gridSize; x++) {
        grid[x] = [];
        for (let y = 0; y < gridSize; y++) {
            grid[x][y] = 'Empty';
            if (objects.TowerGroup.towerExistsAtPosition(x, y)) {
                grid[x][y] = 'tower';
            } else if (x === 0 && y < 5 || x < 5 && y === 0) {
                grid[x][y] = 'wall';
            } else if (x > 8 && y === 0 || x === 14 && y < 5) {
                grid[x][y] = 'wall';
            } else if (x === 0 && y > 8 || x < 5 && y === 14) {
                grid[x][y] = 'wall';
            } else if (x > 8 && y === 14 || x === 14 && y > 8) {
                grid[x][y] = 'wall';
            }
        }
    }
    grid[endx][endy] = 'Goal';

    let location = {
        distanceFromTop: starty,
        distanceFromLeft: startx,
        path: [],
        status: 'Start'
    };

    let queue = [location];

    while (queue.length > 0) {

        let currentLocation = queue.shift();

        let newLocation = exploreInDirection(currentLocation, 'North', grid);
        if (newLocation.status === 'Goal') {
            return newLocation.path;
        } else if (newLocation.status === 'Valid') {
            queue.push(newLocation);
        }

        newLocation = exploreInDirection(currentLocation, 'East', grid);
        if (newLocation.status === 'Goal') {
            return newLocation.path;
        } else if (newLocation.status === 'Valid') {
            queue.push(newLocation);
        }

        newLocation = exploreInDirection(currentLocation, 'South', grid);
        if (newLocation.status === 'Goal') {
            return newLocation.path;
        } else if (newLocation.status === 'Valid') {
            queue.push(newLocation);
        }

        newLocation = exploreInDirection(currentLocation, 'West', grid);
        if (newLocation.status === 'Goal') {
            return newLocation.path;
        } else if (newLocation.status === 'Valid') {
            queue.push(newLocation);
        }
    }

    return false;

};

locationStatus = function(location, grid) {
    // let gridSize = gridsize;
    let dft = location.distanceFromTop;
    let dfl = location.distanceFromLeft;

    if (location.distanceFromLeft < 0 ||
        location.distanceFromLeft >= gridSize ||
        location.distanceFromTop < 0 ||
        location.distanceFromTop >= gridSize) {

        return 'Invalid';
    } else if (grid[dfl][dft] === 'Goal') {
        return 'Goal';
    } else if (grid[dfl][dft] !== 'Empty') {
        return 'Blocked';
    } else {
        return 'Valid';
    }
};

exploreInDirection = function(currentLocation, direction, grid) {
    let newPath = currentLocation.path.slice();
    newPath.push(direction);

    let dft = currentLocation.distanceFromTop;
    let dfl = currentLocation.distanceFromLeft;

    if (direction === 'North') {
        dft -= 1;
    } else if (direction === 'East') {
        dfl += 1;
    } else if (direction === 'South') {
        dft += 1;
    } else if (direction === 'West') {
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
        grid[newLocation.distanceFromTop][newLocation.distanceFromLeft] = 'Visited';
    }

    return newLocation;
};


return findShortestPath(startX, startY, endX, endY);
}(MyGame.objects));
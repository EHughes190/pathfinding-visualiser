import { Grid } from './Grid.js';
import { aStar } from './algorithms/aStar.js';
import { setupStartAndTargetNodes, colourNodes } from './utils.js';
import { bfs } from './algorithms/bfs.js';
var gridContainer = document.querySelector('.grid');
var astarBtn = document.querySelector('#find-astar');
var bfsBtn = document.querySelector('#find-bfs');
var resetBtn = document.querySelector('#reset');
var grid = new Grid(10, 10);
grid.draw(gridContainer);
var firstClick = true;
var secondClick = false;
resetBtn === null || resetBtn === void 0 ? void 0 : resetBtn.addEventListener('click', function () {
    grid.reset(gridContainer);
    firstClick = true;
    secondClick = false;
});
astarBtn === null || astarBtn === void 0 ? void 0 : astarBtn.addEventListener('click', function () {
    var _a = setupStartAndTargetNodes(grid), start = _a.start, target = _a.target;
    var _b = aStar(start[0], target[0], grid.getGrid()), path = _b.path, seen = _b.seen;
    if (seen && path) {
        colourNodes(path, seen);
    }
});
bfsBtn === null || bfsBtn === void 0 ? void 0 : bfsBtn.addEventListener('click', function () {
    var _a = setupStartAndTargetNodes(grid), start = _a.start, target = _a.target;
    var _b = bfs(start[0], target[0], grid.getGrid()), path = _b.path, seen = _b.seen;
    if (seen && path) {
        colourNodes(path, seen);
    }
});
gridContainer.addEventListener('mousedown', function (e) {
    handleGridClick(e);
});
function handleGridClick(e) {
    var _a;
    var clickedDivId = (_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.id;
    var clickedDiv = document.getElementById(clickedDivId);
    var _b = clickedDivId.split(''), x = _b[0], y = _b[1];
    if (clickedDiv) {
        var data = clickedDiv.dataset;
        // Set the start node
        if (firstClick) {
            data.start = 'true';
            firstClick = false;
            secondClick = true;
            clickedDiv.style.backgroundColor = '#476C9B';
            // we can use the id as x and y coordinates to identify node in grid and update the isStart var.
            grid.getGrid()[y][x].isStart = true;
            return;
        }
        // Set the Target node
        if (secondClick) {
            if (grid.getGrid()[y][x].isStart === false) {
                data.target = 'true';
                secondClick = false;
                clickedDiv.style.backgroundColor = '#984447';
                // we can use the id as x and y coordinates to identify node in grid and update the isTarget  var.
                grid.getGrid()[y][x].isTarget = true;
            }
            return;
        }
        // Set a wall
        if (data.active === 'false' &&
            data.start !== 'true' &&
            data.target !== 'true') {
            clickedDiv.style.backgroundColor = '#656565';
            data.active = 'true';
            grid.getGrid()[y][x].isWall = true;
        }
        else if (data.active === 'true' &&
            data.start !== 'true' &&
            data.target !== 'true') {
            clickedDiv.style.backgroundColor = '#fff';
            data.active = 'false';
            grid.getGrid()[y][x].isWall = false;
        }
    }
}

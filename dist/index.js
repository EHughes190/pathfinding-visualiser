import { Grid } from './Grid.js';
import { aStar } from './algorithms/aStar.js';
import { setupStartAndTargetNodes, colourNodes } from './utils.js';
import { bfs } from './algorithms/bfs.js';
import { dijkstras } from './algorithms/dijkstras.js';
import { gbfs } from './algorithms/gbfs.js';
var gridContainer = document.querySelector('.grid');
var astarBtn = document.querySelector('#find-astar');
var bfsBtn = document.querySelector('#find-bfs');
var dijkstraBtn = document.querySelector('#find-dijkstra');
var gbfsBtn = document.querySelector('#find-gbfs');
var resetBtn = document.querySelector('#reset');
var grid = new Grid(20, 20);
grid.draw(gridContainer);
var firstClick = true;
var secondClick = false;
resetBtn === null || resetBtn === void 0 ? void 0 : resetBtn.addEventListener('click', function () {
    grid.reset(gridContainer);
    firstClick = true;
    secondClick = false;
});
dijkstraBtn === null || dijkstraBtn === void 0 ? void 0 : dijkstraBtn.addEventListener('click', function () {
    var _a = setupStartAndTargetNodes(grid), start = _a.start, target = _a.target;
    var _b = dijkstras(start[0], target[0], grid.getGrid()), path = _b.path, seen = _b.seen;
    if (seen && path) {
        colourNodes(path, seen);
    }
});
gbfsBtn === null || gbfsBtn === void 0 ? void 0 : gbfsBtn.addEventListener('click', function () {
    var _a = setupStartAndTargetNodes(grid), start = _a.start, target = _a.target;
    var _b = gbfs(start[0], target[0], grid.getGrid()), path = _b.path, seen = _b.seen;
    if (seen && path) {
        colourNodes(path, seen);
    }
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
    e.preventDefault();
    handleGridClick(e);
});
function handleGridClick(e) {
    var _a;
    var clickedDivId = (_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.id;
    var clickedDiv = document.getElementById(clickedDivId);
    if (clickedDiv) {
        var _b = grid.getGridHash().get(clickedDivId).pos, x = _b.x, y = _b.y;
        // we can use the id as x and y coordinates to identify node in grid and update the isTarget  var.
        var node = grid.getGrid()[y][x];
        var data = clickedDiv.dataset;
        // Set the start node
        if (firstClick) {
            data.start = 'true';
            firstClick = false;
            secondClick = true;
            clickedDiv.classList.add('start-node');
            node.isStart = true;
            return;
        }
        // Set the Target node
        if (secondClick) {
            if (!node.isStart) {
                data.target = 'true';
                secondClick = false;
                clickedDiv.classList.add('target-node');
                node.isTarget = true;
            }
            return;
        }
        // Set a wall
        if (data.active === 'false' &&
            data.start !== 'true' &&
            data.target !== 'true') {
            clickedDiv.classList.add('wall-node');
            data.active = 'true';
            node.isWall = true;
        }
        else if (data.active === 'true' &&
            data.start !== 'true' &&
            data.target !== 'true') {
            clickedDiv.classList.remove('wall-node');
            data.active = 'false';
            node.isWall = false;
        }
    }
}

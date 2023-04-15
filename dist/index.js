import { Grid } from './Grid.js';
import { aStar } from './aStar.js';
import { setupStartAndTargetNodes, colourNodes } from './utils.js';
import { bfs } from './bfs.js';
const gridContainer = document.getElementById('grid');
const astarBtn = document.getElementById('find-astar');
const bfsBtn = document.getElementById('find-bfs');
const resetBtn = document.getElementById('reset');
const grid = new Grid(10, 10);
grid.draw(gridContainer);
let firstClick = true;
let secondClick = false;
resetBtn?.addEventListener('click', () => {
    grid.reset(gridContainer);
    firstClick = true;
    secondClick = false;
});
astarBtn?.addEventListener('click', () => {
    const { start, target } = setupStartAndTargetNodes(grid);
    const { path, seen } = aStar(start[0], target[0], grid.getGrid());
    if (seen && path) {
        colourNodes(path, seen);
    }
});
bfsBtn?.addEventListener('click', () => {
    const { start, target } = setupStartAndTargetNodes(grid);
    const { path, seen } = bfs(start[0], target[0], grid.getGrid());
    if (seen && path) {
        colourNodes(path, seen);
    }
});
gridContainer.addEventListener('mousedown', (e) => {
    handleGridClick(e);
});
function handleGridClick(e) {
    const clickedDivId = e?.target?.id;
    const clickedDiv = document.getElementById(clickedDivId);
    const [x, y] = clickedDivId.split('');
    if (clickedDiv) {
        const data = clickedDiv.dataset;
        // Set the start node
        if (firstClick) {
            data.start = 'true';
            firstClick = false;
            secondClick = true;
            clickedDiv.style.backgroundColor = 'blue';
            // we can use the id as x and y coordinates to identify node in grid and update the isStart var.
            grid.getGrid()[y][x].isStart = true;
            return;
        }
        // Set the Target node
        if (secondClick) {
            if (grid.getGrid()[y][x].isStart === false) {
                data.target = 'true';
                secondClick = false;
                clickedDiv.style.backgroundColor = 'red';
                // we can use the id as x and y coordinates to identify node in grid and update the isTarget  var.
                grid.getGrid()[y][x].isTarget = true;
            }
            return;
        }
        // Set a wall
        if (data.active === 'false' &&
            data.start !== 'true' &&
            data.target !== 'true') {
            clickedDiv.style.backgroundColor = 'grey';
            data.active = 'true';
            grid.getGrid()[y][x].isWall = true;
        }
        else if (data.active === 'true' &&
            data.start !== 'true' &&
            data.target !== 'true') {
            clickedDiv.style.backgroundColor = '#f9f9f9';
            data.active = 'false';
            grid.getGrid()[y][x].isWall = false;
        }
    }
}
//# sourceMappingURL=index.js.map
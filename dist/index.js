import { Grid } from './Grid.js';
const gridContainer = document.getElementById('grid');
const pathBtn = document.getElementById('find-path');
const gridHash = new Map();
const grid = new Grid(5, 5);
grid.draw(gridContainer);
const node = grid.getGrid()[4][4];
const nodeS = grid.getGrid()[0][0];
const nodeT = grid.getGrid()[4][3];
console.log(node);
console.log(node.getNeighbours(grid.getGrid()));
console.log(grid.getGrid());
pathBtn?.addEventListener('click', () => {
    // findPath()
    console.log('IMPLEMENT PATH FINDING');
    findPath(nodeS, nodeT, grid);
});
gridContainer.addEventListener('mousedown', (e) => {
    handleClick(e);
});
let firstClick = true;
let secondClick = false;
function handleClick(e) {
    const clickedDivId = e?.target?.id;
    const clickedDiv = document.getElementById(clickedDivId);
    if (clickedDiv) {
        const data = clickedDiv.dataset;
        if (firstClick) {
            data.start = 'true';
            firstClick = false;
            secondClick = true;
            clickedDiv.style.backgroundColor = 'yellow';
            if (gridHash && gridHash.get(clickedDivId)) {
                gridHash.get(clickedDivId).isStart = true;
            }
            return;
        }
        if (secondClick) {
            data.target = 'true';
            secondClick = false;
            clickedDiv.style.backgroundColor = 'blue';
            if (gridHash && gridHash.get(clickedDivId)) {
                gridHash.get(clickedDivId).isTarget = true;
            }
            return;
        }
        if (data.active === 'false' &&
            data.start !== 'true' &&
            data.target !== 'true') {
            clickedDiv.style.backgroundColor = 'red';
            data.active = 'true';
        }
        else if (data.active === 'true' &&
            data.start !== 'true' &&
            data.target !== 'true') {
            clickedDiv.style.backgroundColor = '#f9f9f9';
            data.active = 'false';
        }
    }
}
function heuristic(a, b) {
    const { x: ax, y: ay } = a.pos;
    const { x: bx, y: by } = b.pos;
    const dstX = Math.abs(ax - bx);
    const dstY = Math.abs(ay - by);
    if (dstX > dstY) {
        return 14 * dstY + 10 * (dstX - dstY);
    }
    return 14 * dstX + 10 * (dstY - dstX);
}
function findPath(start, target, grid) {
    const openList = [];
    const closedList = [];
    openList.push(start);
    while (openList.length > 0) {
        let current = openList[0];
        console.log(current);
        for (let i = 1; i < openList.length; i++) {
            if (openList[i].fCost < current.fCost ||
                (openList[i].fCost === current.fCost &&
                    openList[i].hCost < current.hCost)) {
                current = openList[i];
            }
        }
        openList.splice(0, 1);
        closedList.push(current);
        if (current === target) {
            console.log('retracing path');
            return retracePath(start, target);
        }
        const neighbours = current.getNeighbours(grid.getGrid());
        neighbours.forEach((n) => {
            if (n.isWall || closedList.includes(n)) {
                return;
            }
            const newMovementCostToNeighbour = current.gCost + heuristic(current, n);
            if (newMovementCostToNeighbour < current.gCost ||
                !openList.includes(n)) {
                n.gCost = newMovementCostToNeighbour;
                n.hCost = heuristic(n, target);
                n.parent = current;
                if (!openList.includes(n)) {
                    openList.push(n);
                }
            }
        });
    }
}
function retracePath(start, target) {
    const path = [];
    let current = target;
    while (current !== start) {
        path.push(current);
        if (current.parent) {
            console.log(current);
            current = current.parent;
        }
    }
    path.reverse();
    console.log('PATH', path);
    return path;
}
//# sourceMappingURL=index.js.map
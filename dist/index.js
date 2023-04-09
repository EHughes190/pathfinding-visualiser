import { NodeSquare } from './NodeSquare.js';
const grid = document.getElementById('grid');
const pathBtn = document.getElementById('find-path');
const gridHash = new Map();
pathBtn === null || pathBtn === void 0 ? void 0 : pathBtn.addEventListener('click', () => {
    // findPath()
    console.log('IMPLEMENT PATH FINDING');
});
// Creates a grid[][] holding our nodes
function gridSetup(numRows, numCols) {
    const grid = [];
    for (let i = 0; i < numRows; i++) {
        const row = [];
        for (let j = 0; j < numCols; j++) {
            const id = `${i}${j}`;
            const node = new NodeSquare(id, false, false, 0, 0, 0);
            gridHash.set(id, node);
            row.push({ x: j, y: i });
        }
        grid.push(row);
    }
    return grid;
}
const gridSquare = gridSetup(5, 5);
function drawGrid(gridSquare) {
    gridSquare.map((row) => {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');
        grid === null || grid === void 0 ? void 0 : grid.appendChild(rowDiv);
        row.map((node) => {
            const nodeDiv = document.createElement('div');
            nodeDiv.classList.add('node');
            // nodeDiv.id = node.id
            nodeDiv.setAttribute('data-active', 'false');
            nodeDiv.setAttribute('data-start', 'false');
            nodeDiv.setAttribute('data-target', 'false');
            rowDiv.appendChild(nodeDiv);
        });
    });
}
drawGrid(gridSquare);
console.log(gridSquare);
grid === null || grid === void 0 ? void 0 : grid.addEventListener('mousedown', (e) => {
    handleClick(e);
});
let firstClick = true;
let secondClick = false;
function handleClick(e) {
    var _a;
    const clickedDivId = (_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.id;
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
// function findPath(start: NodeSquare, target: NodeSquare) {
//     console.log('FINDING PATH')
//     console.log(gridHash)
//     const openList = []
//     const closedList = []
//     openList.push(start)
//     while (openList.length > 0) {}
// }
//# sourceMappingURL=index.js.map
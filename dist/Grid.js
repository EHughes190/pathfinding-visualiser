import { NodePoint } from './NodePoint.js';
var Grid = /** @class */ (function () {
    function Grid(numCols, numRows) {
        this.grid = [];
        this.numRows = numRows;
        this.numCols = numCols;
        this.gridHash = new Map();
    }
    Grid.prototype.getGrid = function () {
        return this.grid;
    };
    Grid.prototype.getGridHash = function () {
        return this.gridHash;
    };
    // Creates a grid[][] holding our nodes
    Grid.prototype.setup = function () {
        for (var i = 0; i < this.numRows; i++) {
            var row = [];
            for (var j = 0; j < this.numCols; j++) {
                var id = this.generateID(i, j).toString();
                var pos = { x: j, y: i };
                var node = new NodePoint(id, false, false, pos);
                // add the node to a map for reference
                this.gridHash.set(id, node);
                row.push(node);
            }
            this.grid.push(row);
        }
    };
    Grid.prototype.reset = function (gridElement) {
        this.grid = [];
        if (gridElement) {
            while (gridElement.hasChildNodes()) {
                gridElement.removeChild(gridElement.children[0]);
            }
        }
        this.draw(gridElement);
    };
    Grid.prototype.draw = function (gridElement) {
        this.setup();
        this.grid.map(function (row) {
            var rowDiv = document.createElement('div');
            rowDiv.classList.add('row');
            gridElement === null || gridElement === void 0 ? void 0 : gridElement.appendChild(rowDiv);
            row.map(function (node) {
                var nodeDiv = document.createElement('div');
                // nodeDiv.innerHTML = node.id
                nodeDiv.classList.add('node');
                nodeDiv.id = node.id;
                nodeDiv.setAttribute('data-active', 'false');
                nodeDiv.setAttribute('data-start', 'false');
                nodeDiv.setAttribute('data-target', 'false');
                rowDiv.appendChild(nodeDiv);
            });
        });
    };
    // Cantor pairing function
    Grid.prototype.generateID = function (a, b) {
        return (Math.pow(a, 2) + a + 2 * a * b + 3 * b + Math.pow(b, 2)) / 2;
    };
    return Grid;
}());
export { Grid };

import { NodePoint } from './NodePoint.js';
var Grid = /** @class */ (function () {
    function Grid(numCols, numRows) {
        this.grid = [];
        this.numRows = numRows;
        this.numCols = numCols;
    }
    Grid.prototype.getGrid = function () {
        return this.grid;
    };
    // Creates a grid[][] holding our nodes
    Grid.prototype.setup = function () {
        for (var i = 0; i < this.numRows; i++) {
            var row = [];
            for (var j = 0; j < this.numCols; j++) {
                var id = "".concat(j).concat(i);
                var pos = { x: j, y: i };
                var node = new NodePoint(id, false, false, pos);
                // add the node to a map for reference
                // gridHash.set(id, node)
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
                nodeDiv.innerHTML = node.id;
                nodeDiv.classList.add('node');
                nodeDiv.id = node.id;
                nodeDiv.setAttribute('data-active', 'false');
                nodeDiv.setAttribute('data-start', 'false');
                nodeDiv.setAttribute('data-target', 'false');
                rowDiv.appendChild(nodeDiv);
            });
        });
    };
    return Grid;
}());
export { Grid };

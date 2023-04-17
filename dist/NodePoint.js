var NodePoint = /** @class */ (function () {
    function NodePoint(id, isStart, isTarget, pos) {
        this.id = id;
        this.isStart = isStart;
        this.isTarget = isTarget;
        this.gCost = 0;
        this.hCost = 0;
        this.fCost = 0;
        this.pos = { x: pos.x, y: pos.y };
        this.isWall = false;
        this.parent = undefined;
    }
    // returns all neighbours positions that are valid - not off the grid
    NodePoint.prototype.getNeighbours = function (grid) {
        var _this = this;
        var neighbours = [];
        var dirs = [
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: -1, y: 0 },
            { x: 0, y: -1 },
            { x: 1, y: 1 },
            { x: -1, y: 1 },
            { x: 1, y: -1 },
            { x: -1, y: -1 },
        ];
        dirs.forEach(function (dir) {
            var neighbourPos = {
                x: _this.pos.x + dir.x,
                y: _this.pos.y + dir.y,
            };
            if (neighbourPos.x >= 0 &&
                neighbourPos.y >= 0 &&
                neighbourPos.x < grid[0].length &&
                neighbourPos.y < grid.length) {
                grid.forEach(function (row) {
                    row.forEach(function (node) {
                        // node is a neighbour
                        if (node.pos.x === neighbourPos.x &&
                            node.pos.y === neighbourPos.y) {
                            neighbours.push(node);
                        }
                    });
                });
            }
        });
        return neighbours;
    };
    return NodePoint;
}());
export { NodePoint };

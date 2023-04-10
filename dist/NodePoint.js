export class NodePoint {
    constructor(id, isStart, isTarget, pos) {
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
    getNeighbours(grid) {
        const neighbours = [];
        const dirs = [
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: -1, y: 0 },
            { x: 0, y: -1 },
            { x: 1, y: 1 },
            { x: -1, y: 1 },
            { x: 1, y: -1 },
            { x: -1, y: -1 },
        ];
        dirs.forEach((dir) => {
            const neighbourPos = {
                x: this.pos.x + dir.x,
                y: this.pos.y + dir.y,
            };
            if (neighbourPos.x >= 0 &&
                neighbourPos.y >= 0 &&
                neighbourPos.x < grid[0].length &&
                neighbourPos.y < grid.length) {
                grid.forEach((row) => {
                    row.forEach((node) => {
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
    }
}
//# sourceMappingURL=NodePoint.js.map
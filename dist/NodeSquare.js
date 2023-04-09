export class NodeSquare {
    constructor(id, isStart, isTarget, gCost, hCost, fCost, pos) {
        this.id = id;
        this.isStart = isStart;
        this.isTarget = isTarget;
        this.gCost = gCost;
        this.hCost = hCost;
        this.fCost = fCost;
        this.pos = { x: pos.x, y: pos.y };
    }
    getNeighbours(grid) {
        const result = [];
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
            const neighbour = { x: this.pos.x + dir.x, y: this.pos.y + dir.y };
            if (neighbour.x >= 0 &&
                neighbour.y >= 0 &&
                neighbour.x < grid[0].length &&
                neighbour.y < grid.length) {
                result.push(neighbour);
            }
        });
        return result;
    }
}
//# sourceMappingURL=NodeSquare.js.map
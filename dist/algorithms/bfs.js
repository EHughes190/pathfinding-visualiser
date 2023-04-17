import { retracePath } from './utils.js';
export function bfs(start, target, grid) {
    var seen = [];
    var frontier = [start];
    var _loop_1 = function () {
        var current = frontier.shift();
        if (current === target) {
            return { value: { path: retracePath(start, target), seen: seen } };
        }
        var neighbours = current === null || current === void 0 ? void 0 : current.getNeighbours(grid);
        neighbours === null || neighbours === void 0 ? void 0 : neighbours.forEach(function (n) {
            if (current) {
                if (seen.includes(n) || n.isWall) {
                    return;
                }
                if (!frontier.includes(n)) {
                    frontier.push(n);
                    seen.push(current);
                    n.parent = current;
                }
            }
        });
    };
    while (frontier.length) {
        var state_1 = _loop_1();
        if (typeof state_1 === "object")
            return state_1.value;
    }
    return { path: [], seen: seen };
}

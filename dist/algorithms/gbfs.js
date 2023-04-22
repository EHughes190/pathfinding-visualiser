import { retracePath, heuristic } from './utils.js';
// Choses the lowest hCost possible at all times, not considering the distance from the start
export function gbfs(start, target, grid) {
    start.hCost = heuristic(start, target);
    var openSet = [start];
    // const openSet = new MinHeap()
    // openSet.insert(start)
    var seen = [];
    while (openSet.length) {
        // let current = openSet.delete()
        var current = openSet[0];
        for (var i = 1; i < openSet.length; i++) {
            if (openSet[i].hCost < current.hCost) {
                current = openSet[i];
            }
        }
        openSet.shift();
        if (current === target) {
            break;
        }
        var neighbours = current.getNeighbours(grid);
        for (var i = 0; i < neighbours.length; i++) {
            var n = neighbours[i];
            if (n.isWall || seen.includes(n)) {
                continue;
            }
            if (!openSet.includes(n)) {
                n.parent = current;
                n.hCost = heuristic(n, target);
                seen.push(n);
                // add the neighbour to the openset for evaluation
                openSet.push(n);
            }
        }
    }
    return { path: retracePath(start, target), seen: seen };
}

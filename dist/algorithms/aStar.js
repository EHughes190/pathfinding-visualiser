import { retracePath } from './utils.js';
// Estimates the hCost (dist from current Node and target)
// OR the gCost (dist from start to curret Node)
export function heuristic(start, target) {
    var _a = start.pos, ax = _a.x, ay = _a.y;
    var _b = target.pos, bx = _b.x, by = _b.y;
    // Manhatten distance - use for just N,E,S,W
    var d1 = Math.abs(ax - bx);
    var d2 = Math.abs(ay - by);
    return d1 + d2;
}
export function aStar(start, target, grid) {
    start.gCost = 0;
    start.hCost = heuristic(start, target);
    start.fCost = start.gCost + start.hCost;
    var openSet = [start];
    var seen = [];
    while (openSet.length) {
        var current = openSet[0];
        for (var i = 1; i < openSet.length; i++) {
            if (openSet[i].fCost < current.fCost ||
                (openSet[i].fCost === current.fCost &&
                    openSet[i].hCost < current.hCost)) {
                current = openSet[i];
            }
        }
        openSet.shift();
        if (current === target) {
            return { path: retracePath(start, target), seen: seen };
        }
        var neighbours = current.getNeighbours(grid);
        console.log(current, neighbours);
        for (var i = 0; i < neighbours.length; i++) {
            var n = neighbours[i];
            if (n.isWall || seen.includes(n)) {
                continue;
            }
            // new gCost from current to neighbour node
            var tentative_gcost = current.gCost + heuristic(current, n);
            // if the new gCost is less than the current cost, update the neighbour!
            if (tentative_gcost < n.gCost) {
                n.parent = current;
                n.gCost = tentative_gcost;
                n.hCost = heuristic(neighbours[i], target);
                n.fCost = tentative_gcost + n.hCost;
                seen.push(neighbours[i]);
                // add the neighbour to the openset for evaluation
                if (!openSet.includes(n)) {
                    openSet.push(n);
                }
            }
        }
    }
    return { path: [], seen: seen };
}

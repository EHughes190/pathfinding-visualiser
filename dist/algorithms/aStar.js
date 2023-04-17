import { MinHeap } from '../MinHeap.js';
import { retracePath } from './utils.js';
// Estimates the hCost (dist from current Node and target)
// OR the gCost (dist from start to curret Node)
export function heuristic(a, b) {
    // Use for diagonal distances
    var _a = a.pos, ax = _a.x, ay = _a.y;
    var _b = b.pos, bx = _b.x, by = _b.y;
    var dstX = Math.abs(ax - bx);
    var dstY = Math.abs(ay - by);
    if (dstX > dstY) {
        return 14 * dstY + 10 * (dstX - dstY);
    }
    return 14 * dstX + 10 * (dstY - dstX);
    // Manhatten distance - use for just N,E,S,W
    // const d1 = Math.abs(b.pos.x - a.pos.x)
    // const d2 = Math.abs(b.pos.y - b.pos.y)
    // return d1 + d2
}
export function aStar(start, target, grid) {
    var openList = new MinHeap();
    // const openList: NodePoint[] = [] as NodePoint[]
    var closedList = [];
    openList.insert(start);
    var _loop_1 = function () {
        var current = openList.delete();
        // let current = openList[0]
        // for (let i = 1; i < openList.length; i++) {
        //     if (
        //         openList[i].fCost < current.fCost ||
        //         (openList[i].fCost === current.fCost &&
        //             openList[i].hCost < current.hCost)
        //     ) {
        //         current = openList[i]
        //     }
        // }
        // openList.splice(0, 1)
        closedList.push(current);
        // Found the target
        if (current === target) {
            console.log(closedList);
            return { value: { path: retracePath(start, target), seen: closedList } };
        }
        var neighbours = current.getNeighbours(grid);
        neighbours.forEach(function (n) {
            //ignore wall nodes or if we've already checked this node
            if (n.isWall || closedList.includes(n)) {
                return;
            }
            // calculate new gCost of neighbour
            var newMovementCostToNeighbour = current.gCost + heuristic(current, n);
            if (newMovementCostToNeighbour < current.gCost ||
                !openList.contains(n)) {
                n.gCost = newMovementCostToNeighbour;
                n.hCost = heuristic(n, target);
                n.fCost = n.gCost + n.hCost;
                n.parent = current;
                closedList.push(n);
                if (!openList.contains(n)) {
                    openList.insert(n);
                }
            }
        });
    };
    // openList.push(start)
    while (openList.length > 0) {
        var state_1 = _loop_1();
        if (typeof state_1 === "object")
            return state_1.value;
    }
    return { path: [], seen: closedList };
}

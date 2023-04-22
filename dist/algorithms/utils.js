// Walk from target, up each node's parent and adding it to the path list
export function retracePath(start, target) {
    var path = [];
    var current = target;
    while (current !== start) {
        path.push(current);
        if (current.parent) {
            current = current.parent;
        }
    }
    path.push(start);
    path.reverse();
    console.log('PATH', path);
    return path;
}
// Estimates the hCost (dist from current Node and target)
// OR the gCost (dist from start to curret Node)
// On a square grid that allows 4 directions of movement, use Manhattan distance (L1).
// On a square grid that allows 8 directions of movement, use Diagonal distance (L∞).
// On a square grid that allows any direction of movement, you might or might not want Euclidean distance (L2). If A* is finding paths on the grid but you are allowing movement not on the grid, you may want to consider other representations of the map.
// On a hexagon grid that allows 6 directions of movement, use Manhattan distance adapted to hexagonal grids.
// https://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
export function heuristic(start, target) {
    var _a = start.pos, ax = _a.x, ay = _a.y;
    var _b = target.pos, bx = _b.x, by = _b.y;
    var dstX = Math.abs(ax - bx);
    var dstY = Math.abs(ay - by);
    // dx = abs(node.x - goal.x)
    // dy = abs(node.y - goal.y)
    // 8 sided directional grids
    //Chebyshev distance - D = 1, D2 = 1
    //octile distance - D = 1, D2 = sqrt(2)
    // return D * (dx + dy) + (D2 - 2 * D) * min(dx, dy)
    var D = 10;
    var D2 = 10 * Math.sqrt(2);
    return D * (dstX + dstY) + (D2 - 2 * D) * Math.min(dstX, dstY);
    //also written as:
    // if (dstX > dstY) {
    //     return 14 * dstY + 10 * (dstX - dstY)
    // }
    // return 14 * dstX + 10 * (dstY - dstX)
    // Manhatten distance - use for just N,E,S,W
    // const d1 = Math.abs(ax - bx)
    // const d2 = Math.abs(ay - by)
    // return d1 + d2
}

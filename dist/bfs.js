import { retracePath } from './aStar.js';
export function bfs(start, target, grid) {
    const seen = [];
    const frontier = [start];
    while (frontier.length) {
        let current = frontier.shift();
        if (current === target) {
            return { path: retracePath(start, target), seen };
        }
        const neighbours = current?.getNeighbours(grid);
        neighbours?.forEach((n) => {
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
    }
    return { path: [], seen };
}
//# sourceMappingURL=bfs.js.map
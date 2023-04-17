import { NodePoint } from '../NodePoint.js'
import { Grid } from '../types.js'
import { retracePath } from './utils.js'

export function bfs(
    start: NodePoint,
    target: NodePoint,
    grid: Grid
): { path: NodePoint[]; seen: NodePoint[] } {
    const seen: NodePoint[] = [] as NodePoint[]
    const frontier = [start]

    while (frontier.length) {
        let current = frontier.shift()

        if (current === target) {
            return { path: retracePath(start, target), seen }
        }

        const neighbours = current?.getNeighbours(grid)

        neighbours?.forEach((n) => {
            if (current) {
                if (seen.includes(n) || n.isWall) {
                    return
                }

                if (!frontier.includes(n)) {
                    frontier.push(n)
                    seen.push(current)
                    n.parent = current
                }
            }
        })
    }

    return { path: [] as NodePoint[], seen }
}

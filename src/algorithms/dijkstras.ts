import { NodePoint } from '../NodePoint.js'
import { Grid } from '../types.js'
import { retracePath } from './utils.js'

export function dijkstras(
    start: NodePoint,
    target: NodePoint,
    grid: Grid
): { path: NodePoint[]; seen: NodePoint[] } {
    const seen: NodePoint[] = [start]
    const frontier = [start]

    while (frontier.length) {
        let current = frontier.shift()

        if (current === target) {
            return { path: retracePath(start, target), seen }
        }

        const neighbours = current?.getNeighbours(grid)

        neighbours?.forEach((n) => {
            if (current) {
                const newCost = current?.gCost + 1

                if (seen.includes(n) || n.isWall) {
                    return
                }

                if (!frontier.includes(n) || newCost < current.gCost) {
                    n.gCost = newCost
                    seen.push(n)
                    n.parent = current

                    if (!frontier.includes(n)) {
                        frontier.push(n)
                    }
                }
            }
        })
    }

    return { path: [] as NodePoint[], seen }
}

import { NodePoint } from '../NodePoint.js'
import { Grid } from '../types.js'
import { retracePath, heuristic } from './utils.js'

// Choses the lowest hCost possible at all times, not considering the distance from the start
export function gbfs(
    start: NodePoint,
    target: NodePoint,
    grid: Grid
): { path: NodePoint[]; seen: NodePoint[] } {
    start.hCost = heuristic(start, target)

    const openSet = [start]
    // const openSet = new MinHeap()
    // openSet.insert(start)
    const seen: NodePoint[] = [] as NodePoint[]

    while (openSet.length) {
        // let current = openSet.delete()
        let current = openSet[0]
        let currentIndex = 0

        for (let i = 1; i < openSet.length; i++) {
            if (openSet[i].hCost < current.hCost) {
                current = openSet[i]
                currentIndex = i
            }
        }

        openSet.splice(currentIndex, 1)

        if (current === target) {
            break
        }

        seen.push(current)

        const neighbours = current.getNeighbours(grid)

        for (let i = 0; i < neighbours.length; i++) {
            const n = neighbours[i]

            if (n.isWall || seen.includes(n)) {
                continue
            }

            if (!openSet.includes(n)) {
                n.parent = current
                n.hCost = heuristic(n, target)
                
                // add the neighbour to the openset for evaluation
                openSet.push(n)
            }
        }
    }

    return { path: retracePath(start, target), seen }
}
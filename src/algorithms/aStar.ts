import { NodePoint } from '../NodePoint.js'
import { MinHeap } from '../MinHeap.js'
import { Grid } from '../types.js'
import { retracePath, heuristic } from './utils.js'

export function aStar(
    start: NodePoint,
    target: NodePoint,
    grid: Grid
): { path: NodePoint[]; seen: NodePoint[] } {
    start.gCost = 0
    start.hCost = heuristic(start, target)
    start.fCost = start.gCost + start.hCost

    const openSet = [start]
    // const openSet = new MinHeap()
    // openSet.insert(start)
    const seen: NodePoint[] = [] as NodePoint[]

    while (openSet.length) {
        // let current = openSet.delete()
        let current = openSet[0]
        let currentIndex = 0

        for (let i = 1; i < openSet.length; i++) {
            if (
                openSet[i].fCost < current.fCost ||
                (openSet[i].fCost === current.fCost &&
                    openSet[i].hCost < current.hCost)
            ) {
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

            // new gCost from current to neighbour node
            const tentative_gcost = current.gCost + heuristic(current, n)

            // if the new gCost is less than the current cost, update the neighbour!
            if (tentative_gcost < n.gCost || !openSet.includes(n)) {
                n.parent = current
                n.gCost = tentative_gcost
                n.hCost = heuristic(neighbours[i], target)
                n.fCost = tentative_gcost + n.hCost
                seen.push(n)

                // add the neighbour to the openset for evaluation
                if (!openSet.includes(n)) {
                    openSet.push(n)
                }
            }
        }
    }

    return { path: retracePath(start, target), seen }
}
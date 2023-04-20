import { NodePoint } from '../NodePoint.js'
import { MinHeap } from '../MinHeap.js'
import { Grid } from '../types.js'
import { retracePath } from './utils.js'

// Estimates the hCost (dist from current Node and target)
// OR the gCost (dist from start to curret Node)
export function heuristic(start: NodePoint, target: NodePoint) {
    const { x: ax, y: ay } = start.pos
    const { x: bx, y: by } = target.pos

    // Manhatten distance - use for just N,E,S,W
    const d1 = Math.abs(ax - bx)
    const d2 = Math.abs(ay - by)

    return d1 + d2
}

export function aStar(
    start: NodePoint,
    target: NodePoint,
    grid: Grid
): { path: NodePoint[]; seen: NodePoint[] } {
    start.gCost = 0
    start.hCost = heuristic(start, target)
    start.fCost = start.gCost + start.hCost

    const openSet = [start]
    const seen: NodePoint[] = [] as NodePoint[]

    while (openSet.length) {
        let current = openSet[0]

        for (let i = 1; i < openSet.length; i++) {
            if (
                openSet[i].fCost < current.fCost ||
                (openSet[i].fCost === current.fCost &&
                    openSet[i].hCost < current.hCost)
            ) {
                current = openSet[i]
            }
        }

        openSet.shift()

        if (current === target) {
            return { path: retracePath(start, target), seen }
        }

        const neighbours = current.getNeighbours(grid)
        console.log(current, neighbours)

        for (let i = 0; i < neighbours.length; i++) {
            const n = neighbours[i]

            if (n.isWall || seen.includes(n)) {
                continue
            }

            // new gCost from current to neighbour node
            const tentative_gcost = current.gCost + heuristic(current, n)

            // if the new gCost is less than the current cost, update the neighbour!
            if (tentative_gcost < n.gCost) {
                n.parent = current
                n.gCost = tentative_gcost
                n.hCost = heuristic(neighbours[i], target)
                n.fCost = tentative_gcost + n.hCost
                seen.push(neighbours[i])

                // add the neighbour to the openset for evaluation
                if (!openSet.includes(n)) {
                    openSet.push(n)
                }
            }
        }
    }

    return { path: [] as NodePoint[], seen }
}

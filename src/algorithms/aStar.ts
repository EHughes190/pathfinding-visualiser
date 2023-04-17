import { NodePoint } from '../NodePoint.js'
import { MinHeap } from '../MinHeap.js'
import { Grid } from '../types.js'
import { retracePath } from './utils.js'

// Estimates the hCost (dist from current Node and target)
// OR the gCost (dist from start to curret Node)
export function heuristic(a: NodePoint, b: NodePoint) {
    // Use for diagonal distances
    // const { x: ax, y: ay } = a.pos
    // const { x: bx, y: by } = b.pos

    // const dstX = Math.abs(ax - bx)
    // const dstY = Math.abs(ay - by)

    // if (dstX > dstY) {
    //     return 14 * dstY + 10 * (dstX - dstY)
    // }
    // return 14 * dstX + 10 * (dstY - dstX)

    // Manhatten distance - use for just N,E,S,W
    const d1 = Math.abs(b.pos.x - a.pos.x)
    const d2 = Math.abs(b.pos.y - b.pos.y)

    return d1 + d2
}

export function aStar(
    start: NodePoint,
    target: NodePoint,
    grid: Grid
): { path: NodePoint[]; seen: NodePoint[] } {
    const openList: MinHeap = new MinHeap()
    // const openList: NodePoint[] = [] as NodePoint[]
    const closedList: NodePoint[] = [] as NodePoint[]
    openList.insert(start)
    // openList.push(start)

    while (openList.length > 0) {
        let current = openList.delete()
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
        closedList.push(current)

        // Found the target
        if (current === target) {
            console.log(closedList)
            return { path: retracePath(start, target), seen: closedList }
        }

        const neighbours = current.getNeighbours(grid)

        neighbours.forEach((n) => {
            //ignore wall nodes or if we've already checked this node
            if (n.isWall || closedList.includes(n)) {
                return
            }

            // calculate new gCost of neighbour
            const newMovementCostToNeighbour =
                current.gCost + heuristic(current, n)

            if (
                newMovementCostToNeighbour < current.gCost ||
                !openList.contains(n)
            ) {
                n.gCost = newMovementCostToNeighbour
                n.hCost = heuristic(n, target)
                n.fCost = n.gCost + n.hCost
                n.parent = current
                closedList.push(n)

                if (!openList.contains(n)) {
                    openList.insert(n)
                }
            }
        })
    }
    return { path: [] as NodePoint[], seen: closedList }
}

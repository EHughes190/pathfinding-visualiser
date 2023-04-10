import { NodePoint } from './NodePoint.js'
import { MinHeap } from './MinHeap.js'
import { Grid } from './Grid.js'
// Estimates the hCost (dist from current Node and target)
// OR the gCost (dist from start to curret Node)
export function heuristic(a: NodePoint, b: NodePoint) {
    const { x: ax, y: ay } = a.pos
    const { x: bx, y: by } = b.pos

    const dstX = Math.abs(ax - bx)
    const dstY = Math.abs(ay - by)

    if (dstX > dstY) {
        return 14 * dstY + 10 * (dstX - dstY)
    }
    return 14 * dstX + 10 * (dstY - dstX)
}

export function findPath(start: NodePoint, target: NodePoint, grid: Grid) {
    const openList: MinHeap = new MinHeap()
    const closedList: NodePoint[] = [] as NodePoint[]
    openList.insert(start)

    while (openList.length > 0) {
        let current = openList.delete()

        closedList.push(current)

        // Found the target
        if (current === target) {
            return retracePath(start, target)
        }

        const neighbours = current.getNeighbours(grid.getGrid())

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

                if (!openList.contains(n)) {
                    openList.insert(n)
                }
            }
        })
    }
}

// Walk from target, up each node's parent and adding it to the path list
export function retracePath(start: NodePoint, target: NodePoint) {
    const path: NodePoint[] = [] as NodePoint[]

    let current: NodePoint = target

    while (current !== start) {
        path.push(current)
        if (current.parent) {
            current = current.parent
        }
    }
    path.reverse()

    console.log('PATH', path)
    return path
}

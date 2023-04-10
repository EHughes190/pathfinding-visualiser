import { Grid } from './Grid.js'
import { NodePoint } from './NodePoint.js'
import { MinHeap } from './MinHeap.js'

const gridContainer = document.getElementById('grid')
const pathBtn = document.getElementById('find-path')
const gridHash = new Map<string, NodePoint>()

const grid = new Grid(5, 5)
grid.draw(gridContainer)
const nodeS = grid.getGrid()[0][0]
const nodeT = grid.getGrid()[4][0]
console.log(grid.getGrid())

pathBtn?.addEventListener('click', () => {
    console.log('FINDING PATH...')
    const path = findPath(nodeS, nodeT, grid)
    path?.forEach((node) => {
        const pathDiv = document.getElementById(node.id)
        if (pathDiv) {
            pathDiv.style.backgroundColor = 'yellow'
        }

        const startDiv = document.getElementById(nodeS.id)
        if (startDiv) {
            startDiv.style.backgroundColor = 'blue'
        }
    })
})

gridContainer!.addEventListener('mousedown', (e) => {
    handleClick(e)
})

let firstClick = true
let secondClick = false

function handleClick(e: any) {
    const clickedDivId = e?.target?.id
    const clickedDiv = document.getElementById(clickedDivId)
    if (clickedDiv) {
        const data = clickedDiv.dataset

        if (firstClick) {
            data.start = 'true'
            firstClick = false
            secondClick = true
            clickedDiv.style.backgroundColor = 'yellow'
            if (gridHash && gridHash.get(clickedDivId)) {
                gridHash.get(clickedDivId)!.isStart = true
            }
            return
        }

        if (secondClick) {
            data.target = 'true'
            secondClick = false
            clickedDiv.style.backgroundColor = 'blue'
            if (gridHash && gridHash.get(clickedDivId)) {
                gridHash.get(clickedDivId)!.isTarget = true
            }
            return
        }

        if (
            data.active === 'false' &&
            data.start !== 'true' &&
            data.target !== 'true'
        ) {
            clickedDiv.style.backgroundColor = 'red'
            data.active = 'true'
        } else if (
            data.active === 'true' &&
            data.start !== 'true' &&
            data.target !== 'true'
        ) {
            clickedDiv.style.backgroundColor = '#f9f9f9'
            data.active = 'false'
        }
    }
}

// Estimates the hCost (dist from current Node and target)
// OR the gCost (dist from start to curret Node)
function heuristic(a: NodePoint, b: NodePoint) {
    const { x: ax, y: ay } = a.pos
    const { x: bx, y: by } = b.pos

    const dstX = Math.abs(ax - bx)
    const dstY = Math.abs(ay - by)

    if (dstX > dstY) {
        return 14 * dstY + 10 * (dstX - dstY)
    }
    return 14 * dstX + 10 * (dstY - dstX)
}

function findPath(start: NodePoint, target: NodePoint, grid: Grid) {
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
function retracePath(start: NodePoint, target: NodePoint) {
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

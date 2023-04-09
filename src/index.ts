import { Grid } from './Grid.js'
import { NodePoint } from './NodePoint.js'

const gridContainer = document.getElementById('grid')
const pathBtn = document.getElementById('find-path')
const gridHash = new Map<string, NodePoint>()

pathBtn?.addEventListener('click', () => {
    // findPath()
    console.log('IMPLEMENT PATH FINDING')
})

const grid = new Grid(5, 5)
grid.draw(gridContainer)
const node = grid.getGrid()[4][4]
console.log(node)
console.log(node.getNeighbours(grid.getGrid()))
console.log(grid.getGrid())

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

function findPath(start: NodePoint, target: NodePoint) {
    console.log('FINDING PATH')

    const openList = []
    const closedList = []
    openList.push(start)

    while (openList.length > 0) {
        const current = openList[0]
        openList.pop()
        closedList.push(current)

        if (current === target) {
            return
        }
    }
}

import { NodeSquare } from './NodeSquare.js'
import { Grid } from './types'

const grid = document.getElementById('grid')
const pathBtn = document.getElementById('find-path')
const gridHash = new Map<string, NodeSquare>()

pathBtn?.addEventListener('click', () => {
    // findPath()
    console.log('IMPLEMENT PATH FINDING')
})

// Creates a grid[][] holding our nodes
function gridSetup(numRows: number, numCols: number) {
    const grid = []

    for (let i = 0; i < numRows; i++) {
        const row = []
        for (let j = 0; j < numCols; j++) {
            const id = `${i}${j}`
            const node = new NodeSquare(id, false, false, 0, 0, 0, {
                x: j,
                y: i,
            })
            gridHash.set(id, node)

            row.push(node)
        }
        grid.push(row)
    }

    return grid
}

const gridSquare = gridSetup(5, 5)

function drawGrid(gridSquare: Grid) {
    gridSquare.map((row) => {
        const rowDiv = document.createElement('div')
        rowDiv.classList.add('row')

        grid?.appendChild(rowDiv)

        row.map((node) => {
            const nodeDiv = document.createElement('div')
            nodeDiv.classList.add('node')
            nodeDiv.id = node.id
            nodeDiv.setAttribute('data-active', 'false')
            nodeDiv.setAttribute('data-start', 'false')
            nodeDiv.setAttribute('data-target', 'false')

            rowDiv.appendChild(nodeDiv)
        })
    })
}

drawGrid(gridSquare)
const node = gridSquare[4][4]
console.log(node)
console.log(node.getNeighbours(gridSquare))
console.log(gridSquare)

grid?.addEventListener('mousedown', (e) => {
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

// function findPath(start: NodeSquare, target: NodeSquare) {
//     console.log('FINDING PATH')
//     console.log(gridHash)

//     const openList = []
//     const closedList = []
//     openList.push(start)

//     while (openList.length > 0) {}
// }

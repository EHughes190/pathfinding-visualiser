import { Grid } from './Grid.js'
import { aStar } from './algorithms/aStar.js'
import { setupStartAndTargetNodes, colourNodes } from './utils.js'
import { bfs } from './algorithms/bfs.js'
import { dijkstras } from './algorithms/dijkstras.js'
import { gbfs } from './algorithms/gbfs.js'

const gridContainer = document.querySelector('.grid')
const astarBtn = document.querySelector('#find-astar')
const bfsBtn = document.querySelector('#find-bfs')
const dijkstraBtn = document.querySelector('#find-dijkstra')
const gbfsBtn = document.querySelector('#find-gbfs')
const resetBtn = document.querySelector('#reset')

const grid = new Grid(20, 20)
grid.draw(gridContainer)
let firstClick = true
let secondClick = false

resetBtn?.addEventListener('click', () => {
    grid.reset(gridContainer)
    firstClick = true
    secondClick = false
})

dijkstraBtn?.addEventListener('click', () => {
    const { start, target } = setupStartAndTargetNodes(grid)
    const { path, seen } = dijkstras(start[0], target[0], grid.getGrid())

    if (seen && path) {
        colourNodes(path, seen)
    }
})

gbfsBtn?.addEventListener('click', () => {
    const { start, target } = setupStartAndTargetNodes(grid)
    const { path, seen } = gbfs(start[0], target[0], grid.getGrid())

    if (seen && path) {
        colourNodes(path, seen)
    }
})

astarBtn?.addEventListener('click', () => {
    const { start, target } = setupStartAndTargetNodes(grid)
    const { path, seen } = aStar(start[0], target[0], grid.getGrid())

    if (seen && path) {
        colourNodes(path, seen)
    }
})

bfsBtn?.addEventListener('click', () => {
    const { start, target } = setupStartAndTargetNodes(grid)
    const { path, seen } = bfs(start[0], target[0], grid.getGrid())

    if (seen && path) {
        colourNodes(path, seen)
    }
})

gridContainer!.addEventListener('mousedown', (e) => {
    e.preventDefault()
    handleGridClick(e)
})

function handleGridClick(e: any) {
    const clickedDivId = e?.target?.id
    const clickedDiv = document.getElementById(clickedDivId)

    if (clickedDiv) {
        const { x, y } = grid.getGridHash().get(clickedDivId)!.pos
        // we can use the id as x and y coordinates to identify node in grid and update the isTarget  var.
        const node = grid.getGrid()[y][x]

        const data = clickedDiv.dataset

        // Set the start node
        if (firstClick) {
            data.start = 'true'
            firstClick = false
            secondClick = true
            clickedDiv.classList.add('start-node')
            node.isStart = true

            return
        }

        // Set the Target node
        if (secondClick) {
            if (!node.isStart) {
                data.target = 'true'
                secondClick = false
                clickedDiv.classList.add('target-node')

                node.isTarget = true
            }
            return
        }

        // Set a wall
        if (
            data.active === 'false' &&
            data.start !== 'true' &&
            data.target !== 'true'
        ) {
            clickedDiv.classList.add('wall-node')
            data.active = 'true'
            node.isWall = true
        } else if (
            data.active === 'true' &&
            data.start !== 'true' &&
            data.target !== 'true'
        ) {
            clickedDiv.classList.remove('wall-node')
            data.active = 'false'
            node.isWall = false
        }
    }
}

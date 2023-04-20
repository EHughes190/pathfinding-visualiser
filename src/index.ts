import { Grid } from './Grid.js'
import { aStar } from './algorithms/aStar.js'
import { setupStartAndTargetNodes, colourNodes } from './utils.js'
import { bfs } from './algorithms/bfs.js'
import { dijkstras } from './algorithms/dijkstras.js'

const gridContainer = document.querySelector('.grid')
const astarBtn = document.querySelector('#find-astar')
const bfsBtn = document.querySelector('#find-bfs')
const dijkstraBtn = document.querySelector('#find-dijkstra')
const resetBtn = document.querySelector('#reset')

const grid = new Grid(20, 20)
console.log(grid)
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
    handleGridClick(e)
})

function handleGridClick(e: any) {
    const clickedDivId = e?.target?.id
    const clickedDiv = document.getElementById(clickedDivId)
    const { x, y } = grid.getGridHash().get(clickedDivId)!.pos
    if (clickedDiv) {
        const data = clickedDiv.dataset

        // Set the start node
        if (firstClick) {
            data.start = 'true'
            firstClick = false
            secondClick = true
            clickedDiv.style.backgroundColor = '#476C9B'

            // we can use the id as x and y coordinates to identify node in grid and update the isStart var.
            grid.getGrid()[y][x].isStart = true
            console.log(clickedDiv)

            return
        }

        // Set the Target node
        if (secondClick) {
            if (grid.getGrid()[y][x].isStart === false) {
                data.target = 'true'
                secondClick = false
                clickedDiv.style.backgroundColor = '#984447'

                // we can use the id as x and y coordinates to identify node in grid and update the isTarget  var.
                grid.getGrid()[y][x].isTarget = true
            }
            return
        }

        // Set a wall
        if (
            data.active === 'false' &&
            data.start !== 'true' &&
            data.target !== 'true'
        ) {
            clickedDiv.style.backgroundColor = '#656565'
            data.active = 'true'
            grid.getGrid()[y][x].isWall = true
        } else if (
            data.active === 'true' &&
            data.start !== 'true' &&
            data.target !== 'true'
        ) {
            clickedDiv.style.backgroundColor = '#fff'
            data.active = 'false'
            grid.getGrid()[y][x].isWall = false
        }
    }
}

import { Grid } from './Grid.js'
import { aStar } from './aStar.js'
import { bfs } from './bfs.js'

const gridContainer = document.getElementById('grid')
const astarBtn = document.getElementById('find-astar')
const bfsBtn = document.getElementById('find-bfs')

const grid = new Grid(10, 10)
grid.draw(gridContainer)

astarBtn?.addEventListener('click', () => {
    console.log('FINDING PATH...')
    const start = grid
        .getGrid()
        .map((row) => {
            return row.filter((node) => node.isStart).flat()
        })
        .flat()

    const target = grid
        .getGrid()
        .map((row) => {
            return row.filter((node) => node.isTarget).flat()
        })
        .flat()

    const { path, seen } = aStar(start[0], target[0], grid.getGrid())
    console.log(seen)
    console.log(path)
    if (seen) {
        for (let i = 0; i < seen.length - 1; i++) {
            const seenDiv = document.getElementById(seen[i].id)
            if (seenDiv) {
                seenDiv.style.backgroundColor = 'pink'
            }
        }
    }
    if (path) {
        for (let i = 0; i < path.length; i++) {
            const pathDiv = document.getElementById(path[i].id)
            if (pathDiv) {
                if (i === 0) {
                    pathDiv.style.backgroundColor = 'blue'
                } else if (i === path.length - 1) {
                    pathDiv.style.backgroundColor = 'red'
                } else {
                    pathDiv.style.backgroundColor = 'yellow'
                }
            }
        }
    }
})

bfsBtn?.addEventListener('click', () => {
    console.log('FINDING PATH...')
    const start = grid
        .getGrid()
        .map((row) => {
            return row.filter((node) => node.isStart).flat()
        })
        .flat()

    const target = grid
        .getGrid()
        .map((row) => {
            return row.filter((node) => node.isTarget).flat()
        })
        .flat()

    const { path, seen } = bfs(start[0], target[0], grid.getGrid())
    if (seen) {
        for (let i = 0; i < seen.length - 1; i++) {
            const seenDiv = document.getElementById(seen[i].id)
            if (seenDiv) {
                seenDiv.style.backgroundColor = 'pink'
            }
        }
    }
    if (path) {
        for (let i = 0; i < path.length - 1; i++) {
            const pathDiv = document.getElementById(path[i].id)
            if (pathDiv) {
                if (i === 0) {
                    pathDiv.style.backgroundColor = 'blue'
                } else if (i === path.length - 1) {
                    pathDiv.style.backgroundColor = 'red'
                } else {
                    pathDiv.style.backgroundColor = 'yellow'
                }
            }
        }
    }
})

gridContainer!.addEventListener('mousedown', (e) => {
    handleClick(e)
})

let firstClick = true
let secondClick = false

function handleClick(e: any) {
    const clickedDivId = e?.target?.id
    const clickedDiv = document.getElementById(clickedDivId)
    const [x, y] = clickedDivId.split('')
    if (clickedDiv) {
        const data = clickedDiv.dataset

        // Set the start node
        if (firstClick) {
            data.start = 'true'
            firstClick = false
            secondClick = true
            clickedDiv.style.backgroundColor = 'blue'

            // we can use the id as x and y coordinates to identify node in grid and update the isStart var.
            grid.getGrid()[y][x].isStart = true

            return
        }

        // Set the Target node
        if (secondClick) {
            if (grid.getGrid()[y][x].isStart === false) {
                data.target = 'true'
                secondClick = false
                clickedDiv.style.backgroundColor = 'red'

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
            clickedDiv.style.backgroundColor = 'grey'
            data.active = 'true'
            grid.getGrid()[y][x].isWall = true
        } else if (
            data.active === 'true' &&
            data.start !== 'true' &&
            data.target !== 'true'
        ) {
            clickedDiv.style.backgroundColor = '#f9f9f9'
            data.active = 'false'
            grid.getGrid()[y][x].isWall = false
        }
    }
}

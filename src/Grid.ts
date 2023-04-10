import { NodePoint } from './NodePoint.js'

export class Grid {
    private numCols: number
    private numRows: number
    private grid: NodePoint[][] = []

    constructor(numCols: number, numRows: number) {
        this.numRows = numRows
        this.numCols = numCols
    }

    getGrid() {
        return this.grid
    }

    // Creates a grid[][] holding our nodes
    setup() {
        for (let i = 0; i < this.numRows; i++) {
            const row = []
            for (let j = 0; j < this.numCols; j++) {
                const id = `${j}${i}`
                const pos = { x: j, y: i }
                const node = new NodePoint(id, false, false, pos)

                // add the node to a map for reference
                // gridHash.set(id, node)

                row.push(node)
            }
            this.grid.push(row)
        }
    }

    draw(gridElement: HTMLElement | null) {
        this.setup()

        this.grid.map((row) => {
            const rowDiv = document.createElement('div')
            rowDiv.classList.add('row')

            gridElement?.appendChild(rowDiv)

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
}

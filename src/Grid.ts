import { NodePoint } from './NodePoint.js'

export class Grid {
    private numCols: number
    private numRows: number
    private grid: NodePoint[][] = []
    private gridHash: Map<string, NodePoint>

    constructor(numCols: number, numRows: number) {
        this.numRows = numRows
        this.numCols = numCols
        this.gridHash = new Map()
    }

    getGrid() {
        return this.grid
    }

    getGridHash() {
        return this.gridHash
    }

    // Creates a grid[][] holding our nodes
    setup() {
        for (let i = 0; i < this.numRows; i++) {
            const row = []
            for (let j = 0; j < this.numCols; j++) {
                const id = this.generateID(i, j).toString()
                const pos = { x: j, y: i }
                const node = new NodePoint(id, false, false, pos)

                // add the node to a map for reference
                this.gridHash.set(id, node)

                row.push(node)
            }
            this.grid.push(row)
        }
    }

    reset(gridElement: Element | null) {
        this.grid = []
        if (gridElement) {
            while (gridElement.hasChildNodes()) {
                gridElement.removeChild(gridElement.children[0])
            }
        }

        this.draw(gridElement)
    }

    draw(gridElement: Element | null) {
        this.setup()

        this.grid.map((row) => {
            const rowDiv = document.createElement('div')
            rowDiv.classList.add('row')

            gridElement?.appendChild(rowDiv)

            row.map((node) => {
                const nodeDiv = document.createElement('div')
                // nodeDiv.innerHTML = node.id
                nodeDiv.classList.add('node')
                nodeDiv.id = node.id
                nodeDiv.setAttribute('data-active', 'false')
                nodeDiv.setAttribute('data-start', 'false')
                nodeDiv.setAttribute('data-target', 'false')

                rowDiv.appendChild(nodeDiv)
            })
        })
    }

    // Cantor pairing function
    private generateID(a: number, b: number) {
        return (Math.pow(a, 2) + a + 2 * a * b + 3 * b + Math.pow(b, 2)) / 2
    }
}

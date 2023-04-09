import { NodePosition } from './types'

export class NodePoint {
    id: string
    isStart: boolean
    isTarget: boolean
    isWall: boolean
    gCost: number
    hCost: number
    fCost: number
    pos: NodePosition
    parent: NodePoint | undefined

    constructor(
        id: string,
        isStart: boolean,
        isTarget: boolean,
        pos: { x: number; y: number }
    ) {
        this.id = id
        this.isStart = isStart
        this.isTarget = isTarget
        this.gCost = 0
        this.hCost = 0
        this.fCost = 0
        this.pos = { x: pos.x, y: pos.y }
        this.isWall = false
        this.parent = undefined
    }

    // returns all neighbours positions that are valid - not off the grid
    getNeighbours(grid: NodePoint[][]) {
        const result: NodePosition[] = [] as NodePosition[]

        const dirs = [
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: -1, y: 0 },
            { x: 0, y: -1 },
            { x: 1, y: 1 },
            { x: -1, y: 1 },
            { x: 1, y: -1 },
            { x: -1, y: -1 },
        ]

        dirs.forEach((dir) => {
            const neighbour = { x: this.pos.x + dir.x, y: this.pos.y + dir.y }

            if (
                neighbour.x >= 0 &&
                neighbour.y >= 0 &&
                neighbour.x < grid[0].length &&
                neighbour.y < grid.length
            ) {
                result.push(neighbour)
            }
        })

        return result
    }
}

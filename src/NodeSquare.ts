export class NodeSquare {
    id: string
    isStart: boolean
    isTarget: boolean
    gCost: number
    hCost: number
    fCost: number
    pos: { x: number; y: number }

    constructor(
        id: string,
        isStart: boolean,
        isTarget: boolean,
        gCost: number,
        hCost: number,
        fCost: number,
        pos: { x: number; y: number }
    ) {
        this.id = id
        this.isStart = isStart
        this.isTarget = isTarget
        this.gCost = gCost
        this.hCost = hCost
        this.fCost = fCost
        this.pos = { x: pos.x, y: pos.y }
    }

    getNeighbours(grid: NodeSquare[][]) {
        const result: { x: number; y: number }[] = [] as {
            x: number
            y: number
        }[]
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

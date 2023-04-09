export class NodeSquare {
    id: string
    isStart: boolean
    isTarget: boolean
    gCost: number
    hCost: number
    fCost: number

    constructor(
        id: string,
        isStart: boolean,
        isTarget: boolean,
        gCost: number,
        hCost: number,
        fCost: number
    ) {
        this.id = id
        this.isStart = isStart
        this.isTarget = isTarget
        this.gCost = gCost
        this.hCost = hCost
        this.fCost = fCost
    }
}

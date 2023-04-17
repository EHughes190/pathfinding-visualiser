import { NodePoint } from '../NodePoint.js'

// Walk from target, up each node's parent and adding it to the path list
export function retracePath(start: NodePoint, target: NodePoint) {
    const path: NodePoint[] = [] as NodePoint[]

    let current: NodePoint = target

    while (current !== start) {
        path.push(current)
        if (current.parent) {
            current = current.parent
        }
    }
    path.push(start)
    path.reverse()

    console.log('PATH', path)
    return path
}

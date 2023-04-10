import { NodePoint } from './NodePoint'

/* Min Heap
  Smallest values at the top of the binary tree.
  Can only add values at the length index of the tree e.g. a new value would be added as the Left child of '4'. The next child would be added as the Right child of 4 etc.
  If a value added is smaller than its parent, we need to 'heapify up' to move it to its correct position.
  Similarly, if we delete a value, we need to 'heapify down' to ensure the tree is in the correct order
  In the case of A*, we are comparing fCost value
 *
 *
 *                1
 *          2            4
 *       3     5      7     8
 *     4  5  7  8   8  9  9  12
 *
 *
 *
 */
export class MinHeap {
    public length: number
    private data: NodePoint[]

    constructor() {
        this.data = []
        this.length = 0
    }

    contains(n: NodePoint) {
        return this.data.includes(n)
    }

    insert(value: NodePoint): void {
        this.data[this.length] = value
        this.heapifyUp(this.length)
        this.length++
    }
    delete(): NodePoint {
        if (this.length === 0) {
            return {} as NodePoint
        }

        const out = this.data[0]
        if (this.length === 0) {
            this.data = []
            return out
        }

        this.length--
        this.data[0] = this.data[this.length]
        this.heapifyDown(0)
        return out
    }

    private heapifyDown(idx: number): void {
        const lIdx = this.leftChild(idx)
        const rIdx = this.rightChild(idx)
        // we are at the bottom of the tree
        if (idx >= this.length || lIdx >= this.length) {
            return
        }

        const lV = this.data[lIdx]
        const rV = this.data[rIdx]
        const v = this.data[idx]

        if (lV.fCost > rV.fCost && v.fCost > rV.fCost) {
            this.data[idx] = rV
            this.data[rIdx] = v
            this.heapifyDown(rIdx)
        } else if (rV.fCost > lV.fCost && v.fCost > lV.fCost) {
            this.data[idx] = lV
            this.data[lIdx] = v
            this.heapifyDown(lIdx)
        }
    }

    private heapifyUp(idx: number): void {
        // We are at the top of the tree
        if (idx === 0) {
            return
        }

        const p = this.parent(idx)
        const parentV = this.data[p]
        const v = this.data[idx]

        // parent val is larger so we need to move val up the tree
        if (parentV.fCost > v.fCost) {
            this.data[idx] = parentV
            this.data[p] = v
            this.heapifyUp(p)
        }
    }

    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2)
    }

    private leftChild(idx: number): number {
        return idx * 2 + 1
    }

    private rightChild(idx: number): number {
        return idx * 2 + 2
    }
}

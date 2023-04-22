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
var MinHeap = /** @class */ (function () {
    function MinHeap() {
        this.data = [];
        this.length = 0;
    }
    MinHeap.prototype.contains = function (n) {
        return this.data.includes(n);
    };
    MinHeap.prototype.peek = function () {
        if (this.length === 0) {
            return null;
        }
        return this.data[0];
    };
    MinHeap.prototype.insert = function (value) {
        this.data[this.length] = value;
        this.heapifyUp(this.length);
        this.length++;
    };
    MinHeap.prototype.delete = function () {
        if (this.length === 0) {
            return {};
        }
        var out = this.data[0];
        if (this.length === 0) {
            this.data = [];
            return out;
        }
        this.length--;
        this.data[0] = this.data[this.length];
        this.heapifyDown(0);
        return out;
    };
    MinHeap.prototype.heapifyDown = function (idx) {
        var lIdx = this.leftChild(idx);
        var rIdx = this.rightChild(idx);
        // we are at the bottom of the tree
        if (idx >= this.length || lIdx >= this.length) {
            return;
        }
        var lV = this.data[lIdx];
        var rV = this.data[rIdx];
        var v = this.data[idx];
        // When heapifying down we want to choose the child who is Smallest, otherwise we would end up with a parent node which is bigger than one child
        // If fCosts are the same, then we compare against hCosts
        if (lV.fCost > rV.fCost ||
            (lV.fCost === rV.fCost && lV.hCost > rV.hCost)) {
            if (v.fCost > rV.fCost) {
                this.data[idx] = rV;
                this.data[rIdx] = v;
                this.heapifyDown(rIdx);
            }
            else if (v.fCost === rV.fCost) {
                if (v.hCost > rV.hCost) {
                    this.data[idx] = rV;
                    this.data[rIdx] = v;
                    this.heapifyDown(rIdx);
                }
            }
        }
        else if (rV.fCost > lV.fCost ||
            (rV.fCost === lV.fCost && rV.hCost > lV.hCost)) {
            if (v.fCost > lV.fCost) {
                this.data[idx] = lV;
                this.data[lIdx] = v;
                this.heapifyDown(lIdx);
            }
            else if (v.fCost === lV.fCost) {
                if (v.hCost > lV.hCost) {
                    this.data[idx] = lV;
                    this.data[lIdx] = v;
                    this.heapifyDown(lIdx);
                }
            }
        }
    };
    MinHeap.prototype.heapifyUp = function (idx) {
        // We are at the top of the tree
        if (idx === 0) {
            return;
        }
        var p = this.parent(idx);
        var parentV = this.data[p];
        var v = this.data[idx];
        // parent val is larger so we need to move val up the tree
        // But what if the fCosts are the same?? Well, we just compare based on the hCost instead
        if (parentV.fCost > v.fCost ||
            (parentV.fCost === v.fCost && parentV.hCost > v.hCost)) {
            this.data[idx] = parentV;
            this.data[p] = v;
            this.heapifyUp(p);
        }
    };
    MinHeap.prototype.parent = function (idx) {
        return Math.floor((idx - 1) / 2);
    };
    MinHeap.prototype.leftChild = function (idx) {
        return idx * 2 + 1;
    };
    MinHeap.prototype.rightChild = function (idx) {
        return idx * 2 + 2;
    };
    return MinHeap;
}());
export { MinHeap };

export function setupStartAndTargetNodes(grid) {
    var start = grid
        .getGrid()
        .map(function (row) {
        return row.filter(function (node) { return node.isStart; }).concat();
    })
        .reduce(function (a, b) {
        return a.concat(b);
    });
    var target = grid
        .getGrid()
        .map(function (row) {
        return row.filter(function (node) { return node.isTarget; }).concat();
    })
        .reduce(function (a, b) {
        return a.concat(b);
    });
    return { start: start, target: target };
}
export function colourNodes(path, seen) {
    //Loop over all seen nodes
    for (var i = 0; i < seen.length - 1; i++) {
        var seenDiv = document.getElementById(seen[i].id);
        if (seenDiv) {
            seenDiv.style.backgroundColor = 'pink';
        }
    }
    // Loops over the path and recolours them
    for (var i = 0; i < path.length; i++) {
        var pathDiv = document.getElementById(path[i].id);
        if (pathDiv) {
            if (i === 0) {
                pathDiv.style.backgroundColor = '#476C9B';
            }
            else if (i === path.length - 1) {
                pathDiv.style.backgroundColor = '#984447';
            }
            else {
                pathDiv.style.backgroundColor = 'yellow';
            }
        }
    }
}

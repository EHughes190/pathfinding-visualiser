export function setupStartAndTargetNodes(grid) {
    const start = grid
        .getGrid()
        .map((row) => {
        return row.filter((node) => node.isStart).flat();
    })
        .flat();
    const target = grid
        .getGrid()
        .map((row) => {
        return row.filter((node) => node.isTarget).flat();
    })
        .flat();
    return { start, target };
}
export function colourNodes(path, seen) {
    //Loop over all seen nodes
    for (let i = 0; i < seen.length - 1; i++) {
        const seenDiv = document.getElementById(seen[i].id);
        if (seenDiv) {
            seenDiv.style.backgroundColor = 'pink';
        }
    }
    // Loops over the path and recolours them
    for (let i = 0; i < path.length; i++) {
        const pathDiv = document.getElementById(path[i].id);
        if (pathDiv) {
            if (i === 0) {
                pathDiv.style.backgroundColor = 'blue';
            }
            else if (i === path.length - 1) {
                pathDiv.style.backgroundColor = 'red';
            }
            else {
                pathDiv.style.backgroundColor = 'yellow';
            }
        }
    }
}
//# sourceMappingURL=utils.js.map
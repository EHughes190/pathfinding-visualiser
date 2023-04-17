// Walk from target, up each node's parent and adding it to the path list
export function retracePath(start, target) {
    var path = [];
    var current = target;
    while (current !== start) {
        path.push(current);
        if (current.parent) {
            current = current.parent;
        }
    }
    path.push(start);
    path.reverse();
    console.log('PATH', path);
    return path;
}

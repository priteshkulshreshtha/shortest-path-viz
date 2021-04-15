const _getPath = (parent) => {
    let path = [1];
    let cur = parent[1];
    while(cur!==-1) {
        path.push(cur);
        cur = parent[cur];
    }
    path.reverse();
    return path;
}

const findMinCostIndex = (len, costMtx, expSet) => {
    let minCost = Infinity;
    let minIndex = -1;

    for (let v = 0; v < len; v++) {
        if (expSet[v] === false && costMtx[v] <= minCost) {
            minCost = costMtx[v];
            minIndex = v;
        }
    }
    return minIndex;
}

const GetPath = (adjMtx) => {

    let costMtx = Array(adjMtx.length).fill(Infinity);
    let expSet = Array(adjMtx.length).fill(false);
    let parent = Array(adjMtx.length).fill(-1);

    costMtx[0] = 0;

    for (let _ of adjMtx) {

        

        let minCostIndex = findMinCostIndex(adjMtx.length, costMtx, expSet);


        expSet[minCostIndex] = true;

        for (let idx in costMtx) {
            if (!expSet[idx] && adjMtx[minCostIndex][idx] !== 0 && costMtx[minCostIndex] !== Infinity &&
                costMtx[minCostIndex] + adjMtx[minCostIndex][idx] < costMtx[idx]) {
                costMtx[idx] = costMtx[minCostIndex] + adjMtx[minCostIndex][idx];
                parent[idx] = minCostIndex;
            }
        }
    }
    if ( costMtx[1]===Infinity ) return null;
    return _getPath(parent)

}

export default GetPath;
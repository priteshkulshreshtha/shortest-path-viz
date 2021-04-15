const _getKey = (id) => {
    return (id===0) ? 'start' : (id === 1) ? 'end' : `node${id-2}`;
} 

const ShortDraw = (props) => {

    let curNode;
    let nextNode;
    let pathEdges = []
    
    for(let i=0; i<props.path.length -1; i++) {
        curNode = _getKey(props.path[i]);
        nextNode = _getKey(props.path[i+1]);

        let sortKey = [curNode, nextNode].sort();
        
        pathEdges.push(`${sortKey[0]}-${sortKey[1]}`);
    }


    let filterEdges = [];

    Object.keys(props.edgeList).map((value, index) => {
        if(pathEdges.includes(value)) {
            filterEdges.push(props.edgeList[value]);
        }
        return null;
    });
   

    return (
        <svg className='edge short'>
            {
                Object.keys(filterEdges).map((value) => {
                    let edge = filterEdges[value];
                    let x1 = `calc(${edge.a.pos.nodeX}px - 2em)`;
                    let y1 = `calc(${edge.a.pos.nodeY}px)`;
                    let x2 = `calc(${edge.b.pos.nodeX}px - 2em)`;
                    let y2 = `calc(${edge.b.pos.nodeY}px)`;

                    return (
                        <line key={value} x1={x1} y1={y1} x2={x2} y2={y2} />
                    )
                })
            }
        </svg>
    );
}

export default ShortDraw;
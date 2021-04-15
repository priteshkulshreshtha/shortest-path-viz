

const GenerateGraph = (props) => {

    return (
        <div style={{ height: '100%', width: '100%' }}>
            {props.nodeCoordinates.map((value, index) => {
                
                let left = `calc(${value.pos.nodeX}px - 2em)`;
                let top = `calc(${value.pos.nodeY}px - 2em)`;
                let key = value.key ? value.key : Math.random()
                return (
                    <div id={key} className={`placed-node ${value.type}`} style={{ left: left, top: top, zIndex:"999" }}
                        key={key} onClick={(e) => {props.handlePlaceEdge(e, index)}}></div>
                );
            })}
        </div>
    );
}

export default GenerateGraph;
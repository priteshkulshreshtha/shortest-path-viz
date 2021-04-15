const EdgeDraw = (props) => {
    return (
            <svg className='edge'> {
            
                Object.keys(props.edgeList).map((value) => {
                    let edge = props.edgeList[value];
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

export default EdgeDraw;
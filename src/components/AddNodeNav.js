const AddNodeNav = (props) => {

    return (
        <div className="node-nav">
            <button id='start' className="node-nav-item" style={{ opacity: props.isStartPlaced ? '0.2' : '1', boxShadow: "" }}
                onClick={(e) => { props.handleAddNodeClick(e, 'start') }}>START</button>
            <button id='node' className="node-nav-item" onClick={(e) => { props.handleAddNodeClick(e, 'node') }}>NODE</button>
            <button id='edge' className="node-nav-item" onClick={(e) => { props.handleAddNodeClick(e, 'edge') }}>EDGE</button>
            <button id='end' className="node-nav-item" style={{ opacity: props.isEndPlaced ? '0.2' : '1' }} 
             onClick={(e) => { props.handleAddNodeClick(e, 'end') }}>END</button>
        </div >
    );
}

export default AddNodeNav;
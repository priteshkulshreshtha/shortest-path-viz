import AddNodeNav from './AddNodeNav.js';
import GenerateGraph from './GenerateGraph';
import React, { useState } from 'react';
import EdgeDraw from './EdgeDraw';
import GetPath from './GetPath';
import ShortDraw from './ShortDraw';

const Board = () => {

    const [selectedNode, setSelectedNode] = useState(null);
    const [isStartPlaced, setIsStartPlaced] = useState(false);
    const [isEndPlaced, setIsEndPlaced] = useState(false);
    const [nodeCoordinates, setNodeCoordinates] = useState([]);
    const [edgeList, setEdgeList] = useState({});
    const [edgeSelectNode, setEdgeSelectNode] = useState();
    const [drawShort, setDrawShort] = useState(false);
    const [path, setPath] = useState();


    const handleAddNodeClick = (e, clickedItem) => {
        e.preventDefault();
        setEdgeSelectNode([]);

        if (clickedItem === 'start' && isStartPlaced) return;
        if (clickedItem === 'end' && isEndPlaced) return;

        for (let id of ['start', 'node', 'edge', 'end']) {
            document.getElementById(id).style.transition = "all 0.5s ease-out";
            document.getElementById(id).style.boxShadow = "";
        }
        
        document.getElementById(clickedItem).style.transition = "all 0.6s ease-out";
        document.getElementById(clickedItem).style.boxShadow = "inset 14em 0 var(--accent)";



        if (clickedItem === selectedNode) {
            setSelectedNode(null);
            return;
        }

        setSelectedNode(clickedItem);
    };

    const handlePlaceNodeClick = (e) => {

        // prevent bubble
        if (e.defaultPrevented) return  // Exits here if event has been handled
        e.preventDefault();

        // Preventing Invalid Node Placements
        if (selectedNode === null || selectedNode === 'edge') return;

        // Update mouse coordinate
        let mouseCoordinate = _getMouseCoordinate(e);

        // Finds the key name for all nodes
        let key = selectedNode === 'start' ? 'start' : selectedNode === 'end' ? 'end' : selectedNode + (nodeCoordinates.length - isEndPlaced * 1 - isStartPlaced * 1);

        const newNodeUpdateObj = {
            type: selectedNode,
            key: key,
            pos: {
                nodeX: mouseCoordinate.mouseX,
                nodeY: mouseCoordinate.mouseY
            }
        };

        // Appending New Node to the State
        let oldNodeCoordinate = Array.from(JSON.parse(JSON.stringify(nodeCoordinates)));  //Array deep Copy
        oldNodeCoordinate.push(newNodeUpdateObj);
        setNodeCoordinates(oldNodeCoordinate);

        // Updating for start and end nodes to ensure only 1 of each
        if (selectedNode === 'end') {
            setIsEndPlaced(true);
            setSelectedNode(null);
        }

        if (selectedNode === 'start') {
            setIsStartPlaced(true);
            setSelectedNode(null);
        }
    };

    const handlePlaceEdge = (e, index) => {
        e.preventDefault();
        if (!(selectedNode === 'edge')) return;
        if (edgeSelectNode.length === 0) {
            e.target.style.transform = 'scale(1.4)';
            e.target.style.boxShadow = "0 0 5px var(--accent)";
            setEdgeSelectNode(nodeCoordinates[index]);
        }
        
        else {


            let edgeListCopy = JSON.parse(JSON.stringify(edgeList));

            let sortKey = [edgeSelectNode.key, nodeCoordinates[index].key].sort();

            for (let key of sortKey) {
                document.getElementById(key).style.transform = '';
                document.getElementById(key).boxShadow = "";
            }

            let edgeKey = `${sortKey[0]}-${sortKey[1]}`;

            if (edgeListCopy.edgeKey) return;


            edgeListCopy[edgeKey] = {
                a: edgeSelectNode,
                b: nodeCoordinates[index]
            }
            setEdgeList(edgeListCopy);
            setEdgeSelectNode([]);
        }

    }

    const _getMouseCoordinate = (e) => {
        return {
            mouseX: e.nativeEvent.x,
            mouseY: e.nativeEvent.y
        }
    };


    const shortestPath = () => {
        console.log("finding");
        if (!isStartPlaced || !isEndPlaced) {
            alert('Add Start and End Node');
            return;
        }

        // initialize Adjency List
        let adjList = [...Array(nodeCoordinates.length)];

        for (let x in adjList) {
            adjList[x] = Array(Number(nodeCoordinates.length)).fill(0);
        }

        // Create adjency List
        for (let x in edgeList) {
            let nodes = x.split("-")
            let index = []
            for (let [i, node] of nodes.entries()) {
                index[i] = (node === 'start') ? index[i] = 0 : (node === 'end') ? index[i] = 1 : Number(node.replace(/^\D+/g, '')) + 2
            }
            adjList[index[0]][index[1]] = 1;
            adjList[index[1]][index[0]] = 1;
        }

        let path = GetPath(adjList);


        if (path) {
            setPath(path, setDrawShort(true));
            console.log("Found");
        }
        else {
            alert("End Can't Be reached!");
        }
    };


    return (
        <div className='container'>
            <h1 className='title'>Shortest Path Vizualizer</h1>
            <div className="graph-board" onClick={(e) => { handlePlaceNodeClick(e) }}>
                {nodeCoordinates.length > 0 && <GenerateGraph nodeCoordinates={nodeCoordinates} handlePlaceEdge={handlePlaceEdge} />}
                {Object.keys(edgeList).length > 0 && <EdgeDraw edgeList={edgeList} />}
                {drawShort && <ShortDraw edgeList={edgeList} path={path} />}
            </div>
            <AddNodeNav slectedNode={selectedNode} setSelectedNode={setSelectedNode} handleAddNodeClick={handleAddNodeClick}
                isEndPlaced={isEndPlaced} isStartPlaced={isStartPlaced} />
            <div className='solver-div'>
                <button className='' onClick={() => { shortestPath() }}>Find Shortest Path</button>
            </div>
        </div>

    );
}

export default Board;
import React from "react";
import dynamic from "next/dynamic";
import { NodeData, EdgeData, NodeProps, EdgeProps } from "reaflow";
import { BinarySearchTree } from "./tree";
import CustomNode from "./CustomNode";
const Canvas = dynamic(
  //@ts-ignore
  () =>
    import("reaflow").then((value) => {
      return value.Canvas;
    }),
  {
    ssr: false,
  }
);

//@ts-ignore
const Edge = dynamic(() => import("reaflow").then((value) => value.Edge), {
  ssr: false,
});

type Props = {
  nodes: NodeData[];
  setNodes: React.Dispatch<React.SetStateAction<NodeData<any>[]>>;
  edges: EdgeData[];
  setEdges: React.Dispatch<React.SetStateAction<EdgeData<any>[]>>;
  selections: string[];
  setSelections: React.Dispatch<React.SetStateAction<string[]>>;
  BST: React.MutableRefObject<BinarySearchTree>;
  width: number;
  height: number;
  comparisonNode: number | null;
};

const TreeCanvas = ({
  nodes,
  edges,
  selections,
  BST,
  setEdges,
  setNodes,
  setSelections,
  width,
  height,
  comparisonNode,
}: Props) => {
  return (
    <Canvas
      width={width}
      height={height}
      nodes={nodes}
      edges={edges}
      selections={selections}
      arrow={null}
      edge={(edge: EdgeProps) => {
        const hideEdge = edge.id.includes("NaN");
        return (
          <Edge
            {...edge}
            style={{
              stroke: hideEdge ? "transparent" : "#fff",
            }}
          />
        );
      }}
      node={(node: NodeProps) => {
        const hideNode = node.id.includes("NaN");
        const comparing = Number(node.id) === comparisonNode;
        // console.log(comparing, node.id);
        return (
          <CustomNode
            hideNode={hideNode}
            comparing={comparing}
            node={node}
            BST={BST}
            selections={selections}
            setSelections={setSelections}
            setNodes={setNodes}
            setEdges={setEdges}
            edges={edges}
          />
        );
      }}
      //@ts-ignore
      defaultPosition="top"
    />
  );
};

export default TreeCanvas;
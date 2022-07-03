import React from "react";
import { NodeProps, EdgeData, NodeData } from "reaflow";
import { BinarySearchTree } from "./tree";
import dynamic from "next/dynamic";
//@ts-ignore
const Node = dynamic(() => import("reaflow").then((value) => value.Node), {
  ssr: false,
});
//@ts-ignore
const Label = dynamic(() => import("reaflow").then((value) => value.Label), {
  ssr: false,
});

type Props = {
  hideNode: boolean;
  comparing: boolean;
  node: NodeProps;
  BST: React.MutableRefObject<BinarySearchTree>;
  setNodes: React.Dispatch<React.SetStateAction<NodeData<any>[]>>;
  edges: EdgeData[];
  setEdges: React.Dispatch<React.SetStateAction<EdgeData<any>[]>>;
  selections: string[];
  setSelections: React.Dispatch<React.SetStateAction<string[]>>;
};

const CustomNode = ({
  node,
  hideNode,
  setEdges,
  selections,
  setSelections,
  setNodes,
  BST,
  comparing,
}: Props) => {
  return (
    <Node
      {...node}
      style={{
        fill: "transparent",
        stroke: "transparent",
      }}
      label={
        <Label
          style={{
            fill: hideNode ? "#141414" : "#fff",
          }}
        />
      }
      draggable={false}
      dragCursor="grab"
      dragType="all"
      onRemove={() => {
        BST.current.remove(Number(node.properties.id));
        setNodes(BST.current.returnNodeArray(BST.current.root));
        setEdges(BST.current.returnEdgeArray(BST.current.root));
        setSelections([]);
      }}
    >
      {({ width, height }: { width: number; height: number }) => {
        return (
          <foreignObject
            onClick={() => {
              if (!hideNode) {
                if (selections[0] === node.id) {
                  setSelections([]);
                } else {
                  setSelections([node.id]);
                }
              }
            }}
            width={width}
            height={height}
            z={0}
            x={0}
            style={{
              cursor: hideNode ? "default" : "pointer",
              textAlign: "center",
              backgroundColor: hideNode
                ? "#141414"
                : comparing
                ? "red"
                : "#3A72F5",
              borderColor: hideNode ? "#141414" : comparing ? "red" : "#3A72F5",
            }}
          />
        );
      }}
    </Node>
  );
};

export default CustomNode;

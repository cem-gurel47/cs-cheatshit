import React, { useContext } from "react";
import { BSTContext } from "@contexts/BST";
import { NodeProps } from "reaflow";
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
  node: NodeProps;
};

const CustomNode = ({ node, hideNode }: Props) => {
  const {
    BST,
    setNodes,
    setEdges,
    setSelections,
    setInorderTraversal,
    setPostorderTraversal,
    setPreorderTraversal,
    selections,
  } = useContext(BSTContext);
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
            fill: hideNode ? "transparent" : "#fff",
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
        setInorderTraversal(BST.current.inorder(BST.current.root));
        setPreorderTraversal(BST.current.preorder(BST.current.root));
        setPostorderTraversal(BST.current.postorder(BST.current.root));
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
              borderRadius: "50%",
              cursor: hideNode ? "default" : "pointer",
              textAlign: "center",
              backgroundColor: hideNode ? "transparent" : "#3A72F5",
              borderColor: hideNode ? "transparent" : "#3A72F5",
            }}
          />
        );
      }}
    </Node>
  );
};

export default CustomNode;

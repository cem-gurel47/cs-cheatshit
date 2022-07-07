import React, { useContext } from "react";
import { TreeContext } from "@contexts/tree";
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
    tree,
    setNodes,
    setEdges,
    setSelections,
    setInorderTraversal,
    setPostorderTraversal,
    setPreorderTraversal,
    selections,
    searchList,
  } = useContext(TreeContext);

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
        tree.current.remove(Number(node.properties.id));
        setNodes(tree.current.returnNodeArray(tree.current.root));
        setEdges(tree.current.returnEdgeArray(tree.current.root));
        setInorderTraversal(tree.current.inorder(tree.current.root));
        setPreorderTraversal(tree.current.preorder(tree.current.root));
        setPostorderTraversal(tree.current.postorder(tree.current.root));
        setSelections([]);
      }}
    >
      {({ width, height }: { width: number; height: number }) => {
        const found =
          searchList[searchList.length - 1] === Number(node.properties.id);
        const searching =
          searchList.length > 0 &&
          searchList.includes(Number(node.properties.id));

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
              backgroundColor: hideNode
                ? "transparent"
                : found
                ? "#19c964"
                : searching
                ? "#f00"
                : "#3A72F5",
              borderColor: hideNode ? "transparent" : "#3A72F5",
            }}
          />
        );
      }}
    </Node>
  );
};

export default CustomNode;

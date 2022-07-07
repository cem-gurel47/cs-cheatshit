import React, { useContext } from "react";
import { TreeContext } from "@contexts/tree";
import dynamic from "next/dynamic";
import { NodeProps, EdgeProps } from "reaflow";
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
  width: number;
  height: number;
};

const TreeCanvas = ({ width, height }: Props) => {
  const { nodes, edges, selections } = useContext(TreeContext);
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
              stroke: hideEdge ? "transparent" : "#F4A425",
            }}
          />
        );
      }}
      node={(node: NodeProps) => {
        const hideNode = node.id.includes("NaN");
        return <CustomNode hideNode={hideNode} node={node} />;
      }}
      //@ts-ignore
      defaultPosition="top"
    />
  );
};

export default TreeCanvas;

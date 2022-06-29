import React, { useState, useRef, useEffect } from "react";
import { Button, Grid, Input } from "@nextui-org/react";
// import ZoomButton from "./ZoomButton";
import dynamic from "next/dynamic";
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
const Node = dynamic(() => import("reaflow").then((value) => value.Node), {
  ssr: false,
});
//@ts-ignore
const Edge = dynamic(() => import("reaflow").then((value) => value.Edge), {
  ssr: false,
});

//@ts-ignore
const Label = dynamic(() => import("reaflow").then((value) => value.Label), {
  ssr: false,
});

import { NodeData, EdgeData, CanvasRef, NodeProps, EdgeProps } from "reaflow";
import { BinarySearchTree } from "./tree";
import { useMeasure } from "react-use";

type Props = {};

const AlgorithmVisual = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const BST = useRef<BinarySearchTree>(new BinarySearchTree());
  const [value, setValue] = useState<string | undefined>();
  const [ref, { width, height }] = useMeasure();
  const canvasRef = useRef<CanvasRef | null>(null);
  const [nodes, setNodes] = useState<NodeData[]>(
    BST.current.returnNodeArray(BST.current.root)
  );
  const [edges, setEdges] = useState<EdgeData[]>(
    BST.current.returnEdgeArray(BST.current.root)
  );
  const [selections, setSelections] = useState<string[]>([]);

  console.log(nodes);
  console.log(edges);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const addNode = () => {
    const valueDoesNotExist = !BST.current.find(
      BST.current.root,
      Number(value)
    );
    if (value && valueDoesNotExist) {
      BST.current.insert(Number(value));
      setValue("");
      setNodes(BST.current.returnNodeArray(BST.current.root));
      setEdges(BST.current.returnEdgeArray(BST.current.root));
      inputRef.current?.focus();
    }
  };

  const deleteNode = () => {
    if (value) {
      BST.current.remove(Number(value));
      setValue("");
      setNodes(BST.current.returnNodeArray(BST.current.root));
      setEdges(BST.current.returnEdgeArray(BST.current.root));
      inputRef.current?.focus();
    }
  };

  return (
    <Grid.Container
      direction="column"
      css={{
        position: "relative",
        width: "100%",
        height: "60vh",
        pl: "$8",
        pr: "$8",
      }}
    >
      {/* <ZoomButton
        type="zoom"
        onPress={() => {
          setZoom((zoom) => zoom + 0.1);
          if (canvasRef.current && canvasRef.current.zoomIn) {
            canvasRef.current.zoomIn();
          }
        }}
      />
      <ZoomButton
        onPress={() => {
          setZoom((zoom) => zoom - 0.1);
          if (canvasRef.current && canvasRef.current.zoomOut) {
            canvasRef.current.zoomOut();
          }
        }}
        type="unzoom"
      /> */}
      <Grid
        css={{
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Grid.Container direction="row" alignItems="center" gap={1}>
          <Grid>
            <Input
              ref={inputRef}
              autoFocus
              aria-label="Enter node"
              placeholder="Enter node"
              bordered
              type={"number"}
              color="primary"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addNode();
                }
              }}
            />
          </Grid>
          <Grid>
            <Button auto onPress={addNode}>
              Add Node
            </Button>
          </Grid>
          <Grid>
            <Button auto color="error" onPress={deleteNode}>
              Delete Node
            </Button>
          </Grid>
        </Grid.Container>
        <Grid
          //@ts-ignore
          ref={ref}
          css={{
            width: "100%",
            height: "100%",
          }}
        >
          <Canvas
            ref={canvasRef}
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
              console.log(hideNode, node.id);
              return (
                <Node
                  {...node}
                  onClick={() => {
                    if (!hideNode) {
                      if (selections[0] === node.id) {
                        setSelections([]);
                      } else {
                        setSelections([node.id]);
                      }
                    }
                  }}
                  style={{
                    fill: hideNode ? "#141414" : "#3A72F5",
                    stroke: hideNode ? "#141414" : "#3A72F5",
                    cursor: hideNode ? "default" : "pointer",
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
                />
              );
            }}
            //@ts-ignore
            defaultPosition="top"
          />
        </Grid>
      </Grid>
    </Grid.Container>
  );
};

export default AlgorithmVisual;

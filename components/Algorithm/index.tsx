import React, { useState, useRef } from "react";
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

import { NodeData, EdgeData, CanvasRef, NodeProps } from "reaflow";
import { BinarySearchTree } from "./tree";
import { useMeasure } from "react-use";

type Props = {};

const AlgorithmVisual = (props: Props) => {
  const [zoom, setZoom] = useState(1);
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
    }
  };

  const deleteNode = () => {
    if (value) {
      BST.current.remove(Number(value));
      setValue("");
      setNodes(BST.current.returnNodeArray(BST.current.root));
      setEdges(BST.current.returnEdgeArray(BST.current.root));
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
            zoom={zoom}
            ref={canvasRef}
            width={width}
            height={height}
            nodes={nodes}
            edges={edges}
            zoomable={true}
            selections={selections}
            minZoom={0.1}
            maxZoom={20}
            node={(node: NodeProps) => (
              <Node
                {...node}
                onClick={() => {
                  if (selections[0] === node.id) {
                    setSelections([]);
                  } else {
                    setSelections([node.id]);
                  }
                }}
                draggable={false}
                dragCursor="grab"
                dragType="all"
                removable
                onRemove={() => {
                  BST.current.remove(Number(node.properties.id));
                  setNodes(BST.current.returnNodeArray(BST.current.root));
                  setEdges(BST.current.returnEdgeArray(BST.current.root));
                  setSelections([]);
                }}
              />
            )}
            onZoomChange={(z) => {
              console.log("zooming", z);
              setZoom(z);
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

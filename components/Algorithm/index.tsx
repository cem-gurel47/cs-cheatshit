import React, { useState, useRef, useEffect } from "react";
import { flushSync } from "react-dom";
import { Button, Grid, Input } from "@nextui-org/react";
import { NodeData, EdgeData } from "reaflow";
import { BinarySearchTree } from "./Tree/tree";
import { useMeasure } from "react-use";
import TreeCanvas from "./Tree/TreeCanvas";

type Props = {};

const AlgorithmVisual = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [ref, { width, height }] = useMeasure();
  const BST = useRef<BinarySearchTree>(new BinarySearchTree());
  const [value, setValue] = useState<string | undefined>();
  const [nodes, setNodes] = useState<NodeData[]>(
    BST.current.returnNodeArray(BST.current.root)
  );
  const [edges, setEdges] = useState<EdgeData[]>(
    BST.current.returnEdgeArray(BST.current.root)
  );
  const [selections, setSelections] = useState<string[]>([]);
  const [comparisonNode, setComparisonNode] = useState<number | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  console.log(comparisonNode);

  const addNode = () => {
    const valueDoesNotExist = !BST.current.find(
      BST.current.root,
      Number(value)
    );
    if (value && valueDoesNotExist) {
      if (BST.current.root) {
        flushSync(() =>
          setComparisonNode(BST.current.root?.left?.value || null)
        );
      }
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
          <TreeCanvas
            nodes={nodes}
            setNodes={setNodes}
            edges={edges}
            setEdges={setEdges}
            selections={selections}
            setSelections={setSelections}
            width={width}
            height={height}
            BST={BST}
            comparisonNode={comparisonNode}
          />
        </Grid>
      </Grid>
    </Grid.Container>
  );
};

export default AlgorithmVisual;

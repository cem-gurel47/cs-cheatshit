import React, { useState, useRef, useEffect } from "react";
import { Button, Grid, Input, Tooltip, Popover, Text } from "@nextui-org/react";
import { NodeData, EdgeData } from "reaflow";
import { BinarySearchTree } from "./Tree/tree";
import { useMeasure } from "react-use";
import TreeCanvas from "./Tree/TreeCanvas";
import TraversalButton from "./Tree/TraversalButton";

const AlgorithmVisual = () => {
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
  const [inorderTraversal, setInorderTraversal] = useState<number[]>([]);
  const [preorderTraversal, setPreorderTraversal] = useState<number[]>([]);
  const [postorderTraversal, setPostorderTraversal] = useState<number[]>([]);

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
      setInorderTraversal(BST.current.inorder(BST.current.root));
      setPreorderTraversal(BST.current.preorder(BST.current.root));
      setPostorderTraversal(BST.current.postorder(BST.current.root));
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
              helperText="You can click on a node to delete it."
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
            <TraversalButton type="Preorder" content={preorderTraversal} />
          </Grid>
          <Grid>
            <TraversalButton type="Inorder" content={inorderTraversal} />
          </Grid>
          <Grid>
            <TraversalButton type="Postorder" content={postorderTraversal} />
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
            setInorderTraversal={setInorderTraversal}
            setPreorderTraversal={setPreorderTraversal}
            setPostorderTraversal={setPostorderTraversal}
          />
        </Grid>
      </Grid>
    </Grid.Container>
  );
};

export default AlgorithmVisual;

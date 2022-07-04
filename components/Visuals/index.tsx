import React, { useRef, useState, useEffect, useContext } from "react";
import { BSTContext } from "@contexts/BST";
import { Button, Grid } from "@nextui-org/react";
import { useMeasure } from "react-use";
import { Search } from "react-iconly";
import TreeCanvas from "./Tree/TreeCanvas";
import TraversalButton from "./Tree/TraversalButton";
import NodeInput from "./Tree/NodeInput";

const TRAVERSALS = ["Preorder", "Inorder", "Postorder"];

const AlgorithmVisual = () => {
  const [ref, { width, height }] = useMeasure();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string | undefined>();
  const {
    BST,
    setInorderTraversal,
    setPreorderTraversal,
    setPostorderTraversal,
    setNodes,
    setEdges,
  } = useContext(BSTContext);

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
            <NodeInput
              inputRef={inputRef}
              value={value}
              setValue={setValue}
              addNode={addNode}
            />
          </Grid>
          <Grid>
            <Button auto onPress={addNode}>
              Add Node
            </Button>
          </Grid>
          <Grid>
            <Button
              color="success"
              icon={<Search set="bold" primaryColor="#fff" />}
              auto
            />
          </Grid>
          {TRAVERSALS.map((traversal) => (
            <Grid key={traversal}>
              <TraversalButton type={traversal} />
            </Grid>
          ))}
        </Grid.Container>
        <Grid
          //@ts-ignore
          ref={ref}
          css={{
            width: "100%",
            height: "100%",
          }}
        >
          <TreeCanvas width={width} height={height} />
        </Grid>
      </Grid>
    </Grid.Container>
  );
};

export default AlgorithmVisual;

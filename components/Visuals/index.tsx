import React, { useRef, useState, useEffect, useContext } from "react";
import { TreeContext } from "@contexts/tree";
import { Grid } from "@nextui-org/react";
import { useMeasure } from "react-use";
import TreeCanvas from "./Tree/TreeCanvas";
import TraversalButton from "./Tree/TraversalButton";
import NodeInput from "./Tree/NodeInput";
import SearchButton from "./Tree/SearchButton";
import ClearButton from "./Tree/ClearButton";
import AddNodeButton from "./Tree/AddNodeButton";

const TRAVERSALS = ["Preorder", "Inorder", "Postorder"];

interface TreeProps {
  algorithm: string | string[] | undefined;
}

const AlgorithmVisual = ({ algorithm }: TreeProps) => {
  const [ref, { width, height }] = useMeasure();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string | undefined>();
  const {
    tree,
    setInorderTraversal,
    setPreorderTraversal,
    setPostorderTraversal,
    setNodes,
    setEdges,
    setSearchList,
  } = useContext(TreeContext);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const addNode = () => {
    const valueDoesNotExist = !tree.current.find(
      tree.current.root,
      Number(value)
    );
    if (value && valueDoesNotExist) {
      tree.current.insert(Number(value));
      setInorderTraversal(tree.current.inorder(tree.current.root));
      setPreorderTraversal(tree.current.preorder(tree.current.root));
      setPostorderTraversal(tree.current.postorder(tree.current.root));
      setNodes(tree.current.returnNodeArray(tree.current.root));
      setEdges(tree.current.returnEdgeArray(tree.current.root));
      inputRef.current?.focus();
      setValue("");
      setSearchList([]);
    }
  };

  const startSearching = () => {
    const valueDoesNotExist = !tree.current.find(
      tree.current.root,
      Number(value)
    );
    if (value && valueDoesNotExist) {
      alert("Value does not exist");
      setSearchList([]);
      return;
    }

    if (value) {
      const searchList = tree.current.nodesUntilFound(
        tree.current.root,
        Number(value)
      );
      setSearchList(searchList);
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
            <AddNodeButton addNode={addNode} />
          </Grid>
          <Grid>
            <SearchButton startSearching={startSearching} />
          </Grid>
          <Grid>
            <ClearButton />
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

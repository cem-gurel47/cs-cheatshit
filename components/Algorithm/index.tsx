import React, { useState } from "react";
import { Button, Grid, Input } from "@nextui-org/react";
const { BinarySearchTree, BTNode } = require("./tree");
import Node from "./Node";

type Props = {};

const AlgorithmVisual = (props: Props) => {
  // TODO since I'm not using setBST, I can store it using useRef
  const [BST, setBST] = useState<typeof BinarySearchTree>(
    new BinarySearchTree()
  );

  const [value, setValue] = useState<string | undefined>();

  const addNode = () => {
    if (value) {
      setValue("");
      BST.insert(Number(value));
      const depth = BST.calculateDepth(BST.root);
      for (let i = 0; i < depth; i++) {
        console.log(BST.returnTreeItemsByLevelWithEmptyNodes(BST.root, i + 1));
      }
    }
  };

  const deleteNode = () => {
    if (value) {
      setValue("");
      BST.remove(Number(value));
    }
  };

  return (
    <Grid.Container
      direction="column"
      css={{
        width: "calc(100% - 5rem)",
        height: "60vh",
        pl: "$8",
        pr: "$8",
      }}
    >
      <Grid>
        <Grid.Container
          direction="row"
          alignItems="center"
          gap={1}
          as="form"
          onSubmit={() => false}
        >
          <Grid>
            <Input
              placeholder="Add node"
              bordered
              type={"number"}
              color="primary"
              value={value}
              required
              onChange={(e) => setValue(e.target.value)}
            />
          </Grid>
          <Grid>
            <Button
              auto
              type="submit"
              onClick={(e) => {
                e?.preventDefault();
                addNode();
              }}
            >
              Add Node
            </Button>
          </Grid>
          <Grid>
            <Button
              auto
              color="error"
              type="submit"
              onClick={(e) => {
                e?.preventDefault();
                deleteNode();
              }}
            >
              Delete Node
            </Button>
          </Grid>
        </Grid.Container>
        <Grid>
          <ul>
            {new Array(BST.calculateDepth(BST.root)).fill(0).map((_, i) => (
              <Grid
                key={i}
                css={{
                  display: "flex",
                  width: "100%",
                  pl: 10 / (i + 1),
                  pr: 100 / (i + 1),
                }}
                justify={i === 0 ? "center" : "space-between"}
                alignItems="center"
              >
                {BST.returnTreeItemsByLevelWithEmptyNodes(BST.root, i + 1).map(
                  (item: typeof BTNode) => (
                    <Node key={`${item.value}-${1}`} item={item} />
                  )
                )}
              </Grid>
            ))}
          </ul>
        </Grid>
      </Grid>
    </Grid.Container>
  );
};

export default AlgorithmVisual;

import React, { useState } from "react";
import { Button, Grid, Input } from "@nextui-org/react";
const { BinarySearchTree, BTNode } = require("./tree");
import Node from "./Node";

type Props = {};

const AlgorithmVisual = (props: Props) => {
  const [scale, setScale] = useState(1);
  // TODO since I'm not using setBST, I can store it using useRef
  const [BST, setBST] = useState<typeof BinarySearchTree>(
    new BinarySearchTree()
  );

  const [value, setValue] = useState<string | undefined>();

  const addNode = () => {
    if (value) {
      setValue("");
      BST.insert(Number(value));
    }
  };

  const deleteNode = () => {
    if (value) {
      setValue("");
      BST.remove(Number(value));
    }
  };

  const zoomGrid = () => {
    if (scale < 1) {
      setScale((scale) => scale + 0.1);
    }
  };

  const unzoomGrid = () => {
    setScale((scale) => scale - 0.1);
  };

  console.log(scale);

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
      <Button
        auto
        flat
        css={{
          position: "absolute",
          right: "$8",
          bottom: "60px",
          zIndex: "1",
        }}
        onClick={zoomGrid}
      >
        +
      </Button>
      <Button
        auto
        flat
        css={{
          position: "absolute",
          right: "$8",
          bottom: "10px",
          zIndex: "1",
        }}
        onClick={unzoomGrid}
      >
        -
      </Button>
      <Grid
        css={{
          height: "100%",
        }}
      >
        <Grid.Container
          direction="row"
          alignItems="center"
          gap={1}
          as="form"
          onSubmit={() => false}
        >
          <Grid>
            <Input
              placeholder="Enter node"
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
        <Grid
          css={{
            height: "100%",
            width: "100%",
            scale,
            cursor: "grab",
          }}
        >
          <ul>
            {new Array(BST.calculateDepth(BST.root)).fill(0).map((_, i) => (
              <Grid
                key={i}
                css={{
                  display: "flex",
                  width: "100%",
                  pl: 10 / (i + 1),
                  pr: 10 / (i + 1),
                }}
                justify={i === 0 ? "center" : "space-between"}
                alignItems="center"
              >
                {BST.returnTreeItemsByLevelWithEmptyNodes(BST.root, i + 1).map(
                  (item: typeof BTNode) => (
                    <Node key={`${item.value}-${i + 1}`} item={item} />
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

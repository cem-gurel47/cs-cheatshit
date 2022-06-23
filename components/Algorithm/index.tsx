import React, { useState } from "react";
import { Button, Grid, Input } from "@nextui-org/react";
import ZoomButton from "./ZoomButton";
const { BinarySearchTree, BTNode } = require("./tree");
import Node from "./Node";
import DragganleGrid from "./DraggableGrid";

type Props = {};

const AlgorithmVisual = (props: Props) => {
  const [scale, setScale] = useState(1);
  // TODO since I'm not using setBST, I can store it using useRef
  const [BST, setBST] = useState<typeof BinarySearchTree>(
    new BinarySearchTree()
  );

  const [value, setValue] = useState<string | undefined>();

  const addNode = () => {
    const valueDoesNotExist = !BST.find(BST.root, Number(value));
    if (value && valueDoesNotExist) {
      setValue("");
      BST.insert(Number(value));
      // const depth = BST.calculateDepth(BST.root);
      // for (let index = 0; index < depth; index++) {
      //   console.log(
      //     BST.returnTreeItemsByLevelWithEmptyNodes(BST.root, index + 1)
      //   );
      // }
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
        position: "relative",
        width: "100%",
        height: "60vh",
        pl: "$8",
        pr: "$8",
      }}
    >
      <ZoomButton scale={scale} setScale={setScale} type="zoom" />
      <ZoomButton scale={scale} setScale={setScale} type="unzoom" />
      <Grid
        css={{
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Grid.Container direction="row" alignItems="center" gap={1}>
          <Grid>
            <Input
              placeholder="Enter node"
              bordered
              type={"number"}
              color="primary"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </Grid>
          <Grid>
            <Button auto onClick={addNode}>
              Add Node
            </Button>
          </Grid>
          <Grid>
            <Button auto color="error" onClick={deleteNode}>
              Delete Node
            </Button>
          </Grid>
        </Grid.Container>

        <DragganleGrid scale={scale}>
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
                  (item: typeof BTNode, j) => {
                    // console.log(
                    //   BST.returnTreeItemsByLevelWithEmptyNodes(BST.root, i + 1),
                    //   item
                    // );
                    return (
                      <Node
                        key={`${item.value}-${i + 1}-${j + 1}`}
                        item={item}
                      />
                    );
                  }
                )}
              </Grid>
            ))}
          </ul>
        </DragganleGrid>
      </Grid>
    </Grid.Container>
  );
};

export default AlgorithmVisual;

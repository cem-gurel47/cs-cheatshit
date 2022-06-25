import React, { useState, useRef } from "react";
import { Button, Grid, Input } from "@nextui-org/react";
import ZoomButton from "./ZoomButton";
import Node from "./Node";
import DragganleGrid from "./DraggableGrid";
import { BTNode, BinarySearchTree } from "./tree";

type Props = {};

const AlgorithmVisual = (props: Props) => {
  const [scale, setScale] = useState(1);
  const BST = useRef<BinarySearchTree>(new BinarySearchTree());
  const [value, setValue] = useState<string | undefined>();

  const addNode = () => {
    const valueDoesNotExist = !BST.current.find(
      BST.current.root,
      Number(value)
    );
    if (value && valueDoesNotExist) {
      setValue("");
      BST.current.insert(Number(value));
    }
  };

  const deleteNode = () => {
    if (value) {
      setValue("");
      BST.current.remove(Number(value));
    }
  };

  const calculatePadding = (level: number): string => {
    // the padding should decrease as the level increases and it should form a tree shape.
    const padding = 50 - level * 2.5;
    return `calc(${padding}% - 2.5rem)`;
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
              aria-label="Enter node"
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
            {new Array(BST.current.calculateDepth(BST.current.root))
              .fill(0)
              .map((_, i) => (
                <Grid
                  key={i}
                  css={{
                    display: "flex",
                    width: "100%",
                    px: calculatePadding(i),
                  }}
                  justify={i === 0 ? "center" : "space-between"}
                  alignItems="center"
                >
                  {BST.current
                    .returnTreeItemsByLevelWithEmptyNodes(
                      BST.current.root,
                      i + 1
                    )
                    .map((item: BTNode, j: number) => {
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
                    })}
                </Grid>
              ))}
          </ul>
        </DragganleGrid>
      </Grid>
    </Grid.Container>
  );
};

export default AlgorithmVisual;

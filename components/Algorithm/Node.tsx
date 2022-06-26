import React from "react";
import { BTNode, BinarySearchTree } from "./tree";
import { Grid } from "@nextui-org/react";
import dynamic from "next/dynamic";
const Anime = dynamic(import("react-anime"), {
  ssr: false,
});

type Props = {
  item: BTNode;
  level: number;
  tree: BinarySearchTree;
};

const NodeItem = ({ item, level, tree }: Props) => {
  const leftSubTreeDepth = item.left ? tree.calculateDepth(item.left) : 0;
  const rightSubTreeDepth = item.right ? tree.calculateDepth(item.right) : 0;

  const calculateTransform = (isLeft: boolean) => {
    // if the tree has a left child, the rotate should be a negative value.
    // if the tree has a right child, the rotate should be a positive value.
    // the rotate value should decrease as the level increases and it should form a tree shape.

    const minRotation = 15;
    const maxRotation = 75;
    if (isLeft) {
      const rotate = Math.max(maxRotation - leftSubTreeDepth * 15, minRotation);
      if (leftSubTreeDepth === 1) {
        return `translateY(2px) rotate(-60deg)`;
      }
      return `translateX(-${
        leftSubTreeDepth * 15
      }px) translateY(11px) rotate(-${rotate}deg)`;
    }
    const rotate = Math.max(maxRotation - rightSubTreeDepth * 15, minRotation);
    if (rightSubTreeDepth === 1) {
      return `translateX(30px) translateY(1px) rotate(240deg)`;
    }
    return `translateX(${
      rightSubTreeDepth * 15
    }px) translateY(${11}px) rotate(${180 + rotate}deg)`;
  };

  const calculateWidth = (isLeft: boolean) => {
    // the width should increase as the sub tree depth increases.
    if (isLeft) {
      return `${leftSubTreeDepth * 30}px`;
    }
    return `${rightSubTreeDepth * 30}px`;
  };

  return (
    <li
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Anime
        easing="easeOutElastic"
        duration={1000}
        delay={(_: any, i: number) => i * 100}
        scale={[0.5, 1]}
        opacity={[0, 1]}
        loop={false}
      >
        <Grid
          css={{
            backgroundColor: Number.isNaN(item) ? "#141414" : "$primary",
            width: "2.5rem",
            height: "2.5rem",
            borderRadius: "50%",
            margin: "0.5rem",
            color: Number.isNaN(item) ? "#141414" : "#fff",
            display: "flex",
            border: Number.isNaN(item) ? "none" : "1px solid #fff",
          }}
          justify="center"
          alignItems="center"
        >
          {item.value}
        </Grid>
      </Anime>
      <Grid.Container>
        <Grid
          css={
            item.left
              ? {
                  height: "1px",
                  backgroundColor: "#fff",
                  width: calculateWidth(true),
                  transform: calculateTransform(true),
                }
              : undefined
          }
        />
        <Grid
          css={
            item.right
              ? {
                  height: "1px",
                  backgroundColor: "#fff",
                  width: calculateWidth(false),
                  transform: calculateTransform(false),
                }
              : undefined
          }
        />
      </Grid.Container>
    </li>
  );
};

export default NodeItem;

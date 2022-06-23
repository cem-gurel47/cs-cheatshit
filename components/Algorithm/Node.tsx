import React from "react";
import { BTNode } from "./tree";
import { Grid } from "@nextui-org/react";
import dynamic from "next/dynamic";
const Anime = dynamic(import("react-anime"), {
  ssr: false,
});

type Props = {
  item: BTNode;
};

const NodeItem = ({ item }: Props) => {
  return (
    <li>
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
      {item.left && (
        <Grid
          css={{
            transform: "rotate(-45deg)",
            height: "1px",
            width: "30px",
            backgroundColor: "#fff",
          }}
        />
      )}
      {item.right && (
        <Grid
          css={{
            transform: "rotate(45deg)",
            height: "1px",
            width: "30px",
            ml: "2rem",
            backgroundColor: "#fff",
          }}
        />
      )}
    </li>
  );
};

export default NodeItem;

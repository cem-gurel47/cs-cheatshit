import React, { useState, useRef } from "react";
import { Button, Grid, Input } from "@nextui-org/react";
import dynamic from "next/dynamic";
const Anime = dynamic(import("react-anime"), {
  ssr: false,
});

type Props = {};

const AlgorithmVisual = (props: Props) => {
  const containerRef = useRef<HTMLUListElement>(null);
  const [value, setValue] = useState<string>();
  const [treeItems, setTreeItems] = useState<number[]>([]);

  const addNode = () => {
    if (value) {
      setTreeItems([...treeItems, Number(value)].sort((a, b) => a - b));
      setValue(undefined);
    }
  };

  const returnNodeTranslateX = (node: number) => {
    if (!containerRef.current) {
      return 0;
    }
    if (treeItems[0] === node) {
      return containerRef.current.getBoundingClientRect().width / 2;
    }
    const lastNode = containerRef.current.querySelector(
        `.node[data-index="${treeItems[treeItems.length - 1]}"]`
      ),
      lastNodeRect = lastNode?.getBoundingClientRect();

    console.log(lastNode);
    if (!lastNodeRect) {
      return 0;
    }
    return lastNodeRect.x + lastNodeRect.width / 2;
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
        <Grid.Container direction="row" alignItems="center" gap={1} as="form">
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
        </Grid.Container>
        <Grid>
          <ul ref={containerRef}>
            {treeItems.map((item) => (
              <li key={item}>
                <Anime
                  easing="easeOutElastic"
                  duration={1000}
                  delay={(_: any, i: number) => i * 100}
                  scale={[0.5, 1]}
                  opacity={[0, 1]}
                  translateY={[
                    -100,
                    containerRef.current
                      ? containerRef.current.getBoundingClientRect().height / 2
                      : 0,
                  ]}
                  translateX={[-100, returnNodeTranslateX(item)]}
                  loop={false}
                >
                  <Grid
                    css={{
                      backgroundColor: "$primary",
                      width: "2.5rem",
                      height: "2.5rem",
                      borderRadius: "50%",
                      margin: "0.5rem",
                      display: "flex",
                      border: "1px solid #fff",
                    }}
                    justify="center"
                    alignItems="center"
                  >
                    {item}
                  </Grid>
                </Anime>
              </li>
            ))}
          </ul>
        </Grid>
      </Grid>
    </Grid.Container>
  );
};

export default AlgorithmVisual;

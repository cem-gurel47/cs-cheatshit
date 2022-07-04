import React from "react";
// import dynamic from "next/dynamic";
import { Grid, useTheme } from "@nextui-org/react";
import AlgorithmVisual from "@components/Visuals";
// const CodeEditor = dynamic(import("@components/CodeEditor"), {
//   ssr: false,
// });

type Props = {
  code: string;
};

const CircularDiv = ({ color }: { color: string }) => {
  return (
    <Grid
      css={{
        width: "1rem",
        height: "1rem",
        borderRadius: "50%",
        mr: "$4",
        backgroundColor: color,
      }}
    />
  );
};

const AlgorithmCard = ({ code }: Props) => {
  const { isDark } = useTheme();
  // const [mode, setMode] = useState<Set<string>>(new Set(["visual"]));
  return (
    <Grid.Container
      css={{
        width: "100%",
        pt: "$10",
        pb: "$10",
        bg: isDark ? "#141414" : "#F0F3F5",
        borderRadius: "$lg",
      }}
    >
      <Grid
        xs={12}
        css={{
          mt: "-$8",
          pl: "$8",
          pr: "$8",
          pb: "$4",
        }}
        justify="space-between"
      >
        <Grid.Container
          direction="row"
          alignItems="center"
          css={{
            py: "$5",
          }}
        >
          <CircularDiv color="red" />
          <CircularDiv color="yellow" />
          <CircularDiv color="green" />
        </Grid.Container>
        {/* <Grid.Container direction="row" alignItems="center" justify="flex-end">
          <Dropdown>
            <Dropdown.Button flat css={{ tt: "capitalize" }}>
              {mode}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Change algorithm mode"
              disallowEmptySelection
              // @ts-ignore
              onSelectionChange={setMode}
              selectionMode="single"
              selectedKeys={mode}
            >
              <Dropdown.Item key="code">Code</Dropdown.Item>
              <Dropdown.Item key="visual">Visual</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Grid.Container> */}
      </Grid>
      <Grid xs={12} css={{}}>
        <AlgorithmVisual />
        {/* {mode.values().next().value === "code" ? (
          <CodeEditor code={code} />
        ) : (
          <AlgorithmVisual />
        )} */}
      </Grid>
    </Grid.Container>
  );
};

export default AlgorithmCard;

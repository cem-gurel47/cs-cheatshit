import React from "react";
import { useRouter } from "next/router";
import { Grid, Text } from "@nextui-org/react";
import Head from "next/head";
import AlgorithmCard from "@components/Card/algorithm";

type Props = {};

const Algorithm = (props: Props) => {
  const router = useRouter();

  const { algorithm } = router.query;

  const convertPathToTitle = (path: string | string[] | undefined) => {
    if (typeof path === "string") {
      const keywords = path.split("-");
      const title = keywords
        .map((keyword) => keyword.charAt(0).toUpperCase() + keyword.slice(1))
        .join(" ");
      return title;
    }
    return "";
  };
  return (
    <Grid.Container
      css={{
        width: "100%",
      }}
    >
      <Head>
        <title>{`${
          algorithm || ""
        } | CheatShit - Computer Science made easy`}</title>
        <meta
          name="description"
          content={`Visualize how ${algorithm} works.`}
        />
      </Head>
      <Grid
        css={{
          mt: "-$8",
          width: "100%",
        }}
      >
        <Text
          h1
          css={{
            mt: "$4",
          }}
        >
          {convertPathToTitle(algorithm)}
        </Text>
        <AlgorithmCard algorithm={algorithm} />
      </Grid>
    </Grid.Container>
  );
};

export default Algorithm;

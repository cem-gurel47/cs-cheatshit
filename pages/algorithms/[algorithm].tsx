import React from "react";
import { useRouter } from "next/router";
import { Grid, Text } from "@nextui-org/react";
import Head from "next/head";
import dynamic from "next/dynamic";
const TextEditor = dynamic(import("@components/CodeEditor"), {
  ssr: false,
});

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
        <meta name="description" content="Visualize how ${algorithm} works." />
      </Head>
      <Grid
        css={{
          mt: "-$8",
          width: "100%",
        }}
      >
        <Text h1>{convertPathToTitle(algorithm)}</Text>
        <TextEditor code="function test(){}" />
      </Grid>
    </Grid.Container>
  );
};

export default Algorithm;

import React from "react";
import { useRouter } from "next/router";
import { Grid, Text } from "@nextui-org/react";
import Head from "next/head";

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
    <div>
      <Head>
        <title>{`${
          algorithm || ""
        } | CheatShit - Computer Science made easy`}</title>
        <meta name="description" content="Visualize how ${algorithm} works." />
      </Head>
      <Grid
        css={{
          mt: "-$8",
        }}
      >
        <Text h1>{convertPathToTitle(algorithm)}</Text>
      </Grid>
    </div>
  );
};

export default Algorithm;

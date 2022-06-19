import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Grid, Text } from "@nextui-org/react";

type Props = {};

const Algorithms: NextPage = ({}: Props) => {
  return (
    <div>
      <Head>
        <title>CheatShit | Computer Science made easy</title>
        <meta
          name="description"
          content="Data visaulization tool for data structures and algorithms"
        />
      </Head>
      <Grid.Container gap={2}>
        <Grid sm={12}>
          <Text>Actual page</Text>
        </Grid>
      </Grid.Container>
    </div>
  );
};

export default Algorithms;

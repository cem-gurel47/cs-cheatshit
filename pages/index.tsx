import type { NextPage } from "next";
import Head from "next/head";
import { Grid, Text, Button, Link } from "@nextui-org/react";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>CheatShit | Computer Science made easy</title>
        <meta
          name="description"
          content="Data visaulization tool for data structures"
        />
      </Head>
      <Grid.Container
        gap={2}
        css={{
          paddingTop: "$32",
          "@media (max-width: 670px)": {
            paddingTop: "$16",
          },
        }}
      >
        <Grid
          xs={12}
          direction="column"
          justify="center"
          alignItems="center"
          css={{
            textAlign: "center",
          }}
        >
          <Grid>
            <Text
              h1
              css={{
                textGradient: "45deg, $blue600 -20%, $pink600 50%",
                display: "inline",
              }}
            >
              Computer Science made&nbsp;
            </Text>
            <Text
              h1
              weight="bold"
              css={{
                textGradient: "45deg, $yellow600 -20%, $red600 100%",
                display: "inline",
              }}
            >
              easy.
            </Text>
          </Grid>
          <Text h3 color="#ff4ecd">
            Visualize popular algorithms step by step
          </Text>
          <Link href="/algorithms">
            <Button
              bordered
              shadow
              css={{
                marginTop: "$8",
              }}
            >
              Get Started
            </Button>
          </Link>
        </Grid>
      </Grid.Container>
    </div>
  );
};

export default Home;

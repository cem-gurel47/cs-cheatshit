import type { NextPage } from "next";
import Head from "next/head";
import { Grid, Text, Button, Link } from "@nextui-org/react";
import LandingCard from "@components/Card/landing";
import { TickSquare, Chart, Category, EditSquare } from "react-iconly";

const Home: NextPage = () => {
  const CARD_INFO = [
    {
      title: "Well Tested",
      description:
        "Provides a simple way to customize default themes, you can change the colors, fonts, breakpoints and everything you need.",
      icon: <TickSquare set="curved" primaryColor="blueviolet" />,
    },
    {
      title: "Fast",
      description:
        "Avoids unnecessary styles props at runtime, making it more performant than other UI libraries.",
      icon: <Chart set="curved" primaryColor="blueviolet" />,
    },
    {
      title: "Multiple Languages",
      description:
        "Automatic dark mode recognition, NextUI automatically changes the theme when detects HTML theme prop changes.",
      icon: <Category set="curved" primaryColor="blueviolet" />,
    },
    {
      title: "Customizable",
      description:
        "NextUI is fully-typed to minimize the learning curve, and provide the best possible developer experience.",
      icon: <EditSquare set="curved" primaryColor="blueviolet" />,
    },
  ];
  return (
    <div>
      <Head>
        <title>CheatShit | Computer Science made easy</title>
        <meta
          name="description"
          content="Data visaulization tool for data structures and algorithms"
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
            marginBottom: "$32",
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
          <Text h3 color="#ff4ecd" margin="auto">
            Visualize popular algorithms step by step
          </Text>
          <Link href="/algorithms/binary-search-tree">
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
        {CARD_INFO.map((card) => (
          <LandingCard
            key={card.title}
            title={card.title}
            description={card.description}
            icon={card.icon}
          />
        ))}
      </Grid.Container>
    </div>
  );
};

export default Home;

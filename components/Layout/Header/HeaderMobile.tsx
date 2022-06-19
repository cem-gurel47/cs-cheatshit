import React from "react";
import { Collapse, Text, Link, useTheme, Grid } from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import Sunicon from "../../../public/Sunicon";
import Moonicon from "../../../public/Moonicon";
import Githubicon from "../../../public/Githubicon";

const HeaderMobile = () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  return (
    <Collapse
      title="CheatShit"
      divider={false}
      as="header"
      css={{
        display: "none",
        "@media (max-width: 669px)": {
          display: "block",
        },
      }}
    >
      <Grid.Container
        justify="flex-end"
        direction="column"
        css={{
          textAlign: "end",
        }}
      >
        <Grid justify="flex-end">
          <Link
            href="https://github.com/cem-gurel47/cs-cheatshit/discussions/new?category=general"
            target="_blank"
            rel="noreferrer"
          >
            <Text
              size={20}
              css={{
                "@smMax": {
                  fontSize: "16px",
                },
              }}
            >
              Feedback
            </Text>
          </Link>
        </Grid>
        <Grid>
          <Link href="/algorithms">
            <Text
              size={20}
              css={{
                "@smMax": {
                  fontSize: "16px",
                },
              }}
            >
              Algorithms
            </Text>
          </Link>
        </Grid>
      </Grid.Container>
    </Collapse>
  );
};

export default HeaderMobile;

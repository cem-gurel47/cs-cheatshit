import React from "react";
import { Grid, Text, Switch, useTheme, Link } from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import Sunicon from "../../../public/Sunicon";
import Moonicon from "../../../public/Moonicon";
import Githubicon from "../../../public/Githubicon";
const Header = () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  return (
    <Grid.Container
      as="header"
      gap={2}
      css={{
        display: "none",
        "@media (min-width:670px)": {
          display: "flex",
        },
      }}
    >
      <Grid xs={4} alignItems="center">
        <Link href="/">
          <Text
            weight="bold"
            size={30}
            css={{
              "@smMax": {
                fontSize: "24px",
              },
            }}
          >
            CheatShit
          </Text>
        </Link>
      </Grid>
      <Grid xs={4} alignItems="center">
        <Grid.Container gap={2} justify="center">
          <Grid>
            <Link href="/algorithms/binary-tree">
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
          <Grid>
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
        </Grid.Container>
      </Grid>
      <Grid xs={4} alignItems="center" justify="flex-end">
        <Link
          href="https://github.com/cem-gurel47/cs-cheatshit"
          target="_blank"
          rel="noreferrer"
          css={{
            mr: "$4",
            mb: "-$2",
          }}
        >
          <Githubicon />
        </Link>
        <Switch
          shadow
          checked={isDark}
          onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
          iconOn={<Moonicon />}
          iconOff={<Sunicon />}
        />
      </Grid>
    </Grid.Container>
  );
};

export default Header;

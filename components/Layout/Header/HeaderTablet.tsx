import React, { useState } from "react";
import {
  Grid,
  Text,
  Switch,
  useTheme,
  Link,
  Button,
  Collapse,
} from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import Sunicon from "../../../public/Sunicon";
import Moonicon from "../../../public/Moonicon";
import Githubicon from "../../../public/Githubicon";
import Sidebar from "../Sidebar";
import MenuButton from "./MenuButton";

const Header = () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Grid.Container
      gap={2}
      css={{
        display: "none",
        "@media (min-width:670px) and (max-width:1280px)": {
          display: "flex",
        },
      }}
    >
      <Grid xs={4} alignItems="center">
        <Link href="/">
          <Text weight="bold" size={30}>
            CheatShit
          </Text>
        </Link>
      </Grid>
      <Grid xs={4} alignItems="center">
        <Grid.Container gap={2} justify="center">
          <Grid>
            <Link href="/algorithms/binary-search-tree">
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
          css={{
            mr: "$4",
          }}
        />
        <MenuButton isOpen={isOpen} setIsOpen={setIsOpen} />
      </Grid>
      <Collapse
        expanded={isOpen}
        divider={false}
        arrowIcon={<div />}
        title=""
        css={{
          width: "100%",
          mt: "-$12",
        }}
      >
        <Sidebar />
      </Collapse>
    </Grid.Container>
  );
};

export default Header;

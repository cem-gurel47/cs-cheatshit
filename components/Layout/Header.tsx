import React from "react";
import { Grid, Text, Switch, useTheme, Link } from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import Sunicon from "../../public/Sunicon";
import Moonicon from "../../public/Moonicon";

const Header = () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();
  return (
    <header>
      <Grid.Container gap={2}>
        <Grid xs={4}>
          <Link href="/a">
            <Text weight="bold" size={30}>
              CheatShit
            </Text>
          </Link>
        </Grid>
        <Grid xs={4} alignItems="center" justify="center">
          <Link href="/algorithms">
            <Text size={20}>Algorithms</Text>
          </Link>
        </Grid>
        <Grid xs={4} alignItems="center" justify="flex-end">
          <Switch
            shadow
            checked={isDark}
            onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
            iconOn={<Moonicon />}
            iconOff={<Sunicon />}
          />
        </Grid>
      </Grid.Container>
    </header>
  );
};

export default Header;

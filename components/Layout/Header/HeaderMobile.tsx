import React from "react";
import { Collapse, Text, Link, useTheme, Grid } from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import Sunicon from "../../../public/Sunicon";
import Moonicon from "../../../public/Moonicon";
import Githubicon from "../../../public/Githubicon";
import Sidebar from "../Sidebar";

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
      <Sidebar isHeader={true} />
    </Collapse>
  );
};

export default HeaderMobile;

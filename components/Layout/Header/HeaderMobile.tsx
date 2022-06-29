import React from "react";
import { Collapse } from "@nextui-org/react";

import Sidebar from "../Sidebar";

const HeaderMobile = () => {
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

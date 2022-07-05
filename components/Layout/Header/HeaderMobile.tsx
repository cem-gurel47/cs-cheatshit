import React, { useState } from "react";
import { Collapse } from "@nextui-org/react";
import Sidebar from "../Sidebar";
import MenuButton from "./MenuButton";

const HeaderMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapse
      expanded={isOpen}
      title="CheatShit"
      arrowIcon={<MenuButton isOpen={isOpen} setIsOpen={setIsOpen} />}
      divider={false}
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

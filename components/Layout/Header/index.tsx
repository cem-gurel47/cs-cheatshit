import React from "react";
import HeaderMobile from "./HeaderMobile";
import HeaderDesktop from "./HeaderDesktop";
import HeaderTablet from "./HeaderTablet";

const index = () => {
  return (
    <header>
      <HeaderMobile />
      <HeaderTablet />
      <HeaderDesktop />
    </header>
  );
};

export default index;

import React from "react";
import { Container } from "@nextui-org/react";

type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  return (
    <Container
      css={{
        minHeight: "100vh",
        maxW: "1200px",
        margin: "0 auto",
      }}
    >
      {props.children}
    </Container>
  );
};

export default Layout;

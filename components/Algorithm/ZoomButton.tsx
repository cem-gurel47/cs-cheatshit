import React from "react";
import { Button } from "@nextui-org/react";

type Props = {
  onPress: () => void;
  type: "zoom" | "unzoom";
};

const ZoomButton = ({ onPress, type }: Props) => {
  return (
    <Button
      auto
      flat
      css={{
        position: "absolute",
        right: "$8",
        bottom: type === "zoom" ? "60px" : "10px",
        zIndex: 2,
      }}
      onPress={onPress}
    >
      {type === "zoom" ? "+" : "-"}
    </Button>
  );
};

export default ZoomButton;

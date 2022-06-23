import React from "react";
import { Button } from "@nextui-org/react";

type Props = {
  scale: number;
  setScale: React.Dispatch<React.SetStateAction<number>>;
  type: "zoom" | "unzoom";
};

const ZoomButton = ({ setScale, scale, type }: Props) => {
  const zoomGrid = () => {
    console.log("clicked");
    if (scale < 1) {
      setScale((scale) => scale + 0.1);
    }
  };

  const unzoomGrid = () => {
    if (scale > 0.1) {
      console.log("clicked");
      setScale((scale) => scale - 0.1);
    }
  };
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
      onClick={type === "zoom" ? zoomGrid : unzoomGrid}
    >
      {type === "zoom" ? "+" : "-"}
    </Button>
  );
};

export default ZoomButton;

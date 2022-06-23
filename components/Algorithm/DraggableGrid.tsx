import React, { useCallback } from "react";
import useDraggable from "@hooks/useDraggable";
import { Grid } from "@nextui-org/react";

type Props = {
  children: React.ReactNode;
  scale: number;
};

const DraggableComponent = ({ children, scale }: Props) => {
  // it's nice to have a way to at least prevent element from
  // getting dragged out of the page
  const handleDrag = useCallback(
    ({ x, y }: { x: number; y: number }) => ({
      x: Math.max(0, x),
      y: Math.max(0, y),
    }),
    []
  );

  const [ref, pressed, handleMouseDown] = useDraggable({
    onDrag: handleDrag,
    scale,
  });

  return (
    <Grid
      //@ts-ignore
      ref={ref}
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        transform: `scale(${scale})`,
        cursor: "grab",
      }}
      //@ts-ignore
      onMouseDown={handleMouseDown}
    >
      {children}
    </Grid>
  );
};

export default DraggableComponent;

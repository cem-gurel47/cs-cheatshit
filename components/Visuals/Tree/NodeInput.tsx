import React, { useEffect, useRef, useState } from "react";
import { Input } from "@nextui-org/react";

type Props = {
  inputRef: React.RefObject<HTMLInputElement>;
  value: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  addNode: () => void;
};

const NodeInput = ({ inputRef, value, setValue, addNode }: Props) => {
  return (
    <Input
      helperText="Press enter to add or click to delete."
      ref={inputRef}
      autoFocus
      aria-label="Enter node"
      placeholder="Enter node"
      bordered
      type={"number"}
      color="primary"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          addNode();
        }
      }}
    />
  );
};

export default NodeInput;

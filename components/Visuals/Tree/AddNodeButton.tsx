import React from "react";
import { Button, Tooltip } from "@nextui-org/react";
import { Plus } from "react-iconly";
type Props = {
  addNode: () => void;
};

const AddNodeButton = ({ addNode }: Props) => {
  return (
    <Tooltip content="Add node">
      <Button
        auto
        onClick={addNode}
        color="primary"
        icon={<Plus set="bold" primaryColor="#fff" />}
      />
    </Tooltip>
  );
};

export default AddNodeButton;

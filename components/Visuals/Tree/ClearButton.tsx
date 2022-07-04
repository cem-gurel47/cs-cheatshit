import React, { useContext } from "react";
import { BSTContext } from "@contexts/BST";
import { Button, Tooltip } from "@nextui-org/react";
import { Delete } from "react-iconly";
type Props = {};

const ClearButton = (props: Props) => {
  const { BST, setNodes, setEdges } = useContext(BSTContext);

  const resetTree = () => {
    setNodes([]);
    setEdges([]);
    BST.current.root = null;
  };

  return (
    <Tooltip content="Reset Tree">
      <Button
        onClick={resetTree}
        color="error"
        icon={<Delete set="bold" primaryColor="#fff" />}
        auto
      />
    </Tooltip>
  );
};

export default ClearButton;

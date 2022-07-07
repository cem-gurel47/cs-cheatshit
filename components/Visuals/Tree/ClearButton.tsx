import React, { useContext } from "react";
import { TreeContext } from "@contexts/tree";
import { Button, Tooltip } from "@nextui-org/react";
import { Delete } from "react-iconly";
type Props = {};

const ClearButton = (props: Props) => {
  const { tree, setNodes, setEdges } = useContext(TreeContext);

  const resetTree = () => {
    setNodes([]);
    setEdges([]);
    tree.current.root = null;
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

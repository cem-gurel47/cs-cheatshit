import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { Category } from "react-iconly";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuButton = ({ isOpen, setIsOpen }: Props) => {
  const [transformDegree, setTransformDegree] = useState(90);

  return (
    <Button
      color="primary"
      onClick={() => {
        setIsOpen(!isOpen);
        setTransformDegree(transformDegree * -1);
      }}
      auto
      icon={<Category set="bold" primaryColor="#fff" size={18} />}
      css={{
        width: "32px",
        height: "32px",
        mb: "-$1",
        transition: "all 0.2s ease-in-out",
        transform: `rotate(${transformDegree}deg)`,
      }}
    />
  );
};

export default MenuButton;

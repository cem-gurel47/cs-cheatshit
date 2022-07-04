import React from "react";
import { Button, Tooltip } from "@nextui-org/react";
import { Search } from "react-iconly";

type Props = {
  startSearching: () => void;
};

const SearchButton = ({ startSearching }: Props) => {
  return (
    <Tooltip content="Search Node">
      <Button
        onClick={startSearching}
        color="success"
        icon={<Search set="bold" primaryColor="#fff" />}
        auto
      />
    </Tooltip>
  );
};

export default SearchButton;

import React, { useState } from "react";
import { Grid, Input } from "@nextui-org/react";
import CollapseSidebar from "./Collapse";
import { ImTree } from "react-icons/im";
import { BiSearchAlt } from "react-icons/bi";
import { BsSortNumericDownAlt } from "react-icons/bs";
type Props = {};

const data = [
  {
    items: ["Binary Tree", "Binary Search Tree", "AVL Tree"],
    title: "Tree Algorithms",
    Icon: ImTree,
  },
  {
    items: [
      "Bubble Sort",
      "Selection Sort",
      "Insertion Sort",
      "Merge Sort",
      "Quick Sort",
      "Heap Sort",
      "Radix Sort",
    ],
    title: "Sorting Algorithms",
    Icon: BsSortNumericDownAlt,
  },
  {
    items: ["Binary Search", "Linear Search"],
    title: "Search Algorithms",
    Icon: BiSearchAlt,
  },
];

const Sidebar = (props: Props) => {
  const [search, setSearch] = useState("");
  return (
    <Grid.Container
      css={{
        width: "100%",
        mt: "-$2",
      }}
    >
      <Input
        placeholder="Filter..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        clearable
        fullWidth
      />
      {data.map((item) => (
        <CollapseSidebar
          key={item.title}
          title={item.title}
          Icon={item.Icon}
          items={item.items}
        />
      ))}
    </Grid.Container>
  );
};

export default Sidebar;

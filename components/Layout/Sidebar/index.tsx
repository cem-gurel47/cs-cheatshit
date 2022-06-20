import React, { useState } from "react";
import { Grid, Input } from "@nextui-org/react";
import CollapseSidebar from "./Collapse";
import { ImTree } from "react-icons/im";
import { BiSearchAlt } from "react-icons/bi";
import { BsSortNumericDownAlt } from "react-icons/bs";
import { GrGraphQl } from "react-icons/gr";
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
  {
    title: "Graph Algorithms",
    items: ["Dijkstra's Algorithm", "Bellman-Ford Algorithm"],
    Icon: GrGraphQl,
  },
];

const Sidebar = (props: Props) => {
  const [search, setSearch] = useState("");
  return (
    <Grid.Container
      css={{
        width: "100%",
        mt: "-$2",
        display: "block",
      }}
    >
      <Input
        placeholder="Filter..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        clearable
        fullWidth
      />
      {data.map((item) => {
        const { title, items, Icon } = item;
        const filteredItems = items.filter((item) =>
          item.toLowerCase().includes(search.toLowerCase())
        );
        const filteredTitle = title
          .toLowerCase()
          .includes(search.toLowerCase());
        if (filteredItems.length > 0 || filteredTitle) {
          return (
            <CollapseSidebar
              key={title}
              title={title}
              Icon={Icon}
              items={filteredItems}
            />
          );
        }
        return null;
      })}
    </Grid.Container>
  );
};

export default Sidebar;

import React, { useState } from "react";
import { Grid, Input } from "@nextui-org/react";
import CollapseSidebar from "./Collapse";
import { ImTree } from "react-icons/im";
import { BiSearchAlt } from "react-icons/bi";
import { BsSortNumericDownAlt } from "react-icons/bs";
import { GrGraphQl } from "react-icons/gr";

type Props = {
  isHeader?: boolean;
};

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
    comingSoon: true,
    title: "Sorting Algorithms",
    Icon: BsSortNumericDownAlt,
  },
  {
    items: ["Binary Search", "Linear Search"],
    comingSoon: true,
    title: "Search Algorithms",
    Icon: BiSearchAlt,
  },
  {
    title: "Graph Algorithms",
    items: ["Dijkstra's Algorithm", "Bellman-Ford Algorithm"],
    comingSoon: true,
    Icon: GrGraphQl,
  },
];

const Sidebar = ({ isHeader }: Props) => {
  const [search, setSearch] = useState("");
  return (
    <Grid.Container
      css={{
        width: "100%",
        mt: "-$2",
        display: "block",
        "@media (max-width: 669px)": {
          display: isHeader ? "block" : "none",
        },
      }}
    >
      <Input
        aria-label="Filter algorithms"
        placeholder="Filter..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        clearable
        fullWidth
      />
      {data.map((item) => {
        const { title, items, Icon, comingSoon } = item;
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
              comingSoon={comingSoon}
            />
          );
        }
        return null;
      })}
    </Grid.Container>
  );
};

export default Sidebar;

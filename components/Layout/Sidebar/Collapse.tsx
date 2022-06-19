import React from "react";
import { Collapse, Text, Link } from "@nextui-org/react";
import { useRouter } from "next/router";
import { IconType } from "react-icons";

type Props = {
  title: string;
  Icon: IconType;
  items: string[];
};

const CollapseSidebar = ({ title, Icon, items }: Props) => {
  const router = useRouter();
  const { algorithm } = router.query;

  // TODO - determine if this can hurt performance since it's going to run in every render
  const isMenuItemActive = (path: string) => {
    return `/algorithms/${algorithm}` === path;
  };

  const generatePath = (title: string) => {
    const keywords = title.split(" ");
    const path = keywords.map((keyword) => keyword.toLowerCase()).join("-");
    return `/algorithms/${path}`;
  };

  return (
    <Collapse
      css={{
        width: "inherit",
      }}
      expanded
      title={<Text weight="bold">{title}</Text>}
      contentLeft={<Icon />}
      divider={false}
    >
      <ul>
        {items.map((item) => {
          const path = generatePath(item);
          return (
            <li key={item}>
              <Link href={path}>
                <Text color={isMenuItemActive(path) ? "$primary" : "$accents8"}>
                  {item}
                </Text>
              </Link>
            </li>
          );
        })}
      </ul>
    </Collapse>
  );
};

export default CollapseSidebar;

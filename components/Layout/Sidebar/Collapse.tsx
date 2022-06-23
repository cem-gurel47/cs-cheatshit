import React from "react";
import { Collapse, Text, Link, Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import { IconType } from "react-icons";

type Props = {
  title: string;
  Icon: IconType;
  items: string[];
  comingSoon?: boolean;
};

const CollapseSidebar = ({ title, Icon, items, comingSoon }: Props) => {
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
            <li
              key={item}
              style={{
                pointerEvents: comingSoon ? "none" : "auto",
                cursor: comingSoon ? "no-drop" : "pointer",
              }}
            >
              <Link
                href={path}
                css={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text color={isMenuItemActive(path) ? "$primary" : "$accents8"}>
                  {item}
                </Text>
                {comingSoon && (
                  <Button
                    disabled
                    size="xs"
                    as="span"
                    css={{
                      fontSize: "9px",
                    }}
                  >
                    COMING SOON{" "}
                  </Button>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </Collapse>
  );
};

export default CollapseSidebar;

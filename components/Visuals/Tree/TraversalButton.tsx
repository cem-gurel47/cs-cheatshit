import React, { useContext, useCallback } from "react";
import { TreeContext } from "@contexts/tree";
import { Tooltip, Popover, Button, Text, Grid } from "@nextui-org/react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowRight,
} from "react-iconly";

type Props = {
  type: string;
};

const TraversalButton = ({ type }: Props) => {
  const { inorderTraversal, preorderTraversal, postorderTraversal } =
    useContext(TreeContext);

  const content =
    type === "Inorder"
      ? inorderTraversal
      : type === "Preorder"
      ? preorderTraversal
      : postorderTraversal;

  const formatTraversal = useCallback(() => {
    const items: React.ReactNode[] = [];
    content.forEach((item, index) => {
      items.push(<Text key={item}>{item}</Text>);
      if (index !== content.length - 1) {
        items.push(
          <ArrowRight
            key={`${item}-arrow`}
            set="bold"
            primaryColor="blueviolet"
            style={{
              marginLeft: "0.25rem",
              marginRight: "0.25rem",
            }}
          />
        );
      }
    });
    return items;
  }, [content]);

  return (
    <Popover isBordered>
      <Tooltip content={`${type} Traversal`}>
        <Popover.Trigger>
          <Button
            auto
            rounded
            color="warning"
            icon={
              type === "Inorder" ? (
                <ChevronDown set="bold" primaryColor="blueviolet" />
              ) : type === "Preorder" ? (
                <ChevronLeft set="bold" primaryColor="blueviolet" />
              ) : (
                <ChevronRight set="bold" primaryColor="blueviolet" />
              )
            }
          />
        </Popover.Trigger>
      </Tooltip>
      <Popover.Content
        css={{
          p: "$4",
          px: "$10",
        }}
      >
        {content.length === 0 ? (
          <Text>Enter a node</Text>
        ) : (
          <Grid.Container alignItems="center">
            {formatTraversal()}
          </Grid.Container>
        )}
      </Popover.Content>
    </Popover>
  );
};

export default TraversalButton;

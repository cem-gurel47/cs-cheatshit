import React, { useContext } from "react";
import { BSTContext } from "@contexts/BST";
import { Tooltip, Popover, Button, Text } from "@nextui-org/react";
import { ChevronLeft, ChevronRight, ChevronDown } from "react-iconly";

type Props = {
  type: string;
};

const TraversalButton = ({ type }: Props) => {
  const { inorderTraversal, preorderTraversal, postorderTraversal } =
    useContext(BSTContext);

  const content =
    type === "Inorder"
      ? inorderTraversal
      : type === "Preorder"
      ? preorderTraversal
      : postorderTraversal;

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
        <Text>
          {content.length === 0 ? "Enter a node" : content.join("->")}
        </Text>
      </Popover.Content>
    </Popover>
  );
};

export default TraversalButton;

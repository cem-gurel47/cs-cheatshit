import React, { createContext, useRef, useState } from "react";
import { BinarySearchTree } from "@algorithms/Trees/BST";
import { NodeData, EdgeData } from "reaflow";

interface BSTContext {
  BST: React.MutableRefObject<BinarySearchTree>;
  nodes: NodeData[];
  setNodes: React.Dispatch<React.SetStateAction<NodeData[]>>;
  edges: EdgeData[];
  setEdges: React.Dispatch<React.SetStateAction<EdgeData[]>>;
  selections: string[];
  setSelections: React.Dispatch<React.SetStateAction<string[]>>;
  inorderTraversal: number[];
  setInorderTraversal: React.Dispatch<React.SetStateAction<number[]>>;
  preorderTraversal: number[];
  setPreorderTraversal: React.Dispatch<React.SetStateAction<number[]>>;
  postorderTraversal: number[];
  setPostorderTraversal: React.Dispatch<React.SetStateAction<number[]>>;
}
// @ts-ignore
export const BSTContext = createContext<BSTContext>({});

const BSTContextProvider = ({ children }: { children: React.ReactNode }) => {
  const BST = useRef<BinarySearchTree>(new BinarySearchTree());
  const [nodes, setNodes] = useState<NodeData[]>(
    BST.current.returnNodeArray(BST.current.root)
  );
  const [edges, setEdges] = useState<EdgeData[]>(
    BST.current.returnEdgeArray(BST.current.root)
  );
  const [selections, setSelections] = useState<string[]>([]);
  const [inorderTraversal, setInorderTraversal] = useState<number[]>([]);
  const [preorderTraversal, setPreorderTraversal] = useState<number[]>([]);
  const [postorderTraversal, setPostorderTraversal] = useState<number[]>([]);

  return (
    <BSTContext.Provider
      value={{
        BST,
        nodes,
        setNodes,
        edges,
        setEdges,
        selections,
        setSelections,
        inorderTraversal,
        setInorderTraversal,
        preorderTraversal,
        setPreorderTraversal,
        postorderTraversal,
        setPostorderTraversal,
      }}
    >
      {children}
    </BSTContext.Provider>
  );
};

export default BSTContextProvider;

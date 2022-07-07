import React, { createContext, useEffect, useRef, useState } from "react";
import { BinarySearchTree } from "@algorithms/Trees/BST";
import { AVLTree } from "@algorithms/Trees/AVL";
import { NodeData, EdgeData } from "reaflow";
import { useRouter } from "next/router";

interface TreeContextProps {
  tree: React.MutableRefObject<BinarySearchTree | AVLTree>;
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
  searchList: number[];
  setSearchList: React.Dispatch<React.SetStateAction<number[]>>;
}
// @ts-ignore
export const TreeContext = createContext<TreeContextProps>({});

const TreeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { algorithm } = router.query;
  const tree = useRef<BinarySearchTree | AVLTree>(
    algorithm?.includes("avl") ? new AVLTree() : new BinarySearchTree()
  );
  const [nodes, setNodes] = useState<NodeData[]>(
    tree.current.returnNodeArray(tree.current.root)
  );
  const [edges, setEdges] = useState<EdgeData[]>(
    tree.current.returnEdgeArray(tree.current.root)
  );
  const [selections, setSelections] = useState<string[]>([]);
  const [inorderTraversal, setInorderTraversal] = useState<number[]>([]);
  const [preorderTraversal, setPreorderTraversal] = useState<number[]>([]);
  const [postorderTraversal, setPostorderTraversal] = useState<number[]>([]);
  const [searchList, setSearchList] = useState<number[]>([]);

  useEffect(() => {
    if (algorithm?.includes("avl")) {
      tree.current = new AVLTree();
    } else {
      tree.current = new BinarySearchTree();
    }
  }, [algorithm]);

  return (
    <TreeContext.Provider
      value={{
        tree,
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
        searchList,
        setSearchList,
      }}
    >
      {children}
    </TreeContext.Provider>
  );
};

export default TreeContextProvider;

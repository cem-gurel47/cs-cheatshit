import { Filter } from "react-iconly";
import { NodeData, EdgeData } from "reaflow";
export class BTNode {
  value: number;
  left: BTNode | null;
  right: BTNode | null;
  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class BinarySearchTree {
  root: BTNode | null;

  public constructor() {
    this.root = null;
  }

  insertNode(root: BTNode | null, node: BTNode): void {
    if (node.value < root!.value) {
      if (root!.left === null) {
        root!.left = node;
      } else {
        this.insertNode(root!.left, node);
      }
    } else {
      if (root!.right === null) {
        root!.right = node;
      } else {
        this.insertNode(root!.right, node);
      }
    }
  }

  insert(value: number): void {
    const node = new BTNode(value);
    if (this.root === null) {
      this.root = node;
      return;
    }
    this.insertNode(this.root, node);
  }

  removeNode(root: BTNode | null, value: number): BTNode | null {
    if (root === null) {
      return null;
    }
    if (value < root.value) {
      root.left = this.removeNode(root.left, value);
      return root;
    } else if (value > root.value) {
      root.right = this.removeNode(root.right, value);
      return root;
    } else {
      if (root.left === null && root.right === null) {
        root = null;
        return root;
      }
      if (root.left === null) {
        root = root.right;
        return root;
      }
      if (root.right === null) {
        root = root.left;
        return root;
      }
      const temp = this.findMin(root.right);
      root.value = temp!.value;
      root.right = this.removeNode(root.right, temp!.value);
      return root;
    }
  }

  remove(value: number): void {
    this.root = this.removeNode(this.root, value);
  }

  findMin(root: BTNode | null): BTNode | null {
    if (root === null) {
      return root;
    }
    if (root.left === null) {
      return root;
    }
    return this.findMin(root.left);
  }

  findMax(root: BTNode | null): BTNode | null {
    if (root === null) {
      return root;
    }
    if (root.right === null) {
      return root;
    }
    return this.findMax(root.right);
  }

  find(root: BTNode | null, value: number): BTNode | null {
    if (root === null) {
      return root;
    }
    if (root.value === value) {
      return root;
    }
    if (value < root.value) {
      return this.find(root.left, value);
    }
    return this.find(root.right, value);
  }

  preorder(root: BTNode | null): void {
    if (root === null) {
      return;
    }
    this.preorder(root.left);
    this.preorder(root.right);
  }

  inorder(root: BTNode | null): void {
    if (root === null) {
      return;
    }
    this.inorder(root.left);
    console.log(root.value);
    this.inorder(root.right);
  }

  postorder(root: BTNode | null): void {
    if (root === null) {
      return;
    }
    this.postorder(root.left);
    this.postorder(root.right);
    console.log(root.value);
  }

  calculateDepth(root: BTNode | null): number {
    if (root === null) {
      return 0;
    }
    const depth =
      Math.max(
        this.calculateDepth(root.left),
        this.calculateDepth(root.right)
      ) + 1;
    return depth;
  }

  calculateItemDepth(root: BTNode | null, value: number): number {
    if (root === null) {
      return 0;
    }
    if (root.value === value) {
      return 1;
    }
    if (value < root.value) {
      return 1 + this.calculateItemDepth(root.left, value);
    }
    return 1 + this.calculateItemDepth(root.right, value);
  }

  returnTreeItemsByLevelWithEmptyNodes(
    root: BTNode | null,
    level: number
  ): BTNode[] {
    const numberOfItemsPerLevel = new Array(Math.pow(2, level - 1)).fill(
      Number.NaN
    );

    if (root === null) {
      return numberOfItemsPerLevel;
    }
    if (level === 1) {
      return [root];
    }
    const left = this.returnTreeItemsByLevelWithEmptyNodes(
      root.left,
      level - 1
    );
    const right = this.returnTreeItemsByLevelWithEmptyNodes(
      root.right,
      level - 1
    );
    return left.concat(right);
  }

  returnNodeArray(root: BTNode | null): NodeData[] {
    // the array should have the following structure:
    // [{id: Node value, text : Node Value}]

    if (root === null) {
      return [];
    }
    const left = this.returnNodeArray(root.left);
    const right = this.returnNodeArray(root.right);
    //@ts-ignore
    return [{ id: root.value.toString(), text: root.value.toString() }].concat(
      //@ts-ignore
      left,
      right
    );
  }

  returnEdgeArray(root: BTNode | null): EdgeData[] {
    // the array should have the following structure:
    // [{from: Node value, to: Node Value}]

    if (root === null) {
      return [];
    }
    const left = this.returnEdgeArray(root.left);
    const right = this.returnEdgeArray(root.right);
    //@ts-ignore
    return (
      [
        root.left
          ? {
              id: `${root.value}-${root.left.value}`,
              from: root.value.toString(),
              to: root.left.value.toString(),
            }
          : undefined,
        root.right
          ? {
              id: `${root.value}-${root.right.value}`,
              from: root.value.toString(),
              to: root.right.value.toString(),
            }
          : undefined,
      ]
        .filter((item) => item !== undefined)
        //@ts-ignore
        .concat(left, right)
    );
  }
}

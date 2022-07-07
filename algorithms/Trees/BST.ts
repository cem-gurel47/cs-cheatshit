import { EdgeData } from "reaflow";
import { Node } from "./Node";

export class BinarySearchTree {
  root: Node | null;

  public constructor() {
    this.root = null;
  }

  insertNode(root: Node | null, value: number): void {
    if (root === null) {
      return;
    }

    if (value < root.value) {
      if (root.left === null || Number.isNaN(root.left?.value)) {
        root.left = new Node(value, root);
        if (root.right === null) {
          root.right = new Node(Number.NaN, root);
        }
        return;
      }
      this.insertNode(root.left, value);
    } else if (value > root.value) {
      if (root.right === null || Number.isNaN(root.right?.value)) {
        root.right = new Node(value, root);
        if (root.left === null) {
          root.left = new Node(Number.NaN, root);
        }
        return;
      }
      this.insertNode(root.right, value);
    }
  }

  insert(value: number): void {
    if (this.root === null) {
      this.root = new Node(value, null);
      return;
    }
    this.insertNode(this.root, value);
  }

  removeNode(root: Node | null, value: number): Node | null {
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
        root = new Node(Number.NaN, root.parent);
        return root;
      }
      if (
        root.left === null &&
        root.right !== null &&
        !Number.isNaN(root.right.value)
      ) {
        root = root.right;
        return root;
      }
      if (
        root.right === null &&
        root.left !== null &&
        !Number.isNaN(root.left.value)
      ) {
        root = root.left;
        return root;
      }
      if (root.left !== null && Number.isNaN(root.right?.value)) {
        root = root.left;
        return root;
      }
      if (root.right !== null && Number.isNaN(root.left?.value)) {
        root = root.right;
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

  findMin(root: Node | null): Node | null {
    if (root === null) {
      return root;
    }
    if (root.left === null) {
      return root;
    }
    return this.findMin(root.left);
  }

  findMax(root: Node | null): Node | null {
    if (root === null) {
      return root;
    }
    if (root.right === null) {
      return root;
    }
    return this.findMax(root.right);
  }

  find(root: Node | null, value: number): Node | null {
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

  nodesUntilFound(root: Node | null, value: number): number[] {
    if (root === null) {
      return [];
    }
    if (root.value === value) {
      return [root.value];
    }
    if (value < root.value) {
      return [root.value, ...this.nodesUntilFound(root.left, value)];
    }
    return [root.value, ...this.nodesUntilFound(root.right, value)];
  }

  preorder(root: Node | null): number[] {
    if (root === null) {
      return [];
    }
    const left = this.preorder(root.left);
    const right = this.preorder(root.right);
    return [root.value, ...left, ...right].filter((v) => !Number.isNaN(v));
  }

  inorder(root: Node | null): number[] {
    if (root === null) {
      return [];
    }
    const left = this.inorder(root.left);
    const right = this.inorder(root.right);
    return [...left, root.value, ...right].filter((v) => !Number.isNaN(v));
  }

  postorder(root: Node | null): number[] {
    if (root === null) {
      return [];
    }
    const left = this.postorder(root.left);
    const right = this.postorder(root.right);
    return [...left, ...right, root.value].filter((v) => !Number.isNaN(v));
  }

  calculateDepth(root: Node | null): number {
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

  calculateItemDepth(root: Node | null, value: number): number {
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
    root: Node | null,
    level: number
  ): Node[] {
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

  returnNodeArray(root: Node | null): { id: string; text: string }[] {
    // the array should have the following structure:
    // [{id: Node value, text : Node Value}]

    if (root === null) {
      return [];
    }
    const left = this.returnNodeArray(root.left);
    const right = this.returnNodeArray(root.right);
    const value = Number.isNaN(root.value)
      ? `NaN-${root.parent?.value}`
      : root.value.toString();

    return [
      {
        id: value,
        text: value,
      },
    ].concat(left, right);
  }

  returnEdgeArray(root: Node | null): EdgeData[] {
    // the array should have the following structure:
    // [{from: Node value, to: Node Value}]

    if (root === null) {
      return [];
    }
    const left = this.returnEdgeArray(root.left);
    const right = this.returnEdgeArray(root.right);

    const leftValue = Number.isNaN(root.left?.value)
      ? `NaN-${root.value}`
      : root.left?.value.toString();

    const rightValue = Number.isNaN(root.right?.value)
      ? `NaN-${root.value}`
      : root.right?.value.toString();

    //@ts-ignore
    return (
      [
        root.left
          ? {
              id: `${root.value}-${leftValue}`,
              from: root.value.toString(),
              to: leftValue,
              disabled: true,
            }
          : undefined,
        root.right
          ? {
              id: `${root.value}-${rightValue}`,
              from: root.value.toString(),
              to: rightValue,
              disabled: true,
            }
          : undefined,
      ]
        .filter((item) => item !== undefined)
        //@ts-ignore
        .concat(left, right)
    );
  }
}

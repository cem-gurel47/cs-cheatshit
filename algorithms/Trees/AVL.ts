import { Node } from "./Node";
import { EdgeData } from "reaflow";

export class AVLTree {
  root: Node | null;
  constructor() {
    this.root = null;
  }

  insert(value: number): void {
    const newNode = new Node(value, null);
    if (this.root === null) {
      this.root = newNode;
      return;
    }

    let currentNode = this.root;
    while (true) {
      if (value < currentNode.value) {
        if (currentNode.left === null) {
          currentNode.left = newNode;
          newNode.parent = currentNode;
          this.balance(newNode);
          return;
        }
        currentNode = currentNode.left;
      } else if (value > currentNode.value) {
        if (currentNode.right === null) {
          currentNode.right = newNode;
          newNode.parent = currentNode;
          this.balance(newNode);
          return;
        }
        currentNode = currentNode.right;
      } else {
        return;
      }
    }
  }

  balance(node: Node): void {
    alert("balance");
    if (node.parent === null) {
      return;
    }

    const parent = node.parent;
    const grandparent = parent.parent;

    if (grandparent === null) {
      return;
    }

    if (parent.left === node) {
      if (grandparent.left === parent) {
        this.rotateRight(parent);
      } else {
        this.rotateLeft(parent);
      }
    } else {
      if (grandparent.left === parent) {
        this.rotateLeft(parent);
      } else {
        this.rotateRight(parent);
      }
    }

    this.balance(grandparent);
  }

  rotateLeft(node: Node): void {
    const right = node.right;

    if (right === null) {
      return;
    }

    node.right = right.left;
    if (right.left !== null) {
      right.left.parent = node;
    }
    right.parent = node.parent;
    if (node.parent === null) {
      this.root = right;
    } else if (node.parent.left === node) {
      node.parent.left = right;
    } else {
      node.parent.right = right;
    }
    right.left = node;
    node.parent = right;
  }

  rotateRight(node: Node): void {
    const left = node.left;

    if (left === null) {
      return;
    }

    node.left = left.right;
    if (left.right !== null) {
      left.right.parent = node;
    }
    left.parent = node.parent;
    if (node.parent === null) {
      this.root = left;
    } else if (node.parent.left === node) {
      node.parent.left = left;
    } else {
      node.parent.right = left;
    }
    left.right = node;
    node.parent = left;
  }

  removeNode(root: Node | null, value: number): Node | null {
    if (root === null) {
      return null;
    }

    if (value < root.value) {
      root.left = this.removeNode(root.left, value);
    } else if (value > root.value) {
      root.right = this.removeNode(root.right, value);
    } else {
      if (root.left === null && root.right === null) {
        return null;
      } else if (root.left === null) {
        return root.right;
      } else if (root.right === null) {
        return root.left;
      } else {
        const min = this.findMin(root.right);
        root.value = min.value;
        root.right = this.removeNode(root.right, min.value);
      }
    }

    return root;
  }

  remove(value: number): void {
    this.root = this.removeNode(this.root, value);
  }

  findMin(root: Node | null): Node {
    if (root === null) {
      return new Node(Number.NaN, null);
    }

    if (root.left === null) {
      return root;
    }

    return this.findMin(root.left);
  }

  findMax(root: Node | null): Node {
    if (root === null) {
      return new Node(Number.NaN, null);
    }

    if (root.right === null) {
      return root;
    }

    return this.findMax(root.right);
  }

  find(root: Node | null, value: number): Node | null {
    if (root === null) {
      return null;
    }

    if (value < root.value) {
      return this.find(root.left, value);
    } else if (value > root.value) {
      return this.find(root.right, value);
    } else {
      return root;
    }
  }

  findNode(root: Node | null, value: number): Node | null {
    if (root === null) {
      return null;
    }

    if (value < root.value) {
      return this.findNode(root.left, value);
    } else if (value > root.value) {
      return this.findNode(root.right, value);
    } else {
      return root;
    }
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

  returnNodeArray(root: Node | null): { id: string; text: string }[] {
    if (root === null) {
      return [];
    }

    const left = this.returnNodeArray(root.left);
    const right = this.returnNodeArray(root.right);

    return [
      ...left,
      { id: root.value.toString(), text: root.value.toString() },
      ...right,
    ];
  }

  nodesUntilFound(root: Node | null, value: number): number[] {
    if (root === null) {
      return [];
    }
    if (root.value === value) {
      return [root.value];
    }
    const left = this.nodesUntilFound(root.left, value);
    const right = this.nodesUntilFound(root.right, value);
    return [...left, ...right];
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

import { Node } from "./Node";
import { EdgeData } from "reaflow";

// TODO write tests for this class
export class AVLTree {
  root: Node | null;
  constructor() {
    this.root = null;
  }

  insertNode(root: Node | null, value: number): void {
    if (root === null) {
      return;
    }

    if (value < root.value) {
      // console.log(value, "is less than", root.value);
      if (root.left === null || Number.isNaN(root.left?.value)) {
        root.left = new Node(value, root);
        // console.log("left node is", value);
        if (root.right === null) {
          // console.log("right node is NaN");
          root.right = new Node(Number.NaN, root);
        }
        this.balance(root);
        return;
      }
      this.insertNode(root.left, value);
    } else if (value > root.value) {
      // console.log(value, "is greater than", root.value);
      if (root.right === null || Number.isNaN(root.right?.value)) {
        root.right = new Node(value, root);
        //console.log("right node is", value);
        if (root.left === null) {
          //console.log("left node is NaN");
          root.left = new Node(Number.NaN, root);
        }
        this.balance(root);
        return;
      }
      this.insertNode(root.right, value);
    }
  }

  balance(lastInsertedNodeParent: Node): void {
    // find the first unbalanced node
    let unbalancedNode = lastInsertedNodeParent;
    while (unbalancedNode.parent !== null) {
      unbalancedNode = unbalancedNode.parent;
      // console.log(unbalancedNode, unbalancedNode.left, unbalancedNode.right);
      let left = this.height(unbalancedNode.left);
      let right = this.height(unbalancedNode.right);

      if (Math.abs(left - right) > 1) {
        this.rotate(unbalancedNode);
      }
    }
  }

  height(root: Node | null): number {
    if (root === null || Number.isNaN(root.value)) {
      return 0;
    }
    return 1 + Math.max(this.height(root.left), this.height(root.right));
  }

  rotate(root: Node | null): void {
    // console.log(root, "rotate root");
    if (root === null) {
      return;
    }
    const left = this.height(root.left);
    const right = this.height(root.right);

    if (left < right) {
      // console.log(`rotate left ${left} ${right}`);
      this.rotateLeft(root);
    } else {
      // console.log(`rotate right ${left} ${right}`);
      this.rotateRight(root);
    }
  }

  rotateLeft(root: Node | null): void {
    if (root === null) {
      return;
    }
    // console.log("left rotation", root);
    const newParent = root.right;
    if (newParent === null) {
      return;
    }
    newParent.parent = root.parent;
    if (root.parent === null) {
      this.root = newParent;
    } else {
      root.parent.right = newParent;
    }
    root.parent = newParent;
    root.right = newParent.left;
    newParent.left = root;
  }

  rotateRight(root: Node | null): void {
    if (root === null) {
      return;
    }
    console.log("right rotation", root);
    const newParent = root.left;
    if (newParent === null) {
      return;
    }
    newParent.parent = root.parent;
    if (root.parent === null) {
      this.root = newParent;
    } else {
      root.parent.left = newParent;
    }
    root.parent = newParent;
    root.left = newParent.right;
    newParent.right = root;
  }

  insert(number: number): void {
    if (this.root === null) {
      this.root = new Node(number, null);
      return;
    }
    this.insertNode(this.root, number);
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

    if (root.value === value) {
      return root;
    }
    if (value < root.value) {
      return this.find(root.left, value);
    }
    return this.find(root.right, value);
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

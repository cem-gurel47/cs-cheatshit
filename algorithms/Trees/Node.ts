export class Node {
  value: number;
  left: Node | null;
  right: Node | null;
  parent: Node | null;
  constructor(value: number, parent: Node | null) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = parent;
  }
}

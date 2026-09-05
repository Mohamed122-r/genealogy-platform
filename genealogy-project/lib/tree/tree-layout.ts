import { PersonNode, LayoutNode, TreeLayoutOptions } from "@/types/tree";

const HORIZONTAL_SPACING = 160;
const VERTICAL_SPACING = 200;
const LEAF_WIDTH = 100;
const LEAF_HEIGHT = 50;

export function calculateTreeLayout(nodes: PersonNode[], options: TreeLayoutOptions = {}): LayoutNode[] {
  const nodeMap = new Map<string, PersonNode>();
  nodes.forEach((node) => nodeMap.set(node.id, node));

  const roots = nodes.filter((node) => !node.fatherId);
  if (roots.length === 0) return [];

  const layoutNodes: LayoutNode[] = [];

  function layoutSubtree(person: PersonNode, depth: number, leftBoundary: number): number {
    const children = nodes.filter((n) => n.fatherId === person.id);
    const node: LayoutNode = {
      ...person,
      depth,
      x: 0,
      y: depth * VERTICAL_SPACING,
      width: LEAF_WIDTH,
      height: LEAF_HEIGHT,
    };

    if (children.length === 0) {
      node.x = leftBoundary + HORIZONTAL_SPACING / 2;
      layoutNodes.push(node);
      return node.x;
    } else {
      let currentLeft = leftBoundary;
      const childLayouts: number[] = [];

      children.forEach((child) => {
        const childX = layoutSubtree(child, depth + 1, currentLeft);
        childLayouts.push(childX);
        currentLeft = childX + HORIZONTAL_SPACING / 2;
      });

      const firstChildX = childLayouts[0];
      const lastChildX = childLayouts[childLayouts.length - 1];
      node.x = (firstChildX + lastChildX) / 2;

      layoutNodes.push(node);
      return node.x;
    }
  }

  roots.forEach((root) => layoutSubtree(root, 0, 0));

  const minX = Math.min(...layoutNodes.map((n) => n.x));
  const offsetX = (0 - minX);
  layoutNodes.forEach((node) => { node.x = node.x + offsetX; });

  const treeWidth = Math.max(...layoutNodes.map(n => n.x)) - Math.min(...layoutNodes.map(n => n.x)) + LEAF_WIDTH;
  const initialWidth = options.width || 1000;
  if (treeWidth < initialWidth) {
    const centerOffset = (initialWidth - treeWidth) / 2;
    layoutNodes.forEach((node) => { node.x += centerOffset; });
  }

  return layoutNodes;
}
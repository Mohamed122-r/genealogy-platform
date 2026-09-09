import { LayoutNode } from "@/types/tree";

interface TreeBranchProps {
  parent: LayoutNode;
  child: LayoutNode;
}

export function TreeBranch({ parent, child }: TreeBranchProps) {
  const startX = parent.x;
  const startY = parent.y + parent.height / 2;
  const endX = child.x;
  const endY = child.y - child.height / 2;

  const path = `M ${startX} ${startY} C ${startX} ${startY + 40}, ${endX} ${endY - 40}, ${endX} ${endY}`;

  return (
    <path d={path} fill="none" stroke="#8B5A2B" strokeWidth={2} strokeLinecap="round" opacity={0.8} />
  );
}

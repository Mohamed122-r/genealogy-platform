import { LayoutNode } from "@/types/tree";

interface TreeLeafProps {
  node: LayoutNode;
  isSelected: boolean;
  onClick: () => void;
}

function getStatusColor(status: string) {
  switch (status) {
    case "ALIVE": return "#228B22";
    case "DECEASED": return "#8B4513";
    case "DISCONNECTED": return "#696969";
    default: return "#D3D3D3";
  }
}

export function TreeLeaf({ node, isSelected, onClick }: TreeLeafProps) {
  const statusColor = getStatusColor(node.status);

  return (
    <g 
      transform={`translate(${node.x - node.width / 2}, ${node.y - node.height / 2})`}
      className="cursor-pointer transition-transform duration-200 hover:scale-105"
      onClick={(e) => { e.stopPropagation(); onClick(); }}
    >
      <path
        d={`M ${node.width / 2} 0 C ${node.width * 0.9} ${node.height * 0.2}, ${node.width} ${node.height * 0.5}, ${node.width / 2} ${node.height} C 0 ${node.height * 0.5}, ${node.width * 0.1} ${node.height * 0.2}, ${node.width / 2} 0 Z`}
        fill={statusColor}
        fillOpacity={isSelected ? 1 : 0.85}
        stroke={isSelected ? "#FFD700" : "#5D3A1A"}
        strokeWidth={isSelected ? 3 : 1.5}
        className="drop-shadow-md"
      />
      
      <path d={`M ${node.width / 2} ${node.height * 0.1} L ${node.width / 2} ${node.height * 0.9}`} stroke="#FFF" strokeWidth="1" opacity="0.6" />
      
      <text
        x={node.width / 2}
        y={node.height / 2 - 4}
        textAnchor="middle"
        fill="#FFF"
        fontSize="10"
        fontWeight="bold"
        className="select-none"
        style={{ fontFamily: 'Amiri, serif' }}
      >
        {node.fullName.length > 15 ? node.fullName.substring(0, 14) + "..." : node.fullName}
      </text>
      
      <text
        x={node.width / 2}
        y={node.height / 2 + 8}
        textAnchor="middle"
        fill="#FFF"
        fontSize="8"
        opacity="0.8"
      >
        {node.status === "ALIVE" ? "حي" : node.status === "DECEASED" ? "متوفى" : node.status === "DISCONNECTED" ? "منقطع" : "غير معروف"}
      </text>
    </g>
  );
}

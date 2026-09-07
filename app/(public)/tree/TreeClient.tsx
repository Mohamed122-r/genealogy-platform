"use client";

import { useRef } from "react";
import { TreeCanvas } from "@/components/tree/TreeCanvas";
import { TreeExporter } from "@/components/tree/TreeExporter";
import { PersonNode } from "@/types/tree";

interface TreeClientProps {
  nodes: PersonNode[];
}

export function TreeClient({ nodes }: TreeClientProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  return (
    <div className="h-screen w-full flex flex-col bg-heritage-bg relative">
      <header className="p-4 bg-deep-green text-white flex justify-between items-center z-20 print:hidden">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-gold-500 flex items-center justify-center text-2xl font-bold">
            ش
          </div>
          <h1 className="text-3xl font-heritage">شجرة النسب العائلية الكريمة</h1>
        </div>
        
        {/* أزرار التصدير */}
        <TreeExporter svgRef={svgRef} treeTitle="الشجرة-الكريمة" />
      </header>
      
      <main className="flex-1 p-4 print:p-0">
        <TreeCanvas 
          nodes={nodes}
          svgRef={svgRef}
          onSelectPerson={(id) => console.log("Selected:", id)}
          onExport={async () => {}}
        />
      </main>
    </div>
  );
}

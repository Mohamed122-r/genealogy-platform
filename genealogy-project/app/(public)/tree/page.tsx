"use client";

import { useRef } from "react";
import { db } from "@/lib/db";
import { TreeCanvas } from "@/components/tree/TreeCanvas";
import { TreeExporter } from "@/components/tree/TreeExporter";
import { PersonNode } from "@/types/tree";
import { useQuery } from "@tanstack/react-query";

// تجهيز البيانات من قاعدة البيانات في Server Component
async function getTreeData() {
  const people = await db.person.findMany({
    where: { deletedAt: null },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      fullName: true,
      gender: true,
      status: true,
      fatherId: true,
      branchId: true,
      birthDate: true,
      deathDate: true,
    },
    orderBy: { createdAt: 'asc' }
  });

  return people.map(p => ({
    ...p,
    birthDate: p.birthDate as Date | null,
    deathDate: p.deathDate as Date | null,
  })) as PersonNode[];
}

export default async function TreePage() {
  const nodes = await getTreeData();
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
      
      {/* تنسيق الطباعة المخصص */}
      <style jsx global>{`
        @media print {
          @page {
            size: landscape;
            margin: 0;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .print-header {
            display: none !important;
          }
          svg {
            width: 100% !important;
            height: 100% !important;
          }
        }
      `}</style>

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
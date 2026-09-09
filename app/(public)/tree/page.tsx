"use client";

import { useRef, useState, useEffect } from "react";
import { TreePine, Search, ZoomIn, ZoomOut, RotateCcw, Maximize2, Download, FileText, FileImage, FileType } from "lucide-react";
import { TreeExporter } from "@/components/tree/TreeExporter";
import { TreeCanvas } from "@/components/tree/TreeCanvas";
import { PersonNode } from "@/types/tree";

// بيانات تجريبية (قابلة للاستبدال بالبيانات الحقيقية من قاعدة البيانات)
const sampleNodes: PersonNode[] = [
  { id: "1", firstName: "عبدالله", lastName: "القحطاني", fullName: "عبدالله القحطاني", gender: "MALE", status: "DECEASED", fatherId: null, branchId: null, birthDate: null, deathDate: null },
  { id: "2", firstName: "محمد", lastName: "عبدالله القحطاني", fullName: "محمد عبدالله القحطاني", gender: "MALE", status: "DECEASED", fatherId: "1", branchId: null, birthDate: null, deathDate: null },
  { id: "3", firstName: "أحمد", lastName: "عبدالله القحطاني", fullName: "أحمد عبدالله القحطاني", gender: "MALE", status: "ALIVE", fatherId: "1", branchId: null, birthDate: null, deathDate: null },
  { id: "4", firstName: "خالد", lastName: "محمد القحطاني", fullName: "خالد محمد القحطاني", gender: "MALE", status: "ALIVE", fatherId: "2", branchId: null, birthDate: null, deathDate: null },
  { id: "5", firstName: "عمر", lastName: "أحمد القحطاني", fullName: "عمر أحمد القحطاني", gender: "MALE", status: "DECEASED", fatherId: "3", branchId: null, birthDate: null, deathDate: null },
];

export default function TreePage() {
  const [nodes, setNodes] = useState<PersonNode[]>(sampleNodes);
  const [searchTerm, setSearchTerm] = useState("");
  const [zoomLevel, setZoomLevel] = useState(1);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // يمكن استبدال هذا بجلب حقيقي من Prisma
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim()) {
      const found = sampleNodes.find(node => node.fullName.includes(term.trim()));
      if (found) {
        const element = document.getElementById(`person-${found.id}`);
        element?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const handleZoom = (direction: 'in' | 'out') => {
    setZoomLevel(prev => {
      const next = direction === 'in' ? prev * 1.2 : prev / 1.2;
      return Math.min(5, Math.max(0.5, next));
    });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF3]">
      {/* الهيدر المخصص للشجرة */}
      <div className="bg-[#0A1711] text-white py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#C9A227] flex items-center justify-center">
              <TreePine className="w-6 h-6 text-[#0A1711]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">شجرة النسب العائلية الكريمة</h1>
              <p className="text-xs text-[#C9A227]">استكشف، ابحث، وصدّر</p>
            </div>
          </div>
        </div>
      </div>

      {/* شريط الأدوات */}
      <div className="bg-[#0A1711] text-white py-2 border-t border-[#C9A227]/30">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
          {/* البحث */}
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 w-full md:w-1/3">
            <Search className="w-4 h-4 text-[#C9A227]" />
            <input
              type="text"
              placeholder="ابحث عن شخص..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="bg-transparent text-white outline-none w-full placeholder:text-gray-400"
            />
          </div>

          {/* أدوات التكبير */}
          <div className="flex items-center gap-2">
            <button onClick={() => handleZoom('in')} className="bg-white/10 p-2 rounded-lg hover:bg-white/20">
              <ZoomIn className="w-4 h-4 text-[#C9A227]" />
            </button>
            <button onClick={() => handleZoom('out')} className="bg-white/10 p-2 rounded-lg hover:bg-white/20">
              <ZoomOut className="w-4 h-4 text-[#C9A227]" />
            </button>
            <button onClick={() => setZoomLevel(1)} className="bg-white/10 p-2 rounded-lg hover:bg-white/20">
              <RotateCcw className="w-4 h-4 text-[#C9A227]" />
            </button>
            <button onClick={() => svgRef.current?.requestFullscreen()} className="bg-white/10 p-2 rounded-lg hover:bg-white/20">
              <Maximize2 className="w-4 h-4 text-[#C9A227]" />
            </button>
          </div>

          {/* أزرار التصدير */}
          <div className="flex items-center gap-2">
            <button className="bg-[#C9A227] text-[#0A1711] px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2">
              <Download className="w-4 h-4" />
              تصدير
            </button>
            <button className="bg-white/10 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#C9A227]" />
              PDF
            </button>
            <button className="bg-white/10 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
              <FileImage className="w-4 h-4 text-[#C9A227]" />
              PNG
            </button>
            <button className="bg-white/10 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
              <FileType className="w-4 h-4 text-[#C9A227]" />
              SVG
            </button>
          </div>
        </div>
      </div>

      {/* منطقة الشجرة */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl border border-[#C9A227]/30 shadow-2xl overflow-hidden">
          <TreeCanvas
            nodes={nodes}
            svgRef={svgRef}
            onSelectPerson={(id) => console.log("Selected:", id)}
            onExport={async () => {}}
          />
        </div>
      </div>
    </div>
  );
}

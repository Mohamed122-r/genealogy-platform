"use client";

import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { LayoutNode } from "@/types/tree";
import { calculateTreeLayout } from "@/lib/tree/tree-layout";
import { PersonNode } from "@/types/tree";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Maximize2, RotateCcw, Printer } from "lucide-react";
import { TreeLeaf } from "./TreeLeaf";
import { TreeBranch } from "./TreeBranch";

interface TreeCanvasProps {
  nodes: PersonNode[];
  selectedPersonId?: string;
  onSelectPerson: (id: string) => void;
  onExport: (format: 'svg' | 'pdf' | 'png') => void;
  svgRef: React.RefObject<SVGSVGElement>;
}

export function TreeCanvas({ nodes, selectedPersonId, onSelectPerson, onExport, svgRef }: TreeCanvasProps) {
  const [viewBox, setViewBox] = useState({ x: 0, y: 0, width: 1000, height: 800 });
  const [zoom, setZoom] = useState(1);
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });
  const [searchTerm, setSearchTerm] = useState("");
  
  // حساب مواقع العقد بناءً على البيانات القادمة من قاعدة البيانات
  const layoutNodes = useMemo(() => {
    return calculateTreeLayout(nodes, { width: 1000, height: 800 });
  }, [nodes]);

  // حساب أبعاد الشجرة الإجمالية للتمركز التلقائي
  const treeBounds = useMemo(() => {
    if (layoutNodes.length === 0) return { minX: 0, minY: 0, maxX: 1000, maxY: 800 };
    
    const minX = Math.min(...layoutNodes.map(n => n.x - n.width / 2));
    const maxX = Math.max(...layoutNodes.map(n => n.x + n.width / 2));
    const minY = Math.min(...layoutNodes.map(n => n.y - n.height / 2));
    const maxY = Math.max(...layoutNodes.map(n => n.y + n.height / 2));
    
    return { minX, minY, maxX, maxY };
  }, [layoutNodes]);

  // إعادة ضبط العرض عند أول تحميل
  useEffect(() => {
    const width = treeBounds.maxX - treeBounds.minX + 100;
    const height = treeBounds.maxY - treeBounds.minY + 100;
    setViewBox({ 
      x: treeBounds.minX - 50, 
      y: treeBounds.minY - 50, 
      width, 
      height 
    });
  }, [treeBounds]);

  // دالة التكبير والتصغير
  const handleZoom = (direction: 'in' | 'out') => {
    setZoom(prev => {
      const newZoom = direction === 'in' ? prev * 1.2 : prev / 1.2;
      return Math.min(5, Math.max(0.1, newZoom));
    });
    
    setViewBox(prev => ({
      ...prev,
      width: prev.width / (direction === 'in' ? 1.2 : 0.8),
      height: prev.height / (direction === 'in' ? 1.2 : 0.8),
    }));
  };

  // التفاعل مع الماوس للتحريك (Pan)
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsPanning(true);
    setStartPan({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    const dx = e.clientX - startPan.x;
    const dy = e.clientY - startPan.y;
    
    setViewBox(prev => ({
      ...prev,
      x: prev.x - dx * (prev.width / svgRef.current?.clientWidth!),
      y: prev.y - dy * (prev.height / svgRef.current?.clientHeight!),
    }));
    setStartPan({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setIsPanning(false);

  // دعم اللمس على الجوال
  const touchStartRef = useRef({ x: 0, y: 0, dist: 0 });

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsPanning(true);
      setStartPan({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchStartRef.current = { x: 0, y: 0, dist };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isPanning) {
      handleMouseMove(e.touches[0] as any);
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      if (touchStartRef.current.dist > 0) {
        const scale = dist / touchStartRef.current.dist;
        handleZoom(scale > 1 ? 'in' : 'out');
      }
      touchStartRef.current.dist = dist;
    }
  };

  // البحث عن الشخص في الشجرة
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (!term.trim()) return;

    const found = layoutNodes.find(node => node.fullName.includes(term.trim()));
    if (found) {
      setViewBox(prev => ({
        ...prev,
        x: found.x - prev.width / 2,
        y: found.y - prev.height / 2,
      }));
      onSelectPerson(found.id);
    }
  };

  // رسم الفروع (الخطوط)
  const renderBranches = () => {
    return layoutNodes.map((node) => {
      const children = layoutNodes.filter(child => child.fatherId === node.id);
      return children.map(child => (
        <TreeBranch key={`${node.id}-${child.id}`} parent={node} child={child} />
      ));
    });
  };

  // رسم الأشخاص (الأوراق)
  const renderLeaves = () => {
    return layoutNodes.map((node) => (
      <TreeLeaf 
        key={node.id} 
        node={node} 
        isSelected={selectedPersonId === node.id}
        onClick={() => onSelectPerson(node.id)}
      />
    ));
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#FDFBF3] rounded-lg border-4 border-gold-500/40 overflow-hidden relative shadow-xl">
      {/* شريط الأدوات - مخفي في الطباعة */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 bg-deep-green/90 p-2 rounded-lg shadow-lg print:hidden">
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={() => handleZoom('in')} title="تكبير">
          <ZoomIn className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={() => handleZoom('out')} title="تصغير">
          <ZoomOut className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={() => { setZoom(1); setViewBox({ x: treeBounds.minX - 50, y: treeBounds.minY - 50, width: treeBounds.maxX - treeBounds.minX + 100, height: treeBounds.maxY - treeBounds.minY + 100 }); }} title="إعادة ضبط">
          <RotateCcw className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={() => { if (svgRef.current?.requestFullscreen) svgRef.current.requestFullscreen(); }} title="ملء الشاشة">
          <Maximize2 className="w-5 h-5" />
        </Button>
      </div>

      {/* شريط البحث - مخفي في الطباعة */}
      <div className="absolute top-4 left-4 z-10 w-64 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-2 print:hidden">
        <Input 
          placeholder="ابحث عن شخص..." 
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="border-gold-500/50 focus-visible:ring-gold-500"
        />
      </div>

      {/* لوحة الرسم SVG */}
      <div className="flex-1 overflow-hidden cursor-grab active:cursor-grabbing" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
        <svg 
          ref={svgRef} 
          viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
          className="w-full h-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
        >
          {/* الخلفية والإطار التراثي */}
          <defs>
            <pattern id="heritagePattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 20 40 M 0 20 L 40 20" stroke="#e5e0d0" strokeWidth="0.5" fill="none" opacity="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heritagePattern)" />

          {/* الجذع التراثي: نرسم جذعاً كبيراً من الأسفل يتصل بجميع الفروع */}
          <path 
            d={`M ${treeBounds.maxX / 2} ${treeBounds.maxY + 50} C ${treeBounds.maxX / 2} ${treeBounds.maxY - 100}, ${treeBounds.minX} ${treeBounds.maxY - 200}, ${treeBounds.minX} ${treeBounds.minY - 50}`}
            stroke="#5D3A1A"
            strokeWidth="15"
            fill="none"
            strokeLinecap="round"
            opacity="0.9"
          />
          
          {/* رسم الفروع */}
          {renderBranches()}
          
          {/* رسم الأوراق (الأشخاص) */}
          {renderLeaves()}
        </svg>
      </div>
    </div>
  );
}
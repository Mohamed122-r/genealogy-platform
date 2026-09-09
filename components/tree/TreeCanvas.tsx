"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { PersonNode, LayoutNode } from "@/types/tree";
import { calculateTreeLayout } from "@/lib/tree/tree-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, Search } from "lucide-react";
import { TreeLeaf } from "./TreeLeaf";
import { TreeBranch } from "./TreeBranch";
import { STATUS_COLORS } from "@/types/tree";

interface TreeCanvasProps {
  nodes: PersonNode[];
  selectedPersonId?: string;
  onSelectPerson: (id: string) => void;
  svgRef: React.RefObject<SVGSVGElement>;
  onExport: (format: 'svg' | 'pdf' | 'png') => void;
}

export function TreeCanvas({ nodes, selectedPersonId, onSelectPerson, svgRef, onExport }: TreeCanvasProps) {
  const [viewBox, setViewBox] = useState({ x: 0, y: 0, width: 1000, height: 800 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });
  const [searchTerm, setSearchTerm] = useState("");
  const [zoomLevel, setZoomLevel] = useState(1);
  
  // حساب مواقع العقد
  const layoutNodes = useMemo(() => {
    return calculateTreeLayout(nodes, { width: 1000, height: 800 });
  }, [nodes]);

  // أبعاد الشجرة الكلية
  const treeBounds = useMemo(() => {
    if (layoutNodes.length === 0) return { minX: 0, minY: 0, maxX: 1000, maxY: 800 };
    
    const minX = Math.min(...layoutNodes.map(n => n.x - n.width / 2));
    const maxX = Math.max(...layoutNodes.map(n => n.x + n.width / 2));
    const minY = Math.min(...layoutNodes.map(n => n.y - n.height / 2));
    const maxY = Math.max(...layoutNodes.map(n => n.y + n.height / 2));
    
    return { minX, minY, maxX, maxY };
  }, [layoutNodes]);

  useEffect(() => {
    setViewBox({ x: treeBounds.minX - 50, y: treeBounds.minY - 50, width: treeBounds.maxX - treeBounds.minX + 100, height: treeBounds.maxY - treeBounds.minY + 100 });
  }, [treeBounds]);

  const handleZoom = (direction: 'in' | 'out') => {
    setZoomLevel(prev => {
      const next = direction === 'in' ? prev * 1.2 : prev / 1.2;
      return Math.min(5, Math.max(0.5, next));
    });
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim()) {
      const found = layoutNodes.find(node => node.fullName.includes(term.trim()));
      if (found) {
        setViewBox(prev => ({ ...prev, x: found.x - prev.width / 2, y: found.y - prev.height / 2 }));
        onSelectPerson(found.id);
      }
    }
  };

  // دعم التحريك
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

  // رسم الفروع
  const renderBranches = () => {
    return layoutNodes.map((node) => {
      const children = layoutNodes.filter(child => child.fatherId === node.id);
      return children.map(child => (
        <TreeBranch key={`${node.id}-${child.id}`} parent={node} child={child} />
      ));
    });
  };

  // رسم الأوراق (الأشخاص)
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
    <div className="w-full h-[600px] md:h-[800px] flex flex-col bg-[#FDFBF3] overflow-hidden relative">
      {/* إطار ذهبي */}
      <div className="absolute inset-0 border-4 border-[#C9A227]/20 pointer-events-none z-10 rounded-lg m-2"></div>

      {/* شريط الأدوات - مدمج في الأعلى */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 bg-[#0A1711]/90 p-2 rounded-xl shadow-xl">
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={() => handleZoom('in')}>
          <ZoomIn className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={() => handleZoom('out')}>
          <ZoomOut className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={() => setViewBox({ x: treeBounds.minX - 50, y: treeBounds.minY - 50, width: treeBounds.maxX - treeBounds.minX + 100, height: treeBounds.maxY - treeBounds.minY + 100 })}>
          <RotateCcw className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={() => svgRef.current?.requestFullscreen()}>
          <Maximize2 className="w-5 h-5" />
        </Button>
      </div>

      {/* البحث */}
      <div className="absolute top-4 left-4 z-20 w-64 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-2">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-[#C9A227]" />
          <input
            type="text"
            placeholder="ابحث عن شخص..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>
      </div>

      {/* لوحة الرسم SVG */}
      <div className="flex-1 overflow-hidden cursor-grab active:cursor-grabbing" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
        <div style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center" }}>
          <svg 
            ref={svgRef} 
            viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
            className="w-full h-full"
          >
            {/* الخلفية */}
            <defs>
              <pattern id="heritagePattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 20 40 M 0 20 L 40 20" stroke="#e5e0d0" strokeWidth="0.5" fill="none" opacity="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#heritagePattern)" />

            {/* الجذع */}
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
            
            {/* رسم الأوراق */}
            {renderLeaves()}
          </svg>
        </div>
      </div>
    </div>
  );
}

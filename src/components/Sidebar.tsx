import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Box, Layers, Zap, Database, Settings } from 'lucide-react';
import { AppMode } from '../types';

export default function Sidebar({ mode }: { mode: AppMode }) {
  return (
    <div className="w-64 bg-zinc-900 flex flex-col border-r border-zinc-800">
      <div className="px-4 py-2 bg-zinc-950 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
        操作树 (Operation Tree)
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        <TreeItem label="模型 (Model)" icon={Box} defaultOpen>
          <TreeItem label="几何体 (Geometry)" icon={Layers} defaultOpen>
            <TreeItem label="Base_Plate" />
            <TreeItem label="Support_Arm" />
            <TreeItem label="Mounting_Bracket" />
          </TreeItem>
          <TreeItem label="材料 (Materials)" icon={Database}>
            <TreeItem label="Structural Steel" />
            <TreeItem label="Aluminum Alloy" />
          </TreeItem>
        </TreeItem>
        
        {(mode === 'instant' || mode === 'detailed') && (
          <TreeItem label="仿真设定 (Simulation Setup)" icon={Zap} defaultOpen>
            <TreeItem label="坐标系 (Coordinate Systems)" />
            <TreeItem label="连接 (Connections)">
              <TreeItem label="接触 (Contacts)" />
              <TreeItem label="绑定 (Bonded)" />
            </TreeItem>
            <TreeItem label="网格 (Mesh)" />
            <TreeItem label="静力学分析 (Static Structural)" defaultOpen>
              <TreeItem label="分析设置 (Analysis Settings)" />
              <TreeItem label="固定支撑 (Fixed Support)" />
              <TreeItem label="力 (Force) - 500N" />
              <TreeItem label="求解 (Solution)" defaultOpen>
                <TreeItem label="总变形 (Total Deformation)" />
                <TreeItem label="等效应力 (Equivalent Stress)" />
              </TreeItem>
            </TreeItem>
          </TreeItem>
        )}

        {mode === 'auto' && (
          <TreeItem label="自动化场景 (Auto Scenarios)" icon={Settings} defaultOpen>
            <TreeItem label="AB板刚强度分析" />
            <TreeItem label="撑头排布优化分析" />
            <TreeItem label="脱模力计算" />
          </TreeItem>
        )}
      </div>
    </div>
  );
}

function TreeItem({ label, icon: Icon, children, defaultOpen = false }: { label: string, icon?: any, children?: React.ReactNode, defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const hasChildren = React.Children.count(children) > 0;

  return (
    <div className="select-none">
      <div 
        className="flex items-center px-2 py-1 hover:bg-zinc-800 rounded cursor-pointer text-sm text-zinc-300"
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        <div className="w-4 h-4 mr-1 flex items-center justify-center">
          {hasChildren && (
            isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />
          )}
        </div>
        {Icon && <Icon size={14} className="mr-2 text-zinc-500" />}
        <span className="truncate">{label}</span>
      </div>
      {hasChildren && isOpen && (
        <div className="ml-4 border-l border-zinc-700 pl-1">
          {children}
        </div>
      )}
    </div>
  );
}

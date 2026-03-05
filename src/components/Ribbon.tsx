import React from 'react';
import { AppMode } from '../types';
import { 
  Box, Zap, Cpu, Settings, Play, Save, FolderOpen, 
  MousePointer2, Move, RotateCcw, ZoomIn, Grid, FileText,
  HelpCircle
} from 'lucide-react';
import clsx from 'clsx';

interface RibbonProps {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
}

export default function Ribbon({ mode, setMode }: RibbonProps) {
  const modes: { id: AppMode; label: string; icon: React.ElementType }[] = [
    { id: 'model', label: '模型处理', icon: Box },
    { id: 'instant', label: '即时仿真', icon: Zap },
    { id: 'detailed', label: '精细仿真', icon: Cpu },
    { id: 'auto', label: '自动化仿真', icon: Settings },
  ];

  return (
    <div className="flex flex-col bg-zinc-950 border-b border-zinc-800">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-950">
        <div className="flex items-center space-x-4">
          <div className="text-emerald-500 font-bold text-lg tracking-wider">INTESIM</div>
          <div className="text-zinc-400 text-sm">高易用结构仿真软件</div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-zinc-900 px-2 py-1 rounded border border-zinc-800">
            <span className="text-xs text-zinc-500">当前方案:</span>
            <select className="bg-transparent text-xs text-zinc-300 outline-none cursor-pointer">
              <option>方案 1 (Base)</option>
              <option>方案 2 (Optimized)</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-1.5 hover:bg-zinc-800 rounded text-zinc-400" title="打开模型"><FolderOpen size={16} /></button>
            <button className="p-1.5 hover:bg-zinc-800 rounded text-zinc-400" title="保存方案"><Save size={16} /></button>
            <div className="w-px h-4 bg-zinc-700 mx-2"></div>
            <button className="p-1.5 hover:bg-zinc-800 rounded text-zinc-400" title="帮助文档 (F1)"><HelpCircle size={16} /></button>
            <button className="p-1.5 hover:bg-zinc-800 rounded text-zinc-400" title="设置"><Settings size={16} /></button>
          </div>
        </div>
      </div>

      {/* Module Switcher */}
      <div className="flex px-2 space-x-1 bg-zinc-900 pt-2">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={clsx(
              "flex items-center px-4 py-2 rounded-t-lg text-sm font-medium transition-colors",
              mode === m.id 
                ? "bg-zinc-800 text-emerald-400 border-t-2 border-emerald-500" 
                : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200 border-t-2 border-transparent"
            )}
          >
            <m.icon size={16} className="mr-2" />
            {m.label}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center px-4 py-2 bg-zinc-800 space-x-6 text-xs border-t border-zinc-700">
        <div className="flex items-center space-x-2">
          <ToolButton icon={MousePointer2} label="选择" active />
          <ToolButton icon={Move} label="平移" />
          <ToolButton icon={RotateCcw} label="旋转" />
          <ToolButton icon={ZoomIn} label="缩放" />
        </div>
        <div className="w-px h-6 bg-zinc-700"></div>
        {mode === 'model' && (
          <div className="flex items-center space-x-2">
            <ToolButton icon={Box} label="几何清理" />
            <ToolButton icon={Grid} label="网格划分" />
          </div>
        )}
        {mode === 'instant' && (
          <div className="flex items-center space-x-2">
            <ToolButton icon={Grid} label="背景网格" />
            <ToolButton icon={Zap} label="载荷/边界" />
            <ToolButton icon={Play} label="一键求解" primary />
          </div>
        )}
        {mode === 'detailed' && (
          <div className="flex items-center space-x-2">
            <ToolButton icon={Grid} label="精细网格" />
            <ToolButton icon={Cpu} label="求解器配置" />
            <ToolButton icon={Play} label="提交计算" primary />
          </div>
        )}
        {mode === 'auto' && (
          <div className="flex items-center space-x-2">
            <ToolButton icon={FileText} label="BOM导入" />
            <ToolButton icon={Settings} label="场景匹配" />
            <ToolButton icon={Play} label="自动执行" primary />
          </div>
        )}
      </div>
    </div>
  );
}

function ToolButton({ icon: Icon, label, active, primary }: { icon: any, label: string, active?: boolean, primary?: boolean }) {
  return (
    <button className={clsx(
      "flex flex-col items-center justify-center p-1.5 rounded min-w-[56px] transition-colors group",
      primary ? "text-emerald-400 hover:bg-emerald-400/10" :
      active ? "bg-zinc-700 text-zinc-100" : "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
    )} title={label}>
      <Icon size={18} className="mb-1 group-hover:scale-110 transition-transform" />
      <span className="truncate w-full text-center">{label}</span>
    </button>
  );
}

import React from 'react';
import { X, PlayCircle, BookOpen, Zap } from 'lucide-react';

export default function WelcomeModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl w-[800px] max-w-[90vw] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-950">
          <h2 className="text-lg font-bold text-emerald-400 flex items-center">
            <Zap className="mr-2" size={20} />
            欢迎使用 INTESIM 即时仿真
          </h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 flex gap-6 overflow-y-auto max-h-[70vh]">
          <div className="flex-1 space-y-4">
            <h3 className="text-xl font-semibold text-white">快速上手指南</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              INTESIM 提供面向CAD设计师的专用即时仿真界面，无需繁琐的网格划分，支持边设计边仿真。
            </p>
            
            <div className="space-y-2 mt-4">
              <GuideItem icon={PlayCircle} title="观看宣传视频" desc="了解即时仿真的核心优势与操作流程" />
              <GuideItem icon={BookOpen} title="帮助文档" desc="查看详细的功能说明与快捷键 (F1)" />
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-zinc-300 mb-3 uppercase tracking-wider">亮点案例展示</h3>
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="aspect-video bg-zinc-800 rounded border border-zinc-700 flex items-center justify-center group cursor-pointer hover:border-emerald-500 transition-colors">
                  <span className="text-zinc-500 text-xs group-hover:text-emerald-400">案例 {i}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded transition-colors"
          >
            开始使用
          </button>
        </div>
      </div>
    </div>
  );
}

function GuideItem({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="flex items-start p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 hover:bg-zinc-800 hover:border-zinc-600 cursor-pointer transition-all">
      <div className="p-2 bg-zinc-900 rounded text-emerald-400 mr-3">
        <Icon size={20} />
      </div>
      <div>
        <div className="text-sm font-medium text-zinc-200">{title}</div>
        <div className="text-xs text-zinc-500 mt-0.5">{desc}</div>
      </div>
    </div>
  );
}

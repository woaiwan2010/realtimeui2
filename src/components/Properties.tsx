import React from 'react';
import { AppMode } from '../types';

export default function Properties({ mode }: { mode: AppMode }) {
  return (
    <div className="w-72 bg-zinc-900 border-l border-zinc-800 flex flex-col">
      <div className="px-4 py-2 bg-zinc-950 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
        详细属性 (Properties)
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        
        {/* Example Property Group */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-zinc-200 border-b border-zinc-700 pb-1">基本信息</h3>
          <PropertyRow label="名称" value="Bracket_Assy_v2" />
          <PropertyRow label="类型" value="实体装配模型" />
          <PropertyRow label="体积" value="1.24e5 mm³" />
          <PropertyRow label="质量" value="0.98 kg" />
          <PropertyRow label="材料" value="Structural Steel" editable />
        </div>

        {mode === 'instant' && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-zinc-200 border-b border-zinc-700 pb-1">背景网格设置</h3>
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">全局尺寸</span>
              <select className="bg-zinc-800 border border-zinc-700 text-zinc-200 rounded px-2 py-1 outline-none focus:border-emerald-500">
                <option>标准 (Standard)</option>
                <option>精细 (Fine)</option>
                <option>极细 (Extra Fine)</option>
              </select>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">网格可视化</span>
              <input type="checkbox" className="accent-emerald-500 w-4 h-4" defaultChecked />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">透明度</span>
              <input type="range" min="0" max="100" defaultValue="50" className="w-24 accent-emerald-500" />
            </div>
          </div>
        )}

        {mode === 'auto' && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-zinc-200 border-b border-zinc-700 pb-1">BOM 映射</h3>
            <PropertyRow label="材料字段" value="Material" editable />
            <PropertyRow label="零件号" value="PartID" editable />
            <button className="w-full py-1.5 mt-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm rounded border border-zinc-700 transition-colors">
              AI 自动识别
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

function PropertyRow({ label, value, editable }: { label: string, value: string, editable?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-zinc-400">{label}</span>
      {editable ? (
        <input 
          type="text" 
          defaultValue={value} 
          className="bg-zinc-800 border border-zinc-700 text-zinc-200 rounded px-2 py-0.5 w-32 text-right outline-none focus:border-emerald-500"
        />
      ) : (
        <span className="text-zinc-200 font-mono">{value}</span>
      )}
    </div>
  );
}

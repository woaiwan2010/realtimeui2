import React from 'react';
import { AppMode } from '../types';

export default function Viewport({ mode }: { mode: AppMode }) {
  return (
    <div className="flex-1 relative bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden">
      {/* 3D Viewport Placeholder */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-zinc-700 text-2xl font-bold opacity-50 select-none">
          3D 模型视图区
        </div>
        
        {/* Mock 3D Object */}
        <div className="absolute w-64 h-64 border-2 border-emerald-500/30 rounded-lg transform rotate-45 skew-x-12 skew-y-12 flex items-center justify-center bg-emerald-500/5 backdrop-blur-sm">
          <div className="w-32 h-32 border border-emerald-400/50 rounded-full"></div>
        </div>
      </div>

      {/* View Cube */}
      <div className="absolute top-8 right-8 w-24 h-24 perspective-1000">
        <div className="w-full h-full relative transform-style-3d rotate-x-[-20deg] rotate-y-[45deg] transition-transform duration-500 hover:rotate-x-[-10deg] hover:rotate-y-[25deg] cursor-pointer">
          <CubeFace position="front" label="前" />
          <CubeFace position="back" label="后" />
          <CubeFace position="right" label="右" />
          <CubeFace position="left" label="左" />
          <CubeFace position="top" label="上" />
          <CubeFace position="bottom" label="下" />
        </div>
      </div>

      {/* Overlay Info */}
      <div className="absolute top-4 left-4 text-xs text-zinc-400 font-mono space-y-1">
        <div>单位制: Metric (mm, kg, N, s)</div>
        {mode === 'instant' && <div>背景网格: 标准 (Standard)</div>}
        {mode === 'auto' && <div>当前场景: AB板刚强度分析</div>}
      </div>
    </div>
  );
}

function CubeFace({ position, label }: { position: string, label: string }) {
  const transforms: Record<string, string> = {
    front: 'translateZ(48px)',
    back: 'rotateY(180deg) translateZ(48px)',
    right: 'rotateY(90deg) translateZ(48px)',
    left: 'rotateY(-90deg) translateZ(48px)',
    top: 'rotateX(90deg) translateZ(48px)',
    bottom: 'rotateX(-90deg) translateZ(48px)',
  };

  return (
    <div 
      className="absolute w-24 h-24 border border-zinc-600 bg-zinc-800/80 flex items-center justify-center text-zinc-300 text-sm font-bold hover:bg-emerald-600/80 hover:text-white transition-colors"
      style={{ transform: transforms[position] }}
    >
      {label}
    </div>
  );
}

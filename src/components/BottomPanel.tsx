import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { time: '0.0', displacement: 0, stress: 0 },
  { time: '0.2', displacement: 0.5, stress: 30 },
  { time: '0.4', displacement: 1.2, stress: 75 },
  { time: '0.6', displacement: 1.8, stress: 110 },
  { time: '0.8', displacement: 2.2, stress: 135 },
  { time: '1.0', displacement: 2.45, stress: 145.2 },
];

export default function BottomPanel() {
  const [activeTab, setActiveTab] = useState('log');

  return (
    <div className="h-48 bg-zinc-950 border-t border-zinc-800 flex flex-col">
      <div className="flex px-2 bg-zinc-900 border-b border-zinc-800">
        <Tab label="求解日志" active={activeTab === 'log'} onClick={() => setActiveTab('log')} />
        <Tab label="进度" active={activeTab === 'progress'} onClick={() => setActiveTab('progress')} />
        <Tab label="结果数据" active={activeTab === 'data'} onClick={() => setActiveTab('data')} />
        <Tab label="探针曲线" active={activeTab === 'chart'} onClick={() => setActiveTab('chart')} />
      </div>
      <div className="flex-1 p-2 overflow-y-auto font-mono text-xs text-zinc-400">
        {activeTab === 'log' && (
          <div className="space-y-1">
            <div className="text-emerald-400">[INFO] INTESIM Solver Started...</div>
            <div>[INFO] Generating background grid (Octree adaptive)...</div>
            <div>[INFO] Grid generation complete in 0.8s. Fill rate: 98.5%</div>
            <div>[INFO] Applying Dirichlet boundaries (Penalty method)...</div>
            <div>[INFO] Applying Neumann boundaries (Surface mapping integration)...</div>
            <div>[INFO] Solving linear system...</div>
            <div className="text-emerald-400">[INFO] Solution converged. Error: 1.2%</div>
          </div>
        )}
        {activeTab === 'progress' && (
          <div className="p-4 space-y-4">
            <div className="flex justify-between text-sm">
              <span>总体进度</span>
              <span>100%</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-2">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
        )}
        {activeTab === 'data' && (
          <div className="grid grid-cols-4 gap-4 p-2">
            <div className="bg-zinc-900 p-3 rounded border border-zinc-800">
              <div className="text-zinc-500 mb-1">最大位移</div>
              <div className="text-xl text-zinc-200">2.45 mm</div>
            </div>
            <div className="bg-zinc-900 p-3 rounded border border-zinc-800">
              <div className="text-zinc-500 mb-1">最大等效应力</div>
              <div className="text-xl text-zinc-200">145.2 MPa</div>
            </div>
            <div className="bg-zinc-900 p-3 rounded border border-zinc-800">
              <div className="text-zinc-500 mb-1">最大应变</div>
              <div className="text-xl text-zinc-200">0.0012</div>
            </div>
          </div>
        )}
        {activeTab === 'chart' && (
          <div className="h-full w-full p-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                <XAxis dataKey="time" stroke="#a1a1aa" fontSize={10} />
                <YAxis yAxisId="left" stroke="#10b981" fontSize={10} />
                <YAxis yAxisId="right" orientation="right" stroke="#6366f1" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46' }} />
                <Line yAxisId="left" type="monotone" dataKey="displacement" stroke="#10b981" strokeWidth={2} name="位移 (mm)" dot={false} />
                <Line yAxisId="right" type="monotone" dataKey="stress" stroke="#6366f1" strokeWidth={2} name="应力 (MPa)" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

function Tab({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 text-xs font-medium border-t-2 ${
        active 
          ? 'border-emerald-500 text-zinc-200 bg-zinc-950' 
          : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800'
      }`}
    >
      {label}
    </button>
  );
}

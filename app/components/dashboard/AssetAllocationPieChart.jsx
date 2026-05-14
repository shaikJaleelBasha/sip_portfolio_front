"use client";

import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function AssetAllocationPieChart({ holdings }) {
  // Map holdings to pie chart data
  const data = holdings.filter(h => h.currentValue > 0).map(h => ({
    name: h.fundName,
    value: Number(h.currentValue)
  }));

  const COLORS = ['#6366f1', '#ec4899', '#14b8a6', '#f59e0b', '#8b5cf6'];

  if (data.length === 0) {
    data.push({ name: 'No Assets', value: 1 });
  }

  return (
    <div className="glass-card rounded-3xl shadow-sm border border-gray-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 p-6 h-96 flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-slate-100">Asset Allocation</h3>
        <p className="text-sm text-gray-500 dark:text-slate-400">Distribution of your invested capital.</p>
      </div>
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={data.length === 1 && entry.name === 'No Assets' ? '#334155' : COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => `₹${value.toLocaleString()}`}
              contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#f8fafc', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#cbd5e1' }}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

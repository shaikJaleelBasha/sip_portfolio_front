"use client";

import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function PortfolioPerformanceChart({ transactions }) {
  // Generate cumulative data
  let currentVal = 0;
  const data = transactions.slice().reverse().map(t => {
    currentVal += Number(t.amount || 0);
    return {
      date: new Date(t.installmentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: currentVal
    };
  });

  // Ensure there's at least some data to plot
  if (data.length === 0) {
    data.push({ date: 'Today', value: 0 });
  }

  return (
    <div className="glass-card rounded-3xl shadow-sm border border-gray-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 p-6 h-96 flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-slate-100">Portfolio Performance</h3>
        <p className="text-sm text-gray-500 dark:text-slate-400">Your net worth growth over time.</p>
      </div>
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(value) => `₹${value}`} dx={-10} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#f8fafc', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)' }}
              itemStyle={{ color: '#c4b5fd' }}
            />
            <Area type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

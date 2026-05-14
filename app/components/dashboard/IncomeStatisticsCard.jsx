"use client";
import React from "react";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";

export default function IncomeStatisticsCard({ transactions }) {
  const incomeData = transactions?.length > 0 
    ? transactions.slice(0, 5).map((t, idx) => ({
        name: t.fundName ? t.fundName.substring(0, 5) : `T${idx}`,
        value: Number(t.amount) || 0,
      }))
    : [
        { name: "M1", value: 4000 },
        { name: "M2", value: 6000 },
        { name: "M3", value: 5000 },
        { name: "M4", value: 8000 },
        { name: "M5", value: 7500 },
      ];

  return (
    <div className="glass-card rounded-3xl p-6 shadow-sm border border-gray-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 transition-colors duration-300">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-slate-100">Income Statistics</h3>
        <span className="px-2.5 py-1 bg-gradient-to-r from-emerald-400 to-teal-500 text-white text-xs font-bold rounded-lg shadow-sm">+8%</span>
      </div>
      {/* Chart Area */}
      <div className="flex items-end gap-3 h-28 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={incomeData}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Tooltip 
              cursor={{stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1}} 
              contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(15, 23, 42, 0.8)', color: '#fff', backdropFilter: 'blur(8px)' }} 
              itemStyle={{ color: '#fff' }}
            />
            <Area type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

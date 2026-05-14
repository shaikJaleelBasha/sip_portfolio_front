"use client";
import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

export default function NetWorthCard({ netWorth }) {
  const netWorthData = [
    { name: "W1", value: netWorth * 0.8 || 80000 },
    { name: "W2", value: netWorth * 0.85 || 85000 },
    { name: "W3", value: netWorth * 0.9 || 90000 },
    { name: "W4", value: netWorth * 0.95 || 95000 },
    { name: "W5", value: netWorth || 100000 },
  ];

  return (
    <div className="glass-card rounded-3xl p-6 shadow-sm border border-gray-200 dark:border-slate-800 bg-gradient-to-br from-white/60 to-gray-50/40 dark:from-slate-800/60 dark:to-slate-900/60 transition-colors duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gradient-to-r from-teal-400 to-emerald-500 p-2.5 rounded-xl shadow-md shadow-teal-500/30">
          <div className="w-3 h-3 bg-white rounded-full"></div>
        </div>
        <h3 className="text-lg font-bold text-gray-800 dark:text-slate-100">Net Worth</h3>
      </div>
      
      {/* Chart Area */}
      <div className="h-20 w-full mb-4 flex items-end">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={netWorthData}>
            <defs>
              <linearGradient id="colorNetWorth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="value" stroke="#14b8a6" strokeWidth={3} fillOpacity={1} fill="url(#colorNetWorth)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-slate-400">
            ₹{Number(netWorth).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
          </p>
          <p className="text-xs text-emerald-500 font-bold mt-1 tracking-wide">+11% last week</p>
        </div>
        <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3.5 rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all">
          <FiArrowRight />
        </button>
      </div>
    </div>
  );
}

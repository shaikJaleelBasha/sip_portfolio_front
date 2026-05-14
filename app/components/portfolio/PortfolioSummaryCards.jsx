import React from "react";
import { FiTrendingUp, FiCheckCircle, FiRefreshCw, FiCreditCard } from "react-icons/fi";

export default function PortfolioSummaryCards({ netWorth, totalActiveSIPs, totalSIPAmount }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 shadow-xl shadow-indigo-500/20 text-white relative overflow-hidden transition-transform hover:-translate-y-1 duration-300">
        <div className="absolute top-0 right-0 p-4 opacity-30">
          <FiTrendingUp className="text-6xl" />
        </div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <p className="text-indigo-100 text-sm font-bold mb-1 tracking-wide">Total Net Assets</p>
        <h2 className="text-4xl font-extrabold mb-4">
          ₹{Number(netWorth).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
        </h2>
        <div className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-lg text-xs font-bold backdrop-blur-sm shadow-sm">
          <FiCheckCircle /> Updated just now
        </div>
      </div>

      <div className="glass-card rounded-3xl p-6 shadow-sm border border-gray-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 flex flex-col justify-center transition-transform hover:-translate-y-1 duration-300">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-gradient-to-r from-teal-400 to-emerald-500 p-2.5 rounded-xl text-white shadow-md shadow-teal-500/20">
            <FiRefreshCw className="text-xl" />
          </div>
          <p className="text-gray-500 dark:text-slate-400 font-bold tracking-wide">Active SIPs</p>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-800 dark:text-slate-100 ml-[52px]">{totalActiveSIPs}</h2>
      </div>

      <div className="glass-card rounded-3xl p-6 shadow-sm border border-gray-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 flex flex-col justify-center transition-transform hover:-translate-y-1 duration-300">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-gradient-to-r from-orange-400 to-amber-500 p-2.5 rounded-xl text-white shadow-md shadow-orange-500/20">
            <FiCreditCard className="text-xl" />
          </div>
          <p className="text-gray-500 dark:text-slate-400 font-bold tracking-wide">Monthly Investment</p>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-800 dark:text-slate-100 ml-[52px]">
          ₹{Number(totalSIPAmount).toLocaleString("en-IN")}
        </h2>
      </div>
    </div>
  );
}

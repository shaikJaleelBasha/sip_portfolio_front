"use client";

import React from "react";
import { FiSearch } from "react-icons/fi";

function Transactions({ transactions = [] }) {

  return (
    <div className="glass-card rounded-3xl shadow-sm border border-gray-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 overflow-hidden transition-colors duration-300">
      <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-slate-100">Transactions</h2>

        <div className="relative w-full md:w-auto">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full md:w-64 pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800/50 border border-transparent rounded-xl text-sm focus:border-indigo-300 dark:focus:border-indigo-500 outline-none text-gray-700 dark:text-slate-200 transition-colors"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 dark:bg-slate-800/30 text-gray-500 dark:text-slate-400 text-sm font-semibold border-b border-gray-100 dark:border-slate-800">
            <tr>
              <th className="p-6 w-12 text-center">
                <input type="checkbox" className="rounded text-indigo-500 bg-transparent border-gray-300 dark:border-slate-600 focus:ring-indigo-500" />
              </th>
              <th className="p-6">Fund/Receiver</th>
              <th className="p-6">Type</th>
              <th className="p-6">Status</th>
              <th className="p-6">Date</th>
              <th className="p-6">Amount</th>
              <th className="p-6 w-24"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50 dark:divide-slate-800/50">
            {transactions.length > 0 ? (
              transactions.map((tx, idx) => (
                <tr key={idx} className="hover:bg-gray-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-6 text-center">
                    <input type="checkbox" className="rounded text-indigo-500 bg-transparent border-gray-300 dark:border-slate-600 focus:ring-indigo-500" />
                  </td>

                  <td className="p-6 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shadow-sm" style={{ backgroundColor: idx % 3 === 0 ? '#e0e7ff' : idx % 3 === 1 ? '#fce7f3' : '#ffedd5', color: idx % 3 === 0 ? '#4f46e5' : idx % 3 === 1 ? '#db2777' : '#ea580c' }}>
                      {tx.fundName?.charAt(0)}
                    </div>
                    <span className="font-bold text-gray-800 dark:text-slate-200">
                      {tx.fundName}
                    </span>
                  </td>

                  <td className="p-6 text-gray-600 dark:text-slate-400 font-medium capitalize">
                    {tx.fundType || "SIP"}
                  </td>

                  <td className="p-6">
                    <span className={`px-3 py-1 text-xs font-bold rounded-lg shadow-sm border ${tx.transactionStatus === 'SUCCESS' ? 'bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-100 dark:border-teal-500/20' : 'bg-orange-50 dark:bg-orange-500/10 text-orange-500 dark:text-orange-400 border-orange-100 dark:border-orange-500/20'}`}>
                      {tx.transactionStatus === 'SUCCESS' ? 'Completed' : 'Pending'}
                    </span>
                  </td>

                  <td className="p-6 text-gray-600 dark:text-slate-400 font-medium">
                    {new Date(tx.installmentDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>

                  <td className="p-6 font-extrabold text-gray-800 dark:text-slate-200">
                    ₹{Number(tx.amount).toLocaleString("en-IN")}
                  </td>

                  {/* <td className="p-6 text-right">
                    <button className="px-4 py-1.5 border border-gray-200 dark:border-slate-700 rounded-lg text-xs font-bold text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                      Details
                    </button>
                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-12 text-center text-gray-500 dark:text-slate-400">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transactions;
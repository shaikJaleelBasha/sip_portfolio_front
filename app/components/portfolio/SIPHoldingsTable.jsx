import React from "react";
import { FiCreditCard } from "react-icons/fi";

export default function SIPHoldingsTable({ sips, isProcessing, handleProcessPayment, setShowModal }) {
  return (
    <div className="glass-card rounded-3xl shadow-sm border border-gray-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 overflow-hidden transition-colors duration-300">
      <div className="px-6 py-5 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center bg-gray-50/50 dark:bg-slate-800/30">
        <h3 className="text-lg font-bold text-gray-800 dark:text-slate-100">Your SIP Holdings</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-slate-800/30 text-gray-500 dark:text-slate-400 text-sm uppercase tracking-wider font-semibold">
              <th className="px-6 py-4 border-b border-gray-100 dark:border-slate-800">Fund Name</th>
              <th className="px-6 py-4 border-b border-gray-100 dark:border-slate-800">Amount</th>
              <th className="px-6 py-4 border-b border-gray-100 dark:border-slate-800">Date/Status</th>
              <th className="px-6 py-4 border-b border-gray-100 dark:border-slate-800">Installments</th>
              <th className="px-6 py-4 border-b border-gray-100 dark:border-slate-800">Current Value</th>
              <th className="px-6 py-4 border-b border-gray-100 dark:border-slate-800 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-slate-800/50">
            {sips.length > 0 ? (
              sips.map((sip, idx) => (
                <tr key={sip.sipId} className="hover:bg-gray-50/80 dark:hover:bg-slate-800/40 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-sm" style={{ backgroundColor: idx % 2 === 0 ? '#e0e7ff' : '#fce7f3', color: idx % 2 === 0 ? '#4f46e5' : '#db2777' }}>
                        {sip.fundName?.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-slate-200">{sip.fundName}</p>
                        <p className="text-xs text-gray-400 dark:text-slate-500">{sip.fundType}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-800 dark:text-slate-200">
                    ₹{Number(sip.sipAmount).toLocaleString("en-IN")}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm font-medium text-gray-600 dark:text-slate-400">Day {sip.sipDate} of month</span>
                      <span className={`text-xs px-2.5 py-0.5 rounded-lg w-max font-bold border shadow-sm ${sip.sipStatus === 'ACTIVE' ? 'bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-100 dark:border-teal-500/20' : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 border-gray-200 dark:border-slate-700'}`}>
                        {sip.sipStatus}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-slate-300 font-medium">
                    {sip.totalInstallments || 0}
                    <span className="block text-xs text-gray-400 dark:text-slate-500 font-normal mt-0.5">
                      {sip.totalUnits ? parseFloat(sip.totalUnits).toFixed(4) + ' units' : '0 units'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-extrabold text-gray-800 dark:text-slate-200 text-lg">
                      ₹{Number(sip.currentValue || 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleProcessPayment(sip.sipId)}
                      disabled={isProcessing === sip.sipId || sip.sipStatus !== 'ACTIVE'}
                      className={`px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-all transform hover:-translate-y-0.5 ${
                        isProcessing === sip.sipId
                          ? 'bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-500 cursor-not-allowed border border-transparent'
                          : 'bg-gradient-to-r from-teal-400 to-emerald-500 text-white hover:shadow-teal-500/30 shadow-md border border-transparent'
                      }`}
                    >
                      {isProcessing === sip.sipId ? 'Processing...' : 'Pay Installment'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center text-gray-500 dark:text-slate-400">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-gray-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 shadow-inner">
                      <FiCreditCard className="text-2xl text-gray-400 dark:text-slate-500" />
                    </div>
                    <p className="text-lg font-bold text-gray-700 dark:text-slate-300 mb-1">No SIPs Found</p>
                    <p className="text-sm text-gray-400 dark:text-slate-500 max-w-sm">You haven't started any Systematic Investment Plans yet. Create a new SIP to start growing your wealth.</p>
                    <button 
                      onClick={() => setShowModal(true)}
                      className="mt-5 px-5 py-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors"
                    >
                      + Create your first SIP
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

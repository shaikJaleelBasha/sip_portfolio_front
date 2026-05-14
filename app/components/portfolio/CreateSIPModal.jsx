import React from "react";
import { FiX } from "react-icons/fi";

export default function CreateSIPModal({
  showModal,
  setShowModal,
  handleCreateSIP,
  formData,
  setFormData,
  funds,
  isSubmitting
}) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-gray-900/60 dark:bg-black/70 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-lg p-8 relative z-10 shadow-2xl animate-fade-in-up border border-gray-100 dark:border-slate-700">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-slate-100">Start New SIP</h3>
          <button onClick={() => setShowModal(false)} className="p-2 text-gray-400 hover:text-gray-800 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <FiX className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleCreateSIP} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">Select Mutual Fund</label>
            <select 
              required
              value={formData.fundId}
              onChange={(e) => setFormData({...formData, fundId: e.target.value})}
              className="w-full px-5 py-3.5 bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 transition-colors outline-none text-gray-700 dark:text-slate-200 shadow-sm"
            >
              <option value="" disabled>Choose a fund...</option>
              {funds.map(fund => (
                <option key={fund.fundId} value={fund.fundId}>
                  {fund.fundName} ({fund.fundType})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">Monthly Amount (₹)</label>
              <input 
                type="number" 
                required min="500"
                placeholder="e.g. 5000"
                value={formData.sipAmount}
                onChange={(e) => setFormData({...formData, sipAmount: e.target.value})}
                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 transition-colors outline-none text-gray-700 dark:text-slate-200 shadow-sm placeholder-gray-400 dark:placeholder-slate-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">Deduction Date (1-28)</label>
              <input 
                type="number" 
                required min="1" max="28"
                value={formData.sipDate}
                onChange={(e) => setFormData({...formData, sipDate: e.target.value})}
                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 transition-colors outline-none text-gray-700 dark:text-slate-200 shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">Start Date</label>
              <input 
                type="date" 
                required
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 transition-colors outline-none text-gray-700 dark:text-slate-200 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">End Date</label>
              <input 
                type="date" 
                required
                value={formData.endDate}
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 transition-colors outline-none text-gray-700 dark:text-slate-200 shadow-sm"
              />
            </div>
          </div>

          <div className="mt-10 pt-4 border-t border-gray-100 dark:border-slate-800">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl text-white font-bold shadow-lg transition-all transform hover:-translate-y-0.5 ${
                isSubmitting ? 'bg-indigo-400 dark:bg-indigo-600/50 cursor-not-allowed shadow-none' : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-indigo-500/40 hover:shadow-indigo-500/60'
              }`}
            >
              {isSubmitting ? 'Setting up...' : 'Confirm & Start SIP'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/app/core/context/AuthContext";
import { FiTrendingUp, FiSearch, FiBriefcase } from "react-icons/fi";

export default function FundsExplorerPage() {
  const { token, loading: authLoading } = useAuth();
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (token) {
      fetchFunds();
    }
  }, [token]);

  const fetchFunds = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/funds", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFunds(response.data || []);
    } catch (error) {
      console.error("Error fetching funds:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredFunds = funds.filter(f => 
    f.fundName?.toLowerCase().includes(search.toLowerCase()) ||
    f.amcName?.toLowerCase().includes(search.toLowerCase()) ||
    f.fundType?.toLowerCase().includes(search.toLowerCase())
  );

  if (authLoading || loading) {
    return (
      <div className="flex h-[calc(100vh-150px)] items-center justify-center">
        <div className="h-12 w-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Mutual Funds Explorer</h1>
          <p className="text-gray-500 dark:text-slate-400 mt-1 font-medium">Discover and analyze mutual funds for your SIPs.</p>
        </div>
        
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search funds, AMC, type..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 pr-4 py-3 bg-white/60 dark:bg-slate-900/60 border border-gray-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-80 shadow-sm transition-all glass-card"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredFunds.length > 0 ? (
          filteredFunds.map((fund, idx) => (
            <div key={fund.fundId} className="glass-card rounded-3xl p-6 shadow-md border border-gray-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 transition-transform hover:-translate-y-1 duration-300 group">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl shadow-inner border border-white/50 dark:border-slate-700" style={{ backgroundColor: idx % 3 === 0 ? '#eef2ff' : idx % 3 === 1 ? '#fdf2f8' : '#fff7ed', color: idx % 3 === 0 ? '#4f46e5' : idx % 3 === 1 ? '#db2777' : '#ea580c' }}>
                    {fund.fundName?.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 dark:text-slate-100 leading-tight">{fund.fundName}</h3>
                    <p className="text-sm font-medium text-indigo-500 dark:text-indigo-400">{fund.amcName}</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50/50 dark:bg-slate-800/40 p-4 rounded-2xl border border-gray-100 dark:border-slate-700/50">
                  <p className="text-xs text-gray-500 dark:text-slate-400 font-semibold mb-1 uppercase tracking-wider">Latest NAV</p>
                  <p className="text-xl font-extrabold text-gray-800 dark:text-slate-100">₹{Number(fund.latestNav || 0).toLocaleString("en-IN")}</p>
                </div>
                <div className="bg-gray-50/50 dark:bg-slate-800/40 p-4 rounded-2xl border border-gray-100 dark:border-slate-700/50">
                  <p className="text-xs text-gray-500 dark:text-slate-400 font-semibold mb-1 uppercase tracking-wider">Fund Type</p>
                  <p className="text-sm font-bold text-gray-800 dark:text-slate-100 uppercase mt-1">{fund.fundType || 'Equity'}</p>
                </div>
              </div>
              
              {/* <button className="w-full py-3.5 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 font-bold rounded-xl group-hover:bg-indigo-600 group-hover:text-white dark:group-hover:bg-indigo-500 transition-colors shadow-sm flex items-center justify-center gap-2">
                <FiTrendingUp /> View Details
              </button> */}
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="w-20 h-20 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiBriefcase className="text-3xl text-gray-400 dark:text-slate-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-700 dark:text-slate-300 mb-2">No Funds Found</h3>
            <p className="text-gray-500 dark:text-slate-400">We couldn't find any mutual funds matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiGrid, FiUsers, FiCreditCard, FiBarChart2, FiSettings, FiLogOut, FiBriefcase, FiUser } from "react-icons/fi";
import { useAuth } from "@/app/core/context/AuthContext";

export default function Sidebar() {
  const { logout } = useAuth();
  const pathname = usePathname();

  return (
    <aside className="w-64 glass-card min-h-screen flex flex-col pt-8 pb-6 px-6 hidden md:flex border-r border-gray-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 z-10 transition-colors duration-300">
      {/* Logo Area */}
      <div className="flex items-center gap-3 mb-12 animate-fade-in">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl shadow-lg shadow-indigo-500/30">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Veritas</h1>
      </div>

      {/* Main Menu */}
      <div className="mb-auto">
        <h2 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4 pl-2">Main Menu</h2>
        <nav className="flex flex-col gap-2">
          <Link 
            href="/dashboard" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${pathname === '/dashboard' ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20' : 'text-gray-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-800/50'}`}
          >
            <FiGrid className="text-lg" /> Dashboard
          </Link>
          <Link 
            href="/dashboard/portfolio" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${pathname === '/dashboard/portfolio' ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20' : 'text-gray-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-800/50'}`}
          >
            <FiBriefcase className="text-lg" /> Portfolio Valuation
          </Link>
          <Link 
            href="/dashboard/funds" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${pathname.includes('/dashboard/funds') ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20' : 'text-gray-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-800/50'}`}
          >
            <FiBarChart2 className="text-lg" /> Mutual Funds
          </Link>
          {/* <Link 
            href="/dashboard/portfolio" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${pathname === '/dashboard/portfolio#sip' ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20' : 'text-gray-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-800/50'}`}
          >
            <FiCreditCard className="text-lg" /> SIP Management
          </Link> */}
          <Link 
            href="/dashboard/profile" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${pathname.includes('/dashboard/profile') ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20' : 'text-gray-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-800/50'}`}
          >
            <FiUser className="text-lg" /> Investor Profile
          </Link>
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col gap-2 mt-8 border-t border-gray-200 dark:border-slate-800 pt-6">
        <Link href="#" className="flex items-center gap-3 px-4 py-2 text-gray-500 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-200 font-medium transition-colors">
          <FiSettings className="text-lg" /> Settings
        </Link>
        <button onClick={logout} className="flex items-center gap-3 px-4 py-2 text-gray-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 font-medium transition-colors text-left">
          <FiLogOut className="text-lg" /> Log Out
        </button>
      </div>
    </aside>
  );
}

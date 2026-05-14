"use client";

import React from "react";
import { FiPlus } from "react-icons/fi";
import { useAuth } from "@/app/core/context/AuthContext";

export default function TopHeader() {
  const { user } = useAuth();

  return (
    <header className="flex flex-col md:flex-row items-center justify-between py-5 px-8 glass-card border-b border-gray-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 sticky top-0 z-20 transition-colors duration-300">
      <div className="flex items-center gap-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-slate-100">Welcome back, {user?.first_name || 'Investor'}</h1>
      </div>

      <div className="flex items-center gap-4 mt-4 md:mt-0">
        <button className="p-2.5 rounded-full text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors hidden md:block">
          <FiPlus className="text-lg" />
        </button>
        <div className="flex items-center gap-2">
          {/* Circular avatar placeholder */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-lg overflow-hidden border-2 border-white dark:border-slate-800 shadow-md">
            {user?.first_name ? user.first_name.charAt(0).toUpperCase() : "U"}
          </div>
        </div>
      </div>
    </header>
  );
}

"use client";

import React from "react";
import Link from "next/link";

export default function DashboardFooter() {
  return (
    <footer className="py-6 px-8 border-t border-gray-200 dark:border-slate-800 mt-auto bg-transparent transition-colors duration-300">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500 dark:text-slate-400">
          &copy; {new Date().getFullYear()} Veritas Inc. All rights reserved.
        </p>
        
        <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-slate-400">
          <Link href="#" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">Terms of Service</Link>
          <Link href="#" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">Support</Link>
        </div>
      </div>
      
      <div className="mt-4 text-xs text-gray-400 dark:text-slate-600 text-center md:text-left">
        <p>Disclaimer: Mutual fund investments are subject to market risks. Please read all scheme-related documents carefully before investing. Past performance is not indicative of future returns.</p>
      </div>
    </footer>
  );
}

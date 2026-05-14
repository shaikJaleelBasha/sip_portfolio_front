import React from "react";
import SideBar from "../components/dashboard/SideBar";
import TopHeader from "../components/dashboard/TopHeader";
import DashboardFooter from "../components/dashboard/DashboardFooter";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-900 font-sans transition-colors duration-300">
      <SideBar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopHeader />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
        <DashboardFooter />
      </div>
    </div>
  );
}

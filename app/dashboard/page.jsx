"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/core/context/AuthContext";
import PortfolioSummaryCards from "../components/portfolio/PortfolioSummaryCards";
import PortfolioPerformanceChart from "../components/dashboard/PortfolioPerformanceChart";
import AssetAllocationPieChart from "../components/dashboard/AssetAllocationPieChart";
import Transactions from "../components/dashboard/Transactions";

export default function DashboardPage() {
  const router = useRouter();
  const { user, token, loading: authLoading } = useAuth();
  const [netWorth, setNetWorth] = useState(0);
  const [holdings, setHoldings] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
      return;
    }

    if (user && token) {
      const fetchData = async () => {
        try {
          const config = {
            headers: { Authorization: `Bearer ${token}` },
          };

          const [netWorthRes, holdingsRes, transactionsRes] = await Promise.all([
            axios.get(`http://localhost:3000/api/investors/${user.investor_id}/networth`, config),
            axios.get(`http://localhost:3000/api/investors/${user.investor_id}/holdings`, config),
            axios.get(`http://localhost:3000/api/investors/${user.investor_id}/transactions`, config),
          ]);

          setNetWorth(netWorthRes.data.totalNetWorth || 0);
          setHoldings(holdingsRes.data || []);
          setTransactions(transactionsRes.data || []);
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
          if (error.response?.status === 401) {
            router.push("/login");
          }
        } finally {
          setDataLoading(false);
        }
      };

      fetchData();
    }
  }, [user, token, authLoading, router]);

  if (authLoading || dataLoading) {
    return (
      <div className="flex h-[calc(100vh-150px)] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-t-4 border-indigo-500 border-solid"></div>
      </div>
    );
  }

  // Calculate some aggregate stats
  const totalActiveSIPs = holdings.filter(s => s.sipStatus === "ACTIVE").length;
  const totalSIPAmount = holdings.reduce((acc, curr) => acc + parseFloat(curr.sipAmount || 0), 0);

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Investor Dashboard</h1>
          <p className="text-slate-400 text-sm">Overview of your portfolio valuation and SIP tracking.</p>
        </div>
      </div>

      {/* Summary Cards */}
      <PortfolioSummaryCards 
        netWorth={netWorth} 
        totalActiveSIPs={totalActiveSIPs} 
        totalSIPAmount={totalSIPAmount} 
      />

      {/* Graphical Insights */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <PortfolioPerformanceChart transactions={transactions} />
        </div>
        <div className="xl:col-span-1">
          <AssetAllocationPieChart holdings={holdings} />
        </div>
      </div>

      {/* Recent Transactions List */}
      <Transactions transactions={transactions.slice(0, 5)} />

    </div>
  );
}

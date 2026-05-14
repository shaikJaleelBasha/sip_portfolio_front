"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FiPlus } from "react-icons/fi";
import { useAuth } from "@/app/core/context/AuthContext";
import PortfolioSummaryCards from "../../components/portfolio/PortfolioSummaryCards";
import SIPHoldingsTable from "../../components/portfolio/SIPHoldingsTable";
import CreateSIPModal from "../../components/portfolio/CreateSIPModal";

export default function PortfolioPage() {
  const router = useRouter();
  const { user, token, loading: authLoading } = useAuth();
  
  const [netWorth, setNetWorth] = useState(0);
  const [sips, setSips] = useState([]);
  const [funds, setFunds] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(null); // stores sipId being processed
  
  // Form State
  const [formData, setFormData] = useState({
    fundId: "",
    sipAmount: "",
    sipDate: "1",
    startDate: "",
    endDate: ""
  });

  const fetchPortfolioData = async () => {
    if (!user || !token) return;
    
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      const [netWorthRes, holdingsRes, fundsRes] = await Promise.all([
        axios.get(`http://localhost:3000/api/investors/${user.investor_id}/networth`, config),
        axios.get(`http://localhost:3000/api/investors/${user.investor_id}/holdings`, config),
        axios.get(`http://localhost:3000/api/funds`, config)
      ]);

      setNetWorth(netWorthRes.data.totalNetWorth || 0);
      setSips(holdingsRes.data || []);
      setFunds(fundsRes.data || []);
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
      if (error.response?.status === 401) router.push("/login");
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
      return;
    }
    fetchPortfolioData();
  }, [user, token, authLoading, router]);

  const handleCreateSIP = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const payload = {
        investorId: user.investor_id,
        fundId: formData.fundId,
        sipAmount: parseFloat(formData.sipAmount),
        sipDate: parseInt(formData.sipDate),
        startDate: formData.startDate,
        endDate: formData.endDate,
        sipStatus: "ACTIVE"
      };

      await axios.post(`http://localhost:3000/api/sips`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Close modal and refresh data
      setShowModal(false);
      setFormData({ fundId: "", sipAmount: "", sipDate: "1", startDate: "", endDate: "" });
      await fetchPortfolioData();
    } catch (error) {
      console.error("Error creating SIP:", error);
      alert("Failed to create SIP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProcessPayment = async (sipId) => {
    setIsProcessing(sipId);
    try {
      await axios.post(`http://localhost:3000/api/sips/${sipId}/process`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Refresh to get updated values
      await fetchPortfolioData();
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Payment processing failed.");
    } finally {
      setIsProcessing(null);
    }
  };

  if (authLoading || dataLoading) {
    return (
      <div className="flex h-[calc(100vh-150px)] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-t-4 border-indigo-500 border-solid"></div>
      </div>
    );
  }

  // Calculate some aggregate stats
  const totalActiveSIPs = sips.filter(s => s.sipStatus === "ACTIVE").length;
  const totalSIPAmount = sips.reduce((acc, curr) => acc + parseFloat(curr.sipAmount || 0), 0);

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Portfolio Management</h1>
          <p className="text-gray-500 text-sm">Manage your mutual funds, SIPs, and view net assets.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-0.5"
        >
          <FiPlus className="text-lg" /> New SIP
        </button>
      </div>

      {/* Summary Cards */}
      <PortfolioSummaryCards 
        netWorth={netWorth} 
        totalActiveSIPs={totalActiveSIPs} 
        totalSIPAmount={totalSIPAmount} 
      />

      {/* SIP List Table */}
      <SIPHoldingsTable 
        sips={sips} 
        isProcessing={isProcessing} 
        handleProcessPayment={handleProcessPayment} 
        setShowModal={setShowModal} 
      />

      {/* Create SIP Modal */}
      <CreateSIPModal 
        showModal={showModal} 
        setShowModal={setShowModal} 
        handleCreateSIP={handleCreateSIP} 
        formData={formData} 
        setFormData={setFormData} 
        funds={funds} 
        isSubmitting={isSubmitting} 
      />
    </div>
  );
}

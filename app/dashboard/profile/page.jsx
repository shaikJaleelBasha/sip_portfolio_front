"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/app/core/context/AuthContext";
import { FiUser, FiPhone, FiCalendar, FiMapPin, FiShield } from "react-icons/fi";

export default function ProfilePage() {
  const { user, token, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && token) {
      fetchProfile();
    }
  }, [user, token]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/investors/${user.investor_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex h-[calc(100vh-150px)] items-center justify-center">
        <div className="h-12 w-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-500">Profile not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in pb-10 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">My Profile</h1>
        <p className="text-gray-500 dark:text-slate-400 mt-1 font-medium">Manage your personal information and account security.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card rounded-3xl p-8 shadow-md border border-gray-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-20 dark:opacity-40"></div>
            
            <div className="relative inline-block mb-4 mt-6">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-xl border-4 border-white dark:border-slate-800 mx-auto">
                {profile.first_name?.charAt(0)}{profile.last_name?.charAt(0)}
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-100">{profile.first_name} {profile.last_name}</h2>
            <p className="text-indigo-500 dark:text-indigo-400 font-semibold mb-6">Verified Investor</p>
            
            <div className="border-t border-gray-100 dark:border-slate-800 pt-6 mt-6">
              <div className="flex justify-between items-center text-sm mb-3">
                <span className="text-gray-500 dark:text-slate-400 font-medium">Member Since</span>
                <span className="font-bold text-gray-800 dark:text-slate-200">
                  {new Date(profile.created_at || Date.now()).toLocaleDateString("en-US", { month: 'long', year: 'numeric' })}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 dark:text-slate-400 font-medium">Status</span>
                <span className="px-2.5 py-1 bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-lg font-bold text-xs border border-teal-100 dark:border-teal-500/20">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card rounded-3xl p-8 shadow-md border border-gray-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100 flex items-center gap-2">
                <FiUser className="text-indigo-500" /> Personal Details
              </h3>
              <button className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline">Edit</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
              <div>
                <p className="text-xs text-gray-500 dark:text-slate-400 uppercase tracking-wider font-bold mb-1">First Name</p>
                <p className="text-base font-semibold text-gray-800 dark:text-slate-200">{profile.first_name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-slate-400 uppercase tracking-wider font-bold mb-1">Last Name</p>
                <p className="text-base font-semibold text-gray-800 dark:text-slate-200">{profile.last_name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-slate-400 uppercase tracking-wider font-bold mb-1 flex items-center gap-1.5"><FiPhone /> Phone Number</p>
                <p className="text-base font-semibold text-gray-800 dark:text-slate-200">{profile.phone || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-slate-400 uppercase tracking-wider font-bold mb-1 flex items-center gap-1.5"><FiCalendar /> Date of Birth</p>
                <p className="text-base font-semibold text-gray-800 dark:text-slate-200">
                  {profile.dob ? new Date(profile.dob).toLocaleDateString() : 'Not provided'}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-xs text-gray-500 dark:text-slate-400 uppercase tracking-wider font-bold mb-1 flex items-center gap-1.5"><FiMapPin /> Address</p>
                <p className="text-base font-semibold text-gray-800 dark:text-slate-200">{profile.address || 'Not provided'}</p>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-8 shadow-md border border-gray-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60">
            <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100 flex items-center gap-2 mb-6">
              <FiShield className="text-emerald-500" /> KYC Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
              <div className="bg-gray-50/50 dark:bg-slate-800/40 p-4 rounded-2xl border border-gray-100 dark:border-slate-700/50">
                <p className="text-xs text-gray-500 dark:text-slate-400 uppercase tracking-wider font-bold mb-1">PAN Number</p>
                <p className="text-lg font-bold text-gray-800 dark:text-slate-200 tracking-widest">{profile.pan_number || '----------'}</p>
              </div>
              <div className="bg-gray-50/50 dark:bg-slate-800/40 p-4 rounded-2xl border border-gray-100 dark:border-slate-700/50">
                <p className="text-xs text-gray-500 dark:text-slate-400 uppercase tracking-wider font-bold mb-1">Aadhaar Number</p>
                <p className="text-lg font-bold text-gray-800 dark:text-slate-200 tracking-widest">{profile.aadhaar_number ? `XXXX-XXXX-${profile.aadhaar_number.slice(-4)}` : '----------'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

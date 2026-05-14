"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/app/core/context/AuthContext";

import {
  FiSearch,
  FiBriefcase,
  FiPlus,
  FiEdit,
  FiSave,
  FiX,
} from "react-icons/fi";

export default function FundsExplorerPage() {

  const { token, loading: authLoading } = useAuth();

  const [funds, setFunds] = useState([]);
  const [amcs, setAmcs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [editingFundId, setEditingFundId] = useState(null);

  const [formData, setFormData] = useState({
    amcId: "",
    fundName: "",
    fundCode: "",
    fundType: "",
    latestNav: "",
    navDate: "",
  });

  // =====================================================
  // FETCH AMCS
  // =====================================================

  const fetchAmcs = async () => {

    try {

      console.log("Fetching AMCs...");

      const response = await axios.get(
        "http://localhost:3000/api/amcs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "AMC RESPONSE:",
        response.data
      );

      if (Array.isArray(response.data)) {

        setAmcs(response.data);

      } else {

        setAmcs([]);
      }

    } catch (error) {

      console.error(
        "AMC FETCH ERROR:",
        error.response?.data ||
        error.message
      );

      setAmcs([]);
    }
  };

  // =====================================================
  // FETCH FUNDS
  // =====================================================

  const fetchFunds = async () => {

    try {

      console.log("Fetching Funds...");

      const response = await axios.get(
        "http://localhost:3000/api/funds",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "FUNDS RESPONSE:",
        response.data
      );

      if (Array.isArray(response.data)) {

        setFunds(response.data);

      } else {

        setFunds([]);
      }

    } catch (error) {

      console.error(
        "FUNDS FETCH ERROR:",
        error.response?.data ||
        error.message
      );

      setFunds([]);

    } finally {

      setLoading(false);
    }
  };

  // =====================================================
  // LOAD DATA
  // =====================================================

  useEffect(() => {

    if (token) {

      console.log("TOKEN FOUND");

      fetchAmcs();

      fetchFunds();

    } else {

      console.log("TOKEN NOT FOUND");
    }

  }, [token]);

  // =====================================================
  // CREATE FUND
  // =====================================================

  const createFund = async () => {

    try {

      console.log("Sending Payload:", {
        amcId: Number(formData.amcId),
        fundName: formData.fundName,
        fundCode: formData.fundCode,
        fundType: formData.fundType,
      });

      // STEP 1
      // CREATE FUND

      const fundResponse = await axios.post(
        "http://localhost:3000/api/funds",
        {
          amcId: Number(formData.amcId),
          fundName: formData.fundName,
          fundCode: formData.fundCode,
          fundType: formData.fundType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "Fund Created:",
        fundResponse.data
      );

      // STEP 2
      // CREATE NAV ENTRY

      const createdFundId =
        fundResponse.data?.data?.fund_id ||
        fundResponse.data?.fundId;

      if (
        createdFundId &&
        formData.latestNav
      ) {

        await axios.put(
          `http://localhost:3000/api/funds/${createdFundId}/nav`,
          {
            navValue: Number(
              formData.latestNav
            ),

            navDate:
              formData.navDate ||
              new Date()
                .toISOString()
                .split("T")[0],
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      resetForm();

      fetchFunds();

    } catch (error) {

      console.error(
        "Create fund error:",
        error.response?.data ||
        error.message
      );
    }
  };

  // =====================================================
  // UPDATE NAV
  // =====================================================

  const updateFundNav = async () => {

    try {

      await axios.put(
        `http://localhost:3000/api/funds/${editingFundId}/nav`,
        {
          navValue: Number(
            formData.latestNav
          ),

          navDate:
            formData.navDate ||
            new Date()
              .toISOString()
              .split("T")[0],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      resetForm();

      fetchFunds();

    } catch (error) {

      console.error(
        "Update NAV error:",
        error.response?.data ||
        error.message
      );
    }
  };

  // =====================================================
  // RESET FORM
  // =====================================================

  const resetForm = () => {

    setFormData({
      amcId: "",
      fundName: "",
      fundCode: "",
      fundType: "",
      latestNav: "",
      navDate: "",
    });

    setEditingFundId(null);
  };

  // =====================================================
  // FILTER FUNDS
  // =====================================================

  const filteredFunds = funds.filter(
    (f) =>
      f.fundName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      f.amcName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      f.fundType
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  // =====================================================
  // LOADING
  // =====================================================

  if (authLoading || loading) {

    return (
      <div className="flex h-[calc(100vh-150px)] items-center justify-center">

        <div className="h-12 w-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>

      </div>
    );
  }

  return (

    <div className="space-y-8 animate-fade-in pb-10">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

        <div>

          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">

            Mutual Funds Explorer

          </h1>

          <p className="text-gray-500 dark:text-slate-400 mt-1 font-medium">

            Create and manage mutual funds.

          </p>
        </div>

        {/* SEARCH */}

        <div className="relative">

          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search funds..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="pl-11 pr-4 py-3 bg-white/60 dark:bg-slate-900/60 border border-gray-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-80 shadow-sm transition-all glass-card"
          />
        </div>
      </div>

      {/* FORM */}

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md border border-gray-200 dark:border-slate-800">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-2xl font-bold">

            {editingFundId
              ? "Update NAV"
              : "Create Mutual Fund"}

          </h2>

          {editingFundId && (

            <button
              onClick={resetForm}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-100 text-red-600"
            >
              <FiX />
              Cancel
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {!editingFundId && (
            <>

              {/* AMC SELECT */}

              <select
                value={formData.amcId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    amcId: e.target.value,
                  })
                }
                className="p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              >

                <option value="">
                  Select AMC
                </option>

                {amcs.map((amc) => (

                  <option
                    key={amc.amc_id}
                    value={amc.amc_id}
                  >
                    {amc.amc_name}
                  </option>

                ))}

              </select>

              {/* FUND NAME */}

              <input
                type="text"
                placeholder="Fund Name"
                value={formData.fundName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    fundName: e.target.value,
                  })
                }
                className="p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              />

              {/* FUND CODE */}

              <input
                type="text"
                placeholder="Fund Code"
                value={formData.fundCode}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    fundCode: e.target.value,
                  })
                }
                className="p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              />

              {/* FUND TYPE */}

              <input
                type="text"
                placeholder="Fund Type"
                value={formData.fundType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    fundType: e.target.value,
                  })
                }
                className="p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </>
          )}

          {/* NAV VALUE */}

          <input
            type="number"
            placeholder="Latest NAV"
            value={formData.latestNav}
            onChange={(e) =>
              setFormData({
                ...formData,
                latestNav: e.target.value,
              })
            }
            className="p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
          />

          {/* NAV DATE */}

          <input
            type="date"
            value={formData.navDate}
            onChange={(e) =>
              setFormData({
                ...formData,
                navDate: e.target.value,
              })
            }
            className="p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
          />
        </div>

        {/* BUTTON */}

        <button
          onClick={
            editingFundId
              ? updateFundNav
              : createFund
          }
          className={`mt-6 px-6 py-3 rounded-xl text-white font-semibold flex items-center gap-2 ${
            editingFundId
              ? "bg-green-600"
              : "bg-indigo-600"
          }`}
        >
          {editingFundId ? (
            <>
              <FiSave />
              Update NAV
            </>
          ) : (
            <>
              <FiPlus />
              Add Fund
            </>
          )}
        </button>
      </div>

      {/* FUNDS GRID */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {filteredFunds.length > 0 ? (

          filteredFunds.map((fund, idx) => (

            <div
              key={fund.fundId}
              className="glass-card rounded-3xl p-6 shadow-md border border-gray-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 transition-transform hover:-translate-y-1 duration-300"
            >

              <div className="flex justify-between items-start mb-6">

                <div className="flex items-center gap-4">

                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl shadow-inner border border-white/50 dark:border-slate-700"
                    style={{
                      backgroundColor:
                        idx % 3 === 0
                          ? "#eef2ff"
                          : idx % 3 === 1
                          ? "#fdf2f8"
                          : "#fff7ed",

                      color:
                        idx % 3 === 0
                          ? "#4f46e5"
                          : idx % 3 === 1
                          ? "#db2777"
                          : "#ea580c",
                    }}
                  >
                    {fund.fundName?.charAt(0)}
                  </div>

                  <div>

                    <h3 className="font-bold text-lg text-gray-800 dark:text-slate-100 leading-tight">

                      {fund.fundName}

                    </h3>

                    <p className="text-sm font-medium text-indigo-500 dark:text-indigo-400">

                      {fund.amcName}

                    </p>
                  </div>
                </div>
              </div>

              {/* DETAILS */}

              <div className="grid grid-cols-2 gap-4 mb-6">

                <div className="bg-gray-50/50 dark:bg-slate-800/40 p-4 rounded-2xl border border-gray-100 dark:border-slate-700/50">

                  <p className="text-xs text-gray-500 dark:text-slate-400 font-semibold mb-1 uppercase tracking-wider">

                    Latest NAV

                  </p>

                  <p className="text-xl font-extrabold text-gray-800 dark:text-slate-100">

                    ₹{Number(
                      fund.latestNav || 0
                    ).toLocaleString("en-IN")}

                  </p>
                </div>

                <div className="bg-gray-50/50 dark:bg-slate-800/40 p-4 rounded-2xl border border-gray-100 dark:border-slate-700/50">

                  <p className="text-xs text-gray-500 dark:text-slate-400 font-semibold mb-1 uppercase tracking-wider">

                    Fund Type

                  </p>

                  <p className="text-sm font-bold text-gray-800 dark:text-slate-100 uppercase mt-1">

                    {fund.fundType || "Equity"}

                  </p>
                </div>
              </div>

              {/* UPDATE BUTTON */}

              <button
                onClick={() => {

                  setEditingFundId(
                    fund.fundId
                  );

                  setFormData({
                    amcId: fund.amcId,
                    fundName: fund.fundName,
                    fundCode: fund.fundCode,
                    fundType: fund.fundType,
                    latestNav: fund.latestNav,
                    navDate: "",
                  });
                }}
                className="w-full py-3 bg-indigo-600 text-white rounded-xl flex items-center justify-center gap-2"
              >
                <FiEdit />
                Update NAV
              </button>
            </div>
          ))

        ) : (

          <div className="col-span-full py-20 text-center">

            <div className="w-20 h-20 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">

              <FiBriefcase className="text-3xl text-gray-400 dark:text-slate-500" />

            </div>

            <h3 className="text-xl font-bold text-gray-700 dark:text-slate-300 mb-2">

              No Funds Found

            </h3>

            <p className="text-gray-500 dark:text-slate-400">

              No mutual funds available.

            </p>
          </div>
        )}
      </div>
    </div>
  );
}
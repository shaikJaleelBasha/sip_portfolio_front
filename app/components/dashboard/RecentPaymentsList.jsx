import React from "react";
import { FiMoreHorizontal } from "react-icons/fi";

export default function RecentPaymentsList({ recentPayments }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Recently Payments</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recentPayments?.length > 0 ? (
          recentPayments.map((payment, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-xl overflow-hidden flex items-center justify-center text-xl font-bold text-white" style={{ backgroundColor: idx % 2 === 0 ? '#f9a8d4' : '#93c5fd' }}>
                   {payment.fundName?.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{payment.fundName}</h4>
                  <p className="text-xs text-gray-400">
                    {new Date(payment.installmentDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className="font-bold text-gray-800">₹{Number(payment.amount).toLocaleString("en-IN")}</span>
                <span className={`px-3 py-1 text-xs font-bold rounded-full ${payment.transactionStatus === 'SUCCESS' ? 'bg-teal-50 text-teal-600' : 'bg-orange-50 text-orange-500'}`}>
                  {payment.transactionStatus === 'SUCCESS' ? 'Done' : 'Pending'}
                </span>
                <button className="text-gray-400 hover:text-gray-600"><FiMoreHorizontal /></button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center text-gray-400 py-4">No recent payments found.</div>
        )}
      </div>
    </div>
  );
}

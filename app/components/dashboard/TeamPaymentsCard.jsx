import React from "react";
import { FiBell } from "react-icons/fi";

export default function TeamPaymentsCard() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between border-dashed border-2 border-gray-300">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-gray-800">Team<br/>Payments</h3>
        <div className="bg-gray-100 p-2 rounded-full cursor-pointer hover:bg-gray-200 transition-colors">
          <FiBell className="text-gray-600" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 font-medium">
        <span className="w-4 h-4 bg-blue-500 rounded text-white flex items-center justify-center text-[10px]">14</span>
        07 Dec approval
      </div>
      <div className="mt-6 flex items-center gap-2">
         <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-pink-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold">M</div>
            <div className="w-8 h-8 rounded-full bg-orange-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold">D</div>
            <div className="w-8 h-8 rounded-full bg-cyan-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold">T</div>
         </div>
         <span className="text-sm font-semibold text-gray-600 ml-2">25+</span>
      </div>
    </div>
  );
}

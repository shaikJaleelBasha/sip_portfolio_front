import React from "react";

export default function PromoCard() {
  return (
    <div className="bg-gradient-to-br from-teal-400 to-teal-600 rounded-3xl p-6 shadow-md text-white flex flex-col justify-between relative overflow-hidden">
      <div className="absolute top-4 right-4 text-white/50">✦</div>
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      <div>
        <h2 className="text-4xl font-bold mb-1">$95.9</h2>
        <p className="text-teal-100 text-sm">Per Month</p>
      </div>
      <div className="mt-8 mb-4">
        <h3 className="text-xl font-semibold">Choose Best Plan<br/>For You!</h3>
      </div>
      <div className="flex items-center justify-between mt-auto">
        <button className="text-sm font-semibold hover:text-teal-100 transition-colors">Details</button>
        <button className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg hover:bg-black transition-colors">Upgrade</button>
      </div>
    </div>
  );
}

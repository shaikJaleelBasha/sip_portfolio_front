"use client";

import React from "react";

function InputField({
  placeholder,
  type,
  inputValue,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={(e) => inputValue(e.target.value)}
      className="w-full rounded-xl border border-gray-600 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
    />
  );
}

export default InputField;
import React from "react";
export function Input({ className = "", ...props }) {
  return (
    <input
      className={`border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition ${className}`}
      {...props}
    />
  );
}

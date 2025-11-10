import React from "react";

const variants = {
  default: "bg-green-700 text-white hover:bg-green-800",
  outline: "border border-green-700 text-green-700 hover:bg-green-50",
  ghost: "text-green-700 hover:bg-green-100",
  destructive: "bg-red-500 text-white hover:bg-red-600",
};

export function Button({
  variant = "default",
  className = "",
  children,
  ...props
}) {
  return (
    <button
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
        variants[variant] || ""
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

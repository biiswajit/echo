import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({ variant = "primary", children, ...props }) => {
  return (
    <button
      className={`font-code font-bold ${
        variant === "primary"
          ? "bg-echo-blue-primary text-echo-white hover:bg-echo-blue-darker px-5 py-3 rounded-md"
          : "bg-gray-600 text-white hover:bg-gray-700 px-4 py-2 rounded-sm"
      } disabled:opacity-50`}
      {...props}>
      {children}
    </button>
  );
};

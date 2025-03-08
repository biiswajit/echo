"use client";
import "./styles.css"

export const Button = () => {
  return (
    <button
      className="text-echo-black text-2xl border"
      onClick={() => alert(`Hello from your app!`)}
    >
      Click me here!
    </button>
  );
};

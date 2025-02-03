"use client";
export function Button() {
  return (
    <button
      className="bg-echo-black-100 text-echo-white-100 p-2 rounded-sm"
      onClick={() => {
        alert("hello, world!");
      }}
    >
      Click me!
    </button>
  );
}

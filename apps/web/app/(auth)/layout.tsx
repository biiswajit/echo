import React from "react";

export default function AuthLayout(
  { children }: { children: React.ReactNode}): JSX.Element {

  return (<div className="w-screen h-screen bg-primary-gradient bg-white-50 bg-no-repeat bg-center grid place-items-center">
    {children}
  </div>);
}
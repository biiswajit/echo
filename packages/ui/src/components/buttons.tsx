import { ReactNode } from "react";
import { LoadingCircle } from "../icons";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode,
  loading?: boolean,
  text: ReactNode | string,
}

export function Button(
  { icon, loading, text, ...props }: ButtonProps): JSX.Element {

  return (
  <button
    disabled={loading ? true : false}
    {...props}
    className={`flex gap-2 justify-center ${loading ? "bg-white-50 text-black-0 hover:cursor-not-allowed": "bg-white-0 text-black-100 hover:bg-white-25"} ring-2 ring-white-100 px-14 py-2 w-full font-default rounded-md`}>
      {loading ? <LoadingCircle fill="#000000" /> : icon}
      {text}
  </button>);
}
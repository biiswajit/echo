import { RegisterForm } from "./form";
import { RegisterTitle } from "./title";
import Link from "next/link";

export default function LoginPage(): JSX.Element {
  return (
  <div>
    <RegisterTitle />
    <RegisterForm />
    <p
      className="text-center mt-6 font-default text-black-0 text-md">
      {"Already have an account? "}
      <Link
        className="underline underline-offset-4 font-semibold"
        href="/login">Login</Link>
    </p>
  </div>);
}
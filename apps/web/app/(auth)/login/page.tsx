import { LoginForm } from "./form";
import Link from "next/link";
import { LoginTitle } from "./title";

export default function LoginPage(): JSX.Element {
  return (
  <div>
    <LoginTitle />
    <LoginForm />
      <p
      className="text-center mt-6 font-default text-black-0 text-md">
        {"Don't have an account? "}
        <Link
        className="underline underline-offset-4 font-semibold"
        href="/register">Register</Link>
      </p>
  </div>);
}
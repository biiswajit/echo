import { Google } from "@echo/ui/icons";

export default function Page() {
  return (
    <div className="bg-echo-black-100">
      <p className="font-heading text-echo-white-100 font-extrabold text-4xl">This is a heading</p>
      <p className="text-echo-white-100">This is another heading</p>
      <p className="text-echo-white-100 font-code">Hello, World</p>
      <Google />
    </div>
  );
}

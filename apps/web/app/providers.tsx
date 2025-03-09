import { Provider } from "jotai";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
	return <Provider>{children}</Provider>;
}

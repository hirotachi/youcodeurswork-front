import dynamic from "next/dynamic";
import { ComponentType } from "react";

function withNoSSR<T>(
  Component: ComponentType<T>
  // options: DynamicOptions = {}
) {
  return dynamic(() => Promise.resolve(Component), { ssr: false });
}

export default withNoSSR;

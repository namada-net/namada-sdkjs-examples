import { Sdk } from "@namada/sdk";
import { createContext } from "react";

type SdkContext = {
  sdk?: Sdk;
};

export const SdkContext = createContext<SdkContext>({
  sdk: undefined,
});

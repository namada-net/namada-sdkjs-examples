import { Sdk } from "@namada/sdk-multicore";
import { createContext } from "react";

type SdkContext = {
  sdk?: Sdk;
};

export const SdkContext = createContext<SdkContext>({
  sdk: undefined,
});

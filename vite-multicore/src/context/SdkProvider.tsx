import type { Sdk } from "@namada/sdk-multicore";
import {
  useEffect,
  useState,
  type FunctionComponent,
  type PropsWithChildren,
} from "react";
import { getSdkInstance } from "../utils";
import { SdkContext } from "./SdkContext";

export const SdkProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [sdk, setSdk] = useState<Sdk>();

  useEffect(() => {
    getSdkInstance().then((sdk) => {
      setSdk(sdk);
    });
  }, []);

  return (
    <>
      <SdkContext.Provider value={{ sdk }}>{children}</SdkContext.Provider>
    </>
  );
};

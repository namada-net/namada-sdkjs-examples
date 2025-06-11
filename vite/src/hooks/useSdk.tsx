import { useContext } from "react";
import { SdkContext } from "../context";

export const useSdk = () => {
  return useContext(SdkContext);
};

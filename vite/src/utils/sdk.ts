import { initSdk } from "@namada/sdk/inline";
import { Sdk } from "@namada/sdk";

const initializeSdk = async (): Promise<Sdk> => {
  const rpcUrl = "https://rpc.housefire.tududes.com";
  const token = "tnam1q9gr66cvu4hrzm0sd5kmlnjje82gs3xlfg3v6nu7";
  const maspIndexerUrl = "https://masp.housefire.tududes.com";
  const dbName = "testDb";

  const sdk = await initSdk({ rpcUrl, token, maspIndexerUrl, dbName });
  return sdk;
};

// Global instance of initialized SDK
let sdkInstance: Promise<Sdk>;

// Helper to access SDK instance
export const getSdkInstance = async (): Promise<Sdk> => {
  if (!sdkInstance) {
    sdkInstance = initializeSdk();
  }
  return sdkInstance;
};

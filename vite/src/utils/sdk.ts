import { initSdk } from "@namada/sdk-multicore/inline";
import { Sdk } from "@namada/sdk-multicore";

const initializeSdk = async (): Promise<Sdk> => {
  const rpcUrl = "https://rpc.campfire.tududes.com";
  const token = "tnam1qy440ynh9fwrx8aewjvvmu38zxqgukgc259fzp6h";
  const maspIndexerUrl = "https://masp.campfire.tududes.com";
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

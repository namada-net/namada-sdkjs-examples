import { Sdk, initSdk } from "@namada/sdk-node";

const initializeSdk = async (): Promise<Sdk> => {
  const rpcUrl = "https://rpc.housefire.tududes.com";
  const token = "tnam1q9gr66cvu4hrzm0sd5kmlnjje82gs3xlfg3v6nu7";
  const maspIndexerUrl = "https://masp.housefire.tududes.com";
  const dbName = "testDb";

  const sdk = await initSdk({ rpcUrl, token, maspIndexerUrl, dbName });
  return sdk;
};

const app = async () => {
  const sdk = await initializeSdk();
  console.log({ sdk });
  const nativeToken = await sdk.rpc.queryNativeToken();
  console.log("Native token:", nativeToken);
  const validators = await sdk.rpc.queryAllValidators();
  console.log("Validators:", validators);
};

app().then(() => console.log("IT WORKED!"));

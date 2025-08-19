import { initSdk } from "@namada/sdk-node";
import init from "@namada/sdk-node/init";

const initializeSdk = async (): Promise<unknown> => {
  const { memory } = init();
  console.log("Initialized wasm memory:", memory);

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
};

app().then(() => console.log("IT WORKS!"));

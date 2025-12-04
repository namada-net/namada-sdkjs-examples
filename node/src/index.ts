import BigNumber from "bignumber.js";
import { Sdk, WrapperTxProps, initSdk } from "@namada/sdk-node";

const initializeSdk = async (): Promise<Sdk> => {
  const rpcUrl = "https://rpc.mainnet.siuuu.click";
  const token = "tnam1q9gr66cvu4hrzm0sd5kmlnjje82gs3xlfg3v6nu7";
  const maspIndexerUrl = "https://masp.mainnet.siuuu.click";
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
  await broadcastTransferTx(sdk);
};

app().then(() => console.log("IT WORKED!"));

const NATIVE_TOKEN = "tnam1q9gr66cvu4hrzm0sd5kmlnjje82gs3xlfg3v6nu7";
const CHAIN_ID = "namada.5f5de2dd1b88cba30586420";
const broadcastTransferTx = async (sdk: Sdk) => {
  const wrapperTxProps: WrapperTxProps = {
    token: NATIVE_TOKEN,
    feeAmount: BigNumber(0.000001),
    gasLimit: BigNumber(62500),
    chainId: CHAIN_ID,
    publicKey:
      "tpknam1qpam035talr4f8qgltku73dl6zr3t6p22t39w74qatpcecfxgkhgw8tktev",
  };

  const transferProps = {
    data: [
      {
        source: "tnam1qrxsru5rdu4he400xny6p779fcw7xuftsgjnmzup",
        target: "tnam1qrz2lcz9dc6g4262gg73ar0rl5fqmtth5gneh62e",
        token: "tnam1q9gr66cvu4hrzm0sd5kmlnjje82gs3xlfg3v6nu7",
        amount: BigNumber(1),
      },
    ],
  };
  // const wrapperTxProps: WrapperTxProps = {
  //   token: "tnam1q9gr66cvu4hrzm0sd5kmlnjje82gs3xlfg3v6nu7",
  //   feeAmount: BigNumber("0.000001"),
  //   gasLimit: BigNumber("62500"),
  //   chainId: "namada.5f5de2dd1b88cba30586420",
  //   publicKey:
  //     "tpknam1qpam035talr4f8qgltku73dl6zr3t6p22t39w74qatpcecfxgkhgw8tktev", // replace with actual public key
  // };
  // const transferProps = {
  //   data: [
  //     {
  //       source: "tnam1qrxsru5rdu4he400xny6p779fcw7xuftsgjnmzup", // replace with actual source address
  //       target: "tnam1qpqfsmj2quxnakfq0rn8y2tjcvtz26f8pyw4fq98", // replace with actual target address
  //       token: "tnam1q9gr66cvu4hrzm0sd5kmlnjje82gs3xlfg3v6nu7",
  //       amount: BigNumber("0.00001"),
  //     },
  //   ],
  // };
  const tx = await sdk
    .getTx()
    .buildTransparentTransfer(wrapperTxProps, transferProps);
  console.log("Built Tx:", tx);
  const signedTx = await sdk.getSigning().sign(
    tx,
    "4d4c31e159acffa2ab5983d953f56ef4d9375538eb7f030cff538dd58e197097", // replace with actual private key
  );
  console.log("Signed Tx:", signedTx);
  console.log("Broadcasting Tx..., it might take a while");
  const balance = await sdk.rpc.queryBalance(
    "tnam1qrxsru5rdu4he400xny6p779fcw7xuftsgjnmzup",
    [NATIVE_TOKEN],
    CHAIN_ID,
  );
  console.log("Balance before tx:", balance);
  const response = await sdk.getRpc().broadcastTx(signedTx);
  console.log("Broadcast Response:", response);
  const balanceAfter = await sdk.rpc.queryBalance(
    "tnam1qrxsru5rdu4he400xny6p779fcw7xuftsgjnmzup",
    [NATIVE_TOKEN],
    CHAIN_ID,
  );
  console.log("Balance after tx:", balanceAfter);
  console.log(
    "Balance difference:",
    BigNumber(balanceAfter[0][1])!.minus(balance[0][1]!).toString(),
  );
};

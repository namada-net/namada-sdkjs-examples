import { initSdk, WrapperTxProps } from "@namada/sdk-multicore";
import BigNumber from "bignumber.js";

import {
  NODE_URL as rpcUrl,
  NATIVE_TOKEN as token,
  SIGNING_KEY as signingKey,
  CHAIN_ID as chainId,
  STORAGE_PATH as dbName,
  MASP_URL as maspIndexerUrl,
} from "./config";

export const submitBond = async (): Promise<void> => {
  const wrapperTxProps: WrapperTxProps = {
    token,
    feeAmount: BigNumber(500),
    gasLimit: BigNumber(1000),
    chainId: chainId,
    // Update this to a valid public key
    publicKey:
      "tpknam1qzz3nvg5zjwdpk5z0x9ngkf7guv9qpqrtz0da7weenwl5766pkkgvvt689t",
  };
  // const bondProps: BondProps = {
  //   // Update this to a valid source that has balance
  //   source: "tnam1qqshvryx9pngpk7mmzpzkjkm6klelgusuvmkc0uz",
  //   // Update this to a valid validator address
  //   validator: "tnam1qz4sdx5jlh909j44uz46pf29ty0ztftfzc98s8dx",
  //   amount: BigNumber(100),
  // };

  try {
    const sdk = await initSdk({
      rpcUrl,
      token,
      maspIndexerUrl,
      // multicore: true,
    });
    const { rpc } = sdk;
    console.log(await rpc.queryNativeToken());
    console.log("Initialized SDK!", { sdk });
    const revealPkTx = await sdk.tx.buildRevealPk(wrapperTxProps);
    console.log("Build RevealPK", { revealPkTx });
    const signedRevealPkTx = await sdk.signing.sign(revealPkTx, signingKey);
    // const bondTx = await sdk.tx.buildBond(wrapperTxProps, bondProps);
    // const signedBondTx = await sdk.signing.sign(bondTx, signingKey);

    console.log("Signed RevealPK", { signedRevealPkTx });

    // Reveal the public key on chain if it hasn't previously been used
    const revealPkResponse = await sdk.rpc.broadcastTx(signedRevealPkTx);
    console.log({ revealPkResponse });
    // const bondTxResponse = await sdk.rpc.broadcastTx(
    //   signedBondTx,
    //   wrapperTxProps,
    // );
    //
    // console.log(
    //   `Result of broadcasting RevealPK Tx for ${wrapperTxProps.publicKey}`,
    //   revealPkResponse,
    // );
    // console.log(
    //   `Result of broadcasting Bond Tx ${bondTx.hash}`,
    //   bondTxResponse,
    // );
    //
    // const balance = await sdk.rpc.queryBalance(
    //   "tnam1qz4sdx5jlh909j44uz46pf29ty0ztftfzc98s8dx",
    //   [token],
    //   chainId,
    // );
    // console.log("Balance:", balance);
  } catch (error) {
    console.error("Error:", error);
  }
};

submitBond();

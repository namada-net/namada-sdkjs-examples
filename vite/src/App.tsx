import BigNumber from "bignumber.js";
import { useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { useSdk } from "./hooks";

function App() {
  const { sdk } = useSdk();

  useEffect(() => {
    (async () => {
      if (sdk) {
        console.log({ sdk });
        const nativeToken = await sdk.rpc.queryNativeToken();
        console.log("Native token:", nativeToken);
        const validators = await sdk.rpc.queryAllValidators();
        console.log("Validators:", validators);

        try {
          const revealPkTx = await sdk.tx.buildRevealPk({
            token: nativeToken,
            feeAmount: BigNumber(1),
            gasLimit: BigNumber(1),
            chainId: "campfire-square.ff09671d333707",
            publicKey:
              "tpknam1qptrn64myunqr4847yq4cn0uwek5ecwc7eeexjfc5npmd5kmg6ex563n5as",
          });
          console.log({ revealPkTx });
        } catch (e) {
          console.warn(e);
        }
      }
    })();
  }, [sdk]);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>Check the console to see SDK initialization logs!</p>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;

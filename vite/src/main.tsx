import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SdkProvider } from "./context/SdkProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SdkProvider>
      <App />
    </SdkProvider>
  </StrictMode>,
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";

import "./styles/main.css";
import "./styles/main.scss";
import "primereact/resources/themes/lara-light-amber/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrimeReactProvider value={{ ripple: false }}>
      <App />
    </PrimeReactProvider>
  </StrictMode>,
);

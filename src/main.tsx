import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/index.tsx";

console.log(import.meta.env.VITE_FIREBASE_KEY);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

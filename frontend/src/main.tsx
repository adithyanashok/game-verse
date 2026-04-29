import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { store } from "./store";
import { GoogleOAuthProvider } from "@react-oauth/google";
const VITE_GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* StrictMode intentionally re-runs effects in development, so screens
        cancel in-flight requests and reuse fresh cached Redux data. */}
    <Provider store={store}>
      <GoogleOAuthProvider clientId={VITE_GOOGLE_CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>
);

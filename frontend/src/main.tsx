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
    <Provider store={store}>
      <GoogleOAuthProvider clientId={VITE_GOOGLE_CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>
);

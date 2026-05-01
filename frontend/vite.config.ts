import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          // React core — must be its own isolated chunk and include all core dependencies
          // for React 19's internal state sharing to work correctly.
          if (
            id.match(/[\\/]node_modules[\\/](react|react-dom|scheduler|jsx-runtime|react-is|use-sync-external-store)[\\/]/) ||
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("node_modules/scheduler/")
          ) {
            return "react-core";
          }

          // Emotion (depends on react-core, keep separate from MUI)
          if (id.includes("@emotion/") || id.includes("node_modules/@emotion/")) {
            return "emotion";
          }

          // MUI (depends on emotion + react-core)
          if (id.includes("@mui/") || id.includes("node_modules/@mui/")) {
            return "mui";
          }

          // Charts (depends on react-core)
          if (
            id.includes("react-chartjs-2") || 
            id.includes("chart.js") ||
            id.includes("node_modules/chart.js")
          ) {
            return "charts";
          }

          // Discussion and larger features
          if (
            id.includes("socket.io-client") ||
            id.includes("react-virtuoso")
          ) {
            return "discussion";
          }

          return "vendor";
        },
      },
    },
  },
});

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

          // React core — must be its own isolated chunk
          if (
            id.includes("/react/") ||
            id.includes("/react-dom/") ||
            id.includes("/scheduler/")
          ) {
            return "react-core";
          }

          // Emotion (depends on react-core, keep separate from MUI)
          if (id.includes("@emotion/")) {
            return "emotion";
          }

          // MUI (depends on emotion + react-core)
          if (id.includes("@mui/")) {
            return "mui";
          }

          // Charts (depends on react-core)
          if (id.includes("react-chartjs-2") || id.includes("chart.js")) {
            return "charts";
          }

          // Discussion (no React dependency issues here)
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

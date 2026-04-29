import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return undefined;
          }

          if (
            id.includes("react-chartjs-2") ||
            id.includes("chart.js")
          ) {
            return "charts";
          }

          if (
            id.includes("socket.io-client") ||
            id.includes("react-virtuoso")
          ) {
            return "discussion";
          }

          if (
            id.includes("@mui/material") ||
            id.includes("@emotion/react") ||
            id.includes("@emotion/styled")
          ) {
            return "mui";
          }

          if (
            id.includes("react-router-dom") ||
            id.includes("react-redux") ||
            id.includes("@reduxjs/toolkit") ||
            id.includes("react-dom") ||
            id.includes("react")
          ) {
            return "framework";
          }

          return "vendor";
        },
      },
    },
  },
});

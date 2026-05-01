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
          if (!id.includes("node_modules")) return;

          if (id.includes("react-chartjs-2") || id.includes("chart.js")) {
            return "charts";
          }

          if (
            id.includes("socket.io-client") ||
            id.includes("react-virtuoso")
          ) {
            return "discussion";
          }

          // 🔥 Merge React + MUI into ONE chunk
          if (
            id.includes("@mui/material") ||
            id.includes("@emotion/react") ||
            id.includes("@emotion/styled") ||
            id.includes("react") ||
            id.includes("react-dom")
          ) {
            return "framework";
          }

          return "vendor";
        },
      },
    },
  },
});

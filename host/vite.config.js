import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "app",
      remotes: {
        bookApp: "http://localhost:6001/assets/bookEntry.js",
        userApp: "http://localhost:6002/assets/userEntry.js",
      },
      shared: [
        "react",
        "react-dom",
        "react-router-dom",
        "react-hot-toast",
        "axios",
      ],
    }),
  ],
  esbuild: {
    target: "esnext",
  },
  build: {
    target: "es2022",
  },
});

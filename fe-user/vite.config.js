import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "user_app",
      filename: "userEntry.js",
      exposes: {
        "./LoginTest": "./src/LoginTest",
        "./Login": "./src/Login",
        "./Register": "./src/Register",
        "./UserList": "./src/UserList",
      },
      shared: [
        "react",
        "react-dom",
        "react-hot-toast",
        "axios",
        "react-router-dom",
      ],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});

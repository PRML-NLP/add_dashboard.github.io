import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/add_dashboard.github.io/",
  plugins: [react()]
});

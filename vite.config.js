import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // If you're using React
import tailwindcss from "@tailwindcss/vite";
import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/", // Ensures proper asset paths
});
  plugins: [react()],
});
  css: {
    postcss: './postcss.config.js',
  },
})

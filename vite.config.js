import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // If you're using React
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/", // Ensures proper asset paths
});

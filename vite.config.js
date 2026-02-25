import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Vercel 배포: base "/"
// GitHub Pages 배포 시에는 "/ottogi-recruit/"로 변경 필요
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
});

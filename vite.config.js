import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages 배포 시 리포지토리 이름을 base에 설정
// 예: https://username.github.io/ottogi-recruit/ → base: "/ottogi-recruit/"
// Vercel/Netlify 배포 시에는 "/" 유지
export default defineConfig({
  plugins: [react()],
  base: "/ottogi-recruit/",
});

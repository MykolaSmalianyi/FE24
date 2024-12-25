import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {patchCssModules} from "vite-css-modules";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), patchCssModules()],
  build: {
    // Recommended minimum target (See FAQ for more details)
    target: 'es2022'
  }
})
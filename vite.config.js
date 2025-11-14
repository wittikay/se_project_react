 import { defineConfig } from "vite";
 import react from "@vitejs/plugin-react";
 
 export default defineConfig({
   base: process.env.NODE_ENV === 'production' ? "/se_project_react/" : "/",
   plugins: [react()],
   server: {
     port: 5173,
     historyApiFallback: true,
   },
 });
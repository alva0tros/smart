import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
    //base: "/nowa-ts/preview/",  // Use base path for while deploying the project the SSR.
    plugins: [react(), tsconfigPaths()],
    define: {
        "process.env": {},
    },
    build: {
        chunkSizeWarningLimit: 50000,
    },
    server: {
        host: true,
    },
});

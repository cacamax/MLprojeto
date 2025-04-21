import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { tempo } from "tempo-devtools/dist/vite";
import { visualizer } from "rollup-plugin-visualizer";

const conditionalPlugins: [string, Record<string, any>][] = [];

// @ts-ignore
if (process.env.TEMPO === "true") {
  conditionalPlugins.push(["tempo-devtools/swc", {}]);
}

// https://vitejs.dev/config/
export default defineConfig({
  base:
    process.env.NODE_ENV === "development"
      ? "/"
      : process.env.VITE_BASE_PATH || "/",
  optimizeDeps: {
    entries: ["src/main.tsx", "src/tempobook/**/*"],
  },
  plugins: [
    react({
      plugins: conditionalPlugins,
    }),
    tempo(),
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          "framer-motion": ["framer-motion"],
          ui: ["@/components/ui"],
          utils: ["@/lib/utils", "@/lib/performance"],
        },
        // Add cache busting with content hash
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.debug", "console.info"],
      },
      format: {
        comments: false,
      },
    },
    sourcemap: false,
    cssCodeSplit: true,
    // Enable CSS minification
    cssMinify: true,
    // Improve chunk loading strategy
    chunkSizeWarningLimit: 1000,
    // Reduce asset size
    assetsInlineLimit: 4096, // 4kb
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/mp-test.html': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
    // @ts-ignore
    allowedHosts: true,
  },
  // Add caching headers for production
  preview: {
    headers: {
      "Cache-Control": "public, max-age=31536000", // 1 year for static assets
    },
  },
});

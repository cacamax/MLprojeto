// vite.config.ts
import path from "path";
import { defineConfig } from "file:///C:/Users/MORDOR/Documents/ProjetoL/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/MORDOR/Documents/ProjetoL/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { tempo } from "file:///C:/Users/MORDOR/Documents/ProjetoL/node_modules/tempo-devtools/dist/vite/index.js";
import { visualizer } from "file:///C:/Users/MORDOR/Documents/ProjetoL/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
var __vite_injected_original_dirname = "C:\\Users\\MORDOR\\Documents\\ProjetoL";
var conditionalPlugins = [];
if (process.env.TEMPO === "true") {
  conditionalPlugins.push(["tempo-devtools/swc", {}]);
}
var vite_config_default = defineConfig({
  base: process.env.NODE_ENV === "development" ? "/" : process.env.VITE_BASE_PATH || "/",
  optimizeDeps: {
    entries: ["src/main.tsx", "src/tempobook/**/*"]
  },
  plugins: [
    react({
      plugins: conditionalPlugins
    }),
    tempo(),
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true
    })
  ],
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          "framer-motion": ["framer-motion"],
          ui: ["@/components/ui"],
          utils: ["@/lib/utils", "@/lib/performance"]
        },
        // Add cache busting with content hash
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]"
      }
    },
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.debug", "console.info"]
      },
      format: {
        comments: false
      }
    },
    sourcemap: false,
    cssCodeSplit: true,
    // Enable CSS minification
    cssMinify: true,
    // Improve chunk loading strategy
    chunkSizeWarningLimit: 1e3,
    // Reduce asset size
    assetsInlineLimit: 4096
    // 4kb
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false
      },
      "/mp-test.html": {
        target: "http://localhost:3000",
        changeOrigin: true
      }
    },
    // @ts-ignore
    allowedHosts: true
  },
  // Add caching headers for production
  preview: {
    headers: {
      "Cache-Control": "public, max-age=31536000"
      // 1 year for static assets
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxNT1JET1JcXFxcRG9jdW1lbnRzXFxcXFByb2pldG9MXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxNT1JET1JcXFxcRG9jdW1lbnRzXFxcXFByb2pldG9MXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9NT1JET1IvRG9jdW1lbnRzL1Byb2pldG9ML3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiO1xuaW1wb3J0IHsgdGVtcG8gfSBmcm9tIFwidGVtcG8tZGV2dG9vbHMvZGlzdC92aXRlXCI7XG5pbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSBcInJvbGx1cC1wbHVnaW4tdmlzdWFsaXplclwiO1xuXG5jb25zdCBjb25kaXRpb25hbFBsdWdpbnM6IFtzdHJpbmcsIFJlY29yZDxzdHJpbmcsIGFueT5dW10gPSBbXTtcblxuLy8gQHRzLWlnbm9yZVxuaWYgKHByb2Nlc3MuZW52LlRFTVBPID09PSBcInRydWVcIikge1xuICBjb25kaXRpb25hbFBsdWdpbnMucHVzaChbXCJ0ZW1wby1kZXZ0b29scy9zd2NcIiwge31dKTtcbn1cblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGJhc2U6XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwiZGV2ZWxvcG1lbnRcIlxuICAgICAgPyBcIi9cIlxuICAgICAgOiBwcm9jZXNzLmVudi5WSVRFX0JBU0VfUEFUSCB8fCBcIi9cIixcbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgZW50cmllczogW1wic3JjL21haW4udHN4XCIsIFwic3JjL3RlbXBvYm9vay8qKi8qXCJdLFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgcmVhY3Qoe1xuICAgICAgcGx1Z2luczogY29uZGl0aW9uYWxQbHVnaW5zLFxuICAgIH0pLFxuICAgIHRlbXBvKCksXG4gICAgdmlzdWFsaXplcih7XG4gICAgICBvcGVuOiBmYWxzZSxcbiAgICAgIGd6aXBTaXplOiB0cnVlLFxuICAgICAgYnJvdGxpU2l6ZTogdHJ1ZSxcbiAgICB9KSxcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIHByZXNlcnZlU3ltbGlua3M6IHRydWUsXG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgIH0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgIHZlbmRvcjogW1wicmVhY3RcIiwgXCJyZWFjdC1kb21cIiwgXCJyZWFjdC1yb3V0ZXItZG9tXCJdLFxuICAgICAgICAgIFwiZnJhbWVyLW1vdGlvblwiOiBbXCJmcmFtZXItbW90aW9uXCJdLFxuICAgICAgICAgIHVpOiBbXCJAL2NvbXBvbmVudHMvdWlcIl0sXG4gICAgICAgICAgdXRpbHM6IFtcIkAvbGliL3V0aWxzXCIsIFwiQC9saWIvcGVyZm9ybWFuY2VcIl0sXG4gICAgICAgIH0sXG4gICAgICAgIC8vIEFkZCBjYWNoZSBidXN0aW5nIHdpdGggY29udGVudCBoYXNoXG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiBcImFzc2V0cy9bbmFtZV0tW2hhc2hdLmpzXCIsXG4gICAgICAgIGNodW5rRmlsZU5hbWVzOiBcImFzc2V0cy9bbmFtZV0tW2hhc2hdLmpzXCIsXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiBcImFzc2V0cy9bbmFtZV0tW2hhc2hdLltleHRdXCIsXG4gICAgICB9LFxuICAgIH0sXG4gICAgbWluaWZ5OiBcInRlcnNlclwiLFxuICAgIHRlcnNlck9wdGlvbnM6IHtcbiAgICAgIGNvbXByZXNzOiB7XG4gICAgICAgIGRyb3BfY29uc29sZTogdHJ1ZSxcbiAgICAgICAgZHJvcF9kZWJ1Z2dlcjogdHJ1ZSxcbiAgICAgICAgcHVyZV9mdW5jczogW1wiY29uc29sZS5sb2dcIiwgXCJjb25zb2xlLmRlYnVnXCIsIFwiY29uc29sZS5pbmZvXCJdLFxuICAgICAgfSxcbiAgICAgIGZvcm1hdDoge1xuICAgICAgICBjb21tZW50czogZmFsc2UsXG4gICAgICB9LFxuICAgIH0sXG4gICAgc291cmNlbWFwOiBmYWxzZSxcbiAgICBjc3NDb2RlU3BsaXQ6IHRydWUsXG4gICAgLy8gRW5hYmxlIENTUyBtaW5pZmljYXRpb25cbiAgICBjc3NNaW5pZnk6IHRydWUsXG4gICAgLy8gSW1wcm92ZSBjaHVuayBsb2FkaW5nIHN0cmF0ZWd5XG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxMDAwLFxuICAgIC8vIFJlZHVjZSBhc3NldCBzaXplXG4gICAgYXNzZXRzSW5saW5lTGltaXQ6IDQwOTYsIC8vIDRrYlxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBwcm94eToge1xuICAgICAgJy9hcGknOiB7XG4gICAgICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcsXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgc2VjdXJlOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICAnL21wLXRlc3QuaHRtbCc6IHtcbiAgICAgICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDozMDAwJyxcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBhbGxvd2VkSG9zdHM6IHRydWUsXG4gIH0sXG4gIC8vIEFkZCBjYWNoaW5nIGhlYWRlcnMgZm9yIHByb2R1Y3Rpb25cbiAgcHJldmlldzoge1xuICAgIGhlYWRlcnM6IHtcbiAgICAgIFwiQ2FjaGUtQ29udHJvbFwiOiBcInB1YmxpYywgbWF4LWFnZT0zMTUzNjAwMFwiLCAvLyAxIHllYXIgZm9yIHN0YXRpYyBhc3NldHNcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWtTLE9BQU8sVUFBVTtBQUNuVCxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7QUFDbEIsU0FBUyxhQUFhO0FBQ3RCLFNBQVMsa0JBQWtCO0FBSjNCLElBQU0sbUNBQW1DO0FBTXpDLElBQU0scUJBQXNELENBQUM7QUFHN0QsSUFBSSxRQUFRLElBQUksVUFBVSxRQUFRO0FBQ2hDLHFCQUFtQixLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO0FBQ3BEO0FBR0EsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFDRSxRQUFRLElBQUksYUFBYSxnQkFDckIsTUFDQSxRQUFRLElBQUksa0JBQWtCO0FBQUEsRUFDcEMsY0FBYztBQUFBLElBQ1osU0FBUyxDQUFDLGdCQUFnQixvQkFBb0I7QUFBQSxFQUNoRDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLE1BQ0osU0FBUztBQUFBLElBQ1gsQ0FBQztBQUFBLElBQ0QsTUFBTTtBQUFBLElBQ04sV0FBVztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLE1BQ1YsWUFBWTtBQUFBLElBQ2QsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLGtCQUFrQjtBQUFBLElBQ2xCLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGNBQWM7QUFBQSxVQUNaLFFBQVEsQ0FBQyxTQUFTLGFBQWEsa0JBQWtCO0FBQUEsVUFDakQsaUJBQWlCLENBQUMsZUFBZTtBQUFBLFVBQ2pDLElBQUksQ0FBQyxpQkFBaUI7QUFBQSxVQUN0QixPQUFPLENBQUMsZUFBZSxtQkFBbUI7QUFBQSxRQUM1QztBQUFBO0FBQUEsUUFFQSxnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxJQUNSLGVBQWU7QUFBQSxNQUNiLFVBQVU7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLGVBQWU7QUFBQSxRQUNmLFlBQVksQ0FBQyxlQUFlLGlCQUFpQixjQUFjO0FBQUEsTUFDN0Q7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNOLFVBQVU7QUFBQSxNQUNaO0FBQUEsSUFDRjtBQUFBLElBQ0EsV0FBVztBQUFBLElBQ1gsY0FBYztBQUFBO0FBQUEsSUFFZCxXQUFXO0FBQUE7QUFBQSxJQUVYLHVCQUF1QjtBQUFBO0FBQUEsSUFFdkIsbUJBQW1CO0FBQUE7QUFBQSxFQUNyQjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLFFBQ04sUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsUUFBUTtBQUFBLE1BQ1Y7QUFBQSxNQUNBLGlCQUFpQjtBQUFBLFFBQ2YsUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLE1BQ2hCO0FBQUEsSUFDRjtBQUFBO0FBQUEsSUFFQSxjQUFjO0FBQUEsRUFDaEI7QUFBQTtBQUFBLEVBRUEsU0FBUztBQUFBLElBQ1AsU0FBUztBQUFBLE1BQ1AsaUJBQWlCO0FBQUE7QUFBQSxJQUNuQjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import "./styles/transitions.css";
import { generateSchemaMarkup } from "./lib/schema";
import ErrorBoundary from "./components/ErrorBoundary";

// Import tempo-devtools directly from the dist folder to avoid CommonJS issues
// import { TempoDevtools } from "tempo-devtools";
import {
  reportPerformanceMetrics,
  preloadCriticalResources,
  lazyLoadImages,
} from "./lib/performance";

// Preload critical resources
preloadCriticalResources(["/favicon.svg", "/src/index.css"]);

// Initialize Tempo devtools - only in development
if (process.env.NODE_ENV !== "production") {
  // Comment out the Tempo initialization since the module is not available
  /*
  try {
    TempoDevtools.init();
  } catch (e) {
    console.error("Failed to initialize Tempo devtools", e);
  }
  */

  // Report performance metrics in non-production environments
  reportPerformanceMetrics();
}

// Add Schema.org JSON-LD markup for SEO
const addSchemaMarkup = () => {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.text = JSON.stringify(generateSchemaMarkup());
  document.head.appendChild(script);
};

// Execute after DOM is loaded
if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", () => {
    addSchemaMarkup();
    // Initialize lazy loading for images
    lazyLoadImages();
  });
}

const basename = import.meta.env.BASE_URL;

// Use requestIdleCallback to defer non-critical initialization
const renderApp = () => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <ErrorBoundary>
        <BrowserRouter basename={basename}>
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </React.StrictMode>,
  );
};

// Use requestIdleCallback if available, otherwise use setTimeout
if (typeof window.requestIdleCallback === "function") {
  window.requestIdleCallback(renderApp);
} else {
  setTimeout(renderApp, 1);
}

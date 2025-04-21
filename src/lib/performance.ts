/**
 * Performance optimization utilities
 */

// Debounce function to limit how often a function can be called
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

// Throttle function to limit the rate at which a function is executed
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;

  return function (...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Lazy load images when they enter the viewport
export function lazyLoadImages() {
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.getAttribute("data-src");
            const srcset = img.getAttribute("data-srcset");
            const sizes = img.getAttribute("data-sizes");

            if (src) {
              img.src = src;
              img.removeAttribute("data-src");
            }

            if (srcset) {
              img.srcset = srcset;
              img.removeAttribute("data-srcset");
            }

            if (sizes) {
              img.sizes = sizes;
              img.removeAttribute("data-sizes");
            }

            // Add loading="lazy" attribute if not already present
            if (!img.hasAttribute("loading")) {
              img.loading = "lazy";
            }

            observer.unobserve(img);
          }
        });
      },
      {
        rootMargin: "200px 0px", // Start loading images 200px before they appear in viewport
        threshold: 0.01,
      },
    );

    // Apply to all images with data-src attribute
    const imgs = document.querySelectorAll("img[data-src]");
    imgs.forEach((img) => imageObserver.observe(img));

    // Also apply to images without explicit data-src but without loading attribute
    const regularImgs = document.querySelectorAll("img:not([loading])");
    regularImgs.forEach((img) => {
      // Skip images that are already loaded or have loading attribute
      if (!img.complete && !img.hasAttribute("loading")) {
        img.loading = "lazy";
      }
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    const lazyImages = document.querySelectorAll("img[data-src]");

    lazyImages.forEach((img) => {
      const src = img.getAttribute("data-src");
      const srcset = img.getAttribute("data-srcset");
      const sizes = img.getAttribute("data-sizes");

      if (src) {
        (img as HTMLImageElement).src = src;
        img.removeAttribute("data-src");
      }

      if (srcset) {
        (img as HTMLImageElement).srcset = srcset;
        img.removeAttribute("data-srcset");
      }

      if (sizes) {
        (img as HTMLImageElement).sizes = sizes;
        img.removeAttribute("data-sizes");
      }
    });
  }
}

// Preload critical resources
export function preloadCriticalResources(resources: string[]) {
  // Avoid preloading in SSR context
  if (typeof document === "undefined") return;

  resources.forEach((resource) => {
    // Skip if this resource is already preloaded
    if (document.querySelector(`link[rel="preload"][href="${resource}"]`)) {
      return;
    }

    const link = document.createElement("link");
    link.rel = "preload";
    link.href = resource;

    // Set appropriate as attribute based on file extension
    if (resource.endsWith(".js") || resource.endsWith(".tsx")) {
      link.as = "script";
    } else if (resource.endsWith(".css")) {
      link.as = "style";
    } else if (
      resource.endsWith(".woff2") ||
      resource.endsWith(".woff") ||
      resource.endsWith(".ttf")
    ) {
      link.as = "font";
      link.crossOrigin = "anonymous";
    } else if (
      resource.endsWith(".jpg") ||
      resource.endsWith(".jpeg") ||
      resource.endsWith(".png") ||
      resource.endsWith(".webp") ||
      resource.endsWith(".svg")
    ) {
      link.as = "image";
    }

    document.head.appendChild(link);
  });
}

// Measure and report performance metrics
export function reportPerformanceMetrics() {
  if ("performance" in window && "getEntriesByType" in performance) {
    // Wait for the page to fully load
    window.addEventListener("load", () => {
      // Use requestIdleCallback to avoid blocking the main thread
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(() => collectMetrics());
      } else {
        setTimeout(() => collectMetrics(), 0);
      }
    });
  }
}

// Helper function to collect performance metrics
function collectMetrics() {
  try {
    const paintMetrics = performance.getEntriesByType("paint");
    const navigationTiming = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming;

    // First Contentful Paint
    const fcp = paintMetrics.find(
      ({ name }) => name === "first-contentful-paint",
    );

    // Largest Contentful Paint
    let lcp = "Not available";
    if ("PerformanceObserver" in window) {
      const lcpEntries: PerformanceEntry[] = [];
      const lcpObserver = new PerformanceObserver((entryList) => {
        lcpEntries.push(...entryList.getEntries());
      });
      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
      if (lcpEntries.length > 0) {
        lcp = lcpEntries[lcpEntries.length - 1].startTime;
      }
    }

    // Time to Interactive - approximation
    const tti = navigationTiming.domInteractive;

    // Time to First Byte
    const ttfb = navigationTiming.responseStart - navigationTiming.requestStart;

    // Cumulative Layout Shift
    let cls = "Not available";
    if ("PerformanceObserver" in window) {
      const clsEntries: any[] = [];
      const clsObserver = new PerformanceObserver((entryList) => {
        clsEntries.push(...entryList.getEntries());
      });
      clsObserver.observe({ type: "layout-shift", buffered: true });
      if (clsEntries.length > 0) {
        cls = clsEntries.reduce(
          (sum: number, entry: any) => sum + entry.value,
          0,
        );
      }
    }

    // Log metrics
    console.log("Performance Metrics:", {
      "First Contentful Paint (ms)": fcp ? fcp.startTime : "Not available",
      "Largest Contentful Paint (ms)": lcp,
      "Time to Interactive (ms)": tti,
      "Time to First Byte (ms)": ttfb,
      "Cumulative Layout Shift": cls,
      "Total Page Load Time (ms)":
        navigationTiming.loadEventEnd - navigationTiming.startTime,
    });

    // Here you would typically send these metrics to your analytics service
  } catch (error) {
    console.error("Error collecting performance metrics:", error);
  }
}

// Defer non-critical JavaScript
export function deferNonCriticalJS(callback: () => void) {
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(callback);
  } else {
    setTimeout(callback, 1);
  }
}

// Optimize font loading
export function optimizeFontLoading(fontUrl: string) {
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "font";
  link.href = fontUrl;
  link.type = "font/woff2";
  link.crossOrigin = "anonymous";
  document.head.appendChild(link);

  // Add font-display: swap to ensure text remains visible during font loading
  const style = document.createElement("style");
  style.textContent = `
    @font-face {
      font-family: 'CustomFont';
      src: url('${fontUrl}');
      font-display: swap;
    }
  `;
  document.head.appendChild(style);
}

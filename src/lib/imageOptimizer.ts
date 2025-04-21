/**
 * Image optimization utilities
 */

// Function to optimize image URLs
export function optimizeImageUrl(
  url: string,
  width: number = 800,
  quality: number = 80,
): string {
  // Handle Unsplash images
  if (url.includes("unsplash.com")) {
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}w=${width}&q=${quality}&fm=webp&auto=compress`;
  }

  // For other images, just return the original URL
  return url;
}

// Generate srcset for responsive images
export function generateSrcSet(
  url: string,
  sizes: number[] = [320, 640, 768, 1024, 1280, 1536],
): string {
  if (!url.includes("unsplash.com")) return "";

  return sizes
    .map((size) => `${optimizeImageUrl(url, size)} ${size}w`)
    .join(", ");
}

// Preload critical images
export function preloadCriticalImages(urls: string[]): void {
  if (typeof document === "undefined") return;

  urls.forEach((url) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = url;
    link.type = "image/webp";
    document.head.appendChild(link);
  });
}

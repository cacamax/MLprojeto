import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholderColor?: string;
  loadingStrategy?: "lazy" | "eager";
  priority?: boolean; // Add priority prop for above-the-fold images
  sizes?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
  placeholderColor = "#f3f4f6",
  loadingStrategy = "lazy",
  priority = false,
  sizes = "100vw",
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [srcSet, setSrcSet] = useState<string | undefined>(undefined);

  // Convert image URL to WebP if it's a JPEG or PNG
  useEffect(() => {
    // Check if the URL is already a WebP or SVG
    if (src.endsWith(".webp") || src.endsWith(".svg")) {
      setImageSrc(src);
      return;
    }

    // For Unsplash images, add WebP format and generate srcset
    if (src.includes("unsplash.com")) {
      const separator = src.includes("?") ? "&" : "?";
      const baseUrl = `${src}${separator}fm=webp&q=80`;
      setImageSrc(baseUrl);

      // Generate srcset for responsive images - reduced sizes
      const widths = [320, 640, 768, 1024];
      const srcSetValue = widths
        .map((w) => `${baseUrl}&w=${w} ${w}w`)
        .join(", ");
      setSrcSet(srcSetValue);
    } else if (
      src.endsWith(".jpg") ||
      src.endsWith(".jpeg") ||
      src.endsWith(".png")
    ) {
      // For other images, just use the original
      setImageSrc(src);
    } else {
      setImageSrc(src);
    }
  }, [src]);

  // Define loading strategy based on priority
  const loading = priority ? "eager" : loadingStrategy;
  const fetchPriority = priority ? "high" : "auto";

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        backgroundColor: placeholderColor,
        width: width ? `${width}px` : "100%",
        height: height ? `${height}px` : "auto",
        aspectRatio: width && height ? `${width}/${height}` : "auto",
      }}
    >
      {imageSrc && (
        <picture>
          {srcSet && <source srcSet={srcSet} sizes={sizes} type="image/webp" />}
          <img
            src={imageSrc}
            alt={alt}
            width={width}
            height={height}
            loading={loading}
            fetchPriority={fetchPriority}
            onLoad={() => setIsLoaded(true)}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-300",
              isLoaded ? "opacity-100" : "opacity-0",
            )}
            style={{ contentVisibility: priority ? "auto" : "auto" }}
          />
        </picture>
      )}
    </div>
  );
};

export default LazyImage;

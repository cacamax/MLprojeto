import React, { useState, useEffect } from "react";

interface ImageOptimizerProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean; // Add priority prop for above-the-fold images
}

const ImageOptimizer: React.FC<ImageOptimizerProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
  sizes = "100vw",
  priority = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [blurDataURL, setBlurDataURL] = useState("");

  // Generate a tiny placeholder
  useEffect(() => {
    if (!priority) {
      // Create a simple colored placeholder based on the image URL
      // This is a simple hash function to generate a consistent color
      const hash = src.split("").reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
      }, 0);
      const color = `hsl(${Math.abs(hash) % 360}, 20%, 90%)`;
      setBlurDataURL(color);
    }
  }, [src, priority]);

  // Function to generate WebP URL for Unsplash images
  const getOptimizedUrl = (
    url: string,
    format: string = "webp",
    quality: number = 80,
  ) => {
    if (url.includes("unsplash.com")) {
      const separator = url.includes("?") ? "&" : "?";
      return `${url}${separator}fm=${format}&q=${quality}`;
    }
    return url;
  };

  // Generate srcset for responsive images
  const generateSrcSet = (url: string) => {
    if (!url.includes("unsplash.com")) return undefined;

    // Optimize for different screen sizes - reduced sizes
    const widths = [320, 640, 768, 1024];
    return widths
      .map((w) => `${getOptimizedUrl(url, "webp", 80)}&w=${w} ${w}w`)
      .join(", ");
  };

  const srcset = generateSrcSet(src);
  const optimizedSrc = getOptimizedUrl(src);

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: blurDataURL,
        width: width ? `${width}px` : "100%",
        height: height ? `${height}px` : "auto",
      }}
      className={className}
    >
      <picture>
        {/* WebP format */}
        <source srcSet={srcset} sizes={sizes} type="image/webp" />

        {/* Fallback to original format */}
        <img
          src={optimizedSrc}
          alt={alt}
          width={width}
          height={height}
          className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          style={{ contentVisibility: "auto" }}
          onLoad={() => setIsLoaded(true)}
        />
      </picture>
    </div>
  );
};

export default ImageOptimizer;

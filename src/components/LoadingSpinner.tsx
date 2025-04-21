import React from "react";
import { motion, LazyMotion, domAnimation } from "framer-motion";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  color = "#9C27B0",
}) => {
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const spinTransition = {
    loop: Infinity,
    ease: "linear",
    duration: 1,
  };

  return (
    <div className="flex items-center justify-center">
      <LazyMotion features={domAnimation}>
        <motion.div
          className={`${sizeMap[size]} rounded-full border-t-2 border-b-2`}
          style={{
            borderTopColor: color,
            borderBottomColor: color,
            borderLeftColor: "transparent",
            borderRightColor: "transparent",
          }}
          animate={{ rotate: 360 }}
          transition={spinTransition}
        />
      </LazyMotion>
    </div>
  );
};

export default LoadingSpinner;

import React from "react";
import { motion, LazyMotion, domAnimation } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <LazyMotion features={domAnimation}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 0.5,
        }}
      >
        {children}
      </motion.div>
    </LazyMotion>
  );
};

export default PageTransition;

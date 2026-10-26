"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  return <motion.div style={{ scaleX }} className="absolute inset-x-0 -bottom-px h-px origin-left bg-acid" />;
}

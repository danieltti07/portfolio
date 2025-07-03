"use client"

import { motion, useScroll, useSpring } from "framer-motion"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-yellow-400 to-gold z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Scroll Indicator */}
      <motion.div
        className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
      >
        <div className="flex flex-col items-center gap-2">
          <motion.div
            className="w-1 h-20 bg-gradient-to-b from-gold/50 to-transparent rounded-full"
            style={{ scaleY: scrollYProgress }}
          />
          <motion.div
            className="w-3 h-3 bg-gold rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
        </div>
      </motion.div>
    </>
  )
}

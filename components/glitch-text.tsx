"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface GlitchTextProps {
  children: string
  className?: string
  autoTrigger?: boolean
  interval?: number
}

export function GlitchText({ children, className = "", autoTrigger = false, interval = 8000 }: GlitchTextProps) {
  const [glitchText, setGlitchText] = useState(children)
  const [isGlitching, setIsGlitching] = useState(false)

  const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?"

  useEffect(() => {
    if (autoTrigger) {
      const triggerGlitch = () => {
        setIsGlitching(true)
      }

      const intervalId = setInterval(triggerGlitch, interval)
      return () => clearInterval(intervalId)
    }
  }, [autoTrigger, interval])

  useEffect(() => {
    if (isGlitching) {
      let iterations = 0
      const maxIterations = 10

      const glitchInterval = setInterval(() => {
        setGlitchText(
          children
            .split("")
            .map((char, index) => {
              if (index < iterations) {
                return children[index]
              }
              return glitchChars[Math.floor(Math.random() * glitchChars.length)]
            })
            .join(""),
        )

        iterations += 1

        if (iterations >= maxIterations) {
          clearInterval(glitchInterval)
          setGlitchText(children)
          setIsGlitching(false)
        }
      }, 50)

      return () => clearInterval(glitchInterval)
    }
  }, [isGlitching, children])

  return (
    <motion.span
      className={`${className} cursor-pointer`}
      onHoverStart={() => setIsGlitching(true)}
      animate={
        isGlitching
          ? {
              textShadow: ["0 0 0 transparent", "2px 0 0 #ff0000, -2px 0 0 #00ff00", "0 0 0 transparent"],
              x: [0, -2, 2, 0],
            }
          : {}
      }
      transition={{ duration: 0.3 }}
    >
      {glitchText}
    </motion.span>
  )
}

"use client"

import { motion } from "framer-motion"
import { Code, Coffee, Heart, Star, Zap, Gamepad2, Palette, Database } from "lucide-react"

const floatingIcons = [
  { icon: Code, color: "#60A5FA", delay: 0 },
  { icon: Coffee, color: "#F59E0B", delay: 0.5 },
  { icon: Heart, color: "#EF4444", delay: 1 },
  { icon: Star, color: "#FFD700", delay: 1.5 },
  { icon: Zap, color: "#8B5CF6", delay: 2 },
  { icon: Gamepad2, color: "#10B981", delay: 2.5 },
  { icon: Palette, color: "#F97316", delay: 3 },
  { icon: Database, color: "#06B6D4", delay: 3.5 },
]

export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: `${10 + ((index * 12) % 80)}%`,
            top: `${20 + ((index * 15) % 60)}%`,
            color: item.color,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.3, 0],
            scale: [0, 1, 0],
            y: [0, -100, -200],
            x: [0, Math.sin(index) * 50, Math.sin(index + 1) * 100],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            delay: item.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <item.icon size={24} />
        </motion.div>
      ))}
    </div>
  )
}

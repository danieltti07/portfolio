"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface SoundContextType {
  soundEnabled: boolean
  toggleSound: () => void
  playSound: (soundType: "click" | "hover" | "success") => void
}

const SoundContext = createContext<SoundContextType | undefined>(undefined)

export function SoundProvider({ children }: { children: ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState(false)

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled)
  }

  const playSound = (soundType: "click" | "hover" | "success") => {
    if (!soundEnabled) return

    // Placeholder for sound implementation
    // You can add actual sound files later
    console.log(`Playing ${soundType} sound`)
  }

  return <SoundContext.Provider value={{ soundEnabled, toggleSound, playSound }}>{children}</SoundContext.Provider>
}

export function useSound() {
  const context = useContext(SoundContext)
  if (context === undefined) {
    throw new Error("useSound must be used within a SoundProvider")
  }
  return context
}

"use client"

import { useEffect, useState } from "react"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isClicking, setIsClicking] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "BUTTON" || target.tagName === "A" || target.classList.contains("clickable")) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    document.addEventListener("mousemove", updatePosition)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseover", handleMouseOver)

    return () => {
      document.removeEventListener("mousemove", updatePosition)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseover", handleMouseOver)
    }
  }, [])

  return (
    <div
      className={`fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-100 ${
        isClicking ? "scale-75" : isHovering ? "scale-125" : "scale-100"
      }`}
      style={{
        transform: `translate(${position.x - 12}px, ${position.y - 12}px)`,
      }}
    >
      {/* Pixel Art Sword Cursor */}
      <svg width="24" height="24" viewBox="0 0 24 24" className="drop-shadow-lg">
        {/* Sword Handle */}
        <rect x="10" y="16" width="4" height="6" fill="#8B4513" />
        <rect x="9" y="20" width="6" height="2" fill="#FFD700" />

        {/* Sword Guard */}
        <rect x="8" y="14" width="8" height="2" fill="#C0C0C0" />

        {/* Sword Blade */}
        <rect x="11" y="2" width="2" height="12" fill="#E6E6FA" />
        <rect x="10" y="4" width="1" height="8" fill="#D3D3D3" />
        <rect x="13" y="4" width="1" height="8" fill="#F0F8FF" />

        {/* Sword Tip */}
        <rect x="11" y="0" width="2" height="2" fill="#E6E6FA" />
        <rect x="12" y="1" width="1" height="1" fill="#F0F8FF" />

        {/* Glow Effect */}
        {isHovering && (
          <rect x="10" y="0" width="4" height="22" fill="none" stroke="#FFD700" strokeWidth="1" opacity="0.6" />
        )}
      </svg>
    </div>
  )
}

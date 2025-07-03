"use client"

import type React from "react"

import { motion } from "framer-motion"
import Image from "next/image"
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react"
import { useState, useEffect } from "react"

import { InteractiveBackground } from "@/components/interactive-background"
import { FloatingElements } from "@/components/floating-elements"
import { ScrollProgress } from "@/components/scroll-progress"
import { MagneticButton } from "@/components/magnetic-button"
import { TextReveal } from "@/components/text-reveal"
import { GlitchText } from "@/components/glitch-text"

const specialties = ["FULL STACK", "REACT EXPERT", "NODE.JS DEV", "UI/UX DESIGNER", "PIXEL ARTIST", "TECH LOVER"]

export default function Home() {
  const [currentSpecialty, setCurrentSpecialty] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [typeSpeed, setTypeSpeed] = useState(150)

  useEffect(() => {
    const handleTyping = () => {
      const current = specialties[currentSpecialty]

      if (isDeleting) {
        setDisplayText(current.substring(0, displayText.length - 1))
        setTypeSpeed(75)
      } else {
        setDisplayText(current.substring(0, displayText.length + 1))
        setTypeSpeed(150)
      }

      if (!isDeleting && displayText === current) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false)
        setCurrentSpecialty((prev) => (prev + 1) % specialties.length)
      }
    }

    const timer = setTimeout(handleTyping, typeSpeed)
    return () => clearTimeout(timer)
  }, [displayText, isDeleting, currentSpecialty, typeSpeed])

  return (
    <div className="min-h-screen pt-16 relative">
      <InteractiveBackground />
      <FloatingElements />
      <ScrollProgress />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background GIF */}
        <div className="absolute inset-0 z-0">
          <Image
            src="gif/coffe.gif"
            alt="Japanese Restaurant Scene - Pixel Art"
            fill
            className="object-cover opacity-60"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-purple/40 via-deep-purple/30 to-deep-purple/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-2 sm:px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-6 sm:mb-8"
          >
            <motion.h1
              className="pixel-text text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-gold mb-2 sm:mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <GlitchText autoTrigger={true} interval={8000}>
                DESENVOLVEDOR
              </GlitchText>
            </motion.h1>
            <div className="h-12 sm:h-16 md:h-20 flex items-center justify-center">
              <h2 className="pixel-text text-lg sm:text-2xl md:text-3xl lg:text-4xl text-cream mb-4 sm:mb-6">
                {displayText}
                <motion.span
                  className="text-gold"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                  |
                </motion.span>
              </h2>
            </div>
            <TextReveal
              className="japanese-text text-cream/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed px-2"
              delay={0.5}
            >
              Criando experiências digitais únicas com código limpo e design inovador. Especializado em React, Next.js e
              tecnologias modernas.
            </TextReveal>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center space-x-4 sm:space-x-6 mb-8 sm:mb-12"
          >
            <MagneticButton>
              <SocialLink
                href="https://github.com"
                icon={<Github size={20} className="sm:w-6 sm:h-6" />}
                label="GitHub"
              />
            </MagneticButton>
            <MagneticButton>
              <SocialLink
                href="https://linkedin.com"
                icon={<Linkedin size={20} className="sm:w-6 sm:h-6" />}
                label="LinkedIn"
              />
            </MagneticButton>
            <MagneticButton>
              <SocialLink
                href="mailto:contato@exemplo.com"
                icon={<Mail size={20} className="sm:w-6 sm:h-6" />}
                label="Email"
              />
            </MagneticButton>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
          >
            <MagneticButton href="/projetos">
              <div className="retro-button text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4">Ver Projetos</div>
            </MagneticButton>
            <MagneticButton href="/contato">
              <div className="retro-button text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4">Entre em Contato</div>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={() => {
            document.querySelector("#intro-section")?.scrollIntoView({
              behavior: "smooth",
            })
          }}
        >
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
            <ArrowDown className="text-gold hover:scale-110 transition-transform" size={24} />
          </motion.div>
        </motion.div>
      </section>

      {/* Enhanced Quick Intro Section */}
      <section id="intro-section" className="py-12 sm:py-20 px-2 sm:px-4 bg-deep-purple/20 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-10 left-10 w-20 sm:w-32 h-20 sm:h-32 bg-purple-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-24 sm:w-40 h-24 sm:h-40 bg-purple-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.6, 0.3, 0.6],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
          />
          <motion.div
            className="absolute top-1/2 left-1/4 w-16 sm:w-24 h-16 sm:h-24 bg-cyan-500/5 rounded-full blur-2xl"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Enhanced Title */}
            <motion.div className="mb-8 sm:mb-12">
              <motion.h3
                className="pixel-text text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gold mb-6 sm:mb-8 relative inline-block"
                whileHover={{ scale: 1.02 }}
              >
                <TextReveal>BEM-VINDO AO MEU UNIVERSO DIGITAL</TextReveal>
                <motion.div
                  className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-2 sm:w-3 h-2 sm:h-3 bg-purple-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                />
                <div className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
              </motion.h3>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <TextReveal
                  className="japanese-text text-cream/90 text-base sm:text-lg md:text-xl leading-relaxed max-w-4xl mx-auto px-2"
                  delay={0.3}
                >
                  Transformo ideias em realidade através do código. Com experiência em desenvolvimento full-stack, crio
                  soluções que combinam funcionalidade, performance e design excepcional.
                </TextReveal>
              </motion.div>
            </motion.div>

            {/* Enhanced Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 mt-12 sm:mt-16">
              <EnhancedSkillCard
                title="FRONTEND"
                description="React, Next.js, TypeScript"
                icon="💻"
                color="from-blue-500 to-cyan-500"
                technologies={["React", "Next.js", "TypeScript", "Tailwind"]}
                index={0}
              />
              <EnhancedSkillCard
                title="BACKEND"
                description="Node.js, Python, APIs"
                icon="⚡"
                color="from-green-500 to-emerald-500"
                technologies={["Node.js", "Python", "APIs", "Databases"]}
                index={1}
              />
              <EnhancedSkillCard
                title="DESIGN"
                description="UI/UX, Pixel Art, Animações"
                icon="🎨"
                color="from-purple-500 to-pink-500"
                technologies={["UI/UX", "Figma", "Animations", "Pixel Art"]}
                index={2}
              />
            </div>

            {/* Additional Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 max-w-4xl mx-auto"
            >
              {[
                { number: "50+", label: "Projetos", color: "text-blue-400" },
                { number: "3+", label: "Anos", color: "text-green-400" },
                { number: "25+", label: "Clientes", color: "text-purple-400" },
                { number: "100%", label: "Dedicação", color: "text-orange-400" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="bg-deep-purple/40 backdrop-blur-sm border border-purple-500/30 rounded-xl p-3 sm:p-4 text-center hover:border-purple-400/50 transition-all duration-300 cursor-pointer group"
                >
                  <motion.div
                    className={`pixel-text text-xl sm:text-2xl md:text-3xl ${stat.color} mb-1`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-cream/70 text-xs sm:text-sm group-hover:text-cream transition-colors">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 300)
  }

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 bg-gold/20 border-2 border-gold rounded-lg hover:bg-gold hover:text-deep-purple transition-all duration-300 group ${
        isClicked ? "animate-pulse bg-gold text-deep-purple" : ""
      }`}
      aria-label={label}
    >
      <span className="group-hover:scale-110 transition-transform">{icon}</span>
    </motion.a>
  )
}

function EnhancedSkillCard({
  title,
  description,
  icon,
  color,
  technologies,
  index,
}: {
  title: string
  description: string
  icon: string
  color: string
  technologies: string[]
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [clickCount, setClickCount] = useState(0)

  const handleClick = () => {
    setClickCount((prev) => prev + 1)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -10 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      className="group relative cursor-pointer"
    >
      {/* Gradient Border */}
      <div className={`bg-gradient-to-br ${color} p-1 rounded-3xl`}>
        <div className="bg-deep-purple/90 backdrop-blur-sm rounded-3xl p-4 sm:p-8 h-full transition-all duration-300 group-hover:bg-deep-purple/80 relative overflow-hidden">
          {/* Click effect */}
          {clickCount > 0 && (
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-purple-500/20 rounded-3xl"
              key={clickCount}
            />
          )}

          {/* Icon */}
          <motion.div
            className="text-2xl sm:text-4xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300"
            animate={{ rotate: isHovered ? 10 : 0 }}
          >
            {icon}
          </motion.div>

          {/* Title */}
          <h4 className="pixel-text text-lg sm:text-xl text-gold mb-3 sm:mb-4 transition-all duration-300">{title}</h4>

          {/* Description */}
          <p className="japanese-text text-cream/80 text-sm leading-relaxed mb-4 sm:mb-6">{description}</p>

          {/* Technology Tags */}
          <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
            {technologies.map((tech, techIndex) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 + techIndex * 0.1 + 0.5 }}
                viewport={{ once: true }}
                className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full border border-purple-500/30 hover:bg-purple-500/30 transition-colors"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Click counter easter egg */}
          {clickCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-2 sm:top-4 right-2 sm:right-4 text-purple-300 text-xs pixel-text"
            >
              +{clickCount}
            </motion.div>
          )}

          {/* Bottom accent line */}
          <div
            className={`absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r ${color} opacity-50 group-hover:opacity-100 transition-opacity`}
          />
        </div>
      </div>
    </motion.div>
  )
}

"use client"

import type React from "react"

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import {
  Code,
  Coffee,
  Gamepad2,
  Calendar,
  BookOpen,
  Heart,
  Zap,
  Download,
  Mail,
  Github,
  Linkedin,
  Star,
  Trophy,
  Target,
  Lightbulb,
} from "lucide-react"
import { useState, useRef } from "react"

const skills = [
  {
    category: "Frontend",
    icon: <Code className="w-4 h-4 sm:w-6 sm:h-6" />,
    color: "from-blue-500 to-cyan-500",
    technologies: [
      { name: "React", level: 95, years: 4 },
      { name: "Next.js", level: 92, years: 3 },
      { name: "TypeScript", level: 90, years: 3 },
      { name: "Tailwind CSS", level: 88, years: 2 },
      { name: "Framer Motion", level: 85, years: 2 },
      { name: "Three.js", level: 75, years: 1 },
    ],
  },
  {
    category: "Backend",
    icon: <Coffee className="w-4 h-4 sm:w-6 sm:h-6" />,
    color: "from-green-500 to-emerald-500",
    technologies: [
      { name: "Node.js", level: 90, years: 4 },
      { name: "Python", level: 85, years: 3 },
      { name: "PostgreSQL", level: 88, years: 3 },
      { name: "MongoDB", level: 82, years: 2 },
      { name: "Redis", level: 78, years: 2 },
      { name: "Docker", level: 80, years: 2 },
    ],
  },
  {
    category: "Design & Tools",
    icon: <Gamepad2 className="w-4 h-4 sm:w-6 sm:h-6" />,
    color: "from-purple-500 to-pink-500",
    technologies: [
      { name: "Figma", level: 85, years: 3 },
      { name: "Photoshop", level: 80, years: 4 },
      { name: "Git", level: 95, years: 5 },
      { name: "VS Code", level: 98, years: 5 },
      { name: "Blender", level: 70, years: 1 },
      { name: "After Effects", level: 75, years: 2 },
    ],
  },
]

const achievements = [
  {
    title: "Desenvolvedor Full Stack Sênior",
    company: "TechCorp",
    period: "2023 - Presente",
    description:
      "Liderando equipe de 5 desenvolvedores, arquitetando soluções escaláveis e mentorando desenvolvedores juniores.",
    highlights: ["Aumentou performance em 40%", "Reduziu bugs em 60%", "Implementou CI/CD"],
    icon: <Trophy className="w-4 h-4 sm:w-6 sm:h-6" />,
    color: "from-yellow-500 to-orange-500",
  },
  {
    title: "Especialista em React",
    company: "InnovaTech",
    period: "2022 - 2023",
    description:
      "Desenvolvimento de aplicações React complexas, implementação de design systems e otimização de performance.",
    highlights: ["Design System completo", "Migração para TypeScript", "Testes automatizados"],
    icon: <Code className="w-4 h-4 sm:w-6 sm:h-6" />,
    color: "from-blue-500 to-purple-500",
  },
  {
    title: "Desenvolvedor Frontend",
    company: "StartupXYZ",
    period: "2020 - 2022",
    description: "Criação de interfaces modernas e responsivas, colaboração próxima com designers e product managers.",
    highlights: ["Interface mobile-first", "Acessibilidade WCAG", "Performance otimizada"],
    icon: <Lightbulb className="w-4 h-4 sm:w-6 sm:h-6" />,
    color: "from-green-500 to-teal-500",
  },
]

const personalStats = [
  { label: "Projetos Concluídos", value: "50+", icon: <Target className="w-4 h-4 sm:w-5 sm:h-5" /> },
  { label: "Linhas de Código", value: "100K+", icon: <Code className="w-4 h-4 sm:w-5 sm:h-5" /> },
  { label: "Cafés Consumidos", value: "2,847", icon: <Coffee className="w-4 h-4 sm:w-5 sm:h-5" /> },
  { label: "Anos de Experiência", value: "5+", icon: <Calendar className="w-4 h-4 sm:w-5 sm:h-5" /> },
  { label: "Tecnologias Dominadas", value: "20+", icon: <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" /> },
  { label: "Clientes Satisfeitos", value: "30+", icon: <Heart className="w-4 h-4 sm:w-5 sm:h-5" /> },
]

const interests = [
  { name: "Pixel Art", icon: "🎨", description: "Criação de arte digital em estilo retrô" },
  { name: "Games Retro", icon: "🎮", description: "Colecionador de jogos clássicos dos anos 80-90" },
  { name: "Música Lo-Fi", icon: "🎵", description: "Trilha sonora perfeita para programar" },
  { name: "Café Especial", icon: "☕", description: "Explorador de cafeterias e métodos de preparo" },
  { name: "Fotografia", icon: "📸", description: "Capturando momentos urbanos e natureza" },
  { name: "Leitura Tech", icon: "📚", description: "Sempre aprendendo novas tecnologias" },
]

export default function Sobre() {
  const [clickEffects, setClickEffects] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [clickCount, setClickCount] = useState(0)
  const [lastClickTime, setLastClickTime] = useState(0)
  const [comboCount, setComboCount] = useState(0)
  const [activeSkill, setActiveSkill] = useState(0)
  const [selectedAchievement, setSelectedAchievement] = useState<number | null>(null)
  const [hoveredStat, setHoveredStat] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const createClickEffect = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const now = Date.now()

    // Combo system
    if (now - lastClickTime < 1000) {
      setComboCount((prev) => prev + 1)
    } else {
      setComboCount(1)
    }
    setLastClickTime(now)

    const newEffect = {
      id: Date.now() + Math.random(),
      x,
      y,
    }

    setClickEffects((prev) => [...prev, newEffect])
    setClickCount((prev) => prev + 1)

    // Remove effect after animation
    setTimeout(() => {
      setClickEffects((prev) => prev.filter((effect) => effect.id !== newEffect.id))
    }, 1000)
  }

  const getComboMessage = () => {
    if (comboCount >= 10) return "🔥 COMBO INSANO! 🔥"
    if (comboCount >= 7) return "⚡ SUPER COMBO! ⚡"
    if (comboCount >= 5) return "✨ COMBO! ✨"
    if (comboCount >= 3) return "💫 Nice! 💫"
    return ""
  }

  return (
    <div ref={containerRef} className="min-h-screen pt-16 sm:pt-24 pb-8 sm:pb-16 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-deep-purple via-dark-purple to-deep-purple" />
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255, 215, 0, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.15) 0%, transparent 50%),
                             radial-gradient(circle at 40% 40%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)`,
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-gold/5"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, 30, 0],
              rotate: [0, 180, 360],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            {
              [
                <Code size={16} className="sm:w-5 sm:h-5" />,
                <Coffee size={16} className="sm:w-5 sm:h-5" />,
                <Heart size={16} className="sm:w-5 sm:h-5" />,
                <Star size={16} className="sm:w-5 sm:h-5" />,
              ][i % 4]
            }
          </motion.div>
        ))}
      </div>

      <motion.div style={{ y, opacity }} className="max-w-7xl mx-auto px-2 sm:px-4 relative z-10">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-12 sm:mb-20"
        >
          <div className="relative inline-block mb-8 sm:mb-12">
            {/* Avatar with Enhanced Effects */}
            <motion.div
              className="relative w-32 sm:w-48 h-32 sm:h-48 mx-auto mb-6 sm:mb-8 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={createClickEffect}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gold via-yellow-400 to-gold rounded-full animate-pulse opacity-20" />
              <div
                className="absolute inset-1 sm:inset-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-30 animate-spin"
                style={{ animationDuration: "10s" }}
              />
              <motion.div
                className="relative w-full h-full border-2 sm:border-4 border-gold rounded-full overflow-hidden bg-deep-purple/20 backdrop-blur-sm"
                whileHover={{ borderColor: "#FFD700", boxShadow: "0 0 30px rgba(255, 215, 0, 0.5)" }}
                animate={{
                  borderColor: clickCount > 0 ? ["#FFD700", "#FF6B6B", "#4ECDC4", "#FFD700"] : "#FFD700",
                  boxShadow:
                    clickCount > 0
                      ? [
                          "0 0 30px rgba(255, 215, 0, 0.5)",
                          "0 0 40px rgba(255, 107, 107, 0.6)",
                          "0 0 35px rgba(78, 205, 196, 0.5)",
                          "0 0 30px rgba(255, 215, 0, 0.5)",
                        ]
                      : "0 0 30px rgba(255, 215, 0, 0.5)",
                }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="gif/sapo.gif"
                  alt="Pixel Coffee Cup Avatar"
                  width={180}
                  height={180}
                  className="object-contain w-full h-full"
                  unoptimized
                />
              </motion.div>

              {/* Click Effects */}
              <AnimatePresence>
                {clickEffects.map((effect) => (
                  <motion.div
                    key={effect.id}
                    className="absolute pointer-events-none"
                    style={{ left: effect.x, top: effect.y }}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{
                      scale: [0, 1.5, 0],
                      opacity: [1, 0.8, 0],
                      rotate: [0, 180, 360],
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    <div className="w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-r from-gold to-yellow-400 rounded-full flex items-center justify-center text-deep-purple font-bold text-xs sm:text-sm">
                      +1
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Combo Display */}
              <AnimatePresence>
                {comboCount >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.8 }}
                    animate={{ opacity: 1, y: -40, scale: 1 }}
                    exit={{ opacity: 0, y: -60, scale: 0.8 }}
                    className="absolute -top-12 sm:-top-16 left-1/2 transform -translate-x-1/2 bg-gold text-deep-purple px-3 sm:px-4 py-1 sm:py-2 rounded-full pixel-text text-xs sm:text-sm font-bold whitespace-nowrap z-20"
                  >
                    {getComboMessage()}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Click Counter */}
              {clickCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2 bg-deep-purple/80 backdrop-blur-sm border border-gold/50 text-gold px-2 sm:px-3 py-1 rounded-full pixel-text text-xs"
                >
                  Cliques: {clickCount}
                </motion.div>
              )}

              {/* Floating Icons with Click Effects */}
              {[
                <Code size={16} className="sm:w-5 sm:h-5" />,
                <Coffee size={16} className="sm:w-5 sm:h-5" />,
                <Heart size={16} className="sm:w-5 sm:h-5" />,
                <Zap size={16} className="sm:w-5 sm:h-5" />,
              ].map((icon, i) => (
                <motion.div
                  key={i}
                  className="absolute text-gold cursor-pointer"
                  style={{
                    top: `${20 + i * 20}%`,
                    left: i % 2 === 0 ? "-10%" : "110%",
                  }}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.5, 1, 0.5],
                    scale: clickCount > i * 5 ? [1, 1.3, 1] : 1,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.5,
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    createClickEffect(e)
                  }}
                >
                  {icon}
                </motion.div>
              ))}
            </motion.div>

            <motion.h1
              className="pixel-text text-3xl sm:text-5xl md:text-7xl text-gold mb-4 sm:mb-6"
              whileHover={{ scale: 1.02, textShadow: "0 0 30px rgba(255, 215, 0, 0.8)" }}
            >
              SOBRE MIM
            </motion.h1>
            <motion.div
              className="w-20 sm:w-32 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6 sm:mb-8"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>

          <motion.div
            className="max-w-4xl mx-auto px-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="pixel-text text-xl sm:text-2xl md:text-3xl text-gold mb-6 sm:mb-8">
              Desenvolvedor Full Stack & Criador Digital
            </h2>
            <p className="japanese-text text-cream/90 text-base sm:text-xl leading-relaxed mb-6 sm:mb-8">
              Olá! Sou um desenvolvedor apaixonado por criar experiências digitais únicas que combinam funcionalidade
              robusta com design excepcional. Com mais de 5 anos de experiência, transformo ideias complexas em soluções
              elegantes e eficientes.
            </p>
            <p className="japanese-text text-cream/80 text-sm sm:text-lg leading-relaxed">
              Minha jornada começou com curiosidade sobre como as coisas funcionam na web, e evoluiu para uma paixão por
              construir aplicações que fazem a diferença na vida das pessoas. Cada linha de código é escrita com
              propósito, cada interface é pensada com cuidado.
            </p>
          </motion.div>
        </motion.section>

        {/* Personal Stats */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-20"
        >
          <h3 className="pixel-text text-2xl sm:text-3xl text-gold text-center mb-8 sm:mb-12">ESTATÍSTICAS PESSOAIS</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-6">
            {personalStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95, rotate: 5 }}
                onHoverStart={() => setHoveredStat(index)}
                onHoverEnd={() => setHoveredStat(null)}
                onClick={createClickEffect}
              >
                <div
                  className={`relative bg-deep-purple/40 backdrop-blur-sm border-2 border-gold/30 rounded-2xl p-3 sm:p-6 transition-all duration-300 ${
                    hoveredStat === index ? "border-gold shadow-lg shadow-gold/20" : ""
                  }`}
                >
                  <motion.div
                    className="text-gold mb-2 sm:mb-3 flex justify-center"
                    animate={{ rotate: hoveredStat === index ? 360 : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {stat.icon}
                  </motion.div>
                  <div className="pixel-text text-lg sm:text-2xl text-gold mb-1 sm:mb-2">{stat.value}</div>
                  <div className="text-cream/70 text-xs sm:text-sm">{stat.label}</div>

                  {hoveredStat === index && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute inset-0 bg-gold/5 rounded-2xl pointer-events-none"
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-20"
        >
          <h3 className="pixel-text text-2xl sm:text-3xl text-gold text-center mb-8 sm:mb-12">HABILIDADES TÉCNICAS</h3>

          {/* Skill Categories */}
          <div className="flex justify-center mb-6 sm:mb-8 px-2">
            <div className="bg-deep-purple/40 backdrop-blur-sm border-2 border-gold/30 rounded-2xl p-1 sm:p-2">
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {skills.map((skill, index) => (
                  <motion.button
                    key={skill.category}
                    onClick={() => setActiveSkill(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 ${
                      activeSkill === index ? "bg-gold text-deep-purple shadow-lg" : "text-gold hover:bg-gold/10"
                    }`}
                  >
                    <div className="flex items-center gap-1 sm:gap-2">
                      {skill.icon}
                      <span className="pixel-text text-xs sm:text-sm">{skill.category}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Skills Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSkill}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className={`bg-gradient-to-r ${skills[activeSkill].color} p-1 rounded-3xl`}>
                <div className="bg-deep-purple/90 backdrop-blur-sm rounded-3xl p-4 sm:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {skills[activeSkill].technologies.map((tech, index) => (
                      <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="space-y-2 sm:space-y-3"
                      >
                        <div className="flex justify-between items-center">
                          <span className="pixel-text text-gold text-sm sm:text-base">{tech.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-cream/70 text-xs sm:text-sm">{tech.years} anos</span>
                            <span className="pixel-text text-gold text-xs sm:text-sm">{tech.level}%</span>
                          </div>
                        </div>
                        <div className="relative h-2 sm:h-3 bg-deep-purple/50 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${skills[activeSkill].color} rounded-full`}
                            initial={{ width: 0 }}
                            animate={{ width: `${tech.level}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.section>

        {/* Experience Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-20"
        >
          <h3 className="pixel-text text-2xl sm:text-3xl text-gold text-center mb-8 sm:mb-12">
            EXPERIÊNCIA PROFISSIONAL
          </h3>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 sm:w-1 bg-gradient-to-b from-gold via-gold/50 to-transparent" />

              <div className="space-y-8 sm:space-y-12">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="relative flex items-start gap-4 sm:gap-8"
                  >
                    {/* Timeline Dot */}
                    <div
                      className={`relative z-10 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r ${achievement.color} rounded-full flex items-center justify-center border-2 sm:border-4 border-deep-purple`}
                    >
                      <div className="text-white">{achievement.icon}</div>
                    </div>

                    {/* Content */}
                    <motion.div
                      className="flex-1 bg-deep-purple/40 backdrop-blur-sm border-2 border-gold/30 rounded-2xl p-4 sm:p-6 hover:border-gold transition-all duration-300 cursor-pointer"
                      whileHover={{ scale: 1.02, y: -5 }}
                      onClick={() => setSelectedAchievement(selectedAchievement === index ? null : index)}
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-4 gap-2">
                        <div className="flex-1">
                          <h4 className="pixel-text text-lg sm:text-xl text-gold mb-1 sm:mb-2">{achievement.title}</h4>
                          <div className="text-cream/80 mb-1 text-sm sm:text-base">{achievement.company}</div>
                          <div className="text-cream/60 text-xs sm:text-sm">{achievement.period}</div>
                        </div>
                        <motion.div
                          animate={{ rotate: selectedAchievement === index ? 180 : 0 }}
                          className="text-gold self-start"
                        >
                          ▼
                        </motion.div>
                      </div>

                      <p className="text-cream/80 text-sm leading-relaxed mb-4">{achievement.description}</p>

                      <AnimatePresence>
                        {selectedAchievement === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-t border-gold/30 pt-4"
                          >
                            <div className="pixel-text text-gold text-sm mb-3">PRINCIPAIS CONQUISTAS:</div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              {achievement.highlights.map((highlight, i) => (
                                <motion.div
                                  key={highlight}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                  className="flex items-center gap-2 text-cream/80 text-sm"
                                >
                                  <div className="w-2 h-2 bg-gold rounded-full flex-shrink-0" />
                                  {highlight}
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Interests & Hobbies */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-20"
        >
          <h3 className="pixel-text text-2xl sm:text-3xl text-gold text-center mb-8 sm:mb-12">INTERESSES & HOBBIES</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {interests.map((interest, index) => (
              <motion.div
                key={interest.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95, rotate: [0, -5, 5, 0] }}
                onClick={createClickEffect}
                className="bg-deep-purple/40 backdrop-blur-sm border-2 border-gold/30 rounded-2xl p-4 sm:p-6 hover:border-gold transition-all duration-300 text-center group cursor-pointer relative overflow-hidden"
              >
                {/* Click Ripple Effect */}
                <motion.div
                  className="absolute inset-0 bg-gold/10 rounded-2xl"
                  initial={{ scale: 0, opacity: 0 }}
                  whileTap={{ scale: 2, opacity: [0, 0.5, 0] }}
                  transition={{ duration: 0.6 }}
                />

                <motion.div
                  className="text-2xl sm:text-4xl mb-3 sm:mb-4 cursor-pointer"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 1.4, rotate: 20 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {interest.icon}
                </motion.div>
                <h4 className="pixel-text text-gold text-base sm:text-lg mb-2 sm:mb-3 group-hover:animate-glow">
                  {interest.name}
                </h4>
                <p className="text-cream/80 text-xs sm:text-sm leading-relaxed">{interest.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="relative bg-deep-purple/40 backdrop-blur-sm border-2 border-gold/30 rounded-3xl p-6 sm:p-12 overflow-hidden hover:border-gold transition-all duration-500">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-10">
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: [
                    "radial-gradient(circle at 0% 0%, rgba(255,215,0,0.3) 0%, transparent 50%)",
                    "radial-gradient(circle at 100% 100%, rgba(255,215,0,0.3) 0%, transparent 50%)",
                    "radial-gradient(circle at 0% 0%, rgba(255,215,0,0.3) 0%, transparent 50%)",
                  ],
                }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>

            <div className="relative z-10">
              <motion.h3
                className="pixel-text text-2xl sm:text-4xl md:text-5xl text-gold mb-4 sm:mb-6"
                whileHover={{ scale: 1.05 }}
              >
                VAMOS TRABALHAR JUNTOS?
              </motion.h3>
              <p className="japanese-text text-cream/90 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-10">
                Estou sempre aberto a novos desafios e oportunidades de colaboração. Se você tem um projeto interessante
                ou apenas quer trocar uma ideia sobre tecnologia, ficarei feliz em conversar!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-6 sm:mb-8">
                <motion.a
                  href="/contato"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95, rotate: [0, -2, 2, 0] }}
                  onClick={createClickEffect}
                  className="retro-button inline-flex items-center justify-center gap-3 text-sm sm:text-lg px-6 sm:px-8 py-3 sm:py-4 relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileTap={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                  <Mail size={16} className="sm:w-5 sm:h-5" />
                  Entrar em Contato
                </motion.a>
                <motion.a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="retro-button bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-deep-purple inline-flex items-center justify-center gap-3 text-sm sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
                >
                  <Download size={16} className="sm:w-5 sm:h-5" />
                  Baixar CV
                </motion.a>
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-4 sm:gap-6">
                {[
                  {
                    href: "https://github.com",
                    icon: <Github size={20} className="sm:w-6 sm:h-6" />,
                    label: "GitHub",
                    color: "from-gray-600 to-gray-800",
                  },
                  {
                    href: "https://linkedin.com",
                    icon: <Linkedin size={20} className="sm:w-6 sm:h-6" />,
                    label: "LinkedIn",
                    color: "from-blue-600 to-blue-800",
                  },
                  {
                    href: "mailto:contato@exemplo.com",
                    icon: <Mail size={20} className="sm:w-6 sm:h-6" />,
                    label: "Email",
                    color: "from-red-600 to-red-800",
                  },
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{
                      scale: 0.9,
                      rotate: [0, -10, 10, 0],
                      boxShadow: "0 0 20px rgba(255, 215, 0, 0.8)",
                    }}
                    onClick={createClickEffect}
                    className={`w-10 sm:w-12 h-10 sm:h-12 bg-gold/20 border-2 border-gold/50 rounded-full flex items-center justify-center text-gold hover:bg-gold hover:text-deep-purple transition-all duration-300 relative overflow-hidden group`}
                    aria-label={social.label}
                  >
                    {/* Click Wave Effect */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${social.color} opacity-0 group-hover:opacity-20`}
                      whileTap={{
                        scale: [1, 1.5, 1],
                        opacity: [0, 0.6, 0],
                      }}
                      transition={{ duration: 0.6 }}
                    />
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  )
}

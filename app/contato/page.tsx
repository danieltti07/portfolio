"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import {
  Mail,
  Phone,
  Copy,
  Check,
  MessageCircle,
  Heart,
  Coffee,
  Github,
  Linkedin,
  Instagram,
  Twitter,
  MapPin,
  Globe,
  Send,
  ExternalLink,
  Sparkles,
} from "lucide-react"

const socialNetworks = [
  {
    name: "GitHub",
    username: "@devdaniel",
    url: "https://github.com",
    icon: <Github size={24} className="sm:w-8 sm:h-8" />,
    color: "from-gray-700 to-gray-900",
    description: "Código e projetos open source",
    followers: "2.3K",
  },
  {
    name: "LinkedIn",
    username: "Daniel Developer",
    url: "https://linkedin.com",
    icon: <Linkedin size={24} className="sm:w-8 sm:h-8" />,
    color: "from-blue-600 to-blue-800",
    description: "Networking profissional",
    followers: "1.8K",
  },
  {
    name: "Instagram",
    username: "@dev.daniel",
    url: "https://instagram.com",
    icon: <Instagram size={24} className="sm:w-8 sm:h-8" />,
    color: "from-pink-500 via-purple-500 to-indigo-500",
    description: "Behind the scenes & lifestyle",
    followers: "892",
  },
  {
    name: "Twitter",
    username: "@devdaniel_",
    url: "https://twitter.com",
    icon: <Twitter size={24} className="sm:w-8 sm:h-8" />,
    color: "from-sky-500 to-blue-600",
    description: "Thoughts & tech updates",
    followers: "1.2K",
  },
  {
    name: "Discord",
    username: "daniel#1234",
    url: "https://discord.com",
    icon: <MessageCircle size={24} className="sm:w-8 sm:h-8" />,
    color: "from-indigo-600 to-purple-700",
    description: "Gaming & dev community",
    followers: "Online",
  },
  {
    name: "Portfolio",
    username: "daniel.dev",
    url: "https://daniel.dev",
    icon: <Globe size={24} className="sm:w-8 sm:h-8" />,
    color: "from-emerald-500 to-teal-600",
    description: "Meu site pessoal",
    followers: "Live",
  },
]

const contactMethods = [
  {
    icon: <Mail size={20} className="sm:w-7 sm:h-7" />,
    label: "E-mail Principal",
    value: "contato@daniel.dev",
    description: "Resposta garantida em 24h",
    color: "from-red-500 to-pink-600",
    type: "email",
  },
  {
    icon: <Phone size={20} className="sm:w-7 sm:h-7" />,
    label: "WhatsApp Business",
    value: "+55 (11) 99999-9999",
    description: "Disponível das 9h às 18h",
    color: "from-green-500 to-emerald-600",
    type: "phone",
  },
  {
    icon: <MapPin size={20} className="sm:w-7 sm:h-7" />,
    label: "Localização",
    value: "São Paulo, Brasil",
    description: "Trabalho remoto disponível",
    color: "from-blue-500 to-cyan-600",
    type: "location",
  },
]

export default function Contato() {
  const [copiedItems, setCopiedItems] = useState<{ [key: string]: boolean }>({})
  const [isVideoMuted, setIsVideoMuted] = useState(true)

  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }, [])

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItems({ ...copiedItems, [key]: true })
      setTimeout(() => {
        setCopiedItems((prev) => ({ ...prev, [key]: false }))
      }, 3000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
  <div className="min-h-screen pt-16 sm:pt-24 pb-8 sm:pb-16 px-2 sm:px-4">
    {/* Ghibli Video Background */}
    <div className="fixed inset-0 z-0">
      <video
        ref={videoRef}
        // Tente scale-125. Se ainda houver faixa, tente scale-150.
        className="w-full h-full object-cover scale-125" // <-- MODIFICADO AQUI
        loop
        muted={isVideoMuted}
        playsInline
        preload="auto"
      >
        <source src="/gif/Ghibli_Pixel_Art_Animation_Ready.mp4" type="video/mp4" />
      </video>
      {/* Overlays para escurecer o vídeo */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-purple/70 via-deep-purple/50 to-deep-purple/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-deep-purple/40 via-transparent to-deep-purple/40" />
      
    </div>

    



      <motion.div ref={containerRef} style={{ y, opacity }} className="max-w-7xl mx-auto relative z-20"> {/* <--- MOVIDO O containerRef AQUI */}
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h1
            className="pixel-text text-3xl sm:text-5xl md:text-7xl text-gold mb-4 sm:mb-6"
            whileHover={{ scale: 1.02 }}
          >
            CONECTE-SE COMIGO
          </motion.h1>
          <motion.div
            className="w-20 sm:w-32 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6 sm:mb-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.p
            className="text-cream/90 text-base sm:text-xl max-w-4xl mx-auto leading-relaxed px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Vamos criar algo incrível juntos! Encontre-me nas redes sociais, envie um e-mail ou apenas diga olá.
          </motion.p>
        </motion.div>

        {/* Social Networks Grid */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 sm:mb-20"
        >
          <h2 className="pixel-text text-2xl sm:text-3xl text-gold text-center mb-8 sm:mb-12 flex items-center justify-center gap-2 sm:gap-3">
            <Sparkles size={20} className="sm:w-7 sm:h-7" />
            REDES SOCIAIS
            <Sparkles size={20} className="sm:w-7 sm:h-7" />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {socialNetworks.map((network, index) => (
              <motion.div
                key={network.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => window.open(network.url, "_blank")}
                className="group cursor-pointer"
              >
                <div className={`bg-gradient-to-br ${network.color} p-1 rounded-3xl`}>
                  <div className="bg-deep-purple/90 backdrop-blur-sm rounded-3xl p-4 sm:p-6 h-full transition-all duration-300 group-hover:bg-deep-purple/80">
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <motion.div
                        className="text-white group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ rotate: 10 }}
                      >
                        {network.icon}
                      </motion.div>
                      <motion.div
                        className="text-white/60 group-hover:text-white transition-colors"
                        whileHover={{ scale: 1.2 }}
                      >
                        <ExternalLink size={16} className="sm:w-5 sm:h-5" />
                      </motion.div>
                    </div>

                    <h3 className="pixel-text text-lg sm:text-xl text-white mb-1 sm:mb-2 group-hover:text-gold transition-colors">
                      {network.name}
                    </h3>
                    <p className="text-white/80 text-sm mb-1">{network.username}</p>
                    <p className="text-white/60 text-xs mb-3 sm:mb-4 leading-relaxed">{network.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-white/70 text-xs">{network.followers}</span>
                      </div>
                      <motion.div
                        className="text-white/40 group-hover:text-gold transition-colors"
                        whileHover={{ rotate: 15 }}
                      >
                        <Send size={14} className="sm:w-4 sm:h-4" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Methods */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-20"
        >
          <h2 className="pixel-text text-2xl sm:text-3xl text-gold text-center mb-8 sm:mb-12 flex items-center justify-center gap-2 sm:gap-3">
            <MessageCircle size={20} className="sm:w-7 sm:h-7" />
            CONTATO DIRETO
            <MessageCircle size={20} className="sm:w-7 sm:h-7" />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (method.type === "email") {
                    window.open(`mailto:${method.value}`)
                  } else if (method.type === "phone") {
                    window.open(`tel:${method.value}`)
                  }
                  copyToClipboard(method.value, method.label)
                }}
                className="group cursor-pointer"
              >
                <div className={`bg-gradient-to-br ${method.color} p-1 rounded-3xl`}>
                  <div className="bg-deep-purple/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 text-center group-hover:bg-deep-purple/80 transition-all duration-300">
                    <motion.div
                      className="text-white mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 10 }}
                    >
                      {method.icon}
                    </motion.div>

                    <h3 className="pixel-text text-base sm:text-lg text-white mb-1 sm:mb-2 group-hover:text-gold transition-colors">
                      {method.label}
                    </h3>
                    <p className="text-white/90 text-sm mb-1 sm:mb-2 break-all">{method.value}</p>
                    <p className="text-white/60 text-xs mb-3 sm:mb-4">{method.description}</p>

                    <div className="flex items-center justify-center gap-2">
                      <motion.div
                        className="text-white/60 group-hover:text-white transition-colors"
                        whileHover={{ scale: 1.2 }}
                      >
                        {copiedItems[method.label] ? (
                          <Check size={14} className="sm:w-4 sm:h-4" />
                        ) : (
                          <Copy size={14} className="sm:w-4 sm:h-4" />
                        )}
                      </motion.div>
                      {copiedItems[method.label] && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-green-400 text-xs pixel-text"
                        >
                          Copiado!
                        </motion.span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-deep-purple/40 backdrop-blur-sm border-2 border-gold/30 rounded-3xl p-6 sm:p-12 hover:border-gold transition-all duration-500">
            <motion.h3
              className="pixel-text text-2xl sm:text-4xl md:text-5xl text-gold mb-4 sm:mb-6"
              whileHover={{ scale: 1.05 }}
            >
              VAMOS CRIAR JUNTOS?
            </motion.h3>
            <p className="text-cream/90 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8">
              Cada grande projeto começa com uma conversa. Escolha sua forma favorita de contato e vamos transformar
              suas ideias em realidade digital!
            </p>

            <motion.div
              className="flex items-center justify-center gap-3 sm:gap-4 text-gold/80"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              <Heart size={16} className="sm:w-5 sm:h-5" />
              <span className="pixel-text text-sm sm:text-base">Feito com paixão e muito café</span>
              <Coffee size={16} className="sm:w-5 sm:h-5" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
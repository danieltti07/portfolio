/***************************************************************************************************
 *
 * CÓDIGO COMPLETO DA PÁGINA DE PROJETOS (CORRIGIDO)
 *
 ***************************************************************************************************/

"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, Star, Code2, Palette, Database, Globe, Zap, Eye, Heart, Clock } from "lucide-react";
import { useState, useRef, useEffect, type MouseEvent } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children }: { children: React.ReactNode }) => {
	const [mounted, setMounted] = useState(false);
	const ref = useRef<Element | null>(null);

	useEffect(() => {
		ref.current = document.querySelector("#modal-portal");
		setMounted(true);
	}, []);

	return mounted && ref.current ? createPortal(children, ref.current) : null;
};

const projects = [
	{
		id: 1,
		title: "E-commerce Moderno",
		category: "Full Stack",
		description: "Plataforma completa de e-commerce com Next.js, Stripe e dashboard administrativo avançado.",
		fullDescription:
			"Uma solução completa de e-commerce que combina design moderno com funcionalidade robusta. Desenvolvido com Next.js 14, integração completa com Stripe para pagamentos, sistema de gestão de produtos, análise de vendas em tempo real e dashboard administrativo intuitivo. A plataforma oferece experiência de compra otimizada tanto para desktop quanto mobile.",
		image: "/placeholder.svg?height=400&width=600",
		demoUrl: "https://exemplo.com",
		githubUrl: "https://github.com",
		tags: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS", "Prisma", "PostgreSQL"],
		tech: {
			frontend: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion"],
			backend: ["Node.js", "Prisma ORM", "PostgreSQL", "Stripe API"],
			tools: ["Vercel", "Docker", "GitHub Actions", "Figma"],
		},
		metrics: {
			lines: "12,500+",
			commits: "156",
			duration: "3 meses",
			team: "Solo",
		},
		features: ["Pagamentos Seguros", "Dashboard Admin", "Analytics", "Mobile First", "SEO Otimizado"],
		status: "Concluído",
		year: "2024",
		difficulty: 4,
		likes: 127,
		views: 2340,
		featured: true,
		color: "from-purple-600 via-pink-600 to-red-600",
		icon: <Globe className="w-4 h-4 sm:w-6 sm:h-6" />,
	},
	{
		id: 2,
		title: "Dashboard Analytics",
		category: "Data Visualization",
		description: "Sistema de análise de dados com visualizações interativas e relatórios em tempo real.",
		fullDescription:
			"Dashboard avançado para análise de dados empresariais com visualizações interativas, gráficos dinâmicos e relatórios personalizáveis. Construído com React e D3.js, oferece insights valiosos através de uma interface intuitiva e responsiva. Integração com múltiplas fontes de dados e exportação de relatórios.",
		image: "/placeholder.svg?height=400&width=600",
		demoUrl: "https://exemplo.com",
		githubUrl: "https://github.com",
		tags: ["React", "D3.js", "Node.js", "MongoDB", "Chart.js", "Express"],
		tech: {
			frontend: ["React 18", "D3.js", "Chart.js", "Material-UI"],
			backend: ["Node.js", "Express", "MongoDB", "Socket.io"],
			tools: ["AWS", "Redis", "Jest", "Storybook"],
		},
		metrics: {
			lines: "8,900+",
			commits: "89",
			duration: "2 meses",
			team: "2 pessoas",
		},
		features: ["Tempo Real", "Exportar PDF", "Filtros Avançados", "Multi-tenant", "API REST"],
		status: "Em desenvolvimento",
		year: "2024",
		difficulty: 3,
		likes: 89,
		views: 1560,
		featured: false,
		color: "from-blue-600 via-cyan-600 to-teal-600",
		icon: <Database className="w-4 h-4 sm:w-6 sm:h-6" />,
	},
	{
		id: 3,
		title: "Portfolio Interativo",
		category: "Creative",
		description: "Site portfolio com animações 3D, transições cinematográficas e experiência imersiva.",
		fullDescription:
			"Portfolio criativo que demonstra o poder das tecnologias web modernas. Desenvolvido com Three.js para elementos 3D, GSAP para animações complexas e Framer Motion para transições suaves. Cada seção oferece uma experiência única, combinando arte digital com código limpo e performance otimizada.",
		image: "/placeholder.svg?height=400&width=600",
		demoUrl: "https://exemplo.com",
		githubUrl: "https://github.com",
		tags: ["Next.js", "Three.js", "GSAP", "Framer Motion", "WebGL", "Blender"],
		tech: {
			frontend: ["Next.js", "Three.js", "GSAP", "Framer Motion"],
			backend: ["Vercel Functions", "Sanity CMS"],
			tools: ["Blender", "After Effects", "Figma", "Photoshop"],
		},
		metrics: {
			lines: "15,200+",
			commits: "203",
			duration: "4 meses",
			team: "Solo + Designer",
		},
		features: ["Animações 3D", "WebGL", "Parallax", "Micro-interações", "Performance"],
		status: "Concluído",
		year: "2023",
		difficulty: 5,
		likes: 203,
		views: 3420,
		featured: true,
		color: "from-green-600 via-emerald-600 to-lime-600",
		icon: <Palette className="w-4 h-4 sm:w-6 sm:h-6" />,
	},
	{
		id: 4,
		title: "API Microservices",
		category: "Backend",
		description: "Arquitetura de microserviços escalável com Docker, Kubernetes e monitoramento completo.",
		fullDescription:
			"Sistema backend robusto baseado em microserviços, projetado para alta disponibilidade e escalabilidade. Implementado com Node.js, containerizado com Docker e orquestrado com Kubernetes. Inclui autenticação JWT, rate limiting, cache distribuído, monitoramento com Prometheus e documentação completa com Swagger.",
		image: "/placeholder.svg?height=400&width=600",
		demoUrl: "https://exemplo.com",
		githubUrl: "https://github.com",
		tags: ["Node.js", "Docker", "Kubernetes", "MongoDB", "Redis", "JWT"],
		tech: {
			backend: ["Node.js", "Express", "MongoDB", "Redis"],
			devops: ["Docker", "Kubernetes", "Nginx", "Prometheus"],
			tools: ["Swagger", "Jest", "GitHub Actions", "Grafana"],
		},
		metrics: {
			lines: "18,700+",
			commits: "156",
			duration: "5 meses",
			team: "3 pessoas",
		},
		features: ["Microserviços", "Auto-scaling", "Monitoramento", "CI/CD", "Documentação"],
		status: "Concluído",
		year: "2023",
		difficulty: 5,
		likes: 156,
		views: 2180,
		featured: false,
		color: "from-orange-600 via-red-600 to-pink-600",
		icon: <Code2 className="w-4 h-4 sm:w-6 sm:h-6" />,
	},
	{
		id: 5,
		title: "App Mobile React Native",
		category: "Mobile",
		description: "Aplicativo mobile multiplataforma com design moderno e funcionalidades avançadas.",
		fullDescription:
			"Aplicativo mobile desenvolvido em React Native com foco na experiência do usuário. Inclui autenticação biométrica, notificações push, sincronização offline, integração com APIs externas e design responsivo. Publicado nas lojas Google Play e App Store com excelentes avaliações dos usuários.",
		image: "/placeholder.svg?height=400&width=600",
		demoUrl: "https://exemplo.com",
		githubUrl: "https://github.com",
		tags: ["React Native", "TypeScript", "Firebase", "Redux", "Expo", "AsyncStorage"],
		tech: {
			frontend: ["React Native", "TypeScript", "Expo", "React Navigation"],
			backend: ["Firebase", "Node.js", "Express", "MongoDB"],
			tools: ["Expo CLI", "Flipper", "Reactotron", "Figma"],
		},
		metrics: {
			lines: "9,800+",
			commits: "124",
			duration: "3 meses",
			team: "2 pessoas",
		},
		features: ["Autenticação Biométrica", "Push Notifications", "Offline First", "Cross Platform", "App Store"],
		status: "Concluído",
		year: "2023",
		difficulty: 4,
		likes: 98,
		views: 1890,
		featured: false,
		color: "from-indigo-600 via-purple-600 to-pink-600",
		icon: <Code2 className="w-4 h-4 sm:w-6 sm:h-6" />,
	},
	{
		id: 6,
		title: "Sistema de Gestão",
		category: "Full Stack",
		description: "ERP completo para pequenas empresas com módulos integrados e relatórios avançados.",
		fullDescription:
			"Sistema de gestão empresarial completo desenvolvido para pequenas e médias empresas. Inclui módulos de vendas, estoque, financeiro, RH e relatórios. Interface intuitiva, sistema de permissões granular, backup automático e integração com sistemas externos. Desenvolvido com foco na usabilidade e performance.",
		image: "/placeholder.svg?height=400&width=600",
		demoUrl: "https://exemplo.com",
		githubUrl: "https://github.com",
		tags: ["Vue.js", "Laravel", "MySQL", "Redis", "Docker", "AWS"],
		tech: {
			frontend: ["Vue.js 3", "Vuetify", "TypeScript", "Pinia"],
			backend: ["Laravel", "PHP", "MySQL", "Redis"],
			tools: ["Docker", "AWS", "GitLab CI", "Postman"],
		},
		metrics: {
			lines: "22,300+",
			commits: "287",
			duration: "6 meses",
			team: "4 pessoas",
		},
		features: ["Multi-módulos", "Relatórios PDF", "Backup Automático", "Permissões", "API REST"],
		status: "Em desenvolvimento",
		year: "2024",
		difficulty: 5,
		likes: 145,
		views: 2650,
		featured: true,
		color: "from-emerald-600 via-teal-600 to-cyan-600",
		icon: <Database className="w-4 h-4 sm:w-6 sm:h-6" />,
	},
];

export default function Projetos() {
	const [selectedProject, setSelectedProject] = useState<number | null>(null);
	const [filter, setFilter] = useState("Todos");
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [likedProjects, setLikedProjects] = useState<number[]>([]);
	const containerRef = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "end start"],
	});

	const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
	const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

	const categories = ["Todos", "Full Stack", "Data Visualization", "Creative", "Backend", "Mobile"];
	const filteredProjects = projects.filter((project) => filter === "Todos" || project.category === filter);

	const handleLike = (projectId: number) => {
		setLikedProjects((prev) => (prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId]));
	};

	useEffect(() => {
		if (selectedProject !== null) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [selectedProject]);

	return (
		<div ref={containerRef} className="min-h-screen pb-8 sm:pb-16 px-2 sm:px-4">
			<motion.div style={{ y, opacity }} className="max-w-7xl mx-auto relative z-10">
				{/* ... Título e Header da Página ... */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
					className="text-center mb-12 sm:mb-20"
				>
					<motion.h1
						className="pixel-text text-3xl sm:text-5xl md:text-7xl text-gold mb-4 sm:mb-6"
						whileHover={{ scale: 1.02, textShadow: "0 0 30px rgba(255, 215, 0, 0.8)" }}
					>
						PROJETOS
					</motion.h1>
					<motion.div
						className="w-20 sm:w-32 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6 sm:mb-8"
						initial={{ scaleX: 0 }}
						animate={{ scaleX: 1 }}
						transition={{ duration: 1, delay: 0.5 }}
					/>
					<p className="japanese-text text-cream/90 text-base sm:text-xl max-w-4xl mx-auto leading-relaxed px-4">
						Uma coleção de projetos que representam minha jornada como desenvolvedor. Cada um conta uma história única de desafios
						superados, tecnologias dominadas e soluções inovadoras criadas com paixão e dedicação.
					</p>
					<motion.div
						className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mt-8 sm:mt-12 max-w-2xl mx-auto px-4"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.8 }}
					>
						<div className="text-center">
							<div className="pixel-text text-xl sm:text-3xl text-gold mb-1 sm:mb-2">{projects.length}</div>
							<div className="text-cream/70 text-xs sm:text-sm">Projetos</div>
						</div>
						<div className="text-center">
							<div className="pixel-text text-xl sm:text-3xl text-gold mb-1 sm:mb-2">
								{projects.reduce((acc, p) => acc + Number.parseInt(p.metrics.lines.replace(/\D/g, "")), 0).toLocaleString()}
								+
							</div>
							<div className="text-cream/70 text-xs sm:text-sm">Linhas</div>
						</div>
						<div className="text-center">
							<div className="pixel-text text-xl sm:text-3xl text-gold mb-1 sm:mb-2">
								{projects.reduce((acc, p) => acc + p.likes, 0)}
							</div>
							<div className="text-cream/70 text-xs sm:text-sm">Likes</div>
						</div>
						<div className="text-center">
							<div className="pixel-text text-xl sm:text-3xl text-gold mb-1 sm:mb-2">
								{projects.reduce((acc, p) => acc + p.views, 0).toLocaleString()}
							</div>
							<div className="text-cream/70 text-xs sm:text-sm">Views</div>
						</div>
					</motion.div>
				</motion.div>

				{/* ... Filtros e Controles de Visualização ... */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
					className="flex flex-col gap-4 sm:gap-6 mb-8 sm:mb-12 px-2"
				>
					<div className="flex flex-wrap justify-center gap-2 sm:gap-3">
						{categories.map((category) => (
							<motion.button
								key={category}
								onClick={() => setFilter(category)}
								whileHover={{ scale: 1.05, textShadow: "0 0 10px rgba(255, 215, 0, 0.5)" }}
								whileTap={{ scale: 0.95 }}
								className={`px-3 sm:px-6 py-2 sm:py-3 rounded-xl pixel-text text-xs sm:text-sm transition-all duration-300 border-2 ${
									filter === category
										? "bg-gold text-deep-purple border-gold shadow-lg shadow-gold/30"
										: "bg-deep-purple/30 text-gold border-gold/30 hover:border-gold hover:bg-gold/10 backdrop-blur-sm"
								}`}
							>
								{category}
							</motion.button>
						))}
					</div>
					<div className="flex items-center justify-center gap-3">
						<span className="pixel-text text-gold text-xs sm:text-sm">Visualização:</span>
						<div className="bg-deep-purple/30 backdrop-blur-sm border-2 border-gold/30 rounded-lg p-1">
							<button
								onClick={() => setViewMode("grid")}
								className={`px-3 sm:px-4 py-2 rounded pixel-text text-xs transition-all ${
									viewMode === "grid" ? "bg-gold text-deep-purple" : "text-gold hover:bg-gold/10"
								}`}
							>
								Grade
							</button>
							<button
								onClick={() => setViewMode("list")}
								className={`px-3 sm:px-4 py-2 rounded pixel-text text-xs transition-all ${
									viewMode === "list" ? "bg-gold text-deep-purple" : "text-gold hover:bg-gold/10"
								}`}
							>
								Lista
							</button>
						</div>
					</div>
				</motion.div>

				{/* ... Grade de Projetos ... */}
				<AnimatePresence mode="wait">
					<motion.div
						key={`${filter}-${viewMode}`}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.5 }}
						className={
							viewMode === "grid"
								? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-8"
								: "flex flex-col gap-4 sm:gap-6"
						}
					>
						{filteredProjects.map((project, index) => (
							<ProjectCard
								key={project.id}
								project={project}
								index={index}
								viewMode={viewMode}
								isLiked={likedProjects.includes(project.id)}
								onLike={() => handleLike(project.id)}
								onSelect={() => setSelectedProject(project.id)}
							/>
						))}
					</motion.div>
				</AnimatePresence>

				{/* ... Seção CTA Final ... */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="mt-16 sm:mt-24 px-2"
				>
					<div className="relative bg-deep-purple/40 backdrop-blur-sm border-2 border-gold/30 rounded-3xl p-6 sm:p-12 overflow-hidden hover:border-gold transition-all duration-500">
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
						<div className="relative z-10 text-center">
							<motion.h3
								className="pixel-text text-2xl sm:text-4xl md:text-5xl text-gold mb-4 sm:mb-6"
								whileHover={{ scale: 1.05 }}
							>
								PRONTO PARA CRIAR?
							</motion.h3>
							<p className="japanese-text text-cream/90 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-10">
								Cada projeto é uma oportunidade de transformar ideias em realidade digital. Vamos colaborar para criar algo
								extraordinário que faça a diferença no mundo da tecnologia.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
								<motion.a
									href="/contato"
									whileHover={{ scale: 1.05, y: -2 }}
									whileTap={{ scale: 0.95 }}
									className="retro-button inline-flex items-center justify-center gap-3 text-sm sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
								>
									<Zap size={16} className="sm:w-5 sm:h-5" />
									Iniciar Projeto
								</motion.a>
								<motion.a
									href="https://github.com"
									target="_blank"
									rel="noopener noreferrer"
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="retro-button bg-transparent border-2 border-gold text-deep-purple hover:bg-gold inline-flex items-center justify-center gap-3 text-sm sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
								>
									<Github size={16} className="sm:w-5 sm:h-5" />
									Ver Código
								</motion.a>
							</div>
						</div>
					</div>
				</motion.div>
			</motion.div>

			<AnimatePresence>
				{selectedProject && (
					<Portal>
						<ProjectModal project={projects.find((p) => p.id === selectedProject)!} onClose={() => setSelectedProject(null)} />
					</Portal>
				)}
			</AnimatePresence>
		</div>
	);
}

function ProjectCard({
	project,
	index,
	viewMode,
	isLiked,
	onLike,
	onSelect,
}: {
	project: (typeof projects)[0];
	index: number;
	viewMode: "grid" | "list";
	isLiked: boolean;
	onLike: () => void;
	onSelect: () => void;
}) {
	const [isHovered, setIsHovered] = useState(false);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [mouseOnCardPosition, setMouseOnCardPosition] = useState({ x: 0, y: 0 });
	const cardRef = useRef<HTMLDivElement>(null);

	const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
		if (!cardRef.current) return;

		const rect = cardRef.current.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;
		const mouseX = e.clientX - centerX;
		const mouseY = e.clientY - centerY;

		setMousePosition({ x: mouseX, y: mouseY });
		setMouseOnCardPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
	};

	const handleMouseEnter = () => setIsHovered(true);
	const handleMouseLeave = () => {
		setIsHovered(false);
		setMousePosition({ x: 0, y: 0 });
	};

	const rotateX = isHovered ? (mousePosition.y / 20) * -1 : 0;
	const rotateY = isHovered ? mousePosition.x / 20 : 0;
	const scale = isHovered ? 1.05 : 1;

	if (viewMode === "list") {
		return (
			<motion.div
				initial={{ opacity: 0, x: -50 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.6, delay: index * 0.1 }}
				whileHover={{ scale: 1.01, x: 5 }}
				className="bg-deep-purple/40 backdrop-blur-sm border-2 border-gold/30 rounded-2xl p-4 sm:p-6 hover:border-gold transition-all duration-300 cursor-pointer"
				onClick={onSelect}
			>
				<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
					<div className="relative w-full sm:w-24 h-32 sm:h-24 rounded-xl overflow-hidden flex-shrink-0">
						<Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
						<div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`} />
					</div>
					<div className="flex-1 w-full">
						<div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 gap-2">
							<div className="flex-1">
								<h3 className="pixel-text text-lg sm:text-xl text-gold mb-1">{project.title}</h3>
								<div className="text-cream/60 text-sm">{project.category}</div>
							</div>
							<div className="flex items-center gap-3">
								<button
									onClick={(e) => {
										e.stopPropagation();
										onLike();
									}}
									className={`transition-colors ${isLiked ? "text-red-400" : "text-cream/60 hover:text-red-400"}`}
								>
									<Heart size={16} fill={isLiked ? "currentColor" : "none"} />
								</button>
								<div className="text-cream/60 text-sm">{project.year}</div>
							</div>
						</div>
						<p className="text-cream/80 text-sm mb-3 line-clamp-2">{project.description}</p>
						<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
							<div className="flex flex-wrap gap-2">
								{project.tags.slice(0, 3).map((tag) => (
									<span key={tag} className="px-2 py-1 bg-gold/20 border border-gold/50 rounded text-gold text-xs pixel-text">
										{tag}
									</span>
								))}
							</div>
							<div className="flex items-center gap-4 text-cream/60 text-sm">
								<div className="flex items-center gap-1">
									<Eye size={14} />
									<span className="hidden sm:inline">{project.views}</span>
									<span className="sm:hidden">{(project.views / 1000).toFixed(1)}k</span>
								</div>
								<div className="flex items-center gap-1">
									<Clock size={14} />
									{project.metrics.duration}
								</div>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, delay: index * 0.1 }}
			className="group relative cursor-pointer"
			style={{ perspective: "1000px" }}
			onClick={onSelect}
			onMouseMove={handleMouseMove}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div
				ref={cardRef}
				className="relative bg-deep-purple/60 border-2 border-gold/30 rounded-3xl overflow-hidden h-full transition-transform duration-300 ease-out"
				style={{
					transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
					transformStyle: "preserve-3d",
				}}
			>
				<div
					className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
					style={{
						opacity: isHovered ? 1 : 0,
						background: isHovered
							? `radial-gradient(400px circle at ${mouseOnCardPosition.x}px ${mouseOnCardPosition.y}px, rgba(255, 215, 0, 0.15), transparent 80%)`
							: "none",
					}}
				/>

				<div className="relative h-48 sm:h-64 overflow-hidden" style={{ transform: "translateZ(20px)" }}>
					<motion.div className="w-full h-full" whileHover={{ scale: 1.1 }} transition={{ duration: 0.5 }}>
						<Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
					</motion.div>
					<div className="absolute inset-0 bg-gradient-to-t from-deep-purple/80 via-transparent to-transparent" />
				</div>

				<div className="p-4 sm:p-6" style={{ transform: "translateZ(40px)" }}>
					<div className="flex items-start justify-between mb-4">
						<div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
							<div className={`p-1.5 sm:p-2 rounded-lg bg-gradient-to-br ${project.color} flex-shrink-0`}>
								{project.icon}
							</div>
							<div className="min-w-0 flex-1">
								<h3 className="pixel-text text-lg sm:text-xl text-gold group-hover:animate-glow truncate">
									{project.title}
								</h3>
								<div className="text-cream/60 text-sm">{project.category}</div>
							</div>
						</div>
						<div className="text-cream/40 text-sm flex-shrink-0">{project.year}</div>
					</div>

					<p className="text-cream/80 text-sm mb-4 leading-relaxed line-clamp-2">{project.description}</p>

					<div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
						{project.tags.slice(0, 3).map((tag) => (
							<span key={tag} className="px-2 py-1 bg-gold/20 border border-gold/50 rounded text-gold text-xs pixel-text">
								{tag}
							</span>
						))}
						{project.tags.length > 3 && (
							<span className="px-2 py-1 bg-gold/20 border border-gold/50 rounded text-gold text-xs pixel-text">
								+{project.tags.length - 3}
							</span>
						)}
					</div>

					<div className="flex items-center justify-between text-sm">
						<div className="flex items-center gap-3 sm:gap-4 text-cream/60">
							<button
								onClick={(e) => {
									e.stopPropagation();
									onLike();
								}}
								className={`flex items-center gap-1 transition-colors ${
									isLiked ? "text-red-400" : "hover:text-red-400"
								}`}
							>
								<Heart size={14} fill={isLiked ? "currentColor" : "none"} />
								{project.likes + (isLiked ? 1 : 0)}
							</button>
							<div className="flex items-center gap-1">
								<Eye size={14} />
								<span className="hidden sm:inline">{project.views}</span>
								<span className="sm:hidden">{(project.views / 1000).toFixed(1)}k</span>
							</div>
						</div>
						<div className="pixel-text text-xs text-gold">{project.metrics.duration}</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
}

function ProjectModalImage({ project }: { project: (typeof projects)[0] }) {
	const [isHovered, setIsHovered] = useState(false);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const cardRef = useRef<HTMLDivElement>(null);

	const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
		if (!cardRef.current) return;
		const rect = cardRef.current.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;
		const mouseX = e.clientX - centerX;
		const mouseY = e.clientY - centerY;
		setMousePosition({ x: mouseX, y: mouseY });
	};

	const handleMouseEnter = () => setIsHovered(true);
	const handleMouseLeave = () => {
		setIsHovered(false);
		setMousePosition({ x: 0, y: 0 });
	};

	const rotateX = isHovered ? (mousePosition.y / 25) * -1 : 0;
	const rotateY = isHovered ? mousePosition.x / 25 : 0;
	const scale = isHovered ? 1.05 : 1;

	return (
		<div
			style={{ perspective: "1000px" }}
			onMouseMove={handleMouseMove}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className="relative h-64 sm:h-80 rounded-2xl mb-6 sm:mb-8"
		>
			<motion.div
				ref={cardRef}
				className="w-full h-full relative"
				style={{
					transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
					transition: "transform 0.2s ease-out",
					transformStyle: "preserve-3d",
				}}
			>
				<Image
					src={project.image || "/placeholder.svg"}
					alt={project.title}
					fill
					className="object-cover rounded-2xl border border-gold/20"
				/>
				<div
					className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-20 rounded-2xl`}
					style={{ transform: "translateZ(20px)" }}
				/>
			</motion.div>
		</div>
	);
}

function ProjectModal({ project, onClose }: { project: (typeof projects)[0]; onClose: () => void }) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-deep-purple/90 backdrop-blur-sm"
			onClick={onClose}
		>
			<motion.div
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.8, opacity: 0 }}
				transition={{ type: "spring", stiffness: 300, damping: 30 }}
				onClick={(e) => e.stopPropagation()}
				className="relative w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto bg-deep-purple rounded-2xl sm:rounded-3xl rgb-border no-scrollbar"
			>
				{/* O cabeçalho do modal com fundo opaco */}
				<div className={`bg-gradient-to-r ${project.color} rounded-t-2xl sm:rounded-t-3xl`}>
					<div className="bg-deep-purple p-4 sm:p-8">
						<div className="flex items-start justify-between">
							<div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
								<div className={`p-2 sm:p-3 rounded-xl bg-gradient-to-br ${project.color} flex-shrink-0`}>
									{project.icon}
								</div>
								<div className="min-w-0 flex-1">
									<h2 className="pixel-text text-2xl sm:text-4xl text-gold mb-2 truncate">{project.title}</h2>
									<div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-cream/80 text-sm sm:text-base">
										<span>{project.category}</span>
										<span className="hidden sm:inline">•</span>
										<span>{project.year}</span>
										<span className="hidden sm:inline">•</span>
										<span className={project.status === "Concluído" ? "text-green-400" : "text-orange-400"}>
											{project.status}
										</span>
									</div>
								</div>
							</div>
							<button
								onClick={onClose}
								className="text-gold hover:text-cream transition-colors text-3xl sm:text-4xl font-bold flex-shrink-0 ml-2 leading-none"
							>
								&times;
							</button>
						</div>
					</div>
				</div>

				{/* Conteúdo do modal */}
				<div className="p-4 sm:p-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12">
						<div>
							{/*
                AQUI FOI INTEGRADO O NOVO COMPONENTE ProjectModalImage
              */}
							<ProjectModalImage project={project} />

							<div className="mb-6 sm:mb-8">
								<h3 className="pixel-text text-lg sm:text-xl text-gold mb-3 sm:mb-4">SOBRE O PROJETO</h3>
								<p className="japanese-text text-cream/90 text-sm sm:text-lg leading-relaxed">{project.fullDescription}</p>
							</div>

							<div className="mb-6 sm:mb-8">
								<h3 className="pixel-text text-lg sm:text-xl text-gold mb-3 sm:mb-4">PRINCIPAIS RECURSOS</h3>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
									{project.features.map((feature) => (
										<div key={feature} className="flex items-center gap-2 text-cream/80">
											<div className="w-2 h-2 bg-gold rounded-full flex-shrink-0" />
											<span className="text-sm">{feature}</span>
										</div>
									))}
								</div>
							</div>
						</div>

						<div>
							<div className="bg-deep-purple/30 border border-gold/30 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
								<h3 className="pixel-text text-lg sm:text-xl text-gold mb-4 sm:mb-6">MÉTRICAS DO PROJETO</h3>
								<div className="grid grid-cols-2 gap-4 sm:gap-6">
									<div className="text-center">
										<div className="pixel-text text-xl sm:text-2xl text-gold mb-1">{project.metrics.lines}</div>
										<div className="text-cream/70 text-xs sm:text-sm">Linhas de Código</div>
									</div>
									<div className="text-center">
										<div className="pixel-text text-xl sm:text-2xl text-gold mb-1">{project.metrics.commits}</div>
										<div className="text-cream/70 text-xs sm:text-sm">Commits</div>
									</div>
									<div className="text-center">
										<div className="pixel-text text-xl sm:text-2xl text-gold mb-1">{project.metrics.duration}</div>
										<div className="text-cream/70 text-xs sm:text-sm">Duração</div>
									</div>
									<div className="text-center">
										<div className="pixel-text text-xl sm:text-2xl text-gold mb-1">{project.metrics.team}</div>
										<div className="text-cream/70 text-xs sm:text-sm">Equipe</div>
									</div>
								</div>
							</div>

							<div className="mb-6 sm:mb-8">
								<h3 className="pixel-text text-lg sm:text-xl text-gold mb-3 sm:mb-4">STACK TECNOLÓGICO</h3>
								<div className="space-y-3 sm:space-y-4">
									{Object.entries(project.tech).map(([category, techs]: [string, string[]]) => (
										<div key={category}>
											<h4 className="pixel-text text-sm text-gold mb-2 capitalize">{category}:</h4>
											<div className="flex flex-wrap gap-2">
												{(techs as string[]).map((tech) => (
													<span
														key={tech}
														className="px-2 sm:px-3 py-1 bg-gold/20 border border-gold/50 rounded text-gold text-xs sm:text-sm pixel-text"
													>
														{tech}
													</span>
												))}
											</div>
										</div>
									))}
								</div>
							</div>

							<div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
								<motion.a
									href={project.demoUrl}
									target="_blank"
									rel="noopener noreferrer"
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="flex-1 bg-gold text-deep-purple text-center py-3 sm:py-4 rounded-xl pixel-text hover:bg-gold/90 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
								>
									<ExternalLink size={16} className="sm:w-5 sm:h-5" />
									VER PROJETO
								</motion.a>
								<motion.a
									href={project.githubUrl}
									target="_blank"
									rel="noopener noreferrer"
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="flex-1 border-2 border-gold text-gold text-center py-3 sm:py-4 rounded-xl pixel-text hover:bg-gold hover:text-deep-purple transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
								>
									<Github size={16} className="sm:w-5 sm:h-5" />
									VER CÓDIGO
								</motion.a>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
}
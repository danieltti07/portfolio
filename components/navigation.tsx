"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { MagneticButton } from "./magnetic-button";

export function Navigation() {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);

	// --- LÓGICA DE AUTO-HIDE ADICIONADA AQUI ---
	const { scrollY } = useScroll();
	const [isHidden, setIsHidden] = useState(false);

	useMotionValueEvent(scrollY, "change", (latest) => {
		const previous = scrollY.getPrevious();

		// Esconde a barra ao rolar para baixo (após 150px)
		if (previous !== undefined && latest > previous && latest > 150) {
			setIsHidden(true);
			setIsOpen(false); // Fecha o menu mobile ao rolar
		} else {
			// Mostra a barra ao rolar para cima
			setIsHidden(false);
		}
	});
	// --- FIM DA LÓGICA DE AUTO-HIDE ---

	const navItems = [
		{ href: "/", label: "Home" },
		{ href: "/projetos", label: "Projetos" },
		{ href: "/sobre", label: "Sobre" },
		{ href: "/contato", label: "Contato" },
	];

	return (
		<motion.nav
			// --- PROPS DE ANIMAÇÃO MODIFICADAS ---
			variants={{
				visible: { y: "0%" },
				hidden: { y: "-100%" },
			}}
			animate={isHidden ? "hidden" : "visible"}
			transition={{ duration: 0.35, ease: "easeInOut" }}
			// --- FIM DAS PROPS MODIFICADAS ---
			className="fixed top-0 left-0 right-0 z-40 bg-deep-purple/90 backdrop-blur-sm border-b-2 border-gold"
		>
			<div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<MagneticButton>
						<Link href="/" className="pixel-text text-gold text-base sm:text-lg hover:animate-glow">
							{"daniel\n"}
						</Link>
					</MagneticButton>

					{/* Desktop Navigation */}
					<div className="hidden md:flex space-x-6 lg:space-x-8">
						{navItems.map((item, index) => (
							<MagneticButton key={item.href}>
								<motion.div
									initial={{ opacity: 0, y: -20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.1 + 0.3 }}
								>
									<Link
										href={item.href}
										className={`pixel-text text-sm transition-all duration-300 hover:text-gold relative group ${
											pathname === item.href ? "text-gold" : "text-cream"
										}`}
									>
										{item.label}
										<motion.div
											className="absolute -bottom-1 left-0 h-0.5 bg-gold"
											initial={{ width: 0 }}
											animate={{ width: pathname === item.href ? "100%" : 0 }}
											whileHover={{ width: "100%" }}
											transition={{ duration: 0.3 }}
										/>
									</Link>
								</motion.div>
							</MagneticButton>
						))}
					</div>

					{/* Mobile Navigation Button */}
					<motion.button
						onClick={() => setIsOpen(!isOpen)}
						className="md:hidden text-cream hover:text-gold transition-colors p-2 relative"
						aria-label="Toggle menu"
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
					>
						<AnimatePresence mode="wait">
							{isOpen ? (
								<motion.div
									key="close"
									initial={{ rotate: -90, opacity: 0 }}
									animate={{ rotate: 0, opacity: 1 }}
									exit={{ rotate: 90, opacity: 0 }}
									transition={{ duration: 0.2 }}
								>
									<X size={20} />
								</motion.div>
							) : (
								<motion.div
									key="menu"
									initial={{ rotate: 90, opacity: 0 }}
									animate={{ rotate: 0, opacity: 1 }}
									exit={{ rotate: -90, opacity: 0 }}
									transition={{ duration: 0.2 }}
								>
									<Menu size={20} />
								</motion.div>
							)}
						</AnimatePresence>
					</motion.button>
				</div>

				{/* Mobile Navigation Menu */}
				<AnimatePresence>
					{isOpen && (
						<motion.div
							className="md:hidden bg-deep-purple border-t border-gold overflow-hidden"
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: "auto", opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							transition={{ duration: 0.3 }}
						>
							<div className="px-2 pt-2 pb-3 space-y-1">
								{navItems.map((item, index) => (
									<motion.div
										key={item.href}
										initial={{ x: -50, opacity: 0 }}
										animate={{ x: 0, opacity: 1 }}
										transition={{ delay: index * 0.1 }}
									>
										<Link
											href={item.href}
											onClick={() => setIsOpen(false)}
											className={`block px-3 py-2 pixel-text text-sm transition-all duration-300 hover:text-gold hover:bg-gold/10 rounded relative ${
												pathname === item.href ? "text-gold bg-gold/5" : "text-cream"
											}`}
										>
											{item.label}
											{pathname === item.href && (
												<motion.div
													className="absolute left-0 top-0 bottom-0 w-1 bg-gold"
													layoutId="mobile-active-tab"
												/>
											)}
										</Link>
									</motion.div>
								))}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.nav>
	);
}
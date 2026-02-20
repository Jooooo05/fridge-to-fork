"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [scrolled, setScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const { scrollY } = useScroll();

    const toggleMenu = () => setIsOpen(!isOpen);

    // Check if mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // navbar sticky behavior - FIXED LOGIC
    useMotionValueEvent(scrollY, "change", (latest) => {
        const currentScrollY = latest;
        
        // Update background opacity based on scroll
        setScrolled(currentScrollY > 50);
        
        // Only apply hide/show animation on desktop (>= 768px)
        if (!isMobile) {
            // Show navbar when scrolling up or at top
            if (currentScrollY < lastScrollY || currentScrollY < 100) {
                setIsVisible(true);
            } 
            // Hide navbar when scrolling down (after 100px)
            else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            }
        } else {
            // Always show navbar on mobile
            setIsVisible(true);
        }
        
        setLastScrollY(currentScrollY);
    });

    const navLinks = [
        { name: "About", href: "/about" },
        { name: "Blog", href: "/blog" },
    ]

    return (
        <>
            <motion.header 
                className={`fixed top-0 left-0 right-0 z-40 md:top-8 md:max-w-250 mx-auto md:rounded-2xl border-2 border-slate-900 transition-all duration-300 ${
                    scrolled 
                        ? 'bg-white/10 backdrop-blur-md shadow-lg' 
                        : 'bg-white/5 backdrop-blur-sm'
                }`}
                initial={{ y: 0 }}
                animate={{ 
                    y: isVisible ? 0 : -120,
                }}
                transition={{ 
                    duration: 0.3, 
                    ease: "easeInOut" 
                }}
            >
                <motion.div
                    className="container mx-auto px-10 h-19 flex items-center justify-between"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Logo */}
                    <Link href="/" className="flex flex-col items-start">
                        <motion.div
                            className="space-x-2"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <span className="text-2xl">🍳</span>
                            <span className="text-xl font-extrabold text-slate-900">
                                Fridge<span className="text-slate-500">to</span>Fork
                            </span>
                        </motion.div>
                    </Link>
                    {/* logo */}

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/auth/login">
                            <Button className="bg-slate-900 hover:bg-white hover:text-slate-900 hover:border hover:border-slate-900 text-white font-bold rounded-full px-6 cursor-pointer transition-all duration-300">
                                Masuk
                            </Button>
                        </Link>
                    </nav>
                    {/* Desktop Navigation */}

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <motion.button
                            onClick={toggleMenu}
                            className="text-white focus:outline-none cursor-pointer p-2 rounded-lg hover:bg-secondary/20 transition-colors"
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.div
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </motion.div>
                        </motion.button>
                    </div>
                    {/* Mobile Menu Button */}
                </motion.div>

                {/* Mobile Menu Navigation */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed inset-0 top-18.5 h-screen bg-main/95 backdrop-blur-md z-50 md:hidden"
                        >
                            <div className="flex flex-col h-full p-4">
                                <nav className="flex flex-col space-y-4 py-8">
                                    <Link href="/auth/login">
                                        <Button className="bg-slate-900 hover:bg-slate-700 text-white font-bold rounded-full px-6 cursor-pointer">
                                            Masuk Gratis
                                        </Button>
                                    </Link>
                                </nav>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                {/* Mobile Menu Navigation */}
            </motion.header>
        </>
    )
}
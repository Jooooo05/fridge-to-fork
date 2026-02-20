"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Heart, Clock, Settings } from "lucide-react";
import { motion, scale } from "motion/react";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/dashboard", icon: Home, label: "home" },
    { href: "/dashboard/favorites", icon: Heart, label: "favorites" },
    { href: "/dashboard/history", icon: Clock, label: "history" },
    { href: "/dashboard/settings", icon: Settings, label: "settings" },
]

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 px-2 pb-safe">
            <div className="flex items-center justify-around max-w-lg mx-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link key={item.href} href={item.href} className="flex-1">
                            <motion.div 
                                className={cn(
                                    "flex flex-col items-center gap-1 py-3 px-2 rounded-xl mx-1 transition-colors",
                                    isActive ? "text-slate-900" : "text-slate-400 hover:text-slate-700"
                                )}
                                whileTap={{ scale: 0.92 }}    
                            >
                                <div className="relative">
                                    {isActive && (
                                        <motion.div
                                            layoutId="bottomNavIndicator"
                                            className="absolute -inset-2 bg-slate-100 rounded-xl"
                                            transition={{ type: "spring", stiffness: 400, damping: 30}}
                                        />
                                    )}
                                    <Icon
                                        size={22}
                                        className="relative z-10"
                                        strokeWidth={isActive ? 2.5 : 1.8}
                                    />
                                </div>
                                <span className={cn("text-[10px] font-semibold relative z-10", isActive ? "text-slate-900" : "text-slate-400")}>
                                    {item.label}
                                </span>
                            </motion.div>
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
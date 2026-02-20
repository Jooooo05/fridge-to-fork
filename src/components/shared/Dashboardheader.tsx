"use client";

import { signOut, useSession } from "next-auth/react";
import { motion } from "motion/react";
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

export default function DashboardHeader() {
    const { data: session } = useSession();

    const initials = session?.user?.name ? session.user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) : "?";

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-slate-200">
            <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <span className="text-xl">🍳</span>
                    <span className="text-base font-extrabold text-slate-900">
                        Fridge<span className="text-slate-400">to</span>Fork
                    </span>
                </div>

                {/* Avatar Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <motion.button
                        whileTap={{ scale: 0.93 }}
                        className="w-9 h-9 rounded-full bg-slate-900 text-white text-sm font-bold flex items-center justify-center focus:outline-none"
                        >
                        {initials}
                        </motion.button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel className="font-normal">
                            <p className="font-semibold text-slate-900 text-sm">
                                {session?.user?.name}
                            </p>
                            <p className="text-xs text-slate-400 truncate">
                                {session?.user?.email}
                            </p>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-slate-600 cursor-pointer">
                                <User size={14} className="mr-2" />
                                Profil
                            </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-red-500 cursor-pointer focus:text-red-500"
                            onClick={() => signOut({ callbackUrl: "/login" })}
                        >
                        <LogOut size={14} className="mr-2" />
                            Keluar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
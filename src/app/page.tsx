"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { motion } from "motion/react";

// ── Reusable animation variants ──
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-slate-50">
        <Navbar />

        {/* ── HERO ── */}
        <section className="relative pt-36 pb-24 px-6 overflow-hidden bg-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#f1f5f9_0%,transparent_70%)] pointer-events-none" />

          <div className="relative max-w-3xl mx-auto text-center">

            <motion.div
              className="text-6xl mb-6 inline-block"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              🥦🧅🍳
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl font-black text-slate-900 leading-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              Bahan di kulkas jadi{" "}
              <span className="relative inline-block">
                masakan lezat
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 10" fill="none">
                  <path d="M2 8 Q75 2 150 7 Q225 12 298 6" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                </svg>
              </span>{" "}
              dalam sekejap
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-slate-500 leading-relaxed mb-10 max-w-xl mx-auto"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.15}
            >
              Ketik bahan yang ada di kulkasmu, dan biarkan AI kami meracikkan
              resep lengkap — beserta kalori, protein, lemak, dan karbohidratnya.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.28}
            >
              <Link href="/auth/register">
                <Button size="lg" className="bg-slate-900 hover:bg-white hover:text-slate-900 hover:border hover:border-slate-900 text-white font-bold text-lg rounded-full px-10 py-6 shadow-lg transition-all duration-500 cursor-pointer">
                  Coba Sekarang — Gratis 🚀
                </Button>
              </Link>
            </motion.div>

            <motion.p
              className="mt-8 text-sm text-slate-400"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.4}
            >
              ✨ Tidak perlu kartu kredit &nbsp;·&nbsp; Langsung bisa dipakai
            </motion.p>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="py-24 px-6 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="text-center mb-16"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
            >
              <span className="inline-block bg-slate-200 text-slate-600 text-sm font-bold px-4 py-1.5 rounded-full mb-4">
                Cara Pakai
              </span>
              <h2 className="text-4xl font-black text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                Semudah 1, 2, 3 🎉
              </h2>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {[
                {
                  emoji: "📝",
                  step: "01",
                  title: "Ketik Bahan",
                  desc: "Masukkan bahan-bahan yang ada di kulkasmu. Bisa apa saja — ayam, wortel, bawang, atau sisa sayuran kemarin.",
                },
                {
                  emoji: "🤖",
                  step: "02",
                  title: "AI Meracik Resep",
                  desc: "Dalam hitungan detik, AI kami akan memberikan 3 pilihan resep yang bisa dibuat dari bahan yang kamu punya.",
                },
                {
                  emoji: "🍽️",
                  step: "03",
                  title: "Masak & Nikmati",
                  desc: "Ikuti langkah-langkah memasaknya, lengkap dengan estimasi waktu dan info nutrisi yang detail.",
                },
              ].map((item) => (
                <motion.div
                  key={item.step}
                  variants={cardVariant}
                  whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
                  className="bg-white rounded-2xl p-8 border border-slate-200 cursor-default"
                >
                  <div className="flex items-start justify-between mb-5">
                    <span className="text-4xl">{item.emoji}</span>
                    <span className="text-5xl font-black text-slate-100" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── TESTIMONIAL ── */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="text-center mb-16"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
            >
              <span className="inline-block bg-slate-200 text-slate-600 text-sm font-bold px-4 py-1.5 rounded-full mb-4">
                Kata Mereka
              </span>
              <h2 className="text-4xl font-black text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                Dicintai para home cook 🧡
              </h2>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {[
                {
                  name: "Sari W.",
                  role: "Ibu rumah tangga, Jakarta",
                  avatar: "👩‍🍳",
                  quote: "Saya tidak perlu bingung lagi tiap sore mau masak apa. Tinggal ketik isi kulkas, langsung dapat resep!",
                },
                {
                  name: "Budi R.",
                  role: "Mahasiswa, Bandung",
                  avatar: "👨‍🎓",
                  quote: "Anak kos banget ini! Bahan seadanya bisa jadi makanan yang enak dan bergizi. Hemat pengeluaran juga.",
                },
                {
                  name: "Dina P.",
                  role: "Pekerja kantoran, Surabaya",
                  avatar: "👩‍💼",
                  quote: "Info kalori dan proteinnya sangat membantu diet saya. Sekarang makan sehat jadi lebih mudah!",
                },
              ].map((t) => (
                <motion.div
                  key={t.name}
                  variants={cardVariant}
                  whileHover={{ scale: 1.02 }}
                  className="bg-slate-50 rounded-2xl p-7 border border-slate-200 cursor-default"
                >
                  <p className="text-slate-700 leading-relaxed mb-6 text-sm italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{t.avatar}</span>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                      <p className="text-slate-400 text-xs">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── CTA BOTTOM ── */}
        <motion.section
          className="py-20 px-6 bg-slate-900 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
        >
          <div className="max-w-2xl mx-auto">
            <motion.div
              className="text-5xl mb-6"
              animate={{ rotate: [0, -10, 10, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
            >
              🍴
            </motion.div>
            <h2 className="text-4xl font-black text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Siap mengolah kulkasmu jadi hidangan spesial?
            </h2>
            <p className="text-slate-400 mb-8 text-lg">
              Bergabung sekarang dan mulai masak lebih cerdas hari ini.
            </p>
            <Link href="/register">
              <Button size="lg" className="bg-white hover:bg-slate-100 text-slate-900 font-bold text-lg rounded-full px-12 py-6">
                Mulai Gratis Sekarang 🚀
              </Button>
            </Link>
          </div>
        </motion.section>

        <Footer />
      </div>
    </>
  );
}
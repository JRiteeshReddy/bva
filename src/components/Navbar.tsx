"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { navLinks } from "@/data/site-data";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setExpanded(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={false}
      animate={{
        paddingTop: expanded ? 0 : 16,
        paddingLeft: expanded ? 0 : 16,
        paddingRight: expanded ? 0 : 16,
      }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      className="fixed top-0 left-0 right-0 z-50 sm:px-6 lg:px-8 md:pt-6"
    >
      <motion.nav
        initial={false}
        animate={{
          maxWidth: expanded ? "100%" : "64rem",
          borderRadius: expanded ? 0 : 9999,
          height: expanded ? 72 : 56,
          backgroundColor: expanded ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0.5)",
          borderColor: expanded ? "rgba(255,255,255,0)" : "rgba(255,255,255,0.3)",
        }}
        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        className="relative mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8 outline-glass backdrop-blur-2xl border"
      >
        <a href="#" className="relative z-10 flex items-center gap-3 group shrink-0">
          <img src="/bva.png" alt="BVA" className="w-8 h-8 object-contain" />
          <span className="font-bold text-base tracking-tight text-white group-hover:text-white/80 transition-colors">
            BVA
          </span>
        </a>

        <ul className="relative z-10 hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-xs lg:text-sm uppercase tracking-wider text-white/85 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="relative z-10 hidden md:block shrink-0">
          <a
            href="#contact"
            className="px-4 py-1.5 rounded-full text-xs lg:text-sm font-semibold border border-white/30 text-white bg-white/5 hover:bg-white/12 transition-all duration-300"
          >
            Join BVA
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative z-10 md:hidden p-2 text-white/90 hover:text-white transition-colors shrink-0"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="outline-glass relative max-w-5xl mx-auto mt-2 rounded-2xl overflow-hidden md:hidden"
          >
            <ul className="relative z-10 px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2.5 px-3 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2 border-t border-white/10">
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="block py-2.5 px-3 text-sm text-white font-semibold"
                >
                  Join BVA
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

"use client";

import { motion } from "framer-motion";
import { FadeIn, GlowButton } from "@/components/ui/SectionHeading";

const icons = {
  projects: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2M12 12v4m-2-2h4" />
    </svg>
  ),
  mentorship: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-2.13a4 4 0 110-7.75 4 4 0 010 7.75zM16 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  network: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2v1.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  grow: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 17l6-6 4 4 8-8M14 7h7v7" />
    </svg>
  ),
};

export default function Internship() {
  return (
    <section id="internship" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="relative card-glow rounded-3xl overflow-hidden glow-border">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative grid md:grid-cols-2 gap-8 md:gap-12 p-8 md:p-12 lg:p-16 items-center">
              <div>
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/25 mb-4"
                >
                  Now Open
                </motion.span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="gradient-text">BVA Internship Program</span>
                </h2>
                <p className="text-neutral-400 text-base md:text-lg leading-relaxed mb-4">
                  Join our internship program and get hands-on experience building real products with AI.
                  Work alongside experienced vibe coders, contribute to open-source projects, and grow your
                  portfolio while making an impact.
                </p>
                <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                  BVA runs structured project-based internship programs under mentorship.
                </p>
                <p className="text-neutral-500 text-sm leading-relaxed mb-8">
                  Open to students and early-career builders in Bangalore. Remote-friendly with weekly
                  in-person sessions.
                </p>
                <GlowButton href="/apply" variant="primary" target="_blank" rel="noopener noreferrer">
                  Apply Now
                </GlowButton>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: "projects", label: "Real Projects", desc: "Work on live products" },
                  { key: "mentorship", label: "Mentorship", desc: "Learn from builders" },
                  { key: "network", label: "Network", desc: "Connect with founders" },
                  { key: "grow", label: "Grow", desc: "Build your portfolio" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-white/20 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-white/15 to-white/5 flex items-center justify-center text-white mb-3 group-hover:from-white/25 group-hover:to-white/10 transition-all duration-300">
                      {icons[item.key as keyof typeof icons]}
                    </div>
                    <h4 className="font-semibold text-white text-sm">{item.label}</h4>
                    <p className="text-xs text-neutral-500 mt-1">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

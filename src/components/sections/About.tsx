"use client";

import { motion } from "framer-motion";

const principles = [
  {
    n: "01",
    title: "Ship, don't polish",
    body: "A working v0 beats a perfect idea. We push code to prod on Tuesday and demo it on Sunday.",
  },
  {
    n: "02",
    title: "Show your weird",
    body: "Half-built side projects. Stacks you've never told anyone about. Bring it — that's where the good stuff lives.",
  },
  {
    n: "03",
    title: "Borrow a brain",
    body: "Stuck for two days? Ping the group. Someone's already solved it on a 3am build and will jump on a call.",
  },
  {
    n: "04",
    title: "Bangalore first",
    body: "Indiranagar rooftops, Koramangala cafes, Whitefield hostels. The city is the campus.",
  },
];

const tickerWords = [
  "vibe coders",
  "indie hackers",
  "AI tinkerers",
  "demo day regulars",
  "3am builders",
  "Tuesday night crew",
  "ship-it cult",
  "prompt gremlins",
];

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex items-baseline gap-4 mb-10"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            About
          </span>
          <span className="flex-1 h-px bg-neutral-800" />
          <span className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            est. somewhere in BLR
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-8">
              A room full of people
              <br />
              who&apos;d rather{" "}
              <span className="italic text-neutral-400">build</span> the
              <br />
              thing than <span className="line-through text-neutral-600">tweet</span> talk about it.
            </h2>

            <div className="space-y-5 text-neutral-400 text-base md:text-lg leading-relaxed max-w-2xl">
              <p>
                BVA started in a Koramangala flat with four friends, three
                laptops, and a vague bet that Bangalore had enough people
                hacking on AI to fill a Discord. Turns out — yeah, it did.
              </p>
              <p>
                We&apos;re students shipping their first app, founders on
                week three of a pivot, and a handful of people who just really
                like telling Cursor what to do. No gatekeeping, no demos
                without a working link, no LinkedIn energy.
              </p>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5 lg:pt-2"
          >
            <blockquote className="border-l-2 border-white/30 pl-6 py-2 mb-10">
              <p className="text-2xl md:text-3xl font-medium text-white leading-snug">
                &ldquo;Working with AI shouldn&apos;t feel generic anymore.&rdquo;
              </p>
              <footer className="mt-4 text-sm text-neutral-500">— BVA</footer>
            </blockquote>

            <div className="grid grid-cols-3 gap-4 border-t border-neutral-900 pt-6">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white">
                  300+
                </div>
                <div className="text-xs text-neutral-500 mt-1 leading-tight">
                  members
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white">
                  20+
                </div>
                <div className="text-xs text-neutral-500 mt-1 leading-tight">
                  projects shipped
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white">
                  Monthly
                </div>
                <div className="text-xs text-neutral-500 mt-1 leading-tight">
                  Vibe Coding Events
                </div>
              </div>
            </div>
          </motion.aside>
        </div>

        <div className="mt-24 md:mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="flex items-baseline gap-4 mb-12"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              How we roll
            </span>
            <span className="flex-1 h-px bg-neutral-800" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
            {principles.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex gap-6"
              >
                <span className="text-neutral-600 font-mono text-sm pt-1 shrink-0 w-8 group-hover:text-white transition-colors">
                  {p.n}
                </span>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                    {p.title}
                  </h3>
                  <p className="text-neutral-400 leading-relaxed">{p.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-24 md:mt-32 -mx-4 sm:-mx-6 lg:-mx-8 overflow-hidden border-y border-neutral-900 py-6">
        <div className="flex gap-12 whitespace-nowrap animate-marquee">
          {[...tickerWords, ...tickerWords, ...tickerWords].map((w, i) => (
            <span
              key={i}
              className="text-2xl md:text-3xl font-bold text-neutral-700 flex items-center gap-12"
            >
              {w}
              <span className="text-neutral-800">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SectionHeading, FadeIn } from "@/components/ui/SectionHeading";
import { socialLinks } from "@/data/site-data";

const socialIcons: Record<string, React.ReactNode> = {
  twitter: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  github: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  discord: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  ),
  linkedin: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.127 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
};

export default function Contact() {
  const [succeeded, setSucceeded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);
  const [source, setSource] = useState("contact");
  const [messageDefault, setMessageDefault] = useState("");

  // Simple fetch-based submit to Formspree to avoid depending on @formspree/react in builds
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setErrors(null);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      // Post to Formspree endpoint (uses the same form id as before)
      const endpoint = "https://formspree.io/f/mjgdylqn";
      const res = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setSucceeded(true);
        form.reset();
      } else {
        const data = await res.json().catch(() => null);
        setErrors((data && data.error) || "Submission failed. Please try again.");
      }
    } catch (err) {
      setErrors("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const s = params.get("source");
      if (s) {
        setSource(s);
        if (s === "internship") {
          setMessageDefault("I\'d like to apply for the BVA Internship Program. Here's a short intro about me:\n\n");
        }
      }
    } catch (e) {
      // ignore
    }
  }, []);

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-t from-white/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Get In Touch"
          subtitle="Ready to join the vibe? Drop us a message"
        />

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <FadeIn direction="left">
            {succeeded ? (
              <div
                className="card-glow rounded-2xl p-8 text-center"
                aria-live="polite"
              >
                <h3 className="text-xl font-semibold text-white mb-2">Thanks — message received</h3>
                <p className="text-neutral-400">We&apos;ll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <input type="hidden" name="form_source" value={source} />
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-400 mb-2">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-400 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-400 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  defaultValue={messageDefault}
                  placeholder="Tell us about yourself..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all resize-none"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={submitting}
                className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-white to-neutral-400 text-black glow-button disabled:opacity-60"
              >
                {submitting ? "Sending..." : "Send Message"}
              </motion.button>

              {errors && <div className="text-rose-400 mt-3">{errors}</div>}
              </form>
            )}
          </FadeIn>

          <FadeIn direction="right" delay={0.2}>
            <div className="card-glow rounded-2xl p-8 h-full flex flex-col justify-center">
              <h3 className="text-xl font-semibold text-white mb-4">Connect with us</h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                Follow BVA on social media for updates on events, project launches, and community highlights.
                Or reach out directly — we&apos;d love to hear from you.
              </p>

              <div className="flex gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    aria-label={link.name}
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-300"
                  >
                    {socialIcons[link.icon]}
                  </a>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-white/5">
                <p className="text-sm text-neutral-500">
                  <span className="text-neutral-400">Email:</span>{" "}
                  <a href="mailto:hello@bva.community" className="text-white hover:underline">
                    hello@bva.community
                  </a>
                </p>
                <p className="text-sm text-neutral-500 mt-2">
                  <span className="text-neutral-400">Location:</span> Bangalore, India
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

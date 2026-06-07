"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({ title, subtitle, align = "center" }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={`mb-12 md:mb-16 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
        <span className="gradient-text">{title}</span>
      </h2>
      {subtitle && (
        <p className="text-neutral-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="section-divider mt-6 max-w-xs mx-auto" />
    </motion.div>
  );
}

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

export function FadeIn({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: FadeInProps) {
  const directions = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface GlowButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  target?: string;
  rel?: string;
}

export function GlowButton({
  children,
  href,
  variant = "primary",
  onClick,
  type = "button",
  className = "",
  target,
  rel,
}: GlowButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold text-sm md:text-base transition-all duration-300 cursor-pointer";

  const variants = {
    primary:
      "bg-gradient-to-r from-white to-neutral-400 text-black glow-button hover:scale-105",
    secondary:
      "bg-white/5 text-white border border-white/20 hover:bg-white/10 hover:border-white/50 hover:scale-105",
    outline:
      "bg-transparent text-white border border-white/40 hover:bg-white/10 hover:border-white hover:scale-105",
  };

  const combined = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className={combined}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={combined}
    >
      {children}
    </motion.button>
  );
}

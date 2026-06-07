"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GlowButton } from "@/components/ui/SectionHeading";
import type { ContentfulProject } from "@/lib/contentful";

interface Props {
  project: ContentfulProject;
  index: number;
}

export default function ProjectCard({ project, index }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group card-glow rounded-2xl overflow-hidden"
    >
      <div className="relative h-48 overflow-hidden bg-neutral-900">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cosmic-black/80 via-transparent to-transparent" />
      </div>

      <div className="p-5 md:p-6">
        <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-neutral-200 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-neutral-500 mb-2">by {project.creator}</p>
        <p className="text-sm text-neutral-400 mb-5 line-clamp-2">
          {project.description}
        </p>
        <GlowButton
          href={project.link}
          variant="outline"
          className="w-full text-sm py-2.5"
        >
          View Project
        </GlowButton>
      </div>
    </motion.article>
  );
}

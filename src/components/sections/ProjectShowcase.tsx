import Image from "next/image";
import { GlowButton } from "@/components/ui/SectionHeading";
import { getProjects } from "@/lib/contentful";
import ProjectCard from "./ProjectCard";

export default async function ProjectShowcase() {
  const projects = await getProjects();

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            <span className="gradient-text">Project Showcase</span>
          </h2>
          <p className="text-neutral-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Real products built by BVA members — proof that vibe coding works
          </p>
          <div className="section-divider mt-6 max-w-xs mx-auto" />
        </div>

        {projects.length === 0 ? (
          <p className="text-center text-neutral-500">
            No projects to show yet — check back soon.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

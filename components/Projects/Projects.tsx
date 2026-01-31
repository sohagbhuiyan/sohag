"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, CheckCircle } from "lucide-react";
import { projects } from "@/lib/data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function Projects() {
  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A showcase of my recent work and technical capabilities
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 card-glow flex flex-col"
            >
              {/* Project Header */}
              <div className="p-6 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {project.title}
                </h3>
                <p className="text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
              </div>

              {/* Project Body */}
              <div className="p-6 flex-1 flex flex-col">
                {/* Features */}
                <div className="mb-6 flex-1">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle size={18} className="text-primary" />
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {project.features.slice(0, 3).map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="flex-shrink-0 w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                        <span className="line-clamp-1">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-muted rounded-full text-xs font-medium text-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-4 border-t border-border">
                  {project.github && (
                    <a
                      href={`https://${project.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg transition-all duration-300 text-sm font-medium"
                    >
                      <Github size={16} />
                      Code
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-all duration-300 text-sm font-medium"
                    >
                      <ExternalLink size={16} />
                      Live
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
"use client";

import { motion } from "framer-motion";
import { Code, Wrench, GitBranch, Users, Cpu } from "lucide-react";
import { skills } from "@/lib/data";

const iconMap: { [key: string]: any } = {
  Languages: Code,
  "Frameworks & Libraries": Cpu,
  "Version Control & Deployment": GitBranch,
  "Collaboration & Project Management": Users,
  "Other Tools": Wrench,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Skills() {
  return (
    <section id="skills" className="py-20 md:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient mb-4">
            Technical Skills
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skills.map((skillCategory) => {
            const Icon = iconMap[skillCategory.category] || Code;
            
            return (
              <motion.div
                key={skillCategory.category}
                variants={cardVariants}
                whileHover={{ y: -5 }}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-xl transition-all duration-300 card-glow"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground flex-1">
                    {skillCategory.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skillCategory.items.map((skill, idx) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      viewport={{ once: true }}
                      className="px-3 py-1.5 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg text-sm font-medium transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 p-6 bg-card border border-border rounded-xl text-center"
        >
          <p className="text-muted-foreground">
            Always learning and adapting to new technologies to deliver cutting-edge solutions
          </p>
        </motion.div>
      </div>
    </section>
  );
}
"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar, ArrowUpRight, Building2 } from "lucide-react";
import { experiences } from "@/lib/data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const dotVariants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
};

export default function Experience() {
  return (
    <section id="experience" className="relative py-20 md:py-28 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background -z-10" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-10 -z-10" />

      {/* Gradient Orbs */}
      <div className="absolute top-20 -left-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 -right-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold border border-primary/20">
              My Journey
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Work Experience
            </span>
          </h2>
          
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Building exceptional digital experiences across various industries and technologies
          </p>
        </motion.div>

        {/* Timeline Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          {/* Vertical Timeline Line */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-primary/50 to-transparent hidden md:block" />

          <div className="space-y-12 md:space-y-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className="relative group"
              >
                {/* Animated Timeline Dot */}
                <motion.div
                  variants={dotVariants}
                  className="absolute left-[26px] md:left-[42px] top-8 md:top-10 hidden md:block z-10"
                >
                  <div className="relative">
                    {/* Outer Pulse Ring */}
                    <div className="absolute inset-0 w-5 h-5 bg-primary/30 rounded-full animate-ping" />
                    
                    {/* Main Dot */}
                    <div className="relative w-5 h-5 bg-primary rounded-full border-4 border-background shadow-lg shadow-primary/50 group-hover:scale-125 transition-transform duration-300" />
                  </div>
                </motion.div>

                {/* Experience Card */}
                <div className="ml-0 md:ml-24 relative">
                  <motion.div
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ duration: 0.3 }}
                    className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 md:p-8 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 transition-all duration-500 overflow-hidden group"
                  >
                    {/* Card Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                    <div className="relative z-10">
                      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                        {/* Icon & Company */}
                        <div className="flex-shrink-0">
                          <div className="relative">
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300" />
                            
                            {/* Icon Container */}
                            <div className="relative w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center border border-primary/20 group-hover:border-primary/40 transition-all duration-300 group-hover:rotate-6">
                              <Building2 className="text-primary w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-5">
                          {/* Header */}
                          <div className="space-y-3">
                            <div className="flex items-start justify-between gap-4">
                              <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                                {exp.title}
                              </h3>
                              
                              <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                            </div>

                            {/* Meta Information */}
                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm md:text-base">
                              <span className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                  <Briefcase size={16} className="text-primary" />
                                </div>
                                <span className="font-medium">{exp.company}</span>
                              </span>
                              
                              <span className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                                <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                                  <MapPin size={16} className="text-secondary" />
                                </div>
                                <span>{exp.location}</span>
                              </span>
                              
                              <span className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                  <Calendar size={16} className="text-primary" />
                                </div>
                                <span className="font-medium">{exp.period}</span>
                              </span>
                            </div>
                          </div>

                          {/* Divider */}
                          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                          {/* Responsibilities */}
                          <ul className="space-y-3">
                            {exp.responsibilities.map((resp, idx) => (
                              <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="flex items-start gap-3 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                              >
                                <span className="flex-shrink-0 w-2 h-2 bg-gradient-to-br from-primary to-secondary rounded-full mt-2 group-hover:scale-125 transition-transform duration-300" />
                                <span className="leading-relaxed">{resp}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Connection Line to Next Item */}
                  {index !== experiences.length - 1 && (
                    <div className="hidden md:block absolute left-[-52px] top-full h-16 w-0.5 bg-gradient-to-b from-primary/50 to-transparent" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Decoration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-border" />
            <span className="text-sm font-medium">More experiences coming soon</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-border" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
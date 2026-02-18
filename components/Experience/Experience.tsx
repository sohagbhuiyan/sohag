"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Briefcase, MapPin, Calendar, Code2, Sparkles, Rocket } from "lucide-react";
import { experiences } from "@/lib/data";

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  },
};

const floatingAnimation: any = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={sectionRef}
      id="experience" 
      className="relative py-10 md:py-32 overflow-hidden bg-gradient-to-b from-background via-muted/30 to-background"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Orbs with Motion */}
        <motion.div 
          style={{ y }}
          className="absolute top-10 md:top-20 -left-40 w-96 h-96 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
          className="absolute bottom-20 -right-40 w-[500px] h-[500px] bg-gradient-to-l from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
        />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-20 md:mb-24"
        >
          <motion.div
            animate={floatingAnimation}
            className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 border border-primary/20 rounded-full backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Professional Journey
            </span>
          </motion.div>
          
          <h2 className="text-3xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="inline-block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Work Experience
            </span>
          </h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Crafting innovative solutions across e-commerce, education, and healthcare platforms
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="visible"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          {/* Animated Timeline Line */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-primary/40 to-transparent hidden md:block overflow-hidden">
            <motion.div
              className="w-full h-full bg-gradient-to-b from-primary via-purple-500 to-pink-500"
              initial={{ y: "-100%" }}
              whileInView={{ y: "100%" }}
              transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
              viewport={{ once: false }}
            />
          </div>

          <div className="space-y-16 md:space-y-20">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className="relative group"
              >
                {/* Animated Timeline Dot */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 200, 
                    damping: 15,
                    delay: 0.1 
                  }}
                  viewport={{ once: true }}
                  className="absolute left-[26px] md:left-[42px] top-10 md:top-12 hidden md:block z-20"
                >
                  <div className="relative">
                    {/* Outer Glow */}
                    <motion.div 
                      className="absolute inset-0 w-6 h-6 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-full blur-md"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    
                    {/* Pulse Ring */}
                    <motion.div 
                      className="absolute inset-0 w-6 h-6 border-2 border-primary rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [1, 0, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                    
                    {/* Main Dot */}
                    <div className="relative w-6 h-6 bg-gradient-to-br from-primary via-purple-500 to-pink-500 rounded-full border-4 border-background shadow-lg shadow-primary/50 group-hover:scale-110 transition-transform duration-300">
                      <div className="absolute inset-1 bg-background/20 rounded-full animate-pulse" />
                    </div>
                  </div>
                </motion.div>

                {/* Experience Card */}
                <div className="ml-0 md:ml-24 relative">
                  <motion.div
                    whileHover={{ 
                      y: -8, 
                      scale: 1.01,
                      rotateY: 2,
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 20 
                    }}
                    className="relative bg-gradient-to-br from-card/90 via-card/80 to-card/90 backdrop-blur-xl border border-primary/20 rounded-3xl p-2 md:p-10 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/40 transition-all duration-500 overflow-hidden"
                  >
                    {/* Animated Background Gradient */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      animate={{
                        background: [
                          "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(168, 85, 247, 0.05) 50%, rgba(236, 72, 153, 0.1) 100%)",
                          "linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(59, 130, 246, 0.05) 50%, rgba(168, 85, 247, 0.1) 100%)",
                          "linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.05) 50%, rgba(59, 130, 246, 0.1) 100%)",
                        ],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    
                    {/* Shine Effect */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                      animate={{
                        x: ["-100%", "200%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Corner Decorations */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full opacity-50" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-tr-full opacity-50" />

       <div className="relative z-10">
  {/* Mobile: icon+title row on top, content below | Desktop: unchanged side-by-side */}
  <div className="flex flex-col lg:flex-row lg:items-start gap-4 md:gap-8">
    
    {/* Mobile: icon + title in one row | Desktop: icon alone in column */}
    <div className="flex flex-row items-center gap-3 lg:block">
      {/* Icon */}
      <motion.div
        className="flex-shrink-0"
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-800 via-purple-500 to-pink-500 opacity-30 blur-xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative w-12 h-12 md:w-24 md:h-24 bg-gradient-to-br from-primary/20 via-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center border border-primary/30 backdrop-blur-sm group-hover:border-primary/50 transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
            {index === 0 ? (
              <Rocket className="relative text-primary w-6 h-6 md:w-12 md:h-12 drop-shadow-lg" strokeWidth={1.5} />
            ) : (
              <Code2 className="relative text-purple-500 w-6 h-6 md:w-12 md:h-12 drop-shadow-lg" strokeWidth={1.5} />
            )}
          </div>
        </div>
      </motion.div>

      {/* Title — shown beside icon on mobile only, hidden on lg (rendered again below in content) */}
      <motion.h3
        className="text-xl font-bold lg:hidden group-hover:via-purple-500 group-hover:to-pink-500 transition-all duration-500"
        whileHover={{ x: 5 }}
      >
        {exp.title}
      </motion.h3>
    </div>

    {/* Content */}
    <div className="flex-1 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        {/* Title — hidden on mobile (shown above), visible on desktop */}
        <motion.h3
          className="hidden lg:block text-4xl font-bold group-hover:via-purple-500 group-hover:to-pink-500 transition-all duration-500"
          whileHover={{ x: 5 }}
        >
          {exp.title}
        </motion.h3>

        {/* Meta Information */}
        <div className="flex flex-wrap gap-3 text-sm md:text-base">
          <motion.span
            className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 md:w-9 md:h-9 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-xl flex items-center justify-center border border-primary/20">
              <Briefcase size={14} className="text-primary" />
            </div>
            <span className="font-semibold">{exp.company}</span>
          </motion.span>

          <motion.span
            className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 md:w-9 md:h-9 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center border border-purple-500/20">
              <MapPin size={14} className="text-purple-500" />
            </div>
            <span>{exp.location}</span>
          </motion.span>

          <motion.span
            className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 md:w-9 md:h-9 bg-gradient-to-br from-pink-500/20 to-primary/20 rounded-xl flex items-center justify-center border border-pink-500/20">
              <Calendar size={14} className="text-pink-500" />
            </div>
            <span className="font-semibold">{exp.period}</span>
          </motion.span>
        </div>
      </div>

      {/* Projects Badge */}
      {exp.projects && exp.projects.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {exp.projects.map((project, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 rounded-full text-sm font-medium text-primary hover:border-primary/40 transition-all duration-300"
            >
              {project}
            </motion.span>
          ))}
        </div>
      )}

      {/* Divider */}
      <div className="relative h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border to-transparent" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-pink-500 opacity-0 group-hover:opacity-50 transition-opacity duration-500"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </div>

      {/* Responsibilities */}
      <ul className="space-y-3 md:space-y-4">
        {exp.responsibilities.map((resp, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ x: 8 }}
            className="flex items-start gap-3 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
          >
            <motion.span
              className="flex-shrink-0 w-2 h-2 bg-gradient-to-br from-primary via-purple-500 to-pink-500 rounded-full mt-2"
              whileHover={{ scale: 1.5, rotate: 180 }}
              transition={{ duration: 0.3 }}
            />
            <span className="leading-relaxed text-sm md:text-base">{resp}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  </div>
</div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/0 via-purple-500/0 to-pink-500/0 group-hover:from-primary/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none" />
                  </motion.div>

                  {/* Connection Line */}
                  {index !== experiences.length - 1 && (
                    <motion.div 
                      className="hidden md:block absolute left-[-52px] top-full h-20 w-[2px] bg-gradient-to-b from-primary/40 to-transparent overflow-hidden"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <motion.div
                        className="w-full h-full bg-gradient-to-b from-primary via-purple-500 to-transparent"
                        animate={{ y: ["-100%", "100%"] }}
                        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                      />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <motion.div 
            className="inline-flex items-center gap-3 text-muted-foreground"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div 
              className="h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent"
              animate={{ scaleX: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-medium">Crafting the future, one project at a time</span>
            <motion.div 
              className="h-px w-16 bg-gradient-to-l from-transparent via-primary to-transparent"
              animate={{ scaleX: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
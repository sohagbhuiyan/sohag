"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Code, Wrench, GitBranch, Users, Cpu, Sparkles, Zap } from "lucide-react";
import { skills } from "@/lib/data";

const iconMap: { [key: string]: any } = {
  Languages: Code,
  "Frameworks & Libraries": Cpu,
  "Version Control & Deployment": GitBranch,
  "Collaboration & Project Management": Users,
  "Other Tools": Wrench,
};

const colorMap: { [key: string]: string } = {
  Languages: "from-blue-500 to-cyan-500",
  "Frameworks & Libraries": "from-purple-500 to-pink-500",
  "Version Control & Deployment": "from-green-500 to-emerald-500",
  "Collaboration & Project Management": "from-orange-500 to-yellow-500",
  "Other Tools": "from-red-500 to-rose-500",
};

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: any = {
  hidden: { opacity: 0, y: 50, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.7,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  },
};

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={sectionRef}
      id="skills" 
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/40 to-background -z-10" />
      
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Orbs */}
        <motion.div 
          style={{ y }}
          className="absolute top-40 -right-40 w-96 h-96 bg-gradient-to-l from-purple-500/20 via-blue-500/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [-30, 30]) }}
          className="absolute bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-r from-cyan-500/15 via-purple-500/15 to-transparent rounded-full blur-3xl"
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
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
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 border border-primary/20 rounded-full backdrop-blur-sm"
          >
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Tech Stack & Expertise
            </span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="inline-block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500  bg-clip-text text-transparent">
              Technical Skills
            </span>
          </h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Technologies and tools I leverage to craft exceptional digital experiences
          </motion.p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {skills.map((skillCategory, index) => {
            const Icon = iconMap[skillCategory.category] || Code;
            const gradient = colorMap[skillCategory.category] || "from-primary to-secondary";
            
            return (
              <motion.div
                key={skillCategory.category}
                variants={cardVariants}
                whileHover={{ 
                  y: -12, 
                  scale: 1.02,
                  rotateY: 5,
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20 
                }}
                className="group relative bg-gradient-to-br from-card/90 via-card/80 to-card/90 backdrop-blur-xl border border-primary/20 rounded-2xl p-8 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/40 transition-all duration-500 overflow-hidden"
              >
                {/* Animated Background Gradient */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700`}
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
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

                {/* Corner Decoration */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${gradient} opacity-10 rounded-bl-full`} />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-8">
                    <motion.div 
                      className="flex-shrink-0"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="relative">
                        {/* Glow */}
                        <motion.div 
                          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-30 blur-xl`}
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                        
                        {/* Icon Container */}
                        <div className={`relative w-14 h-14 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                          <Icon className="text-white w-7 h-7" strokeWidth={2} />
                        </div>
                      </div>
                    </motion.div>
                    
                    <h3 className="text-xl md:text-2xl font-bold text-foreground flex-1 leading-tight group-hover:text-primary transition-colors duration-300">
                      {skillCategory.category}
                    </h3>
                  </div>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2">
                    {skillCategory.items.map((skill, idx) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        viewport={{ once: true }}
                        whileHover={{ 
                          scale: 1.1, 
                          y: -2,
                        }}
                        className={`px-4 py-2 bg-gradient-to-r ${gradient} bg-opacity-10 border border-primary/20 rounded-lg text-sm font-medium text-foreground hover:text-white hover:border-transparent hover:shadow-lg transition-all duration-300 cursor-default backdrop-blur-sm relative overflow-hidden group/tag`}
                      >
                        {/* Tag Hover Effect */}
                        <span className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover/tag:opacity-100 transition-opacity duration-300`} />
                        <span className="relative z-10">{skill}</span>
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Hover Border Glow */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 pointer-events-none`} />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 relative group"
        >
          <div className="relative bg-gradient-to-r from-card/80 via-card/90 to-card/80 backdrop-blur-xl border border-primary/20 rounded-2xl p-8 overflow-hidden">
            {/* Background Animation */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-primary/5 via-purple-500/5 to-pink-500/5"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            
            {/* Floating Icons */}
            <div className="absolute inset-0 overflow-hidden">
              {[Code, Cpu, GitBranch, Sparkles].map((Icon, i) => (
                <motion.div
                  key={i}
                  className="absolute text-primary/10"
                  style={{
                    left: `${20 + i * 20}%`,
                    top: "50%",
                  }}
                  animate={{
                    y: [-10, 10, -10],
                    rotate: [0, 360],
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Icon size={40} />
                </motion.div>
              ))}
            </div>

            <div className="relative z-10 text-center">
              <motion.div
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-flex items-center gap-3 mb-3"
              >
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Continuous Learning & Innovation
                </span>
                <Sparkles className="w-5 h-5 text-primary" />
              </motion.div>
              
              <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                Constantly exploring emerging technologies and best practices to deliver cutting-edge, 
                future-proof solutions that exceed expectations
              </p>
            </div>
          </div>

          {/* Card Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-purple-500/20 to-pink-500/0 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { experiences } from "@/lib/data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient mb-4">
            Work Experience
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My professional journey in frontend development
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              variants={itemVariants}
              className="relative"
            >
              {/* Timeline Line */}
              {index !== experiences.length - 1 && (
                <div className="absolute left-6 top-20 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary hidden md:block" />
              )}

              <div className="bg-card border border-border rounded-xl p-6 md:p-8 hover:shadow-xl transition-all duration-300 card-glow relative">
                {/* Timeline Dot */}
                <div className="absolute -left-3 top-8 w-6 h-6 bg-primary rounded-full border-4 border-background hidden md:block" />

                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Briefcase className="text-primary" size={28} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        {exp.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-muted-foreground">
                        <span className="flex items-center gap-2">
                          <Briefcase size={16} />
                          {exp.company}
                        </span>
                        <span className="flex items-center gap-2">
                          <MapPin size={16} />
                          {exp.location}
                        </span>
                        <span className="flex items-center gap-2">
                          <Calendar size={16} />
                          {exp.period}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-2">
                      {exp.responsibilities.map((resp, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-muted-foreground"
                        >
                          <span className="flex-shrink-0 w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
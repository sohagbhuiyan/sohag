"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { 
  GraduationCap, 
  Mail, 
  User, 
  MessageSquare, 
  Send, 
  CheckCircle, 
  Sparkles, 
  Award,
  Linkedin,
  Github,
  MapPin,
  Briefcase,
  Heart
} from "lucide-react";
import { useForm } from "react-hook-form";
import { education } from "@/lib/data";
import type { ContactFormData } from "@/types";

export default function About() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-muted/20 -z-10" />
      
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          style={{ y }}
          className="absolute top-20 -left-40 w-96 h-96 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
          className="absolute bottom-20 -right-40 w-[500px] h-[500px] bg-gradient-to-l from-purple-500/15 via-pink-500/15 to-transparent rounded-full blur-3xl"
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.04)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
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
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Know More About Me
            </span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="inline-block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Developer, problem solver, and tech enthusiast
          </motion.p>

          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "120px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-full mx-auto mt-8"
          />
        </motion.div>

        {/* Professional Picture Section - NEW */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-5 gap-8 items-center">
              {/* Left - Professional Picture */}
              <div className="md:col-span-2">
                <div className="relative group">
                  {/* Glow Effect */}
                  <motion.div 
                    className="absolute -inset-4 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-3xl opacity-30 blur-2xl group-hover:opacity-50 transition-opacity duration-500"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  
                  {/* Picture Container */}
                  <div className="relative bg-gradient-to-br from-card/90 via-card/80 to-card/90 backdrop-blur-xl border border-primary/20 rounded-3xl p-3 group-hover:border-primary/40 transition-all duration-500 overflow-hidden">
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
                    
                    {/* Image */}
                    <div className="relative aspect-square rounded-2xl overflow-hidden">
                      <Image
                        src="/profile.jpg"
                        alt="Sohag Bhuiyan - Professional Picture"
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-700"
                        priority
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>

                  {/* Corner Decorations */}
                  <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-2xl" />
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-2xl" />
                </div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="flex gap-3 mt-6 justify-center"
                >
                  {[
                    { icon: Mail, href: "mailto:sohagbhuiyan778@gmail.com", label: "Email", color: "from-blue-500 to-cyan-500" },
                    { icon: Linkedin, href: "https://linkedin.com/in/yourprofile", label: "LinkedIn", color: "from-blue-600 to-blue-400" },
                    { icon: Github, href: "https://github.com/yourusername", label: "GitHub", color: "from-purple-500 to-pink-500" },
                  ].map((social, idx) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-11 h-11 bg-gradient-to-br ${social.color} bg-opacity-20 border border-primary/30 rounded-xl flex items-center justify-center hover:border-primary/50 transition-all duration-300 group/social`}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 + 0.4 }}
                      viewport={{ once: true }}
                    >
                      <social.icon className="w-5 h-5 text-primary group-hover/social:text-white transition-colors" />
                    </motion.a>
                  ))}
                </motion.div>
              </div>

              {/* Right - Bio Info */}
              <div className="md:col-span-3 space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4 flex items-center gap-3">
                    <span className="w-2 h-10 bg-gradient-to-b from-primary via-purple-500 to-pink-500 rounded-full" />
                    Sohag Bhuiyan
                  </h3>
                  <p className="text-xl text-primary font-semibold mb-4 ml-5">
                    Frontend Developer & React Native Expert
                  </p>
                  <div className="space-y-3 text-muted-foreground leading-relaxed ml-5">
                    <p className="flex items-start gap-2">
                      <Briefcase className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>3+ years of experience building exceptional web and mobile applications</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <MapPin className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span>Based in Dhaka, Bangladesh</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <Heart className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                      <span>Passionate about creating innovative solutions with modern technologies</span>
                    </p>
                  </div>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-3 gap-3 ml-5"
                >
                  {[
                    { label: "Projects", value: "15+" },
                    { label: "Clients", value: "10+" },
                    { label: "Tech Stack", value: "20+" },
                  ].map((stat, idx) => (
                    <motion.div
                      key={stat.label}
                      whileHover={{ scale: 1.05, y: -3 }}
                      className="bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm border border-primary/20 rounded-xl p-3 text-center hover:border-primary/40 transition-all duration-300"
                    >
                      <div className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Education & Contact Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Header */}
            <div className="mb-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-4"
              >
                <div className="relative">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-30 blur-xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                  <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                    <GraduationCap className="text-white" size={26} strokeWidth={2} />
                  </div>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                  Education
                </h3>
              </motion.div>
              <p className="text-muted-foreground ml-16">Academic background & qualifications</p>
            </div>

            {/* Education Cards */}
            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.02,
                  }}
                  className="group relative bg-gradient-to-br from-card/90 via-card/80 to-card/90 backdrop-blur-xl border border-primary/20 rounded-2xl p-6 md:p-8 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/40 transition-all duration-500 overflow-hidden"
                >
                  {/* Background Gradient */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  
                  {/* Shine Effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
                    animate={{
                      x: ["-100%", "200%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  />

                  {/* Corner Decoration */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full" />

                  <div className="relative z-10 flex items-start gap-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center border border-blue-500/30"
                    >
                      <Award className="text-blue-500 w-6 h-6" />
                    </motion.div>
                    
                    <div className="flex-1">
                      <h4 className="text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {edu.degree}
                      </h4>
                      <p className="text-muted-foreground text-base md:text-lg mb-1">
                        {edu.institution}
                      </p>
                      {edu.year && (
                        <p className="text-sm text-muted-foreground/80 font-medium">
                          {edu.year}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Header */}
            <div className="mb-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-4"
              >
                <div className="relative">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-30 blur-xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                  <div className="relative w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Mail className="text-white" size={26} strokeWidth={2} />
                  </div>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                  Get in Touch
                </h3>
              </motion.div>
              <p className="text-muted-foreground ml-16">Let's collaborate on your next project</p>
            </div>

            {/* Form Container */}
            <div className="relative bg-gradient-to-br from-card/90 via-card/80 to-card/90 backdrop-blur-xl border border-primary/20 rounded-2xl p-6 md:p-8 overflow-hidden">
              {/* Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-transparent opacity-50" />
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                {/* Name Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                    Your Name
                  </label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" size={20} />
                    <input
                      {...register("name", { required: "Name is required" })}
                      type="text"
                      id="name"
                      className="w-full pl-12 pr-4 py-3.5 bg-muted/50 backdrop-blur-sm border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 hover:border-primary/50"
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.name && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-500 flex items-center gap-1"
                    >
                      <span className="w-1 h-1 bg-red-500 rounded-full" />
                      {errors.name.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" size={20} />
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      type="email"
                      id="email"
                      className="w-full pl-12 pr-4 py-3.5 bg-muted/50 backdrop-blur-sm border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 hover:border-primary/50"
                      placeholder="john@example.com"
                    />
                  </div>
                  {errors.email && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-500 flex items-center gap-1"
                    >
                      <span className="w-1 h-1 bg-red-500 rounded-full" />
                      {errors.email.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Message Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                    Your Message
                  </label>
                  <div className="relative group">
                    <MessageSquare className="absolute left-4 top-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" size={20} />
                    <textarea
                      {...register("message", { required: "Message is required" })}
                      id="message"
                      rows={5}
                      className="w-full pl-12 pr-4 py-3.5 bg-muted/50 backdrop-blur-sm border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 resize-none hover:border-primary/50"
                      placeholder="Write your message here..."
                    />
                  </div>
                  {errors.message && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-500 flex items-center gap-1"
                    >
                      <span className="w-1 h-1 bg-red-500 rounded-full" />
                      {errors.message.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="relative w-full group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-xl" />
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-primary rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative flex items-center justify-center gap-2 px-6 py-3.5 text-white font-semibold rounded-xl">
                    {isSubmitting ? (
                      <>
                        <motion.div 
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </div>
                </motion.button>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl text-green-600 dark:text-green-400 backdrop-blur-sm"
                  >
                    <CheckCircle size={22} className="flex-shrink-0" />
                    <span className="text-sm font-medium">Message sent successfully! I'll get back to you soon.</span>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="p-4 bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/30 rounded-xl text-red-600 dark:text-red-400 backdrop-blur-sm text-sm"
                  >
                    Failed to send message. Please try again or email me directly at{" "}
                    <a href="mailto:sohagbhuiyan778@gmail.com" className="underline font-semibold hover:text-red-500 transition-colors">
                      sohagbhuiyan778@gmail.com
                    </a>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
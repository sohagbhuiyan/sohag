// "use client";

// import { Suspense, useState, useEffect } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronDown } from "lucide-react";
// import Earth from "./Earth";
// import { heroTexts } from "@/lib/data";

// export default function Hero() {
//   const [currentTextIndex, setCurrentTextIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTextIndex((prev) => (prev + 1) % heroTexts.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   const scrollToNext = () => {
//     const el = document.getElementById("experience");
//     if (el) el.scrollIntoView({ behavior: "smooth" });
//   };

//   const smoothScroll = (id: string) => (e: React.MouseEvent) => {
//     e.preventDefault();
//     document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <section
//       id="home"
//       className="relative min-h-screen flex items-center justify-center overflow-hidden"
//     >
//       {/* ── Ambient background grid ── */}
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />

//       {/* ── Subtle radial glow behind the globe ── */}
//       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//         <div className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full bg-gradient-to-br from-blue-600/10 via-violet-600/8 to-transparent blur-3xl" />
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-2 w-full relative z-10">
//         <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 lg:gap-12 items-center">

//           {/* ─── LEFT / BOTTOM — Text content ─── */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//             className="space-y-5 lg:space-y-6 w-full text-center lg:text-left"
//           >
//             {/* Name block */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.15 }}
//               className="space-y-1"
//             >
//               <p className="text-base md:text-lg text-muted-foreground font-medium tracking-wide pt-4">
//                 Hello, I&apos;m
//               </p>
//               <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gradient leading-tight">
//                 Sohag Bhuiyan
//               </h1>
//             </motion.div>

//             {/* ── Rotating role text ── */}
//             <div className="h-12 sm:h-14 md:h-16 relative overflow-hidden flex items-center justify-center lg:justify-start">
//               <AnimatePresence mode="wait">
//                 <motion.h2
//                   key={currentTextIndex}
//                   initial={{ y: 40, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   exit={{ y: -40, opacity: 0 }}
//                   transition={{ duration: 0.45, ease: "easeOut" }}
//                   className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary absolute glow-text"
//                 >
//                   {heroTexts[currentTextIndex]}
//                 </motion.h2>
//               </AnimatePresence>
//             </div>

//             {/* Bio */}
// <motion.p
//   initial={{ opacity: 0, y: 20 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.6, delay: 0.35 }}
//   className="text-sm md:text-base lg:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0"
// >
//   <span className=" text-muted">
//     Passionate about crafting user-friendly web and mobile applications
 
//   with modern tools like   <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 bg-clip-text text-transparent font-medium"> React, Next.js, Tailwind CSS, and React Native (Expo). </span>
//   Building scalable, cross-platform solutions that deliver exceptional experiences 
//   across all devices with expertise in full-stack development. </span>
// </motion.p>

//             {/* CTA buttons */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.5 }}
//               className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start"
//             >
//               <a
//                 href="#projects"
//                 onClick={smoothScroll("projects")}
//                 className="px-4 sm:px-6 py-2 bg-primary border border-gray-300 text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm sm:text-base"
//               >
//                 View Projects
//               </a>
//               <a
//                 href="#about"
//                 onClick={smoothScroll("about")}
//                 className="px-4 sm:px-6 py-2  border-2 border-blue-400 text-primary rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 text-sm sm:text-base"
//               >
//                 Get in Touch
//               </a>
//             </motion.div>

//             {/* Tech pills */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.65 }}
//               className="flex flex-wrap gap-2 justify-center lg:justify-start"
//             >
//               {["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"].map((tech, i) => (
//                 <motion.span
//                   key={tech}
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.35, delay: 0.75 + i * 0.08 }}
//                   className="px-3 sm:px-4 py-1.5 sm:py-2 bg-muted rounded-full text-xs sm:text-sm font-medium text-foreground border border-muted-foreground/10"
//                 >
//                   {tech}
//                 </motion.span>
//               ))}
//             </motion.div>
//           </motion.div>

//           {/* ─── RIGHT / TOP — 3D Earth ─── */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
//             className="relative w-full flex items-center justify-center"
//             // Responsive height: smaller on mobile, grows up to lg
//             style={{ height: "min(70vw, 420px)" }}
//           >
//             {/* Soft ambient glow behind canvas */}
//             <div className="absolute inset-[10%] bg-gradient-to-br from-blue-500/15 via-violet-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />

//             <Canvas
//               camera={{ position: [0, 0, 7.5], fov: 42 }}
//               style={{ width: "100%", height: "100%" }}
//             >
//               <Suspense fallback={null}>
//                 <Earth />
//                 <OrbitControls
//                   enableZoom={true}
//                   enablePan={false}
//                   autoRotate
//                   autoRotateSpeed={0.4}
//                   minDistance={5}
//                   maxDistance={12}
//                   zoomSpeed={0.8}
//                 />
//               </Suspense>
//             </Canvas>
//           </motion.div>
//         </div>
//       </div>

//       {/* ── Scroll indicator ── */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1.3 }}
//         className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
//         onClick={scrollToNext}
//       >
//         <motion.div
//           animate={{ y: [0, 8, 0] }}
//           transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
//         >
//           <ChevronDown size={28} className="text-muted-foreground hover:text-primary transition-colors" />
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// }
"use client";

import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Earth from "./Earth";
import { heroTexts } from "@/lib/data";

export default function Hero() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % heroTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToNext = () => {
    const el = document.getElementById("experience");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const smoothScroll = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Ambient background grid ── */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />

      {/* ── Subtle radial glow behind the globe ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full bg-gradient-to-br from-blue-600/10 via-violet-600/8 to-transparent blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-2 w-full relative z-10">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 lg:gap-12 items-center">

          {/* ─── LEFT / BOTTOM — Text content ─── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-5 lg:space-y-6 w-full text-center lg:text-left"
          >
            {/* Name block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-1"
            >
              <p className="text-base md:text-lg text-muted-foreground font-medium tracking-wide pt-4">
                Hello, I&apos;m
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gradient leading-tight">
                Sohag Bhuiyan
              </h1>
            </motion.div>

            {/* ── Rotating role text ── */}
            <div className="h-12 sm:h-14 md:h-16 relative overflow-hidden flex items-center justify-center lg:justify-start">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={currentTextIndex}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary absolute glow-text"
                >
                  {heroTexts[currentTextIndex]}
                </motion.h2>
              </AnimatePresence>
            </div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-sm md:text-base lg:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              <span className="text-muted">
                Passionate about crafting user-friendly web and mobile applications
                with modern tools like <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 bg-clip-text text-transparent font-medium">React, Next.js, Tailwind CSS, and React Native (Expo).</span>
                {" "}Building scalable, cross-platform solutions that deliver exceptional experiences 
                across all devices with expertise in full-stack development.
              </span>
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <a
                href="#projects"
                onClick={smoothScroll("projects")}
                className="px-4 sm:px-6 py-2 bg-primary border border-gray-300 text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm sm:text-base"
              >
                View Projects
              </a>
              <a
                href="#about"
                onClick={smoothScroll("about")}
                className="px-4 sm:px-6 py-2 border-2 border-blue-400 text-primary rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                Get in Touch
              </a>
            </motion.div>

            {/* Tech pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-wrap gap-2 justify-center lg:justify-start"
            >
              {["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"].map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: 0.75 + i * 0.08 }}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-muted rounded-full text-xs sm:text-sm font-medium text-foreground border border-muted-foreground/10"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* ─── RIGHT / TOP — 3D Globe ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
            className="relative w-full aspect-square max-w-[600px] mx-auto lg:max-w-none"
          >
            {/* Soft ambient glow behind canvas */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-violet-500/15 to-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Canvas Container - Full size without clipping */}
            <div className="absolute inset-0 w-full h-full">
              <Canvas
                camera={{ position: [0, 0, 8], fov: 50 }}
                style={{ 
                  width: "100%", 
                  height: "100%",
                  background: "transparent"
                }}
                gl={{ 
                  alpha: true, 
                  antialias: true,
                  preserveDrawingBuffer: true 
                }}
              >
                <Suspense fallback={null}>
                  <Earth />
                  <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                    minDistance={5}
                    maxDistance={15}
                    zoomSpeed={0.8}
                  />
                </Suspense>
              </Canvas>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={scrollToNext}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={28} className="text-muted-foreground hover:text-primary transition-colors" />
        </motion.div>
      </motion.div>
    </section>
  );
}
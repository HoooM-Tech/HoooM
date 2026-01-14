"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll, useInView } from "framer-motion";
import Image from "next/image";
import { Check, Calendar, Megaphone, FileText, TrendingUp, Facebook, Linkedin, Heart, ThumbsUp, Instagram } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Counter component for animated numbers
function Counter({ value, duration = 2 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest).toString();
      }
    });
  }, [springValue]);

  return <span ref={ref} />;
}

// 3D Tilt component
function Tilt3D({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Shimmer component
function Shimmer({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
      <motion.div
        className="absolute inset-0 -translate-x-full"
        animate={{
          x: ["0%", "200%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
        }}
      />
    </div>
  );
}

// Ripple button wrapper
function RippleButton({ children, className, ...props }: { children: React.ReactNode; className?: string; [key: string]: any }) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { x, y, id: Date.now() };
    setRipples([...ripples, newRipple]);
    setTimeout(() => {
      setRipples(ripples => ripples.filter(r => r.id !== newRipple.id));
    }, 600);
  };

  return (
    <motion.button
      ref={buttonRef}
      onClick={handleClick}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {children}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/30"
          initial={{ width: 0, height: 0, x: ripple.x, y: ripple.y }}
          animate={{ width: 300, height: 300, x: ripple.x - 150, y: ripple.y - 150, opacity: [0.5, 0] }}
          transition={{ duration: 0.6 }}
        />
      ))}
    </motion.button>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-16 md:pt-24 mt-[60px] pb-0 overflow-x-hidden">
            <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
            >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="bg-orange-500 text-white px-3 py-1"
              style={{ display: "inline-block" }}
            >
              Social Media,
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="text-gray-900"
              style={{ display: "inline-block", marginLeft: "0.25rem" }}
            >
              {" "}Without Chaos
            </motion.span>
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-8">
            HoooM&apos;s productized social media system gives you predictable content, clear execution,
            and real visibility without hiring in-house or managing freelancers.
              </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 8px 16px rgba(20,184,166,0.4), 0 4px 8px rgba(20,184,166,0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-teal-400 hover:bg-teal-500 text-white px-8 py-3 rounded-full font-medium transition-colors shadow-[4px_4px_8px_rgba(20,184,166,0.3),-4px_4px_8px_rgba(20,184,166,0.3),0_4px_8px_rgba(20,184,166,0.3)]"
            >
              Get Started
            </motion.button>
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 4px 12px rgba(251,146,60,0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              className="border-2 border-orange-500 text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors"
            >
              Request a Custom Plan
            </motion.button>
          </motion.div>
            </motion.div>

        {/* Hero Image */}
            <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -10, 0]
          }}
          transition={{ 
            opacity: { duration: 0.6, delay: 0.2 },
            scale: { duration: 0.6, delay: 0.2 },
            y: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className="relative max-w-2xl mx-auto"
        >
          <div className="relative bg-transparent rounded-lg overflow-hidden aspect-[4/3]">
            <Image
              src="/hero-woman.png"
              alt="Woman with smartphone"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        </motion.div>
      </section>

      {/* Problem Section */}
      <section className="bg-gray-50 pt-16 md:pt-24 pb-16 md:pb-24 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block border border-orange-500 font-medium rounded-full px-4 py-1 text-sm text-gray-600 mb-4">
              THE PROBLEM
            </div>
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4">
              Why Social Media Feels Harder Than It Should Be
            </h2>
            <p className="text-gray-600 text-lg">
              Here&apos;s what most growing businesses struggle with:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 overflow-hidden">
            {/* Inconsistent Posting */}
            <Tilt3D>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                className="md:h-[348px] bg-[#FFFFFF] px-[35px] py-[31px] overflow-hidden"
              >
              <h3 className="text-xl font-medium text-gray-900 mb-3">Inconsistent posting</h3>
              <p className="text-gray-600 text-sm mb-6">
                Weeks go by without content, then everything gets posted at once. Consistency suffers, and so does your visibility.
              </p>
              <div className="relative">
                {/* Top card - partially visible, shifted back */}
                <motion.div
                  whileHover={{
                    x: [0, -2, 2, -2, 2, 0],
                    transition: { duration: 0.5 }
                  }}
                  className="bg-white border border-gray-200 rounded-2xl px-4 md:px-6 py-4 shadow-lg translate-y-4 translate-x-0 md:translate-x-2 rotate-3 w-full max-w-full"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="md:w-5 md:h-5 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="md:w-5 md:h-5 w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[14px] md:text-[18px] font-medium text-gray-900 mb-1">Post Updated</h4>
                        <p className="text-gray-500 text-[11px] md:text-[14px]">Viewers can now see your post</p>
                      </div>
                    </div>
                    <div className="text-gray-500 text-xs whitespace-nowrap">Jan 07, 2026</div>
                  </div>
                </motion.div>

                {/* Alert banner - overlapping */}
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-[16px] left-1/2 -translate-x-1/2 z-10 bg-red-500 text-white md:px-6 px-2 md:py-3 py-2 rounded-md flex items-center gap-3 shadow-[0_4px_12px_rgba(239,68,68,0.4)]"
                >
                  <div className="md:w-5 md:h-5 w-3 h-3 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="md:w-5 md:h-5 w-3 h-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <span className="md:text-[14px] text-[10px] font-semibold">Inconsistent post timeline</span>
                </motion.div>

                {/* Bottom card - front and center */}
                <motion.div
                  whileHover={{
                    x: [0, 2, -2, 2, -2, 0],
                    transition: { duration: 0.5 }
                  }}
                  className="bg-white border border-gray-200 rounded-2xl px-4 md:px-6 py-4 shadow-xl relative z-2 -rotate-3 w-full max-w-full"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="md:w-5 md:h-5 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="md:w-5 md:h-5 w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[14px] md:text-[18px] font-medium text-gray-900 mb-1">Post Updated</h4>
                        <p className="text-gray-500 text-[11px] md:text-[14px]">Viewers can now see your post</p>
                      </div>
                    </div>
                    <div className="text-gray-500 text-sm whitespace-nowrap">Apr 07, 2026</div>
                  </div>
                </motion.div>
              </div>
              </motion.div>
            </Tilt3D>

            {/* No Clear Content Strategy */}
            <Tilt3D>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.2,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                className="bg-[#FFFFFF] h-[348px] md:mx-auto px-[35px] py-[31px]"
              >
              <h3 className="text-xl font-medium text-gray-900 mb-3">No clear content strategy</h3>
              <p className="text-gray-600 text-sm mb-6">
                You&apos;re posting without a plan unsure what to say, who you&apos;re talking to, or how any of it supports your business goals.
              </p>
              <div className="relative w-full max-w-md mx-auto h-80 overflow-hidden">
                {/* Back card - rotated left (lowest z-index) */}
                <div className="absolute left-1/2 top-3 -translate-x-[105%] w-[100px] h-[150px] md:w-[124px] md:h-[159px] bg-white border-2 border-gray-200 rounded-2xl shadow-lg transform rotate-12 p-6 z-0">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="text-xs">✗</div>
                      <div className="flex-1 h-3 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-xs">✗</div>
                      <div className="flex-1 h-3 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-xs">✗</div> 
                      <div className="flex-1 h-3 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-xs">✓</div>
                      <div className="flex-1 h-3 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>

                {/* Front card - centered (highest z-index) */}
                <div className="absolute left-1/2 top-11 -translate-x-1/2 w-[100px] h-[150px] md:w-[124px] md:h-[164px] bg-white border-2 border-t-2 border-l-2 border-r-2 border-b-0 border-gray-200 rounded-t-2xl shadow-xl p-6 z-20">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="text-xs">✓</div>
                      <div className="flex-1 h-3 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-xs">✓</div>
                      <div className="flex-1 h-3 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-xs">✗</div>
                      <div className="flex-1 h-3 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-xs">✓</div>
                      <div className="flex-1 h-3 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>

                {/* Right card - rotated right (middle z-index) */}
                <div className="absolute left-1/2 top-4 translate-x-[5%] w-[100px] h-[150px] md:w-[124px] md:h-[159px] bg-white border-2 border-gray-200 rounded-2xl shadow-lg transform -rotate-12 p-6 z-10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="text-xs">✗</div>
                      <div className="flex-1 h-3 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-xs">✓</div>
                      <div className="flex-1 h-3 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-xs">✗</div>
                      <div className="flex-1 h-3 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-xs">✓</div>
                      <div className="flex-1 h-3 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              </motion.div>
            </Tilt3D>

            {/* Too Much Time Coordinating */}
            <Tilt3D>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.3,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                className="h-[369px] bg-[#FFFFFF] p-[35px] overflow-hidden"
              >
              <h3 className="text-xl font-medium text-gray-900 mb-3">Too Much Time Coordinating Creatives & Approvals</h3>
              <p className="text-gray-600 text-sm">
                    Managing designers, writers, revisions, and approvals eats up hours that should be spent growing the business.
              </p>
              </motion.div>
            </Tilt3D>

            {/* Low Engagement Despite Effort */}
            <Tilt3D>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.4,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                className="h-[369px] bg-[#FFFFFF] px-[35px] py-[31px] overflow-hidden"
              >
                <h3 className="text-xl font-medium text-gray-900 mb-3">Low engagement despite effort</h3>
                <p className="text-gray-600 text-sm mb-6">
                  You&apos;re creating content, but it&apos;s not getting noticed likes are low, comments are rare, and growth feels stagnant.
                </p>
                <div>
                  <div className="text-lg font-semibold text-gray-900 mb-6">Engagements</div>
                  <div className="relative">
                    {/* Background bars */}
                    <div className="flex items-end gap-4 md:h-[180px] h-[180px]">
                      {[165, 130, 100, 70].map((height, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${height}px` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.8,
                            delay: 0.5 + i * 0.1,
                            type: "spring",
                            stiffness: 200,
                            damping: 20
                          }}
                          className="flex-1 bg-gray-200 rounded-t-3xl"
                        />
                      ))}
                    </div>
                    
                    {/* Line chart overlay */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 256" preserveAspectRatio="none">
                      {/* Main line */}
                      <motion.polyline
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1.5,
                          delay: 0.6,
                          ease: "easeInOut"
                        }}
                        points="0,180 100,120 200,140 300,80 350,220"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Dashed projection line */}
                      <motion.polyline
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.8,
                          delay: 2.1,
                          ease: "easeInOut"
                        }}
                        points="350,220 400,210"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="2"
                        strokeDasharray="6,6"
                        strokeLinecap="round"
                      />
                      {/* End point circle */}
                      <motion.circle
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.3,
                          delay: 2.2,
                          type: "spring",
                          stiffness: 300,
                          damping: 15
                        }}
                        cx="350"
                        cy="220"
                        r="6"
                        fill="white"
                        stroke="#ef4444"
                        strokeWidth="3"
                      />
                    </svg>
                    
                    {/* Alert badge */}
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute top-8 right-4 bg-red-500 text-white px-5 py-3 rounded-2xl flex items-center gap-3 text-[12px] md:text-base font-semibold shadow-[0_4px_12px_rgba(239,68,68,0.4)]"
                    >
                      <div className="w-5 h-5 md:w-7 md:h-7 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 md:w-4 md:h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      Low Engagement
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </Tilt3D>
            </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 md:py-24 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block border border-orange-500 font-medium rounded-full px-4 py-1 text-sm text-gray-600 mb-4">
              THE SOLUTION
            </div>
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900">
              A Better Way to Handle<br />Social Media
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                This isn&apos;t a traditional agency retainer.
              </h3>
              <p className="text-gray-600 mb-6">
                HoooM is a structured, productized system designed to remove friction and guesswork from social media. With us, you get:
              </p>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                className="space-y-4"
              >
                {[
                  'Defined deliverables',
                  'Clear timelines',
                  'Predictable pricing',
                  'No scope creep',
                  'No endless meetings'
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { 
                        opacity: 1, 
                        x: 0,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 20
                        }
                      }
                    }}
                    className="flex items-center gap-3"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.1 + i * 0.1,
                        type: "spring",
                        stiffness: 400,
                        damping: 15
                      }}
                      className="w-6 h-6 bg-teal-400 rounded-full flex items-center justify-center flex-shrink-0"
                    >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </motion.div>
                    ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6,
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              className="relative bg-gray-100 rounded-lg overflow-hidden aspect-[4/3]"
            >
              <Image
                src="/people.png"
                alt="Team celebrating"
                fill
                className="object-cover object-center"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-gray-50 py-16 md:py-32 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block border border-orange-500 font-medium rounded-full px-4 py-1 text-sm text-gray-600 mb-4">
              HOW IT WORKS
            </div>
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900">
              Reduce friction and make the<br />process feel simple.
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ y: -8, boxShadow: "0 12px 24px rgba(0,0,0,0.15)" }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: 0.1,
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              className="bg-[#F5F5F5] p-8 rounded-lg"
            >
              <motion.div
                initial={{ rotate: 0, scale: 0 }}
                whileInView={{ rotate: 360, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.2,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
                className="w-14 h-14 bg-white border-2 border-orange-300 rounded-lg flex items-center justify-center mb-6 mx-auto"
              >
                <Calendar className="w-7 h-7 text-orange-500" />
              </motion.div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Choose a plan</h3>
              <p className="text-gray-600 text-sm">
                Pick a package that matches your growth stage.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ y: -8, boxShadow: "0 12px 24px rgba(0,0,0,0.15)" }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: 0.2,
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              className="bg-[#F5F5F5] p-8 rounded-lg"
            >
              <motion.div
                initial={{ rotate: 0, scale: 0 }}
                whileInView={{ rotate: 360, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.3,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
                className="w-14 h-14 bg-white border-2 border-orange-300 rounded-lg flex items-center justify-center mb-6 mx-auto"
              >
                <Megaphone className="w-7 h-7 text-orange-500" />
              </motion.div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Align on goals & brand voice</h3>
              <p className="text-gray-600 text-sm">
                We understand your business, audience, and tone.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ y: -8, boxShadow: "0 12px 24px rgba(0,0,0,0.15)" }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: 0.3,
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              className="bg-[#F5F5F5] p-8 rounded-lg"
            >
              <motion.div
                initial={{ rotate: 0, scale: 0 }}
                whileInView={{ rotate: 360, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.4,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
                className="w-14 h-14 bg-white border-2 border-orange-300 rounded-lg flex items-center justify-center mb-6 mx-auto"
              >
                <FileText className="w-7 h-7 text-orange-500" />
              </motion.div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">We create & manage your content</h3>
              <p className="text-gray-600 text-sm">
                Strategy, design, captions, posting handled.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ y: -8, boxShadow: "0 12px 24px rgba(0,0,0,0.15)" }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: 0.4,
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              className="bg-[#F5F5F5] p-8 rounded-lg"
            >
              <motion.div
                initial={{ rotate: 0, scale: 0 }}
                whileInView={{ rotate: 360, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.5,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
                className="w-14 h-14 bg-white border-2 border-orange-300 rounded-lg flex items-center justify-center mb-6 mx-auto"
              >
                <TrendingUp className="w-7 h-7 text-orange-500" />
              </motion.div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">You show up consistently</h3>
              <p className="text-gray-600 text-sm">
                Without stress, micromanagement, or burnout.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block border border-orange-500 font-medium rounded-full px-4 py-1 text-sm text-gray-600 mb-4">
              PRICING & PLANS
            </div>
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900">
              Reduce friction and make the<br />process feel simple.
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
            className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
          >
            {/* Presence Plan */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }
                }
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
              }}
              className="bg-white border-2 border-gray-200 hover:border-orange-400 rounded-2xl p-8 hover:shadow-xl transition-all duration-150 relative overflow-hidden"
            >
              <div className="text-sm font-semibold text-teal-500 mb-2">Presence</div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  ₦<Counter value={120} />,000
                </span>
                <span className="text-4xl text-gray-500">.00/</span>
                <span className="text-gray-500 text-sm">Monthly</span>
              </div>
              <p className="text-gray-600 text-sm mb-6">
                A strong, professional baseline without daily involvement.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full border border-teal-400 text-teal-500 py-3 rounded-full font-medium hover:bg-teal-400 hover:text-white mb-8 transition-colors"
              >
                Get Started
              </motion.button>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05
                    }
                  }
                }}
                className="space-y-4"
              >
                {[
                  'Monthly content strategy',
                  'Content calendar',
                  '12–16 branded posts (static + carousel)',
                  'Engagement-focused captions',
                  'One revision cycle',
                  'Monthly content delivery'
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        transition: {
                          type: "spring",
                          stiffness: 400,
                          damping: 20
                        }
                      }
                    }}
                    className="flex items-start gap-3"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.1 + i * 0.05,
                        type: "spring",
                        stiffness: 400,
                        damping: 15
                      }}
                      className="w-5 h-5 bg-teal-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    >
                      <Check className="w-3 h-3 text-white" />
                    </motion.div>
                    <span className="text-gray-700 text-sm">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Growth Plan - Most Popular */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }
                }
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
              }}
              className="bg-white border-2 border-gray-200 hover:border-orange-400 rounded-2xl p-8 relative hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-semibold text-teal-500">Growth</div>
                <Shimmer className="bg-gray-900 text-white text-xs px-4 py-1.5 rounded-full shadow-lg">
                  <div className="bg-gray-900 text-white text-xs px-4 py-1.5 rounded-full">
                    Most Popular
                  </div>
                </Shimmer>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  ₦<Counter value={220} />,000
                </span>
                <span className="text-4xl text-gray-500">.00/</span>
                <span className="text-gray-500 text-sm">Monthly</span>
              </div>
              <p className="text-gray-600 text-sm mb-6">
                Everything in Presence, plus hands-off posting and performance tracking.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full border border-teal-400 text-teal-500 py-3 rounded-full font-medium hover:bg-teal-400 hover:text-white mb-8 transition-colors"
              >
                Get Started
              </motion.button>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05
                    }
                  }
                }}
                className="space-y-4"
              >
                {[
                  'Up to 100 employees or equipment records',
                  'Bulk data import (Excel/CSV)',
                  'Full dashboard access (list & calendar views)',
                  'Advanced notification settings'
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        transition: {
                          type: "spring",
                          stiffness: 400,
                          damping: 20
                        }
                      }
                    }}
                    className="flex items-start gap-3"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.1 + i * 0.05,
                        type: "spring",
                        stiffness: 400,
                        damping: 15
                      }}
                      className="w-5 h-5 bg-teal-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    >
                      <Check className="w-3 h-3 text-white" />
                    </motion.div>
                    <span className="text-gray-700 text-sm">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Amplify Plan */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }
                }
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
              }}
              className="bg-white border-2 border-gray-200 hover:border-orange-400 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              <div className="text-sm font-semibold text-teal-500 mb-2">Amplify</div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  ₦<Counter value={950} />,000
                </span>
                <span className="text-4xl text-gray-500">.00/</span>
                <span className="text-gray-500 text-sm">Monthly</span>
              </div>
              <p className="text-gray-600 text-sm mb-6">
                Everything in Growth, plus paid amplification and deeper reporting.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full border border-teal-400 text-teal-500 py-3 rounded-full font-medium hover:bg-teal-400 hover:text-white mb-8 transition-colors"
              >
                Get Started
              </motion.button>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05
                    }
                  }
                }}
                className="space-y-4"
              >
                {[
                  'Up to 100 employees or equipment records',
                  'Bulk data import (Excel/CSV)',
                  'Full dashboard access (list & calendar views)',
                  'Advanced notification settings'
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        transition: {
                          type: "spring",
                          stiffness: 400,
                          damping: 20
                        }
                      }
                    }}
                    className="flex items-start gap-3"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.1 + i * 0.05,
                        type: "spring",
                        stiffness: 400,
                        damping: 15
                      }}
                      className="w-5 h-5 bg-teal-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    >
                      <Check className="w-3 h-3 text-white" />
                    </motion.div>
                    <span className="text-gray-700 text-sm">{item}</span>
                  </motion.div>
            ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

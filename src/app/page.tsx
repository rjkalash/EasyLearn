"use client";
import Link from 'next/link';
import { ArrowRight, BookOpen, Sparkles, Brain, Code } from 'lucide-react';
import courses from '@/data/courses';
import metadata from '@/data/metadata.json';
import { motion } from 'framer-motion';

const icons = [Sparkles, Brain, Code, BookOpen];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950/20 dark:to-gray-950 z-0" />
        
        {/* Antigravity Floating Background Orbs */}
        <motion.div 
          animate={{ y: [0, -30, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-400/20 dark:bg-emerald-600/10 rounded-full blur-3xl z-0" 
        />
        <motion.div 
          animate={{ y: [0, 30, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-400/20 dark:bg-teal-600/10 rounded-full blur-3xl z-0" 
        />

        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8"
          >
            <span className="block text-gray-900 dark:text-white">Welcome to {metadata.siteName}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400 pb-2">
              {metadata.slogan}
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400"
          >
            Master the future of technology with our structured, interactive, and comprehensive guides curated just for you.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            className="mt-10 flex justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="#courses" className="inline-block rounded-full px-8 py-3 text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition shadow-lg hover:shadow-emerald-500/30">
                Explore Courses
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="courses" className="py-20 bg-white dark:bg-gray-950 relative z-10">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Our Domains</h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">Select a domain to start your structured learning journey.</p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
              hidden: {}
            }}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {courses.map((course, i) => {
              const Icon = icons[i % icons.length];
              const href = `/courses/${course.id}`;

              return (
                <motion.div
                  key={course.id}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                  }}
                  whileHover={{ y: -10 }}
                >
                  <Link href={href} className="group relative block h-full bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 border border-gray-100 dark:border-gray-800 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5">
                    <div className="absolute top-8 right-8 text-gray-300 dark:text-gray-700 group-hover:text-emerald-500 transition-colors">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="bg-emerald-100 dark:bg-emerald-900/30 w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400"
                    >
                      <Icon className="w-7 h-7" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{course.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                      {course.topics.length} core topics available.
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

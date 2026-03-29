"use client"
import Link from 'next/link';
import { BookOpen, ChevronRight, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CourseOverviewClient({ course }: { course: any }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 py-16 sm:px-6 lg:px-12 relative overflow-hidden">
      {/* Background Orbs */}
      <motion.div 
        animate={{ y: [0, 20, 0], opacity: [0.1, 0.3, 0.1] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute top-1/4 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl z-0 pointer-events-none" 
      />

      {/* Breadcrumbs */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="flex items-center space-x-2 text-sm text-gray-500 mb-8 relative z-10"
      >
        <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-gray-300 font-medium">{course.title}</span>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="mb-12 relative z-10"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          {course.title}
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400">
          Explore the topics and subtopics available in this course. Select a module to begin learning.
        </p>
      </motion.div>

      <div className="space-y-8 relative z-10">
        {course.topics.map((topic: any, idx: number) => (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            whileHover={{ y: -4, boxShadow: "0px 10px 30px rgba(16, 185, 129, 0.05)" }}
            key={topic.id} 
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden"
          >
            <div className="bg-emerald-50/50 dark:bg-emerald-900/10 px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center">
              <BookOpen className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mr-3" />
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{topic.title}</h2>
            </div>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="divide-y divide-gray-100 dark:divide-gray-800"
            >
              {topic.subtopics.map((subtopic: any) => (
                <motion.div variants={itemVariants} key={subtopic.id}>
                  <Link
                    href={`/courses/${course.id}/${topic.id}/${subtopic.id}`}
                    className="group flex items-center justify-between px-6 py-4 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-all duration-300"
                  >
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 mr-4 transition-colors" />
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                          {subtopic.title}
                        </h3>
                        {subtopic.definition && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                            {subtopic.definition}
                          </p>
                        )}
                      </div>
                    </div>
                    <motion.div whileHover={{ scale: 1.2, x: 5 }}>
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-emerald-500 transition-colors" />
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

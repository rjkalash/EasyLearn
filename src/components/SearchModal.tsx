"use client"
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, BookOpen, ChevronRight, FileText, CornerDownRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import courses from '@/data/courses'

type SearchResult = {
  id: string;
  type: 'course' | 'topic' | 'subtopic';
  title: string;
  subtitle?: string;
  snippet?: string;
  courseId: string;
  topicId?: string;
  subtopicId?: string;
  href: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    } else {
      setQuery('')
      setResults([])
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const lowerQuery = query.trim().toLowerCase()
    const newResults: SearchResult[] = []

    courses?.forEach(course => {
      if (course?.title?.toLowerCase()?.includes(lowerQuery)) {
        newResults.push({
          id: `course-${course.id}`,
          type: 'course',
          title: course.title,
          subtitle: 'Course',
          courseId: course.id,
          href: `/courses/${course.id}`
        })
      }

      course?.topics?.forEach((topic: any) => {
        if (topic?.title?.toLowerCase()?.includes(lowerQuery)) {
          newResults.push({
            id: `topic-${course.id}-${topic.id}`,
            type: 'topic',
            title: topic.title,
            subtitle: `Topic in ${course.title}`,
            courseId: course.id,
            topicId: topic.id,
            href: `/courses/${course.id}`
          })
        }

        topic?.subtopics?.forEach((subtopic: any) => {
          if (
            subtopic?.title?.toLowerCase()?.includes(lowerQuery) ||
            subtopic?.definition?.toLowerCase()?.includes(lowerQuery) ||
            subtopic?.explanation?.toLowerCase()?.includes(lowerQuery)
          ) {
            newResults.push({
              id: `subtopic-${course.id}-${topic.id}-${subtopic.id}`,
              type: 'subtopic',
              title: subtopic.title,
              subtitle: `Lesson in ${topic.title} • ${course.title}`,
              snippet: subtopic.definition || subtopic.explanation || '',
              courseId: course.id,
              topicId: topic.id,
              subtopicId: subtopic.id,
              href: `/courses/${course.id}/${topic.id}/${subtopic.id}`
            })
          }
        })
      })
    })

    setResults(newResults.slice(0, 6)) // Limit to 6 results to prevent tall scrolling
  }, [query])

  const handleResultClick = (href: string) => {
    router.push(href)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-gray-900/40 dark:bg-black/60 backdrop-blur-sm z-[100]"
          />
          <div 
            className="fixed inset-0 z-[101] p-4 pt-[15vh] flex justify-center items-start"
            onClick={onClose}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col max-h-[75vh]"
            >
              <div className="relative border-b border-gray-200 dark:border-gray-800 shrink-0">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search courses, topics, or lessons..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full h-16 pl-14 pr-14 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none text-lg"
                />
                <button
                  onClick={onClose}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto overscroll-contain" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <style>{`
                  .overflow-y-auto::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                {query.trim() === '' ? (
                  <div className="p-12 text-center text-gray-500 dark:text-gray-400 flex flex-col items-center justify-center h-full">
                    <Search className="w-16 h-16 mx-auto mb-6 opacity-20" />
                    <p className="text-lg">Start typing to search anything in the platform.</p>
                  </div>
                ) : results.length > 0 ? (
                  <ul className="p-4 space-y-2">
                    {results.map((result) => (
                      <li key={result.id}>
                        <button
                          onClick={() => handleResultClick(result.href)}
                          className="w-full text-left p-4 rounded-xl border border-transparent hover:border-gray-200 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 group flex items-start justify-between transition-all"
                        >
                          <div className="flex items-start space-x-4">
                            <div className="mt-1 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg group-hover:bg-white dark:group-hover:bg-gray-700 transition-colors">
                              {result.type === 'course' && <BookOpen className="w-6 h-6 text-emerald-500" />}
                              {result.type === 'topic' && <CornerDownRight className="w-6 h-6 text-blue-500" />}
                              {result.type === 'subtopic' && <FileText className="w-6 h-6 text-purple-500" />}
                            </div>
                            <div className="flex-1">
                              <div className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                {result.title}
                              </div>
                              <div className="text-sm font-medium text-emerald-600/70 dark:text-emerald-400/70 mt-0.5">
                                {result.subtitle}
                              </div>
                              {result.snippet && (
                                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1 leading-relaxed">
                                  {result.snippet}
                                </div>
                              )}
                            </div>
                          </div>
                          <ChevronRight className="w-6 h-6 text-gray-300 group-hover:text-emerald-500 transition-colors opacity-0 group-hover:opacity-100 mt-1" />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-12 text-center text-gray-500 dark:text-gray-400 flex flex-col items-center justify-center h-full">
                    <p className="text-lg">No results found for "{query}".</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

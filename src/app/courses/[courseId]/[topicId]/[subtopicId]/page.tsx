import { notFound } from 'next/navigation';
import courses from '@/data/courses';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, PlayCircle, ExternalLink } from 'lucide-react';
import { CodeSnippet } from '@/components/CodeSnippet';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ courseId: string; topicId: string; subtopicId: string }>;
};

export async function generateStaticParams() {
  const paths: { courseId: string; topicId: string; subtopicId: string }[] = [];
  for (const course of courses) {
    for (const topic of course.topics) {
      for (const subtopic of (topic as any).subtopics ?? []) {
        paths.push({ courseId: course.id, topicId: topic.id, subtopicId: subtopic.id });
      }
    }
  }
  return paths;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { courseId, topicId, subtopicId } = await params;
  const course = courses.find((c) => c.id === courseId);
  if (!course) return {};
  const topic = course.topics.find((t) => t.id === topicId);
  if (!topic) return {};
  const subtopic = (topic as any).subtopics?.find((s: any) => s.id === subtopicId);
  if (!subtopic) return {};

  const title = `${subtopic.title} – ${topic.title} | ${course.title}`;
  const description = subtopic.definition
    ? `${subtopic.definition}. ${(subtopic.explanation ?? '').slice(0, 120)}...`
    : `Learn ${subtopic.title} in the ${topic.title} module of the EasyLearn ${course.title} course. Includes explanations and real Python code examples.`;

  return {
    title,
    description,
    keywords: [subtopic.title, topic.title, course.title, 'EasyLearn', 'free course', 'tutorial'],
    openGraph: {
      title,
      description,
      url: `https://easylearn.dev/courses/${courseId}/${topicId}/${subtopicId}`,
      type: 'article',
    },
    twitter: { card: 'summary_large_image', title, description },
    alternates: {
      canonical: `https://easylearn.dev/courses/${courseId}/${topicId}/${subtopicId}`,
    },
  };
}

export default async function SubtopicPage({
  params
}: {
  params: Promise<{ courseId: string; topicId: string; subtopicId: string }>
}) {
  const resolvedParams = await params;
  const courseId = resolvedParams.courseId;
  const topicId = resolvedParams.topicId;
  const subtopicId = resolvedParams.subtopicId;

  const course = courses.find((c) => c.id === courseId);
  if (!course) return notFound();

  const topic = course.topics.find((t) => t.id === topicId);
  if (!topic) return notFound();

  const subtopicIndex = topic.subtopics.findIndex((s) => s.id === subtopicId);
  const subtopic = topic.subtopics[subtopicIndex];
  if (!subtopic) return notFound();

  const prevSubtopic = subtopicIndex > 0 ? topic.subtopics[subtopicIndex - 1] : null;
  const nextSubtopic = subtopicIndex < topic.subtopics.length - 1 ? topic.subtopics[subtopicIndex + 1] : null;

  return (
    <div className="max-w-7xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-12 flex flex-col lg:flex-row gap-8 items-start relative">
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4">
        <div className="mb-8">
          <Link href={`/courses/${course.id}`} className="font-extrabold text-2xl text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            {course.title}
          </Link>
          <p className="text-sm text-gray-500 mt-2">Course Navigation</p>
        </div>
        
        <nav className="space-y-8 pb-12">
          {course.topics.map((t: any) => (
            <div key={t.id}>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 uppercase text-xs tracking-wider">{t.title}</h3>
              <ul className="space-y-2 border-l-2 border-gray-100 dark:border-gray-800 ml-2 pl-4 relative">
                {t.subtopics.map((s: any) => {
                  const isActive = s.id === subtopic.id;
                  return (
                    <li key={s.id} className="relative">
                      {isActive && (
                        <span className="absolute -left-[21px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-white dark:ring-gray-950" />
                      )}
                      <Link 
                        href={`/courses/${course.id}/${t.id}/${s.id}`} 
                        className={`block text-sm py-1 transition-colors ${isActive ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"}`}
                      >
                        {s.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content Pane */}
      <div className="flex-1 min-w-0 w-full">
        {/* Mobile Accordion Sidebar */}
        <details className="lg:hidden w-full bg-white dark:bg-gray-900/50 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 mb-8 overflow-hidden group mt-4">
          <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer list-none flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border-b border-transparent group-open:border-gray-100 dark:group-open:border-gray-800">
            <span className="flex items-center gap-3">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">☰</span> 
              <span>Course Navigation</span>
            </span>
            <span className="text-sm text-gray-500 group-open:rotate-180 transition-transform duration-300">▼</span>
          </summary>
          <div className="p-4 max-h-[60vh] overflow-y-auto">
            <nav className="space-y-6">
              {course.topics.map((t: any) => (
                <div key={t.id}>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 uppercase text-xs tracking-wider">{t.title}</h3>
                  <ul className="space-y-2 border-l-2 border-gray-100 dark:border-gray-800 ml-2 pl-4 relative">
                    {t.subtopics.map((s: any) => {
                      const isActive = s.id === subtopic.id;
                      return (
                        <li key={s.id} className="relative">
                          {isActive && (
                            <span className="absolute -left-[21px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-gray-900/50" />
                          )}
                          <Link 
                            href={`/courses/${course.id}/${t.id}/${s.id}`} 
                            className={`block text-sm py-1 transition-colors ${isActive ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"}`}
                          >
                            {s.title}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </details>

        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap lg:mt-0">
          <Link href="/" className="hover:text-emerald-600">Home</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-gray-300 font-medium">{course.title}</span>
          <span>/</span>
          <span className="text-gray-900 dark:text-gray-300 font-medium">{topic.title}</span>
        </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 md:p-12">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">
          {subtopic.title}
        </h1>

        <div className="prose prose-emerald dark:prose-invert max-w-none">
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4 text-emerald-600 dark:text-emerald-400">Definition</h2>
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 border-l-4 border-emerald-500">
              <p className="m-0 text-gray-800 dark:text-gray-200">{subtopic.definition}</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4 text-emerald-600 dark:text-emerald-400">Explanation</h2>
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {subtopic.explanation}
            </div>
          </section>

          {'example' in subtopic && subtopic.example && (
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-4 text-emerald-600 dark:text-emerald-400">Example</h2>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-100 dark:border-gray-800">
                <p className="m-0 text-gray-800 dark:text-gray-200">{(subtopic as any).example}</p>
              </div>
            </section>
          )}

          {'code' in subtopic && subtopic.code && (
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-4 text-emerald-600 dark:text-emerald-400">Code Snippet</h2>
              <CodeSnippet code={(subtopic as any).code} />
            </section>
          )}

          {'links' in subtopic && (subtopic as any).links?.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-4 text-emerald-600 dark:text-emerald-400">Important Links</h2>
              <ul className="space-y-3">
                {(subtopic as any).links.map((link: any, idx: number) => (
                  <li key={idx}>
                    <a href={link.url} target="_blank" rel="noreferrer" className="flex items-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 hover:underline">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {'videos' in subtopic && (subtopic as any).videos?.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-4 text-emerald-600 dark:text-emerald-400">Video Content</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(subtopic as any).videos.map((vid: any, idx: number) => (
                  <a key={idx} href={vid.url} target="_blank" rel="noreferrer" className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                    <PlayCircle className="w-8 h-8 text-rose-500 mr-4" />
                    <span className="font-medium text-gray-900 dark:text-white">{vid.title}</span>
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
          {prevSubtopic ? (
            <Link href={`/courses/${course.id}/${topic.id}/${prevSubtopic.id}`} className="flex justify-center items-center text-emerald-600 hover:text-emerald-700 font-medium bg-emerald-50 dark:bg-emerald-900/20 px-6 py-3 rounded-xl transition-colors w-full md:w-auto text-sm md:text-base">
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 mr-2 shrink-0" />
              <span className="truncate max-w-[220px] md:max-w-xs">Previous: {prevSubtopic.title}</span>
            </Link>
          ) : <div className="hidden md:block" />}
          
          {nextSubtopic ? (
            <Link href={`/courses/${course.id}/${topic.id}/${nextSubtopic.id}`} className="flex justify-center items-center text-emerald-600 hover:text-emerald-700 font-medium bg-emerald-50 dark:bg-emerald-900/20 px-6 py-3 rounded-xl transition-colors w-full md:w-auto text-sm md:text-base">
              <span className="truncate max-w-[220px] md:max-w-xs">Next: {nextSubtopic.title}</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 shrink-0" />
            </Link>
          ) : <div className="hidden md:block" />}
        </div>
      </div>
      </div>
    </div>
  );
}

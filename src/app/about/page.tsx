import type { Metadata } from 'next';
import metadata_json from '@/data/metadata.json';
import { BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About EasyLearn – Our Mission & Story',
  description:
    'Learn about EasyLearn, its mission to make AI and technology education accessible to everyone, and how our structured course content is crafted by GenAI engineers.',
  openGraph: {
    title: 'About EasyLearn – Our Mission & Story',
    description: 'EasyLearn makes AI, ML, and Data Science education free, structured, and accessible.',
    url: 'https://easylearn.dev/about',
    type: 'website',
  },
  alternates: { canonical: 'https://easylearn.dev/about' },
};


export default function About() {
  return (
    <div className="max-w-7xl w-full mx-auto px-4 py-16 sm:px-6 lg:px-12">
      <div className="text-center mb-16">
        <BookOpen className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
          About {metadata_json.siteName}
        </h1>
        <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
          {metadata_json.slogan}
        </p>
      </div>
      
      <div className="prose prose-emerald dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
        <p className="text-lg leading-relaxed mb-6">
          Welcome to {metadata_json.siteName}, your ultimate destination for mastering modern technology and software development. We believe that structured, accessible, and high-quality educational content can empower individuals to build the future.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          Our methodology focuses on clear definitions, practical examples, and curated resources (including key videos and links) so that you get precisely what you need without the fluff.
        </p>
        <div className="mt-12 p-8 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800 text-center">
          <h2 className="text-2xl font-bold mb-4 text-emerald-800 dark:text-emerald-400">Get in touch</h2>
          <p className="mb-6">Have questions? Want to collaborate or suggest new topics?</p>
          <a href={metadata_json.contact.whatsappLink} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-emerald-600 hover:bg-emerald-700 transition">
            Message us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

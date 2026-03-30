import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://easylearn.dev'),
  title: {
    default: 'EasyLearn – Free AI, Machine Learning & Data Science Courses',
    template: '%s | EasyLearn',
  },
  description:
    'EasyLearn offers free, structured, and interactive courses on Generative AI, Machine Learning, Deep Learning, Data Science, and Calculus. Learn with real code examples and clear explanations.',
  keywords: [
    'generative AI course',
    'machine learning tutorial',
    'deep learning course free',
    'data science learning',
    'LLM fundamentals',
    'RAG tutorial',
    'prompt engineering',
    'fine tuning LLM',
    'vector databases',
    'AI safety',
    'calculus course',
    'free online courses AI',
    'EasyLearn',
  ],
  authors: [{ name: 'Raj Kalash Tiwari', url: 'https://linkedin.com/in/rajkalash' }],
  creator: 'Raj Kalash Tiwari',
  publisher: 'EasyLearn',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://easylearn.dev',
    siteName: 'EasyLearn',
    title: 'EasyLearn – Free AI, Machine Learning & Data Science Courses',
    description:
      'Master Generative AI, Machine Learning, Deep Learning, Data Science and more with EasyLearn. Free structured courses with real Python examples.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EasyLearn – Learning Helps You Grow',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EasyLearn – Free AI, ML & Data Science Courses',
    description:
      'Master Generative AI, LLMs, RAG, Prompt Engineering and more for free with EasyLearn.',
    images: ['/og-image.png'],
    creator: '@rajkalash',
  },
  alternates: {
    canonical: 'https://easylearn.dev',
  },
  category: 'education',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/icon.svg',
    shortcut: '/icon.svg',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://easylearn.dev/#organization',
        name: 'EasyLearn',
        url: 'https://easylearn.dev',
        logo: 'https://easylearn.dev/favicon.ico',
        founder: {
          '@type': 'Person',
          name: 'Raj Kalash Tiwari',
          url: 'https://linkedin.com/in/rajkalash',
        },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://easylearn.dev/#website',
        url: 'https://easylearn.dev',
        name: 'EasyLearn',
        description: 'Free AI, Machine Learning and Data Science courses',
        publisher: { '@id': 'https://easylearn.dev/#organization' },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://easylearn.dev/?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${manrope.variable} ${spaceGrotesk.variable} font-sans min-h-screen flex flex-col antialiased bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-50 transition-colors duration-300 relative`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AnimatedBackground />
          <Navbar />
          <main className="flex-1 w-full relative z-10">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

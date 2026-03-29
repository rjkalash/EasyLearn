import { notFound } from 'next/navigation';
import courses from '@/data/courses';
import CourseOverviewClient from './CourseOverviewClient';
import type { Metadata } from 'next';

type Props = { params: Promise<{ courseId: string }> };

export async function generateStaticParams() {
  return courses.map((c) => ({ courseId: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { courseId } = await params;
  const course = courses.find((c) => c.id === courseId);
  if (!course) return {};

  const title = `${course.title} Course – Free Structured Learning`;
  const description = `Learn ${course.title} with EasyLearn. ${course.topics.length} comprehensive topics covering everything from fundamentals to advanced techniques. Free, structured, and example-driven.`;

  return {
    title,
    description,
    keywords: course.topics.map((t) => t.title),
    openGraph: {
      title,
      description,
      url: `https://easylearn.dev/courses/${courseId}`,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description },
    alternates: { canonical: `https://easylearn.dev/courses/${courseId}` },
  };
}

export default async function CourseOverviewPage({ params }: Props) {
  const { courseId } = await params;
  const course = courses.find((c) => c.id === courseId);
  if (!course) return notFound();
  return <CourseOverviewClient course={course} />;
}

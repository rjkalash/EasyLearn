import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Raj Kalash Tiwari – GenAI Engineer & EasyLearn Creator',
  description:
    'Get in touch with Raj Kalash Tiwari, GenAI Engineer and creator of EasyLearn. Connect via WhatsApp (+91 7984604116), Email, LinkedIn, GitHub, or visit the portfolio at rjkalash.github.io.',
  keywords: [
    'contact EasyLearn',
    'Raj Kalash Tiwari',
    'Raj Kalash Tiwari contact',
    'GenAI Engineer contact',
    'rajkalashtiwari',
    'rajkalashtiwari gmail',
    'rjkalash github',
    'rjkalash.github.io',
    'AI developer India',
    'GenAI Engineer TCS',
    'machine learning developer contact',
    'LLM engineer India',
  ],
  openGraph: {
    title: 'Contact Raj Kalash Tiwari – GenAI Engineer & EasyLearn Creator',
    description:
      'Raj Kalash Tiwari is a GenAI Engineer and creator of EasyLearn. Connect via WhatsApp, Email, LinkedIn, GitHub, or portfolio at rjkalash.github.io.',
    url: 'https://easylearn.dev/contact',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Raj Kalash Tiwari – GenAI Engineer',
    description:
      'GenAI Engineer. Creator of EasyLearn. Open to collaborations. WhatsApp | Email | LinkedIn | GitHub | rjkalash.github.io',
    creator: '@rajkalash',
  },
  alternates: { canonical: 'https://easylearn.dev/contact' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

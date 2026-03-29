"use client";
import { motion } from 'framer-motion';
import { Mail, Phone, MessageCircle, ExternalLink, User } from 'lucide-react';
import type { Variants } from 'framer-motion';

// NOTE: metadata export is in a separate server segment for client components.
// SEO is handled via the root layout's template and the page title set below.

// SVG icons for platforms not in lucide-react
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const WebsiteIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const contactLinks = [
  {
    id: 'whatsapp',
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+91 7984604116',
    href: 'https://wa.me/917984604116',
    gradient: 'from-green-500 to-emerald-600',
    bg: 'bg-green-50 dark:bg-green-900/10',
    border: 'border-green-100 dark:border-green-800 hover:border-green-400 dark:hover:border-green-500',
    textColor: 'text-green-600 dark:text-green-400',
    description: 'Chat instantly on WhatsApp',
    cta: 'Open WhatsApp',
    external: true,
  },
  {
    id: 'phone',
    icon: Phone,
    label: 'Phone',
    value: '+91 7984604116',
    href: 'tel:+917984604116',
    gradient: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-50 dark:bg-blue-900/10',
    border: 'border-blue-100 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-500',
    textColor: 'text-blue-600 dark:text-blue-400',
    description: 'Call directly on mobile',
    cta: 'Call Now',
    external: false,
  },
  {
    id: 'email',
    icon: Mail,
    label: 'Email',
    value: 'rajkalashtiwari@gmail.com',
    href: 'mailto:rajkalashtiwari@gmail.com',
    gradient: 'from-rose-500 to-pink-600',
    bg: 'bg-rose-50 dark:bg-rose-900/10',
    border: 'border-rose-100 dark:border-rose-800 hover:border-rose-400 dark:hover:border-rose-500',
    textColor: 'text-rose-600 dark:text-rose-400',
    description: 'Drop an email anytime',
    cta: 'Send Email',
    external: false,
  },
  {
    id: 'linkedin',
    icon: null,
    customIcon: <LinkedInIcon />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/rajkalash',
    href: 'https://linkedin.com/in/rajkalash',
    gradient: 'from-sky-500 to-blue-700',
    bg: 'bg-sky-50 dark:bg-sky-900/10',
    border: 'border-sky-100 dark:border-sky-800 hover:border-sky-400 dark:hover:border-sky-500',
    textColor: 'text-sky-600 dark:text-sky-400',
    description: 'Connect professionally',
    cta: 'View Profile',
    external: true,
  },
  {
    id: 'github',
    icon: null,
    customIcon: <GitHubIcon />,
    label: 'GitHub',
    value: 'github.com/rjkalash',
    href: 'https://github.com/rjkalash',
    gradient: 'from-gray-700 to-gray-900',
    bg: 'bg-gray-50 dark:bg-gray-800/40',
    border: 'border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500',
    textColor: 'text-gray-700 dark:text-gray-300',
    description: 'Browse open-source projects',
    cta: 'View GitHub',
    external: true,
  },
  {
    id: 'website',
    icon: null,
    customIcon: <WebsiteIcon />,
    label: 'Portfolio Website',
    value: 'rjkalash.github.io',
    href: 'https://rjkalash.github.io',
    gradient: 'from-violet-500 to-purple-700',
    bg: 'bg-violet-50 dark:bg-violet-900/10',
    border: 'border-violet-100 dark:border-violet-800 hover:border-violet-400 dark:hover:border-violet-500',
    textColor: 'text-violet-600 dark:text-violet-400',
    description: 'View my personal portfolio & projects',
    cta: 'Visit Website',
    external: true,
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-emerald-950/20 dark:via-gray-950 dark:to-teal-950/10 z-0" />
        <motion.div
          animate={{ y: [0, -25, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
          className="absolute top-20 left-1/4 w-80 h-80 bg-emerald-400/15 dark:bg-emerald-600/8 rounded-full blur-3xl z-0"
        />
        <motion.div
          animate={{ y: [0, 25, 0], opacity: [0.2, 0.45, 0.2] }}
          transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-400/15 dark:bg-teal-600/8 rounded-full blur-3xl z-0"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 shadow-xl shadow-emerald-500/30 mb-8"
          >
            <User className="w-12 h-12 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4"
          >
            <span className="block text-gray-900 dark:text-white">Get in Touch</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400 pb-2">
              Raj Kalash Tiwari
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto"
          >
            GenAI Engineer · Builder · Open to Collaborations
          </motion.p>

          {/* WhatsApp CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8"
          >
            <motion.a
              href="https://wa.me/917984604116"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold text-lg shadow-lg shadow-green-500/30 transition-all"
            >
              <MessageCircle className="w-6 h-6" />
              Chat on WhatsApp
              <ExternalLink className="w-4 h-4 opacity-70" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">All Contact Channels</h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Reach out through any of the platforms below</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {contactLinks.map((contact) => {
              const Icon = contact.icon;
              return (
                <motion.div key={contact.id} variants={itemVariants} whileHover={{ y: -8 }}>
                  <a
                    href={contact.href}
                    target={contact.external ? '_blank' : undefined}
                    rel={contact.external ? 'noreferrer' : undefined}
                    className={`group relative flex flex-col h-full rounded-2xl p-6 border ${contact.bg} ${contact.border} transition-all duration-300 shadow-sm hover:shadow-xl`}
                  >
                    {/* Gradient top accent on hover */}
                    <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r ${contact.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                    <div className="flex items-start gap-4 mb-4">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${contact.gradient} shadow-md`}>
                        {Icon ? <Icon className="w-6 h-6 text-white" /> : contact.customIcon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-0.5">{contact.label}</p>
                        <p className="font-medium text-gray-900 dark:text-white text-sm truncate">{contact.value}</p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 dark:text-gray-400 flex-1 mb-4">{contact.description}</p>

                    <div className={`flex items-center gap-1.5 text-sm font-semibold ${contact.textColor} group-hover:gap-2.5 transition-all`}>
                      {contact.cta}
                      <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Footer note */}
      <section className="py-12 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm text-gray-400 dark:text-gray-600"
        >
          Built with ❤️ · EasyLearn Platform
        </motion.p>
      </section>
    </div>
  );
}

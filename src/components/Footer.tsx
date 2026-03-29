import Link from 'next/link'
import metadata from '@/data/metadata.json'

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 py-12 mt-auto">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-4">{metadata.siteName}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs">{metadata.slogan}</p>
        </div>
        {metadata.footerLinks.map((section, idx) => (
          <div key={idx}>
            <h4 className="font-semibold mb-4">{section.title}</h4>
            <ul className="space-y-2">
              {section.links.map((link, lidx) => (
                <li key={lidx}>
                  <Link href={link.href} className="text-sm text-gray-500 hover:text-emerald-600 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h4 className="font-semibold mb-4">Contact Us</h4>
          <a href={metadata.contact.whatsappLink} target="_blank" rel="noreferrer" className="text-sm text-gray-500 hover:text-emerald-600 transition-colors">
            WhatsApp Support
          </a>
        </div>
      </div>
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Developed by Raj Kalash Tiwari
        </p>
      </div>
    </footer>
  )
}

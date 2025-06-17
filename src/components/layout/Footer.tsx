'use client'

// Footer.tsx
import { PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

export default function Footer() {
  const scrollToQuote = () => {
    document.getElementById('quote-calculator')?.scrollIntoView({ behavior: 'smooth' })
  }
  
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container section">
        <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-3 md:text-left">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Same Day Ramps</h3>
            <p className="text-gray-300">
              The fastest, most reliable wheelchair ramp rentals in Dallas-Fort
              Worth, installed within 24 hours.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4 md:mx-auto">
            <h3 className="text-xl font-bold">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center justify-center gap-2 md:justify-start">
                <PhoneIcon className="h-5 w-5" />
                <a href="tel:940-536-9626" className="hover:text-primary">
                  (940) 536-9626
                </a>
              </li>
              <li className="flex items-center justify-center gap-2 md:justify-start">
                <EnvelopeIcon className="h-5 w-5" />
                <a href="mailto:info@samedayramps.com" className="hover:text-primary">
                  info@samedayramps.com
                </a>
              </li>
            </ul>
          </div>

          {/* Call to Action */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Ready to Get Started?</h3>
            <p className="text-gray-300">
              Get a free, no-obligation quote in seconds.
            </p>
            <button
              onClick={scrollToQuote}
              className="btn-primary w-full shadow-lg"
            >
              Get an Instant Quote
            </button>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Same Day Ramps. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
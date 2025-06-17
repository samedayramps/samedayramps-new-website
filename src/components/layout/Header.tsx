// Header.tsx
'use client';

import { useState } from 'react';
import { Bars3Icon, XMarkIcon, PhoneIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl md:text-2xl font-bold text-[#2ba4f2]">
              Same Day Ramps
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('benefits')}
              className="text-gray-700 hover:text-primary font-medium transition-all duration-200 hover:-translate-y-0.5"
            >
              Why Choose Us
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-gray-700 hover:text-primary font-medium transition-all duration-200 hover:-translate-y-0.5"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-gray-700 hover:text-primary font-medium transition-all duration-200 hover:-translate-y-0.5"
            >
              FAQ
            </button>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="tel:940-536-9626"
              className="flex items-center space-x-2 text-primary hover:text-blue-700 font-semibold transition-all duration-200 hover:-translate-y-0.5"
            >
              <PhoneIcon className="h-5 w-5" />
              <span className="text-lg">(940) 536-9626</span>
            </a>
            <button
              onClick={() => scrollToSection('quote-calculator')}
              className="bg-accent hover:bg-yellow-400 text-gray-900 px-6 py-2 rounded-lg font-semibold transition-all duration-200 hover:-translate-y-0.5"
            >
              Get Quote
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-[#2ba4f2] p-2"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => scrollToSection('benefits')}
                className="text-left text-gray-700 hover:text-primary font-medium py-2 px-3 rounded-md hover:bg-gray-100 transition-colors"
              >
                Why Choose Us
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="text-left text-gray-700 hover:text-primary font-medium py-2 px-3 rounded-md hover:bg-gray-100 transition-colors"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-left text-gray-700 hover:text-primary font-medium py-2 px-3 rounded-md hover:bg-gray-100 transition-colors"
              >
                FAQ
              </button>
              <button
                onClick={() => scrollToSection('quote-calculator')}
                className="text-left text-primary font-bold py-2 px-3 rounded-md hover:bg-gray-100 transition-colors"
              >
                Get a Quote
              </button>
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                <a
                  href="tel:940-536-9626"
                  className="flex items-center space-x-2 text-primary font-semibold text-lg"
                >
                  <PhoneIcon className="h-5 w-5" />
                  <span>(940) 536-9626</span>
                </a>
                <button
                  onClick={() => scrollToSection('quote-calculator')}
                  className="bg-accent hover:bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold text-left w-full"
                >
                  Get Instant Quote
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
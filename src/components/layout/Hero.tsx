// Hero.tsx
'use client';

const Hero = () => {
  const scrollToQuote = () => {
    document.getElementById('quote-calculator')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative h-screen flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/hero1.webp)' }}
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-white text-center">
        <div className="bg-accent text-gray-900 px-6 py-3 rounded-full font-bold inline-block mb-8">
          24-Hour Installation Available
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          Need a Safe Wheelchair Ramp, <span className="text-accent">Today</span>?
        </h1>

        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
          Professional wheelchair ramp rentals installed at your home within 24 hours. No dangerous DIY. No weeks of waiting.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a
            href="tel:940-536-9626"
            className="btn-primary shadow-lg text-xl px-8 py-4"
          >
            Call Now: (940) 536-9626
          </a>
          <button
            onClick={scrollToQuote}
            className="bg-white text-gray-900 px-10 py-4 rounded-lg text-xl font-bold hover:bg-gray-200 transition-colors shadow-lg"
          >
            Get an Instant Quote
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
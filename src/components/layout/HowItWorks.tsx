import {
  PencilSquareIcon,
  WrenchScrewdriverIcon,
  CalendarDaysIcon,
  TruckIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'

const steps = [
  {
    name: 'Step 1: Get a Quote',
    description: 'Call us or fill out our form for an instant, no-obligation quote.',
    icon: PencilSquareIcon,
  },
  {
    name: 'Step 2: We Install',
    description: 'A certified technician installs your ramp, often on the same day.',
    icon: WrenchScrewdriverIcon,
  },
  {
    name: 'Step 3: You Rent',
    description: 'Flexible, affordable monthly rental for as long as you need.',
    icon: CalendarDaysIcon,
  },
  {
    name: 'Step 4: We Remove',
    description: "When you're done, we pick it up for free, leaving no trace.",
    icon: TruckIcon,
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section bg-white">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Simple 4-Step Process
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Get a professional-grade ramp with no hassle or long-term commitments.
          </p>
        </div>
        <div className="mt-16">
          <ul className="grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-8 lg:grid-cols-4">
            {steps.map((step, stepIdx) => (
              <li key={step.name} className="relative p-6 rounded-lg">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                    <step.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold leading-7 text-gray-900">
                    {step.name}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-gray-600">
                    {step.description}
                  </p>
                </div>
                {stepIdx !== steps.length - 1 && (
                  <div className="absolute -right-4 top-5 hidden lg:block">
                    <ChevronRightIcon
                      className="h-5 w-5 text-gray-300"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

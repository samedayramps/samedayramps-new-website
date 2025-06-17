import {
  ClockIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline'

const benefits = [
  {
    name: '24-Hour Installation',
    description:
      'We understand the urgency. Our team can have your ramp installed within 24 hours, often on the same day.',
    icon: ClockIcon,
  },
  {
    name: 'Professional Grade',
    description:
      'All our ramps are ADA-compliant and professionally installed by our certified and insured technicians for your safety.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Transparent Pricing',
    description:
      'No hidden fees. Get an instant, all-inclusive quote based on your specific needs and location right now.',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Rent-to-Own Option',
    description:
      'Flexible rental terms with the option to purchase if your needs change. No long-term commitment is required.',
    icon: ArrowPathIcon,
  },
]

export default function Benefits() {
  return (
    <section id="benefits" className="section bg-white">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            A Stress-Free Experience, Guaranteed
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            We handle everything so you can focus on what matters most.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-none">
          <dl className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 sm:gap-x-8">
            {benefits.map((benefit) => (
              <div key={benefit.name} className="flex flex-col items-center text-center p-6 rounded-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white">
                  <benefit.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <dt className="mt-4 text-lg font-semibold leading-7 text-gray-900">
                  {benefit.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {benefit.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
} 
import {
  ShieldCheckIcon,
  ClockIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Licensed & Insured',
    description: 'Complete peace of mind.',
    icon: ShieldCheckIcon,
  },
  {
    name: '24-Hour Installation',
    description: 'Service when you need it.',
    icon: ClockIcon,
  },
  {
    name: 'Locally Owned',
    description: 'Serving our DFW neighbors.',
    icon: UsersIcon,
  },
]

export default function TrustBar() {
  return (
    <section id="trust-bar" className="bg-gray-50">
      <div className="container py-8 sm:py-12">
        <dl className="grid grid-cols-1 gap-y-10 text-center sm:grid-cols-3 sm:gap-x-8">
          {features.map((feature) => (
            <div key={feature.name} className="flex items-center justify-center gap-x-3">
              <feature.icon
                className="h-6 w-6 text-primary"
                aria-hidden="true"
              />
              <dt className="font-semibold text-gray-900">{feature.name}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
} 
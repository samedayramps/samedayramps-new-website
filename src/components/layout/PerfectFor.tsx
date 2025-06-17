import { CheckCircleIcon } from '@heroicons/react/20/solid'

const useCases = [
  'Post-surgery recovery at home',
  'Safe aging in place',
  'Urgent hospital discharge',
  'Visiting family and special events',
  'Temporary injuries or mobility needs',
]

export default function PerfectFor() {
  return (
    <section id="perfect-for" className="section bg-gray-50">
      <div className="container">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-16">
          {/* Left Column */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              The Perfect Solution for Temporary Needs
            </h2>
          </div>

          {/* Right Column */}
          <div className="flex items-center">
            <ul className="space-y-4">
              {useCases.map((useCase) => (
                <li key={useCase} className="flex items-center gap-x-3 p-2 rounded-md">
                  <CheckCircleIcon
                    className="h-6 w-6 flex-none text-primary"
                    aria-hidden="true"
                  />
                  <span className="text-lg font-medium text-gray-700">{useCase}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
} 
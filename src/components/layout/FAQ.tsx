'use client'

import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: 'How quickly can you install a ramp?',
    answer: 'We can typically install your ramp within 24 hours of your call, often same-day. We understand the urgency and prioritize quick response times.',
  },
  {
    question: 'Are your ramps ADA compliant?',
    answer: 'Yes, all our ramps meet ADA compliance standards. We ensure proper slope ratios and safety features for maximum accessibility and security.',
  },
  {
    question: 'What areas do you serve?',
    answer: 'We serve the entire Dallas-Fort Worth metroplex, including surrounding areas. Contact us to confirm service availability in your specific location.',
  },
  {
    question: 'Do you offer rent-to-own options?',
    answer: 'Yes, we offer flexible rent-to-own options. This allows you to try the ramp first and purchase it if it meets your long-term needs.',
  },
  {
    question: 'What if I need the ramp removed?',
    answer: "We'll remove the ramp at no additional cost when you no longer need it. Just give us a call, and we'll schedule the removal.",
  },
  {
    question: 'Do you work with insurance companies?',
    answer: "While we don't directly bill insurance, we can provide documentation for you to submit to your insurance company for reimbursement.",
  },
]

export default function FAQ() {
  return (
    <section id="faq" className="section bg-gray-50">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Have questions? We have answers.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq) => (
              <Disclosure key={faq.question} as="div" className="bg-white p-6 rounded-lg">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full items-center justify-between text-left">
                      <span className="text-lg font-medium text-gray-900">
                        {faq.question}
                      </span>
                      <ChevronUpIcon
                        className={`${
                          open ? '' : 'rotate-180 transform'
                        } h-6 w-6 text-primary transition-transform duration-200`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel
                      static
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        open ? 'max-h-96' : 'max-h-0'
                      }`}
                    >
                      <p className="mt-4 text-base leading-7 text-gray-600">
                        {faq.answer}
                      </p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 

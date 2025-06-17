'use client'

import React, { useState } from 'react'
import { useForm, FieldError, UseFormRegister } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  UserIcon,
  HomeIcon,
  CalculatorIcon,
} from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'
import AddressAutocompleteInput from '../forms/AddressAutocompleteInput'

const quoteSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'A valid phone number is required'),
  address: z.string().min(5, 'A valid address is required'),
  stepHeight: z
    .number({
      invalid_type_error: 'Please enter a number',
    })
    .min(1, 'Height must be at least 1 inch')
    .max(60, 'Height cannot exceed 60 inches')
    .optional()
    .or(z.literal('')),
})

type QuoteFormData = z.infer<typeof quoteSchema>

const steps = [
  {
    id: 1,
    name: 'Contact Info',
    fields: ['name', 'email', 'phone'],
    icon: UserIcon,
  },
  {
    id: 2,
    name: 'Installation Address',
    fields: ['address'],
    icon: HomeIcon,
  },
  {
    id: 3,
    name: 'Measurements',
    fields: ['stepHeight'],
    icon: CalculatorIcon,
  },
]

export default function QuoteCalculator() {
  const [currentStep, setCurrentStep] = useState(0)
  const [submissionStatus, setSubmissionStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle')
  const [wasInstantQuote, setWasInstantQuote] = useState(false)

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    mode: 'onTouched',
  })

  const handleNext = async () => {
    const fields = steps[currentStep].fields as (keyof QuoteFormData)[]
    const output = await trigger(fields, { shouldFocus: true })
    if (!output) return

    if (currentStep < steps.length - 1) {
      setCurrentStep((step) => step + 1)
    } else {
      await handleSubmit(onSubmit)()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1)
    }
  }

  const onSubmit = async (data: QuoteFormData) => {
    setSubmissionStatus('submitting')

    try {
      const response = await fetch('/api/send-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Network response was not ok')
      
      if (data.stepHeight) {
        setWasInstantQuote(true)
      }

      setSubmissionStatus('success')
    } catch (error) {
      console.error('Submission error:', error)
      setSubmissionStatus('error')
    }
  }
  
  if (submissionStatus === 'success') {
    return (
      <section id="quote" className="section bg-white">
        <div className="container text-center max-w-2xl mx-auto py-20">
          <CheckCircleIcon className="h-16 w-16 mx-auto text-green-500" />
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mt-6">Thank You!</h2>
          {wasInstantQuote ? (
            <p className="text-lg mt-2 text-gray-600">
              Your instant quote has been sent to your email. We&apos;ll call you shortly to confirm the details.
            </p>
          ) : (
            <p className="text-lg mt-2 text-gray-600">
              We&apos;ve received your request and will contact you shortly with a personalized quote.
            </p>
          )}
        </div>
      </section>
    )
  }

  return (
    <section id="quote-calculator" className="section bg-gray-50">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Get an Instant Quote
            </h2>
            <p className="mt-3 text-lg text-gray-600">
              Follow the simple steps to get your no-obligation estimate.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-10 border">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center">
                {steps.map((step, index) => (
                  <React.Fragment key={step.id}>
                    <div className="flex flex-col items-center text-center">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-lg ${
                          currentStep >= index ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                        } transition-colors`}
                      >
                        {currentStep > index ? <CheckCircleIcon className="h-6 w-6" /> : step.id}
                      </div>
                      <p className={`mt-2 text-sm font-medium ${currentStep >= index ? 'text-primary' : 'text-gray-500'}`}>
                        {step.name}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-1 mx-4 rounded ${currentStep > index ? 'bg-primary' : 'bg-gray-200'}`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -30, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentStep === 0 && (
                    <div className="space-y-6">
                      <InputField id="name" label="Full Name" placeholder="John Doe" error={errors.name} register={register} />
                      <InputField id="email" label="Email Address" type="email" placeholder="you@example.com" error={errors.email} register={register} />
                      <InputField id="phone" label="Phone Number" type="tel" placeholder="(555) 123-4567" error={errors.phone} register={register} />
                    </div>
                  )}
                  {currentStep === 1 && (
                     <AddressAutocompleteInput 
                        label="Full Installation Address"
                        error={errors.address} 
                        setValue={setValue}
                        register={register}
                      />
                  )}
                  {currentStep === 2 && (
                    <div>
                      <label htmlFor="stepHeight" className="block text-lg font-semibold text-gray-800 mb-2">Total Step Height (in inches)</label>
                       <div className="bg-blue-50 border-l-4 border-primary p-4 rounded-r-lg mb-4">
                         <div className="flex">
                           <div className="flex-shrink-0">
                             <InformationCircleIcon className="h-5 w-5 text-primary" aria-hidden="true" />
                           </div>
                           <div className="ml-3">
                             <p className="text-sm text-primary-dark">
                               Measure from the ground floor up to the surface of the top step or porch where the ramp will start.
                             </p>
                           </div>
                         </div>
                       </div>
                       <SelectField
                          id="stepHeight"
                          label="Step Height"
                          error={errors.stepHeight}
                          register={register}
                        />
                      <p className="text-sm text-gray-500 mt-2">Don&apos;t have a measurement? No problem. Select &quot;I don&apos;t know&quot; and we&apos;ll help you on the phone.</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="mt-10 flex justify-between items-center">
                <button
                  type="button"
                  onClick={handleBack}
                  className={`px-6 py-2.5 text-sm font-bold rounded-lg transition-all ${
                    currentStep === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
                  }`}
                  disabled={currentStep === 0}
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={submissionStatus === 'submitting'}
                  className="bg-accent text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-yellow-400 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {submissionStatus === 'submitting'
                    ? 'Submitting...'
                    : currentStep === steps.length - 1
                    ? 'Submit & Get Quote'
                    : 'Next'}
                </button>
              </div>
            </form>
            {submissionStatus === 'error' && (
               <div className="mt-4 flex items-center gap-2 text-red-600">
                 <ExclamationCircleIcon className="h-5 w-5" />
                 <p className="text-sm">Something went wrong. Please try again.</p>
               </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

interface InputFieldProps {
  id: keyof QuoteFormData;
  label: string;
  type?: string;
  placeholder: string;
  error: FieldError | undefined;
  register: UseFormRegister<QuoteFormData>;
  isOptional?: boolean;
}

// Reusable Input Field Component for cleaner code
const InputField = ({ id, label, type = 'text', placeholder, error, register, isOptional = false }: InputFieldProps) => (
  <div>
    <label htmlFor={id} className="block text-lg font-semibold text-gray-800 mb-2">
      {label} {!isOptional && <span className="text-red-500">*</span>}
    </label>
    <input
      id={id}
      type={type}
      {...register(id, { valueAsNumber: type === 'number' })}
      className={`w-full px-5 py-3.5 border rounded-lg text-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
        error ? 'border-red-500' : 'border-gray-300'
      }`}
      placeholder={placeholder}
    />
    {error && <p className="mt-1.5 text-sm text-red-600">{error.message}</p>}
  </div>
);

interface SelectFieldProps {
  id: keyof QuoteFormData;
  label: string;
  error: FieldError | undefined;
  register: UseFormRegister<QuoteFormData>;
}

const SelectField = ({ id, label, error, register }: SelectFieldProps) => {
  const heightOptions = Array.from({ length: 60 }, (_, i) => i + 1);

  return (
    <div>
      <label htmlFor={id} className="sr-only">{label}</label>
      <select
        id={id}
        {...register(id, { valueAsNumber: true })}
        className={`w-full px-5 py-3.5 border rounded-lg text-lg bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      >
        <option value="">I don&apos;t know / Select height...</option>
        {heightOptions.map(height => (
          <option key={height} value={height}>
            {height} inches
          </option>
        ))}
      </select>
      {error && <p className="mt-1.5 text-sm text-red-600">{error.message}</p>}
    </div>
  )
}; 
'use client'

import { Autocomplete, useLoadScript } from '@react-google-maps/api'
import { useState, useRef } from 'react'
import { UseFormSetValue, FieldError, UseFormRegister } from 'react-hook-form'

const libraries: ('places')[] = ['places']

interface QuoteFormData {
  name: string
  email: string
  phone: string
  address: string
  stepHeight?: number | ''
}

interface AddressAutocompleteInputProps {
  error: FieldError | undefined
  setValue: UseFormSetValue<QuoteFormData>
  register: UseFormRegister<QuoteFormData>
  label: string
}

export default function AddressAutocompleteInput({ error, setValue, register, label }: AddressAutocompleteInputProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || '',
    libraries,
  })

  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null)
  const addressInputRef = useRef<HTMLInputElement | null>(null)

  const onLoad = (ac: google.maps.places.Autocomplete) => {
    setAutocomplete(ac)
  }

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace()
      const address = place.formatted_address || ''
      setValue('address', address, { shouldValidate: true })

      // This is a workaround to ensure the input visually updates with the new value
      if (addressInputRef.current) {
        addressInputRef.current.value = address
      }
    } else {
      console.error('Autocomplete is not loaded yet!')
    }
  }

  const { ref, ...rest } = register('address')

  if (loadError) return <div>Error loading maps</div>
  if (!isLoaded) return <div>Loading...</div>

  return (
    <div>
       <label htmlFor="address" className="block text-lg font-semibold text-gray-800 mb-2">
         {label} <span className="text-red-500">*</span>
       </label>
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
        options={{
          types: ['address'],
          componentRestrictions: { country: 'us' },
        }}
      >
        <input
          id="address"
          type="text"
          placeholder="Start typing your address..."
          className={`w-full px-5 py-3.5 border rounded-lg text-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          {...rest}
          ref={(e) => {
            ref(e)
            addressInputRef.current = e
          }}
        />
      </Autocomplete>
      {error && <p className="mt-1.5 text-sm text-red-600">{error.message}</p>}
    </div>
  )
} 
export interface ValidationError {
  field: string
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

export interface ConditionalField {
  field: string
  condition: string
  name: string
}

export interface FormatField {
  field: string
  validator: string
}

export interface ValidationConfig {
  required: string[]
  conditional: ConditionalField[]
  formats: FormatField[]
}

const validators = {
  required: (value: any, fieldName: string): string | null => {
    if (value === null || value === undefined || value === '') return `${fieldName} est obligatoire`
    if (typeof value === 'string' && !value.trim()) return `${fieldName} est obligatoire`
    return null
  },

  email: (value: string): string | null => {
    if (!value) return null
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return !emailRegex.test(value) ? 'Format email invalide' : null
  },

  phone: (value: string): string | null => {
    if (!value) return null
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/
    return !phoneRegex.test(value.replace(/\s/g, '')) ? 'Format téléphone invalide' : null
  },

  conditionalRequired: (value: any, condition: boolean, fieldName: string): string | null => {
    if (!condition) return null
    return validators.required(value, fieldName)
  },
}

export const validationConfigs = {
  gastronomy: {
    required: ['name', 'phone', 'email', 'experienceId', 'date', 'passengers'],
    conditional: [{ field: 'companyName', condition: 'isCompany', name: 'Nom de la société' }],
    formats: [
      { field: 'email', validator: 'email' },
      { field: 'phone', validator: 'phone' },
    ],
  } as ValidationConfig,

  lifestyle: {
    required: ['name', 'phone', 'email', 'experienceId', 'date', 'passengers'],
    conditional: [{ field: 'companyName', condition: 'isCompany', name: 'Nom de la société' }],
    formats: [
      { field: 'email', validator: 'email' },
      { field: 'phone', validator: 'phone' },
    ],
  } as ValidationConfig,

  panoramic: {
    required: [
      'destination',
      'flightType',
      'duration',
      'date',
      'time',
      'adults',
      'firstName',
      'lastName',
      'email',
      'phone',
      'acceptTerms',
    ],
    conditional: [{ field: 'companyName', condition: 'isCompany', name: 'Nom de la société' }],
    formats: [
      { field: 'email', validator: 'email' },
      { field: 'phone', validator: 'phone' },
    ],
  } as ValidationConfig,

  regularLine: {
    required: [
      'departure',
      'arrival',
      'date',
      'time',
      'adults',
      'firstName',
      'lastName',
      'email',
      'phone',
      'acceptTerms',
    ],
    conditional: [
      { field: 'returnDate', condition: 'isReturn', name: 'Date de retour' },
      { field: 'returnTime', condition: 'isReturn', name: 'Heure de retour' },
      { field: 'airline', condition: 'hasCommercialFlight', name: 'Compagnie aérienne' },
      {
        field: 'flightOriginDestination',
        condition: 'hasCommercialFlight',
        name: 'Origine/Destination du vol',
      },
      { field: 'flightTime', condition: 'hasCommercialFlight', name: 'Heure du vol' },
      { field: 'pickupLocation', condition: 'needsDriverService', name: 'Lieu de prise en charge' },
      { field: 'companyName', condition: 'isCompany', name: 'Nom de la société' },
    ],
    formats: [
      { field: 'email', validator: 'email' },
      { field: 'phone', validator: 'phone' },
    ],
  } as ValidationConfig,
}

export function validateForm(
  formData: Record<string, any>,
  config: ValidationConfig,
): ValidationResult {
  const errors: Record<string, string> = {}

  // Validate required fields
  config.required.forEach((field) => {
    const error = validators.required(formData[field], getFieldDisplayName(field))
    if (error) {
      errors[field] = error
    }
  })

  // Validate conditional fields
  config.conditional.forEach(({ field, condition, name }) => {
    const conditionValue = formData[condition]
    const error = validators.conditionalRequired(formData[field], conditionValue, name)
    if (error) {
      errors[field] = error
    }
  })

  // Validate formats
  config.formats.forEach(({ field, validator }) => {
    const value = formData[field]
    if (value) {
      if (validator === 'email') {
        const error = validators.email(value)
        if (error) {
          errors[field] = error
        }
      } else if (validator === 'phone') {
        const error = validators.phone(value)
        if (error) {
          errors[field] = error
        }
      }
    }
  })

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

function getFieldDisplayName(field: string): string {
  const fieldNames: Record<string, string> = {
    name: 'Nom',
    firstName: 'Prénom',
    lastName: 'Nom de famille',
    phone: 'Téléphone',
    email: 'Email',
    experienceId: 'Expérience',
    date: 'Date',
    passengers: 'Nombre de passagers',
    destination: 'Destination',
    flightType: 'Type de vol',
    duration: 'Durée',
    time: 'Heure',
    adults: "Nombre d'adultes",
    departure: 'Départ',
    arrival: 'Arrivée',
    acceptTerms: 'Acceptation des conditions',
  }

  return fieldNames[field] || field
}

export function getFieldError(errors: Record<string, string>, field: string): string | null {
  return errors[field] || null
}

export function hasFieldError(errors: Record<string, string>, field: string): boolean {
  return !!errors[field]
}

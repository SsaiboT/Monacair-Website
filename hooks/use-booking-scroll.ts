import { useCallback } from 'react'

export const useBookingScroll = () => {
  const scrollToBookingForm = useCallback(
    (flightType: 'regular-line' | 'panoramic-flight' | 'private-flight') => {
      const bookingFormElement = document.getElementById('booking-form')

      if (bookingFormElement) {
        bookingFormElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })

        setTimeout(() => {
          const radioButtons = document.querySelectorAll('button[type="button"]')
          const targetButton = Array.from(radioButtons).find((button) => {
            const text = button.textContent?.toLowerCase()
            return (
              (flightType === 'private-flight' && text?.includes('private')) ||
              (flightType === 'regular-line' && text?.includes('regular')) ||
              (flightType === 'panoramic-flight' && text?.includes('panoramic'))
            )
          }) as HTMLButtonElement

          if (targetButton) {
            targetButton.click()
          }
        }, 0)
      }
    },
    [],
  )

  return { scrollToBookingForm }
}

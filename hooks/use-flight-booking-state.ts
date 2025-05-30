import { useState, useEffect, useMemo } from 'react'
import { useFlightOptions } from './use-flight-options'
import type { PanoramicFlight } from '@/payload-types'

interface UseFlightBookingStateProps {
  panoramicFlight: PanoramicFlight | null
  onFlightSelectionChange?: (flightType: 'shared' | 'private', duration: number) => void
}

export const useFlightBookingState = ({
  panoramicFlight,
  onFlightSelectionChange,
}: UseFlightBookingStateProps) => {
  const flightOptions = useFlightOptions(panoramicFlight)
  const [flightType, setFlightType] = useState<'shared' | 'private'>('shared')
  const [duration, setDuration] = useState<number>(0)

  useEffect(() => {
    if (flightOptions.shared) {
      setFlightType('shared')
    } else if (flightOptions.private) {
      setFlightType('private')
    }
  }, [flightOptions])

  useEffect(() => {
    const currentOption = flightType === 'shared' ? flightOptions.shared : flightOptions.private

    if (currentOption && currentOption.availableDurations.length > 0) {
      setDuration(currentOption.availableDurations[0])
    } else if (flightOptions.allDurations.length > 0) {
      setDuration(flightOptions.allDurations[0])
    } else {
      setDuration(0)
    }
  }, [flightType, flightOptions])

  useEffect(() => {
    if (onFlightSelectionChange) {
      onFlightSelectionChange(flightType, duration)
    }
  }, [flightType, duration, onFlightSelectionChange])

  const availableDurations = useMemo(() => {
    const currentOption = flightType === 'shared' ? flightOptions.shared : flightOptions.private
    return currentOption?.availableDurations || flightOptions.allDurations
  }, [flightType, flightOptions])

  const handleDurationChange = (newValue: number[]) => {
    const value = newValue[0]

    if (availableDurations.length > 0) {
      const closestDuration = availableDurations.reduce((prev, curr) =>
        Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev,
      )
      setDuration(closestDuration)
    }
  }

  return {
    flightOptions,
    flightType,
    setFlightType,
    duration,
    availableDurations,
    handleDurationChange,
  }
}

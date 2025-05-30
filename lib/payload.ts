import { getPayload } from 'payload'
import config from '@payload-config'

export async function getPayloadClient() {
  try {
    return await getPayload({ config })
  } catch (error) {
    console.error('Failed to initialize Payload:', error)
    throw error
  }
}

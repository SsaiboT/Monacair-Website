import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayloadClient()
    const body = await req.json()

    const { name, phone, email, companyName, experienceId, date, passengers, experience } = body

    if (!name || !phone || !email || !experienceId || !date || !passengers) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const submissionData = {
      name,
      phone,
      email,
      companyName: companyName || '',
      experienceId,
      experienceName: experience?.name || '',
      date,
      passengers: parseInt(passengers),
      submittedAt: new Date().toISOString(),
      status: 'pending',
    }

    console.log('Form submission received:', submissionData)

    return NextResponse.json(
      { message: 'Form submitted successfully', data: submissionData },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error processing form submission:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

import React from 'react'
import { Link } from '@/i18n/navigation'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        <div className="mt-2">
          <Link href="/privacy" className="text-gray-400 hover:text-white mx-2">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-gray-400 hover:text-white mx-2">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer

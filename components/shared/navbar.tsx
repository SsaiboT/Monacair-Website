'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Phone } from 'lucide-react'

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  const handleDropdownToggle = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(dropdown)
    }
  }

  const handleMouseLeave = () => {
    setActiveDropdown(null)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      className={`w-full flex justify-center fixed top-0 left-0 right-0 z-50 px-40 ${scrolled ? 'pt-2' : 'pt-8'} transition-all duration-300`}
    >
      <nav
        className={`bg-white shadow-sm rounded-lg px-8 py-3 flex items-center justify-between w-full ${scrolled ? 'shadow-md' : 'shadow-sm'}`}
      >
        <div className="flex-shrink-0">
          <Link href="/">
            <img
              src="/logos/primary.png"
              alt="Monacair"
              width={106}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
        </div>

        <div className="flex items-center space-x-6">
          <div className="relative" onMouseLeave={handleMouseLeave}>
            <button
              className="font-brother text-royalblue hover:text-redmonacair transition-colors flex items-center"
              onMouseEnter={() => handleDropdownToggle('vol')}
            >
              Réserver un vol
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            {activeDropdown === 'vol' && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
                <Link
                  href="/booking/regular"
                  className="block px-4 py-2 text-sm font-brother text-royalblue hover:bg-gray-100"
                >
                  Vol régulier
                </Link>
                <Link
                  href="/booking/charter"
                  className="block px-4 py-2 text-sm font-brother text-royalblue hover:bg-gray-100"
                >
                  Vol charter
                </Link>
              </div>
            )}
          </div>

          <div className="relative" onMouseLeave={handleMouseLeave}>
            <button
              className="font-brother text-royalblue hover:text-redmonacair transition-colors flex items-center"
              onMouseEnter={() => handleDropdownToggle('destinations')}
            >
              Destinations
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            {activeDropdown === 'destinations' && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
                <Link
                  href="/destinations/nice"
                  className="block px-4 py-2 text-sm font-brother text-royalblue hover:bg-gray-100"
                >
                  Nice
                </Link>
                <Link
                  href="/destinations/monaco"
                  className="block px-4 py-2 text-sm font-brother text-royalblue hover:bg-gray-100"
                >
                  Monaco
                </Link>
                <Link
                  href="/destinations/all"
                  className="block px-4 py-2 text-sm font-brother text-royalblue hover:bg-gray-100"
                >
                  Toutes les destinations
                </Link>
              </div>
            )}
          </div>

          <div className="relative" onMouseLeave={handleMouseLeave}>
            <button
              className="font-brother text-royalblue hover:text-redmonacair transition-colors flex items-center"
              onMouseEnter={() => handleDropdownToggle('evenements')}
            >
              Événements
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            {activeDropdown === 'evenements' && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
                <Link
                  href="/events/monaco-f1"
                  className="block px-4 py-2 text-sm font-brother text-royalblue hover:bg-gray-100"
                >
                  Grand Prix de Monaco
                </Link>
                <Link
                  href="/events/cannes"
                  className="block px-4 py-2 text-sm font-brother text-royalblue hover:bg-gray-100"
                >
                  Festival de Cannes
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/experiences"
            className="font-brother text-royalblue hover:text-redmonacair transition-colors"
          >
            Expériences
          </Link>

          <Link
            href="/private-jet"
            className="font-brother text-royalblue hover:text-redmonacair transition-colors"
          >
            Jet privé
          </Link>

          <Link
            href="/fleet"
            className="font-brother text-royalblue hover:text-redmonacair transition-colors"
          >
            Flotte
          </Link>

          <Link
            href="/services"
            className="font-brother text-royalblue hover:text-redmonacair transition-colors"
          >
            Services
          </Link>
          <Link
            href="/services"
            className="font-brother text-royalblue hover:text-redmonacair transition-colors"
          >
            About Us
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            href="/contact"
            className="bg-royalblue text-white px-4 py-2 rounded font-brother text-sm font-medium transition-colors hover:bg-royalblue/90"
          >
            CONTACTEZ-NOUS
          </Link>
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Phone className="h-5 w-5 text-royalblue" />
          </button>
        </div>
      </nav>
    </div>
  )
}

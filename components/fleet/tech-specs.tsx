import React from 'react'
import { useTranslations } from 'next-intl'

interface TechSpecsProps {
  model: 'h130' | 'h125' | 'h145'
  bgColor?: string
}

export default function TechSpecs({ model, bgColor = 'bg-white' }: TechSpecsProps) {
  const t = useTranslations(`Fleet.helicopter.${model}.technical`)

  return (
    <div className={`${bgColor} p-8 rounded-xl shadow-lg`}>
      <h3 className="text-2xl font-bold mb-6">{t('title')}</h3>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <table className="w-full">
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-3 font-medium">{t('manufacturer')}</td>
                <td className="py-3">{t('manufacturer_value')}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 font-medium">{t('engine')}</td>
                <td className="py-3">{t('engine_value')}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 font-medium">{t('power')}</td>
                <td className="py-3">{t('power_value')}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 font-medium">{t('length')}</td>
                <td className="py-3">{t('length_value')}</td>
              </tr>
              <tr>
                <td className="py-3 font-medium">{t('height')}</td>
                <td className="py-3">{t('height_value')}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <table className="w-full">
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-3 font-medium">{t('rotor')}</td>
                <td className="py-3">{t('rotor_value')}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 font-medium">{t('empty_weight')}</td>
                <td className="py-3">{t('empty_weight_value')}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 font-medium">{t('max_weight')}</td>
                <td className="py-3">{t('max_weight_value')}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 font-medium">{t('ceiling')}</td>
                <td className="py-3">{t('ceiling_value')}</td>
              </tr>
              <tr>
                <td className="py-3 font-medium">{t('climb_rate')}</td>
                <td className="py-3">{t('climb_rate_value')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

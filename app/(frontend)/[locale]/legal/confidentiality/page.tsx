import { getTranslations } from 'next-intl/server'
import Footer from '@/components/shared/footer'

export default async function ConfidentialityPage() {
  const t = await getTranslations('privacyPolicy')
  return (
    <div className="min-h-screen bg-gray-50 pt-40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('title')}</h1>
          <p className="text-lg text-gray-600">{t('lastUpdate')}</p>
        </header>

        {/* Table of Contents */}
        <nav className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Sommaire</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <a href="#introduction" className="text-blue-600 hover:text-blue-800 transition-colors">
              1. {t('introduction.title')}
            </a>
            <a
              href="#data-controller"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              2. {t('dataController.title')}
            </a>
            <a
              href="#data-collected"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              3. {t('dataCollected.title')}
            </a>
            <a href="#purposes" className="text-blue-600 hover:text-blue-800 transition-colors">
              4. {t('purposes.title')}
            </a>
            <a href="#legal-basis" className="text-blue-600 hover:text-blue-800 transition-colors">
              5. {t('legalBasis.title')}
            </a>
            <a href="#recipients" className="text-blue-600 hover:text-blue-800 transition-colors">
              6. {t('recipients.title')}
            </a>
            <a href="#retention" className="text-blue-600 hover:text-blue-800 transition-colors">
              7. {t('retention.title')}
            </a>
            <a href="#security" className="text-blue-600 hover:text-blue-800 transition-colors">
              8. {t('security.title')}
            </a>
            <a href="#rights" className="text-blue-600 hover:text-blue-800 transition-colors">
              9. {t('rights.title')}
            </a>
            <a href="#cookies" className="text-blue-600 hover:text-blue-800 transition-colors">
              10. {t('cookies.title')}
            </a>
            <a
              href="#modifications"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              11. {t('modifications.title')}
            </a>
            <a href="#contact" className="text-blue-600 hover:text-blue-800 transition-colors">
              12. {t('contact.title')}
            </a>
          </div>
        </nav>

        {/* Content */}
        <div className="space-y-12">
          {/* Section 1: Introduction */}
          <section id="introduction" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">1. {t('introduction.title')}</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">{t('introduction.description')}</p>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {t('introduction.complianceTitle')}
              </h3>
              <p className="text-gray-700 mb-2">{t('introduction.complianceSubtitle')}</p>
              <ul className="text-gray-700 space-y-1">
                <li>• {t('introduction.rgpd')}</li>
                <li>• {t('introduction.monaco')}</li>
              </ul>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-400 p-4">
              <p className="text-amber-800 font-medium">⚠️ {t('introduction.important')}</p>
            </div>
          </section>

          {/* Section 2: Data Controller */}
          <section id="data-controller" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              2. {t('dataController.title')}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t('dataController.companyName')}
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>{t('dataController.address')}</p>
                  <p>{t('dataController.phone')}</p>
                  <p>{t('dataController.email')}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t('dataController.dpoTitle')}
                </h3>
                <p className="text-gray-700">{t('dataController.dpoEmail')}</p>
              </div>
            </div>
          </section>

          {/* Section 3: Data Collected */}
          <section id="data-collected" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">3. {t('dataCollected.title')}</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t('dataCollected.directDataTitle')}
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• {t('dataCollected.directData1')}</li>
                  <li>• {t('dataCollected.directData2')}</li>
                  <li>• {t('dataCollected.directData3')}</li>
                  <li>• {t('dataCollected.directData4')}</li>
                  <li>• {t('dataCollected.directData5')}</li>
                  <li>• {t('dataCollected.directData6')}</li>
                  <li>• {t('dataCollected.directData7')}</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t('dataCollected.automaticDataTitle')}
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• {t('dataCollected.automaticData1')}</li>
                  <li>• {t('dataCollected.automaticData2')}</li>
                  <li>• {t('dataCollected.automaticData3')}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4: Purposes */}
          <section id="purposes" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">4. {t('purposes.title')}</h2>
            <p className="text-gray-700 mb-4">{t('purposes.description')}</p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">•</span>
                <span>{t('purposes.purpose1')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">•</span>
                <span>{t('purposes.purpose2')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">•</span>
                <span>{t('purposes.purpose3')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">•</span>
                <span>{t('purposes.purpose4')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">•</span>
                <span>{t('purposes.purpose5')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">•</span>
                <span>{t('purposes.purpose6')}</span>
              </li>
            </ul>
          </section>

          {/* Section 5: Legal Basis */}
          <section id="legal-basis" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">5. {t('legalBasis.title')}</h2>
            <p className="text-gray-700 mb-4">{t('legalBasis.description')}</p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-3">•</span>
                <span>{t('legalBasis.basis1')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-3">•</span>
                <span>{t('legalBasis.basis2')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-3">•</span>
                <span>{t('legalBasis.basis3')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-3">•</span>
                <span>{t('legalBasis.basis4')}</span>
              </li>
            </ul>
          </section>

          {/* Section 6: Recipients */}
          <section id="recipients" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">6. {t('recipients.title')}</h2>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('recipients.accessTitle')}
            </h3>
            <p className="text-gray-700 mb-2">• {t('recipients.internal')}</p>
            <p className="text-gray-700 mb-3">{t('recipients.partnersDescription')}</p>
            <ul className="ml-4 space-y-2 text-gray-700 mb-6">
              <li>- {t('recipients.partner1')}</li>
              <li>- {t('recipients.partner2')}</li>
              <li>- {t('recipients.partner3')}</li>
            </ul>

            <div className="bg-green-50 border-l-4 border-green-400 p-4">
              <p className="text-green-800 font-medium">🔒 {t('recipients.commitment')}</p>
            </div>
          </section>

          {/* Section 7: Retention */}
          <section id="retention" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">7. {t('retention.title')}</h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                      Type de données
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                      Durée de conservation
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">
                      {t('retention.executionType')}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">
                      {t('retention.executionDuration')}
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">
                      {t('retention.legalType')}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">
                      {t('retention.legalDuration')}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">
                      {t('retention.marketingType')}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">
                      {t('retention.marketingDuration')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 8: Security */}
          <section id="security" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">8. {t('security.title')}</h2>
            <p className="text-gray-700 mb-4">{t('security.description')}</p>
            <ul className="space-y-2 text-gray-700">
              <li>• {t('security.protection1')}</li>
              <li>• {t('security.protection2')}</li>
              <li>• {t('security.protection3')}</li>
              <li>• {t('security.protection4')}</li>
            </ul>
          </section>

          {/* Section 9: Rights */}
          <section id="rights" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">9. {t('rights.title')}</h2>
            <p className="text-gray-700 mb-6">{t('rights.description')}</p>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('rights.availableTitle')}
            </h3>
            <ul className="space-y-3 text-gray-700 mb-6">
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">✅</span>
                <span>{t('rights.right1')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">✅</span>
                <span>{t('rights.right2')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">✅</span>
                <span>{t('rights.right3')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">✅</span>
                <span>{t('rights.right4')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">✅</span>
                <span>{t('rights.right5')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">✅</span>
                <span>{t('rights.right6')}</span>
              </li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {t('rights.exerciseTitle')}
              </h3>
              <p className="text-gray-700 mb-1">{t('rights.contact')}</p>
              <p className="text-gray-700">{t('rights.delay')}</p>
            </div>

            <div className="bg-gray-50 border-l-4 border-gray-400 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {t('rights.recourseTitle')}
              </h3>
              <p className="text-gray-700">{t('rights.recourseDescription')}</p>
            </div>
          </section>

          {/* Section 10: Cookies */}
          <section id="cookies" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">10. {t('cookies.title')}</h2>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('cookies.typesTitle')}</h3>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>• {t('cookies.type1')}</li>
              <li>• {t('cookies.type2')}</li>
              <li>• {t('cookies.type3')}</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {t('cookies.managementTitle')}
            </h3>
            <p className="text-gray-700 mb-4">{t('cookies.managementDescription')}</p>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <p className="text-blue-800">📋 {t('cookies.moreInfo')}</p>
            </div>
          </section>

          {/* Section 11: Modifications */}
          <section id="modifications" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              11. {t('modifications.title')}
            </h2>
            <p className="text-gray-700">{t('modifications.description')}</p>
          </section>

          {/* Section 12: Contact */}
          <section id="contact" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">12. {t('contact.title')}</h2>
            <p className="text-gray-700 mb-6">{t('contact.description')}</p>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('contact.dpoTitle')}</h3>
              <p className="text-gray-700">📧 {t('contact.dpoEmail')}</p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center py-8 border-t border-gray-200">
          <p className="text-gray-600 italic">{t('footer')}</p>
        </footer>
      </div>
      <Footer />
    </div>
  )
}

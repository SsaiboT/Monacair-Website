import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-royalblue mb-4 font-brother">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 font-brother">Page Non Trouvée</h2>
        <p className="text-gray-600 mb-8 font-brother">
          Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="bg-redmonacair hover:bg-redmonacair/90 text-white px-6 py-3 rounded-md font-bold transition-colors font-brother"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  )
}

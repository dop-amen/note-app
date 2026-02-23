import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-green-950 to-gray-950 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute -top-25 -left-25 w-100 h-100 bg-green-500 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute -bottom-25 -right-25 w-100 h-100 bg-green-700 rounded-full opacity-10 blur-3xl"></div>

      <div className="z-10 text-center px-6">
        <h1 className="text-6xl font-bold text-white mb-4">
          Note<span className="text-green-400">Vault</span>
        </h1>
        <p className="text-gray-400 text-xl mb-10">Your thoughts, secured and organized.</p>
        <div className="flex gap-4 justify-center">
          
          <Link href="/signup" className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200">
            Sign Up
          </Link>
          <Link href="/login" className="bg-green-500/10 hover:bg-green-500/30 text-green-400 px-8 py-3 rounded-xl font-semibold transition-all duration-200">
  Login
</Link>
        </div>
      </div>
    </div>
  )
}
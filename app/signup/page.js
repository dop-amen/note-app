'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const router = useRouter()

  const handleSignup = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setError(error.message)
    } else {
      setMessage('Check your email to confirm your account!')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-green-950 to-gray-950 flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-green-500 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-green-700 rounded-full opacity-10 blur-3xl"></div>

      <div className="z-10 w-full max-w-md px-6">
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-2">Create account</h2>
          <p className="text-gray-400 mb-8">Start writing your notes today</p>
          {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}
          {message && <p className="text-green-400 mb-4 text-sm">{message}</p>}
          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
              className="bg-white/10 border border-white/10 text-white placeholder-gray-500 p-3 rounded-xl focus:outline-none focus:border-green-500 transition-all" required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
              className="bg-white/10 border border-white/10 text-white placeholder-gray-500 p-3 rounded-xl focus:outline-none focus:border-green-500 transition-all" required />
            <button type="submit" className="bg-green-500/10 hover:bg-green-500/30 text-green-400 py-3 rounded-xl font-semibold transition-all duration-200 mt-2">
  Sign Up
</button>
          </form>
          <p className="mt-6 text-center text-gray-500 text-sm">Already have an account? <Link href="/login" className="text-green-400 hover:underline">Login</Link></p>
        </div>
      </div>
    </div>
  )
}